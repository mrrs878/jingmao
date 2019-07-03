import Book from '../views/book/Book.vue'
import AddBook from '../views/book/AddBook.vue'
import DetailBook from '../views/book/Detail.vue'
import EditBook from '../views/book/EditBook.vue'

export default [
  {
    path: '/book',
    name: 'book',
    component: Book
  },
  {
    path: '/book/add',
    name: 'addBook',
    component: AddBook
  },
  {
    path: '/book/detail/*',
    name: 'detailBook',
    component: DetailBook
  },
  {
    path: '/book/edit',
    name: 'editBook',
    component: EditBook
  }
]
