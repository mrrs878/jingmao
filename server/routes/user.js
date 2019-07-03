let express = require("express");
let router = express.Router();

let userService = require("../services/userSer");
let jwtWare = require("../middleware/jwt");

router.post("/signup", (req, res) => {
  userService.signup(req, res);
});

router.post("/signin", (req, res) => {
  userService.signin(req, res);
});

router.get("/bought/*", jwtWare, (req, res) => {
  userService.getBoughtBooks(req, res);
});

router.get("/cart/*", jwtWare, (req, res) => {
  userService.getCart(req, res);
});

router.post("/buy", jwtWare, (req, res) => {
  userService.buyBooks(req, res);
});

router.post("/add/*", jwtWare, (req, res) => {
  userService.addCart(req, res);
});

router.delete("/rmvCart/:bid/:type", jwtWare, (req, res) => {
  userService.rmvCart(req, res);
});

router.post("/rmvBought/*", jwtWare, (req, res) => {
  userService.rmvBought(req, res);
});

router.post("/writeComment", jwtWare, (req, res) => {
  userService.writeComment(req, res);
});

router.post("/addAddress", jwtWare, (req, res) => {
  userService.addAddress(req, res);
});

router.delete("/delAddress/*", jwtWare, (req, res) => {
  userService.delAddress(req, res);
});

router.put("/editAddress/*", jwtWare, (req, res) => {
  userService.editAddress(req, res);
});

router.get("/code", (req, res) => {
  userService.sendCode(req, res);
});

router.put("/editPassword", jwtWare, (req, res) => {
  userService.editPassword(req, res);
});

router.put('/fgtPwd', (req, res) => {
  userService.fgtPwd(req ,res)
})

router.put("/editEmail", jwtWare, (req, res) => {
  userService.editEmail(req, res);
});

router.put("/editBlance", jwtWare, (req, res) => {
  userService.editBlance(req, res);
});

router.get("/*", jwtWare, (req, res) => {
  userService.getUser(req, res);
});

module.exports = router;
