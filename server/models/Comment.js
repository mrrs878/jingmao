let mongoose = require('mongoose')

let commentSchema = mongoose.Schema({
  cid: String,
  uid: String,
  uname: String,
  uavatar: String,
  rate: Number,
  uname: String,
  uavatar: String,
  ctime: String,
  utime: String,
  content: String,
  bid: String
})

let Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
