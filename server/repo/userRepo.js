let User = require("../models/User");
let moment = require("moment");

const USER = {
  getUserById(uid) {
    return User.findOne({ uid: uid });
  },
  getUserByName(name) {
    return User.findOne({ name: name });
  },
  addUser(user_) {
    let user = new User({
      uid: Math.random()
        .toString(36)
        .slice(2),
      name: user_.name,
      pwd: user_.pwd,
      email: user_.email,
      cid: [],
      bid: [],
      balance: 30.0,
      avatar: user_.avatar || "",
      ctime: new moment().format("YYYY--MM--DD HH:mm:ss"),
      utime: new moment().format("YYYY--MM--DD HH:mm:ss")
    });
    return user.save();
  },
  updateInfo(user_) {
    let user = new User(user_);
    return user.save();
  }
};

module.exports = USER;
