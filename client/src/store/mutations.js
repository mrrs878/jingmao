import { UPDATE_CLIENT, UPDATE_BOOK, UPDATE_COMMENT } from './mutation-types'

export default {
  [UPDATE_CLIENT](state, client) {
    state.client.data = client
  },
  [UPDATE_BOOK](state, book) {
    state.book = book
  },
  [UPDATE_COMMENT](state, comment) {
    state.comment = comment
  }
}
