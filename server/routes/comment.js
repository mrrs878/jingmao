let express = require("express");
let router = express.Router();

let commentServ = require("../services/commentSer");

router.post("/", (req, res) => {
  commentServ.addComment(req, res);
});

router.post("/bid/*", (req, res) => {
  commentServ.getCommentsByBid(req, res);
});

module.exports = router;
