let secKillRepo = require("../repo/secKillRepo");

const SECKILL_SERVICE = {
  getSecKillShops(req, res) {
    secKillRepo
      .getSecKillShops()
      .then(result => {
        res.json({
          code: 200,
          msg: "成功",
          data: {
            shops: result
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          code: 201,
          msg: err,
          data: err
        });
      });
  },
  addSecKillShop(req, res) {
    secKillRepo
      .addSecKillShop(req.body.shop)
      .then(result => {
        res.json({
          code: 200,
          msg: "添加成功",
          data: {
            shop: result
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          code: 201,
          msg: err,
          data: err
        });
      });
  }
};

module.exports = SECKILL_SERVICE;
