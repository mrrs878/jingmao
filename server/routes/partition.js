let express = require("express");
let router = express.Router();
let partitionSer = require("../services/partitionSer");

router.get("/:name", (req, res) => {
  partitionSer.getPartitionByName(req, res);
});

module.exports = router;
