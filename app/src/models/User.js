import {
  signin,
  signup,
  buyBooks,
  addCart,
  boughtBooks,
  getCart,
  removeCart,
  getUser,
  removeBought,
  addAddress,
  delAddress,
  editAddress,
  editPassword,
  editEmail,
  editBlance,
  sendCode,
  fgtPwd
} from "../api/api";
import store from "../store/store.js";

class User {
  constructor(data = {}) {
    this.data = data;
  }

  isLogin() {
    return localStorage.getItem("token") !== null;
  }

  login({ name, pwd, cb }) {
    signin({ name, pwd })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        if (res.data.token) {
          store.dispatch("updateUserInfo", { user: res.data.user });
        }
        cb(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  logout({ cb }) {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    localStorage.removeItem("cartAll");
    localStorage.removeItem("order");
    localStorage.removeItem("orderAll");
    store.dispatch("updateUserInfo", { user: {} });
    cb();
  }

  fgtPwd({ id, value, name, pwd, cb }) {
    fgtPwd(id, value, name, pwd)
      .then(res => cb(res))
      .catch(err => console.log(err));
  }

  updateInfo() {
    getUser(store.state.user.data.uid)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        if (res.data.token) {
          store.dispatch("updateUserInfo", { user: res.data.user });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  reg({ user, cb }) {
    signup(user)
      .then(result => {
        cb(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  buyBooks({ bids, price, cb }) {
    buyBooks(bids, price)
      .then(res => {
        cb(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  addCart({ bid, cb }) {
    addCart(bid)
      .then(res => {
        cb(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  removeCart({ bid, type, cb }) {
    removeCart(bid, type)
      .then(res => {
        cb(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getCart({ page, size, cb }) {
    getCart(page, size)
      .then(res => {
        cb(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getBought({ page, size, cb }) {
    boughtBooks(page, size)
      .then(res => {
        cb(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  removeBought({ bid, cb }) {
    removeBought(bid)
      .then(res => {
        cb(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  addAddress({ address, cb }) {
    addAddress(address)
      .then(res => {
        cb(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  delAddress({ index, cb }) {
    delAddress(index)
      .then(res => {
        cb(res);
      })
      .catch(err => console.log(err));
  }

  editAddress({ index, address, cb }) {
    editAddress(index, address)
      .then(res => {
        cb(res);
      })
      .catch(err => console.log(err));
  }

  editPassword({ id, value, oldPwd, newPwd, cb }) {
    editPassword(id, value, oldPwd, newPwd)
      .then(res => {
        cb(res);
      })
      .catch(err => console.log(err));
  }

  sendCode({ password, cb }) {
    sendCode(password)
      .then(res => cb(res))
      .catch(err => console.log(err));
  }

  editEmail({ id, value, oldPwd, email, cb }) {
    editEmail(id, value, oldPwd, email)
      .then(res => {
        cb(res);
      })
      .catch(err => console.log(err));
  }

  editBlance({ balance, cb }) {
    editBlance(balance)
      .then(res => {
        cb(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default User;
