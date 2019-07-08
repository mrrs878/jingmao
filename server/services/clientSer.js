let clientRepo = require("../repo/clientRepo");
let moment = require("moment");
let jwt = require("jwt-simple");
let { secret } = require("../config/config");

const CLIENT = {
  signin(req, res) {
    console.log(req.body);
    clientRepo
      .getClientByName(req.body.name)
      .then(client => {
        if (client.pwd !== req.body.pwd) {
          res.json({
            code: 201,
            msg: "账号/密码错误",
            data: { client }
          });
        } else {
          let expires = moment()
            .add(7, "days")
            .valueOf();
          let clientInfo = client;
          clientInfo["pwd"] = "";
          let token = jwt.encode(
            {
              client: clientInfo,
              exp: expires
            },
            secret
          );
          res.json({
            code: 200,
            data: {
              token,
              expires,
              client: clientInfo
            },
            msg: "登陆成功"
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.json({
          code: 201,
          msg: err,
          data: { err }
        });
      });
  },
  signup(req, res) {
    console.log(req.body);

    clientRepo
      .addClient(req.body)
      .then(client => {
        res.json({
          code: 200,
          msg: "注册成功",
          data: { client }
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
  },
  getClient(req, res) {
    clientRepo
      .getClient(req.params.cid)
      .then(client => {
        res.json({
          code: 200,
          msg: "获取成功",
          data: { client }
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

module.exports = CLIENT;
