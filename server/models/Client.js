let mongoose = require("mongoose");

let clientSchema = mongoose.Schema({
  cid: String,
  name: String,
  pwd: String,
  email: String,
  avatar: String,
  ctime: String,
  utime: String,
  bid: [],
  oid: []
});

let Client = mongoose.model("Client", clientSchema);

module.exports = Client;
