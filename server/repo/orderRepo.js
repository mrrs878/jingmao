let Order = require("../models/Order");
let moment = require("moment");

const ORDER = {
  getOrder(oid) {
    return Order.findOne({ oid });
  },
  getOrdersByCltid(page, size, cltid) {
    if (size) {
      return Order.find({ cltid }, null, {
        skip: page * size,
        limit: parseInt(size)
      });
    }
    return Order.find({ cltid });
  },
  getOrderByBid(bid) {
    return Order.find({ bid });
  },
  addOrder(_order) {
    let order = new Order({
      ..._order,
      ctime: new moment().format("YYYY--MM--DD HH:mm::ss"),
      utime: new moment().format("YYYY--MM--DD HH:mm:ss")
    });
    return order.save();
  }
};

module.exports = ORDER;
