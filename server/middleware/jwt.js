const { secret } = require("../config/config");
const jwt = require("jwt-simple");
const User = require("../models/User");

module.exports = async function(req, res, next) {
  let authorization = req.headers["authorization"];
  if (authorization) {
    try {
      let decoded = jwt.decode(authorization.split(" ")[1], secret);
      User.findOne({ uid: decoded.user.uid }).then(res =>{
        req.user = res
        next();
      });
    } catch (err) {
      console.log(err);
      res.status(401).send("Not Allowedd");
    }
  } else {
    res.status(401).send("Not Allowed");
  }
};
