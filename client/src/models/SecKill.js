import {
  getSecKillShops,
  getSecKillShop,
  addSecKillShop,
  delSecKillShop,
  editSecKillShop
} from '../api/api'

class SecKillShop {
  constructor(data = {}) {
    this.data = data
  }

  getShops({ cb }) {
    getSecKillShops()
      .then(result => {
        cb(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  getShop({ sid, cb }) {
    getSecKillShop(sid)
      .then(result => {
        cb(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  addShop({ shop, cb }) {
    addSecKillShop(shop)
      .then(result => {
        cb(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  delShop({ sid, cb }) {
    delSecKillShop(sid)
      .then(result => {
        cb(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  editShop({ shop, cb }) {
    editSecKillShop(shop)
      .then(result => {
        cb(result)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export default SecKillShop
