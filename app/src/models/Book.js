import {
  getBooks,
  getSomeBooks,
  getBook,
  getCommentsByBid,
  addComment,
  getBookNameLike,
  getPartition
} from "../api/api";

class Book {
  constructor(data = {}) {
    this.data = data;
  }

  getBooks({ cb }) {
    getBooks()
      .then(result => {
        cb(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getSomeBooks({ page, size, cb }) {
    getSomeBooks(page, size)
      .then(result => {
        cb(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getBook({ bid, cb }) {
    getBook(bid)
      .then(result => {
        cb(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getComments({ bid, page, size, cb }) {
    getCommentsByBid(bid, page, size)
      .then(res => {
        cb(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  addComment({ comment, cb }) {
    addComment(comment)
      .then(res => {
        cb(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getBookNameLike({ name, cb }) {
    getBookNameLike(name)
      .then(res => {
        cb(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getPartition({ name, page, size, cb }) {
    getPartition(name, page, size)
      .then(res => {
        cb(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default Book;
