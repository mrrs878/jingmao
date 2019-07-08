let mongoose = require('mongoose')

let bookSchema = mongoose.Schema({
  bid: String,
  price: Number,
  rate: Number,
  cid: [],
  name: String,
  author: String,
  content: String,
  publisher: String,
  ctime: String,
  carousel: [],
  cltid: [],
  partition: String
})

let Book = mongoose.model('Book', bookSchema)

module.exports = Book