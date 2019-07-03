import ajax from './ajax'

const BASE_URL = '/api'
const USER_URL = `${BASE_URL}/user`
const BOOK_URL = `${BASE_URL}/book`
const COMMENT_URL = `${BASE_URL}/comment`
const SECKILL_URL = `${BASE_URL}/secKill`

export const signin = ({ name, pwd }) => ajax(`${USER_URL}/signin`, { name, pwd }, {}, 'POST')
export const signup = user => ajax(`${USER_URL}/signup`, user, {}, 'POST')
export const getUser = uid => ajax(`${USER_URL}/${uid}`, {}, {}, 'GET')

export const getBooks = () => ajax(`${BOOK_URL}`, {}, {}, 'GET')
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
