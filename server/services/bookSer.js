let bookRepo = require("../repo/bookRepo");

const BOOK_SERVICE = {
  getBooks(req, res) {
    bookRepo
      .getBooks(req.query.page, req.query.size)
      .then(books => {
        if (books.length === 0 || books.length < req.body.size) {
          res.json({
            code: 202,
            msg: "获取完毕",
            data: { books }
          });
          return;
        }
        res.json({
          code: 200,
          msg: "获取成功",
          data: { books }
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          code: 201,
          msg: err,
          data: err
        });
      });
  },
  getBook(req, res) {
    bookRepo
      .getBookById(req.url.substring(1))
      .then(result => {
        res.json({
          code: 200,
          data: {
            book: result
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          code: 201,
          msg: err,
          data: err
        });
      });
  },
  getBookNameLike(req, res) {
    bookRepo
      .getBookNameLike(req.query.name)
      .then(books => {
        res.json({
          code: 200,
          msg: "查询成功",
          data: {
            books
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          code: 201,
          msg: "网络错误，待会重试",
          data: { err }
        });
      });
  },
  deleteBook(req, res) {
    bookRepo
      .delBook(req.url.substring(1))
      .then(result => {
        res.json({
          code: 200,
          data: {
            book: result
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          code: 201,
          msg: err,
          data: err
        });
      });
  },
  addBook(req, res) {
    bookRepo
      .addBook(req.body.book)
      .then(result => {
        res.json({
          code: 200,
          msg: "添加成功",
          data: result
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          code: 201,
          msg: err,
          data: err
        });
      });
  },
  getPartition(req, res) {
    bookRepo
      .getPartition(req.params.name)
      .then(books => {
        if (books.length === 0 || books.length < req.params.size) {
          res.json({
            code: 202,
            msg: "获取完毕",
            data: { books }
          });
          return;
        }
        res.json({
          code: 200,
          msg: "获取成功",
          data: { books }
        });
      })
      .catch(err => {
        res.json({
          code: 201,
          msg: "网络错误，稍后重试",
          data: { err }
        });
      });
  }
};

module.exports = BOOK_SERVICE;
