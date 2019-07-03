let Comment = require("../models/Comment");
let moment = require("moment");

const COMMENT = {
  getCommentByCid(cid) {
    return Comment.findOne({ cid: cid });
  },
  getCommentsByBid(bid, page, size) {
    if (page && size) {
      return Comment.find({ bid: bid }, null, {
        skip: (page - 1) * size,
        limit: size
      });
    }
    return Comment.find({ bid: bid });
  },
  addComment(comment) {
    let tmp = new Comment({
      uid: comment.uid,
      uavatar: comment.uavatar,
      uname: comment.uname,
      rate: comment.rate,
      cid: Math.random()
        .toString(36)
        .slice(2),
      ctime: new moment().format("YYYY--MM--DD HH:mm:ss "),
      utime: new moment().format("YYYY--MM--DD HH:mm:ss"),
      content: comment.content,
      bid: comment.bid
    });
    return tmp.save();
  }
};

module.exports = COMMENT;
