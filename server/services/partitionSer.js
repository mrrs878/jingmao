let partitionRepo = require("../repo/partitionRepo");

const PARTITION = {
  getPartitionByName(req, res) {
    partitionRepo
      .getPartitionByName(req.params.name)
      .then(partition => {
        res.json({
          code: 200,
          msg: "获取成功",
          data: {
            partition
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          code: 201,
          msg: "网络错误，待会重试",
          data: { err }
        });
      });
  }
};

module.exports = PARTITION;
