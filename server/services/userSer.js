let moment = require("moment");
let jwt = require("jwt-simple");
let { secret } = require("../config/config");

let userRepo = require("../repo/userRepo");
let bookRepo = require("../repo/bookRepo");
let commentRepo = require("../repo/commentRepo");
let codeRepo = require("../repo/codeRepo");
let orderRepo = require("../repo/orderRepo");
let clientRepo = require('../repo/clientRepo')

const USER = {
  signin(req, res) {
    userRepo
      .getUserByName(req.body.name)
      .then(user => {
        if (user === null) {
          throw "用户不存在";
        }
        if (user.pwd !== req.body.pwd) {
          throw "用户名密码错误";
        }
        let expires = moment()
          .add(7, "days")
          .valueOf();
        let userInfo = user;
        let token = jwt.encode(
          {
            user: userInfo,
            exp: expires
          },
          secret
        );
        res.json({
          code: 200,
          data: {
            token,
            expires,
            user: userInfo
          },
          msg: "登陆成功"
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          code: 201,
          msg: err,
          data: err
        });
      });
  },
  signup(req, res) {
    let user = req.body;
    userRepo
      .getUserByName(user.name)
      .then(result => {
        if (result) {
          res.json({
            code: 201,
            msg: "用户名已存在，请重新输入",
            data: result
          });
        } else {
          userRepo.addUser(user).then(result => {
            res.json({
              code: 200,
              msg: "注册成功",
              data: result
            });
          });
        }
      })
      .catch(err => {
        res.json({
          code: 500,
          msg: "注册失败，请重试",
          data: err
        });
      });
  },
  getUser(req, res) {
    let expires = moment()
      .add(7, "days")
      .valueOf();
    let userInfo = req.user;
    let token = jwt.encode(
      {
        user: userInfo,
        exp: expires
      },
      secret
    );
    res.json({
      code: 200,
      data: {
        token,
        expires,
        user: userInfo
      },
      msg: "获取成功"
    });
  },
  getBoughtBooks(req, res) {
    let _books = req.user.bid;
    let books = [];
    let params = req.url.split("/");
    let page = params[params.length - 2];
    let pageSize = Math.min(params[params.length - 1], _books.length);
    let _index = page * pageSize;
    if (pageSize === 0) {
      res.json({
        code: 201,
        msg: "获取成功",
        data: { books }
      });
      return;
    }
    for (
      let index = 0;
      index < pageSize && index + _index <= _books.length - 1;
      ++index
    ) {
      bookRepo.getBookById(_books[index + _index]).then(result => {
        books.push(result);
        if (books.length === pageSize || index + _index >= _books.length - 1) {
          res.json({
            code: index + _index >= _books.length - 1 ? 201 : 200,
            msg: "获取成功",
            data: { books }
          });
          return;
        }
      });
    }
  },
  rmvBought(req, res) {
    let bid = req.body.bid;
    let user = req.user;
    user.bid = user.bid.filter(em => em != bid);
    userRepo
      .updateInfo(user)
      .then(user => {
        res.json({
          code: 200,
          msg: "删除成功",
          data: user.cart
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          code: 500,
          msg: "网络错误，待会重试",
          data: err
        });
      });
  },
  getCart(req, res) {
    let _cart = req.user.cart;
    let cart = [];
    let params = req.url.split("/");
    let page = params[params.length - 2];
    let pageSize = Math.min(params[params.length - 1], _cart.length);
    let _index = page * pageSize;
    if (pageSize === 0) {
      res.json({
        code: 201,
        msg: "获取成功",
        data: { cart }
      });
      return;
    }
    for (
      let index = 0;
      index < pageSize && index + _index <= _cart.length - 1;
      ++index
    ) {
      bookRepo.getBookById(_cart[index + _index]).then(result => {
        cart.push(result);
        if (cart.length === pageSize || index + _index >= _cart.length - 1) {
          res.json({
            code: index + _index >= _cart.length - 1 ? 201 : 200,
            msg: "获取成功",
            data: { cart }
          });
          return;
        }
      });
    }
  },
  buyBooks(req, res) {
    let bids = req.body.bids;
    let shops = req.body.shops;
    let price = req.body.price;
    let user = req.user;

    shops.forEach(async element => {
      const order = await orderRepo.addOrder({
        bid: element.bid,
        uid: user.uid,
        cltid: element.cltid,
        oid: Math.random()
          .toString(36)
          .slice(2)
      });
      const client = await clientRepo.getClient(order.cltid);
      client.oid.push(order.oid);
      clientRepo.updateInfo(client);
    });

    user.bid = user.bid.concat(bids);
    user.balance -= price;
    userRepo
      .updateInfo(user)
      .then(user => {
        res.json({
          code: 200,
          msg: "购买成功",
          data: { books: user.bid }
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          code: 500,
          msg: "网络错误，待会重试",
          data: err
        });
      });
  },
  addCart(req, res) {
    let bid = req.body.bid;
    let user = req.user;
    user.cart.push(bid);
    userRepo
      .updateInfo(user)
      .then(user => {
        bookRepo.getBookById(bid).then(book => {
          res.json({
            code: 200,
            msg: "添加成功",
            data: { book }
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          code: 500,
          msg: "网络错误，待会重试",
          data: err
        });
      });
  },
  rmvCart(req, res) {
    let bid = req.params.bid;
    let type = req.params.type;
    let user = req.user;
    if (type === true) {
      user.cart.splice(user.cart.findIndex(em => em === bid), 1);
    } else {
      user.cart = user.cart.filter(em => em != bid);
    }
    userRepo
      .updateInfo(user)
      .then(user => {
        res.json({
          code: 200,
          msg: "删除成功",
          data: user.cart
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          code: 500,
          msg: "网络错误，待会重试",
          data: err
        });
      });
  },
  writeComment(req, res) {
    let user = req.user;
    let _comment = null;
    commentRepo
      .addComment({
        ...req.body.comment,
        uid: user.uid,
        uname: user.name,
        uavatar: user.avatar
      })
      .then(comment => {
        _comment = comment;
        return userRepo.getUserById(user.uid);
      })
      .then(user => {
        user.cid.push(_comment.cid);
        return userRepo.updateInfo(user);
      })
      .then(() => {
        return bookRepo.getBookById(req.body.comment.bid);
      })
      .then(book => {
        book.cid.push(_comment.cid);
        console.log(book.cid);
        return bookRepo.updateBook(book);
      })
      .then(() => {
        res.json({
          code: 200,
          msg: "评价成功",
          data: user.cid
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          code: 500,
          msg: "服务器错误，待会重试",
          data: err
        });
      });
  },
  addAddress(req, res) {
    let user = req.user;
    if (user.address.includes(req.body.address)) {
      res.json({
        code: 200,
        msg: "该地址已存在",
        data: {
          address: req.user.address
        }
      });
      return;
    }
    user.address.push(req.body.address);
    userRepo
      .updateInfo(user)
      .then(user => {
        res.json({
          code: 200,
          msg: "添加成功",
          data: { address: user.address }
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          code: 201,
          msg: "网络错误，待会重试",
          data: { address: err }
        });
      });
  },
  delAddress(req, res) {
    let user = req.user;
    user.address.splice(req.url.substring(req.url.lastIndexOf("/") + 1), 1);
    userRepo
      .updateInfo(user)
      .then(user => {
        res.json({
          code: 200,
          msg: "删除成功",
          data: { address: user.address }
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          code: 200,
          msg: "网络错误，待会重试",
          data: { address: err }
        });
      });
  },
  editAddress(req, res) {
    let user = req.user;
    user.address[req.body.index] = req.body.address;
    userRepo
      .updateInfo(user)
      .then(user => {
        res.json({
          code: 200,
          msg: "修改成功",
          msg: { address: user.address }
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          code: 201,
          msg: "网络错误，待会重试",
          data: { address: err }
        });
      });
  },
  editBlance(req, res) {
    let user = req.user;
    user.balance = req.body.balance;
    userRepo
      .updateInfo(user)
      .then(user => {
        res.json({
          code: 200,
          msg: "修改成功",
          msg: { balance: user.balance }
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          code: 201,
          msg: "网络错误，待会重试",
          data: { address: err }
        });
      });
  },
  sendCode(req, res) {
    let value = Math.floor(Math.random() * 9999);
    let id = Math.random()
      .toString(36)
      .slice(2);
    codeRepo
      .addCode({ id, value })
      .then(() => {
        res.json({
          code: 200,
          msg: "发送成功",
          data: { id, value }
        });
      })
      .catch(err => {
        res.json({
          code: 200,
          msg: err,
          data: { err }
        });
      });
  },
  editPassword(req, res) {
    let user = req.user;
    if (user.pwd !== req.body.oldPwd) {
      res.json({
        code: 201,
        msg: "原始密码输入错误",
        data: {
          value: "原始密码输入错误"
        }
      });
      return;
    }
    codeRepo
      .getCode(req.body.id)
      .then(code => {
        if (!code || code.value !== req.body.value) {
          res.json({
            code: 201,
            msg: "验证码错误",
            data: {}
          });
          return;
        }
        user.pwd = req.body.newPwd;
        userRepo.updateInfo(user).then(user => {
          res.json({
            code: 200,
            msg: "修改成功",
            data: { user }
          });
        });
      })
      .catch(err => {
        res.json({
          code: 201,
          msg: "网络错误，待会重试",
          data: { err }
        });
      });
  },
  fgtPwd(req, res) {
    codeRepo
      .getCode(req.body.id)
      .then(code => {
        if (!code || code.value !== req.body.value) {
          res.json({
            code: 201,
            msg: "验证码错误",
            data: {}
          });
          return;
        }
        userRepo.getUserByName(req.body.name).then(user => {
          user.pwd = req.body.pwd;
          userRepo.updateInfo(user).then(user => {
            res.json({
              code: 200,
              msg: "修改成功",
              data: { user }
            });
          });
        });
      })
      .catch(err => {
        res.json({
          code: 201,
          msg: "网络错误，待会重试",
          data: { err }
        });
      });
  },
  editEmail(req, res) {
    let user = req.user;
    if (user.pwd !== req.body.oldPwd) {
      res.json({
        code: 201,
        msg: "原始密码输入错误",
        data: {
          value: "原始密码输入错误"
        }
      });
      return;
    }
    codeRepo
      .getCode(req.body.id)
      .then(code => {
        if (!code || code.value !== req.body.value) {
          res.json({
            code: 201,
            msg: "验证码错误",
            data: {}
          });
          return;
        }
        user.email = req.body.email;
        console.log(req.body.email, 11);
        userRepo.updateInfo(user).then(user => {
          res.json({
            code: 200,
            msg: "修改成功",
            data: { user }
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          code: 201,
          msg: "网络错误，待会重试",
          data: { err }
        });
      });
  }
};

module.exports = USER;
