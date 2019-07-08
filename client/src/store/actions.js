import { UPDATE_CLIENT, UPDATE_BOOK, UPDATE_COMMENT } from './mutation-types'

export default {
  updateClient({ commit }, client) {
    commit(UPDATE_CLIENT, client)
  },
  updateBook({ commit }, book) {
    commit(UPDATE_BOOK, book)
  },
  updateComment({ commit }, comment) {
    commit(UPDATE_COMMENT, comment)
  }
}
