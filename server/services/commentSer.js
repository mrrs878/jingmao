let commentRepo = require("../repo/commentRepo");

const COMMENT_SERVICE = {
  getCommentsByBid(req, res) {
    commentRepo
      .getCommentsByBid(
        req.url.substring(req.url.lastIndexOf("/") + 1),
        req.body.page,
        req.body.size
      )
      .then(result => {
        res.json({
          code: 200,
          msg: "获取成功",
          data: {
            comments: result
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          code: 201,
          msg: err,
          data: err
        });
      });
  },
  getComments() {},
  addComment(req, res) {
    commentRepo
      .addComment(req.body.comment)
      .then(result => {
        res.json({
          code: 200,
          msg: "添加成功",
          data: result
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          code: 201,
          msg: err,
          data: err
        });
      });
  }
};

module.exports = COMMENT_SERVICE;
