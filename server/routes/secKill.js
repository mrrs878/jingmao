let secKillSer = require("../services/secKillSer");
let express = require("express");
let router = express.Router();

router.get("", (req, res) => {
  secKillSer.getSecKillShops(req, res);
});

router.post("", (req, res) => {
  secKillSer.addSecKillShop(req, res)
})

module.exports = router;
