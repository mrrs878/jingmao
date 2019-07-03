let mongoose = require('mongoose')

let userSchema = mongoose.Schema({
  uid: String,
  name: String,
  pwd: String,
  email: String,
  cid: new Array(),
  bid: new Array(),
  cart: new Array(),
  address: new Array(),
  balance: Number,
  avatar: String,
  ctime: String,
  utime: String
})

let User = mongoose.model('User', userSchema)

module.exports = User
