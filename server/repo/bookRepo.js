let moment = require("moment");
let Book = require("../models/Book");

const BOOK = {
  getBooks(page, size) {
    if (size) {
      return Book.find({ bid: /\\*/i }, null, {
        skip: page * size,
        limit: parseInt(size)
      });
    }
    return Book.find({ bid: /\\*/i });
  },
  getBooksByCltid(cltid, page, size) {
    if (size) {
      return Book.find({ cltid }, null, {
        skip: page * size,
        limit: parseInt(size)
      });
    }
    return Book.find({cltid})
  },
  getBookById(bid) {
    return Book.findOne({ bid });
  },
  getBookNameLike(name) {
    return Book.find({ name: {$regex: eval(`/${name}/i`)} })
  },
  updateBook(book) {
    let _book = new Book(book)
    _book.utime = new moment().format("YYYY--MM--DD HH:mm:ss")
    return _book.save()
  },
  delBook(bid) {
    return Book.deleteOne({ bid: bid });
  },
  addBook(_book) {
    let book = new Book({
      cid: new Array(),
      ctime: new moment().format("YYYY--MM--DD HH:mm:ss"),
      ..._book
    });
    return book.save();
  },
  getPartition(name, page, size) {
    return Book.find({ partition: name }, null, {
      skip: page * size,
      limit: parseInt(size)
    });
  }
};

module.exports = BOOK;
