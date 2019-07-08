let express = require("express");
let router = express.Router();

let bookServeice = require("../services/bookSer");

let jwtClient = require("../middleware/jwtClient");

router.get("/", (req, res) => {
  bookServeice.getBooks(req, res);
});

router.get('/like', (req, res) => {
  bookServeice.getBookNameLike(req ,res)
})

router.post("/", jwtClient, (req, res) => {
  bookServeice.addBook(req, res);
});

router.get("/getBooks", (req, res) => {
  bookServeice.getBooks(req, res);
});

router.get("/getBooksByCltid/:page/:size", jwtClient, (req, res) => {
  bookServeice.getBooksByCltid(req ,res)
});

router.put("/*", (req, res) => {
  bookServeice.editBook(req, res);
});

router.delete("/*", (req, res) => {
  bookServeice.deleteBook(req, res);
});

router.get("/partition/:name/:page/:size", (req, res) => {
  bookServeice.getPartition(req, res)
})

router.get("/*", (req, res) => {
  bookServeice.getBook(req, res);
});

module.exports = router;
