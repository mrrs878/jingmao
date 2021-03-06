import { getBooks, getBook, delBook, addBook, getCommentsByBid } from '../api/api'

class Book {
  constructor(_data = {}) {
    this.data = _data
  }

  getBooks({ page, size, cb }) {
    getBooks(page, size)
      .then(result => {
        cb(result.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  getBook({ bid, cb }) {
    let book = {}
    getBook(bid)
      .then(result => {
        book = result
        return getCommentsByBid(bid)
      })
      .then(result => {
        book.data.data.book['comments'] = result.data.data.comments
        cb(book)
      })
      .catch(err => {
        console.log(err)
      })
  }

  delBook({ bid, cb }) {
    delBook(bid)
      .then(result => {
        cb(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  addBook({ book, cb }) {
    addBook(book)
      .then(result => {
        cb(result)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export default Book
