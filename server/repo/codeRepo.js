let Code = require("../models/Code");

const CODE = {
  addCode(_code) {
    let code = new Code({
      cid: _code.id,
      value: _code.value
    });
    return code.save();
  },
  getCode(cid) {
    return Code.findOne({ cid: cid });
  }
};

module.exports = CODE;
