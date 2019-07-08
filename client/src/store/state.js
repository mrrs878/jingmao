import Client from '../models/Client'
import Book from '../models/Book'
import Comment from '../models/Comment'
import SecKill from '../models/SecKill'

export default {
  client: new Client(),
  book: new Book(),
  comment: new Comment(),
  secKill: new SecKill()
}
