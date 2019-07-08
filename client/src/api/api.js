import ajax from './ajax'

const BASE_URL = '/api'
const CLIENT_URL = `${BASE_URL}/client`
const BOOK_URL = `${BASE_URL}/book`
const COMMENT_URL = `${BASE_URL}/comment`
const SECKILL_URL = `${BASE_URL}/secKill`
const ORDER_URL = `${BASE_URL}/order`

export const signin = ({ name, pwd }) => ajax(`${CLIENT_URL}/signin`, { name, pwd }, {}, 'POST')
export const signup = client => ajax(`${CLIENT_URL}/signup`, { client }, {}, 'POST')
export const getClient = cid => ajax(`${CLIENT_URL}/${cid}`, {}, {}, 'GET')

export const getBooks = (page, size) =>
  ajax(`${BOOK_URL}/getBooksByCltid/${page}/${size}`, {}, {}, 'GET')
export const getBook = bid => ajax(`${BOOK_URL}/${bid}`, {}, {}, 'GET')
export const delBook = bid => ajax(`${BOOK_URL}/${bid}`, {}, {}, 'DELETE')
export const editBook = bid => ajax(`${BOOK_URL}/${bid}`, {}, {}, 'PUT')
export const addBook = book => ajax(`${BOOK_URL}`, { book }, {}, 'POST')

export const getComments = () => ajax(`${COMMENT_URL}`, {}, {}, 'GET')
export const getCommentsByBid = bid => ajax(`${COMMENT_URL}/bid/${bid}`, {}, {}, 'GET')
export const getCommentsByCid = cid => ajax(`${COMMENT_URL}/cid/${cid}`, {}, {}, 'GET')
export const addComment = comment => ajax(`${COMMENT_URL}`, comment, {}, 'POST')

export const getSecKillShops = () => ajax(`${SECKILL_URL}`, {}, {}, 'GET')
export const getSecKillShop = sid => ajax(`${SECKILL_URL}/${sid}`, {}, {}, 'GET')
export const addSecKillShop = shop => ajax(`${SECKILL_URL}`, { shop }, {}, 'POST')
export const delSecKillShop = sid => ajax(`${SECKILL_URL}/${sid}`, { sid }, {}, 'DELETE')
export const editSecKillShop = shop => ajax(`${SECKILL_URL}`, { shop }, {}, 'PUT')

export const getOrders = (page, size) =>
  ajax(`${ORDER_URL}/getOrdersByCltid/${page}/${size}`, {}, {}, 'GET')
