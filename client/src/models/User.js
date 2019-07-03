import { signin, signup, getUser } from '../api/api'
import store from '../store/store'

class User {
  constructor(
    uid = '',
    name = '',
    cid = [],
    bid = [],
    balance = '',
    avatar = '',
    ctime = '',
    utime = ''
  ) {
    this.uid = uid
    this.name = name
    this.cid = cid
    this.bid = bid
    this.balance = balance
    this.avatar = avatar
    this.ctime = ctime
    this.utime = utime
  }

  signin({ name, pwd, cb }) {
    signin({ name, pwd })
      .then(result => {
        let data = result.data.data
        localStorage.setItem('token', data.token)
        if (data.token) {
          store.dispatch('updateUser', data.user.user)
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

  getUser({ uid, cb }) {
    getUser(uid)
      .then(result => {
        cb(result)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export default User
