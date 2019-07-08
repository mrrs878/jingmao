let Client = require("../models/Client");
let moment = require("moment");

const CLIENT = {
  getClient(cid) {
    return Client.findOne({ cid });
  },
  getClientByName(name) {
    return Client.findOne({ name })
  },
  addClient(client) {
    let _client = new Client({
      ...client,
      avatar: "",
      cid: Math.random()
        .toString(36)
        .slice(2),
      ctime: new moment().format("YYYY--MM--DD HH:mm:ss"),
      utime: new moment().format("YYYY--MM--DD HH:mm:ss")
    });
    return _client.save();
  },
  updateInfo(client) {
    let _client = new Client(client);
    _client.utime = new moment().format("YYYY-MM--DD HH:mm:ss");
    return _client.save();
  }
};

module.exports = CLIENT;
