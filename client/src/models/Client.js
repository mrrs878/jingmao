import { signin, signup, getClient, getOrders } from '../api/api'
import store from '../store/store'

class Client {
  constructor(data = {}) {
    this.data = data
  }

  signin({ name, pwd, cb }) {
    signin({ name, pwd })
      .then(result => {
        let data = result.data.data
        localStorage.setItem('token', data.token)
        if (data.token) {
          store.dispatch('updateClient', data.client)
          setInterval(() => {
            this.getClient({
              cid: data.client.cid,
              cb: res => {
                store.dispatch('updateClient', res.data.data.client)
              }
            })
          }, 60000)
        }
        cb(data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  signup({ user, cb }) {
    signup(user)
      .then(result => {
        cb(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  getClient({ cid, cb }) {
    getClient(cid)
      .then(result => {
        cb(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  updateInfo() {
    getClient(store.state.client.data.cid)
      .then(res => {
        store.dispatch('updateClient', res.data.data.client)
      })
      .catch(err => {
        console.log(err)
      })
  }

  getOrders({ page, size, cb }) {
    getOrders(page, size)
      .then(res => {
        cb(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export default Client
