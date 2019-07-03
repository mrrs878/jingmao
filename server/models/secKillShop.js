let mongoose = require("mongoose");

let secKillShopSchema = new mongoose.Schema({
  sid: String,
  name: String,
  price: Number,
  killPrice: Number,
  cover: String,
  ctime: String
});

let SecKillShop = mongoose.model("SecKillShop", secKillShopSchema);

module.exports = SecKillShop;
