let mongoose = require("mongoose");

let partitionSchema = new mongoose.Schema({
  cover: String,
  name: String,
  summary: String,
  bid: []
});

let Partition = mongoose.model("Partition", partitionSchema);

module.exports = Partition;
