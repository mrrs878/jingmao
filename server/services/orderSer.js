let orderRepo = require("../repo/orderRepo");

const ORDER = {
  getOrdersByCltid(req, res) {
    orderRepo
      .getOrdersByCltid(req.params.page, req.params.size, req.client.cid)
      .then(orders => {
        if (orders.length === 0 || orders.length < req.params.size) {
          res.json({
            code: 202,
            msg: "获取完毕",
            data: { orders }
          });
          return;
        }
        res.json({
          code: 200,
          msg: "获取成功",
          data: { orders }
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

module.exports = ORDER;
