let mongoose = require("mongoose");

let orderSchema = mongoose.Schema({
  oid: String,
  cltid: String,
  uid: String,
  bid: String,
  ctime: String,
  utime: String
});

let Order = mongoose.model("Order", orderSchema);

module.exports = Order;
