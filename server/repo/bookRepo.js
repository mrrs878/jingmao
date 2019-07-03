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
  getBookById(bid) {
    return Book.findOne({ bid: bid });
  },
  getBookNameLike(name) {
    return Book.find({ name: {$regex: eval(`/${name}/i`)} })
  },
  editBook(bid) {},
  delBook(bid) {
    return Book.deleteOne({ bid: bid });
  },
  addBook(_book) {
    console.log(_book);
    let book = new Book({
      bid: Math.random()
        .toString(36)
        .slice(2),
      price: _book.price,
      rate: _book.rate,
      cid: new Array(),
      author: _book.author,
      name: _book.name,
      content: _book.content,
      publisher: _book.publisher,
      ctime: new moment().format("YYYY--MM--DD HH:mm:ss"),
      carousel: _book._carousel
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
