import { UPDATE_USER, UPDATE_BOOK, UPDATE_COMMENT } from './mutation-types'

export default {
  [UPDATE_USER](state, user) {
    state.user.data = user
  },
  [UPDATE_BOOK](state, book) {
    state.book = book
  },
  [UPDATE_COMMENT](state, comment) {
    state.comment = comment
  }
}
