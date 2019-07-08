let express = require("express");
let router = express.Router();

let orderServ = require("../services/orderSer");
let jwtClient = require('../middleware/jwtClient')

router.get("/getOrdersByCltid/:page/:size", jwtClient, (req, res) => {
  orderServ.getOrdersByCltid(req, res);
});

module.exports = router;
