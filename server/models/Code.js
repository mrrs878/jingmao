let mongoose = require("mongoose");

let codeSchema = new mongoose.Schema({
  cid: String,
  value: String
});

let Code = mongoose.model("Code", codeSchema);

module.exports = Code;
