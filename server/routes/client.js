let express = require("express");
let router = express.Router();
let clientSer = require("../services/clientSer");

router.post("/signin", (req, res) => {
  clientSer.signin(req, res);
});

router.post("/signup", (req, res) => {
  clientSer.signup(req, res);
});

router.get("/:cid", (req, res) => {
  clientSer.getClient(req, res);
});

module.exports = router;
