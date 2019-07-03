import { UPDATE_USER, UPDATE_BOOK, UPDATE_COMMENT } from './mutation-types'
import User from '../models/User'

export default {
  updateUser({ commit }, _user) {
    let user = new User(
      _user.uid,
      _user.name,
      _user.cid,
      _user.bid,
      _user.balance,
      _user.avatar,
      _user.ctime,
      _user.utime
    )
    commit(UPDATE_USER, user)
  },
  updateBook({ commit }, book) {
    commit(UPDATE_BOOK, book)
  },
  updateComment({ commit }, comment) {
    commit(UPDATE_COMMENT, comment)
  }
}
