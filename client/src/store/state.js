import User from '../models/User'
import Book from '../models/Book'
import Comment from '../models/Comment'
import SecKill from '../models/SecKill'

export default {
  user: new User(),
  book: new Book(),
  comment: new Comment(),
  secKill: new SecKill()
}
