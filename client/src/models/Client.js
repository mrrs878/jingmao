import { signin, signup, getUser } from '../api/api'
import store from '../store/store'

class User {
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

  getUser({ cid, cb }) {
    getUser(cid)
      .then(result => {
        cb(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  updateInfo() {
    this.getUser(store.state.client.data.cid)
      .then(res => {
        store.dispatch('updateClient', res.data.data.client)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export default User
