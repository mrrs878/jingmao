const { secret } = require("../config/config");
const jwt = require("jwt-simple");
const Client = require("../models/Client");

module.exports = async function(req, res, next) {
  let authorization = req.headers["authorization"];
  if (authorization) {
    try {
      let decode = jwt.decode(authorization.split(" ")[1], secret);
      Client.findOne({ cid: decode.client.cid }).then(res => {
        req.client = res;
        next();
      });
    } catch (err) {
      console.log(err);
      res.status(401).send("Not Allowded");
    }
  } else {
    res.status(401).send("Not Allowded");
  }
};
