import { getSecKillShops, getSecKillShop } from "../api/api";

class SecKillShop {
  constructor(data = {}) {
    this.data = data;
  }

  getShops({ cb }) {
    getSecKillShops()
      .then(result => {
        cb(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getShop({ sid, cb }) {
    getSecKillShop(sid)
      .then(result => {
        cb(result);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default SecKillShop;
