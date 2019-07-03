let moment = require("moment");
let SecKillShop = require("../models/secKillShop");

const SECKILLSHOP = {
  getSecKillShops() {
    return SecKillShop.find({ name: /\\*/i });
  },
  addSecKillShop(_shop) {
    let secKillShop = new SecKillShop({
      sid: Math.random()
        .toString(36)
        .slice(2),
      name: _shop.name,
      price: _shop.price,
      killPrice: _shop.killPrice,
      cover: _shop.cover,
      ctime: new moment().format("YYYY--MM--DD HH:mm:ss"),
    });
    return secKillShop.save()
  }
};

module.exports = SECKILLSHOP;
