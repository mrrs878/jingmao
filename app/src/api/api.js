import ajax from "./ajax";

// const BASE_URL = "/api";
const BASE_URL = process.env.VUE_APP_BASE_API;
const USER_URL = `${BASE_URL}/user`;
const BOOK_URL = `${BASE_URL}/book`;
const COMMENT_URL = `${BASE_URL}/comment`;
const SECKILL_URL = `${BASE_URL}/secKill`;
const PARTITION_URL = `${BASE_URL}/partition`;

export const signup = user => ajax(`${USER_URL}/signup`, user, {}, "POST");
export const getUser = uid => ajax(`${USER_URL}/${uid}`, {}, {}, "GET");
export const signin = ({ name, pwd }) =>
  ajax(`${USER_URL}/signin`, { name, pwd }, {}, "POST");
export const boughtBooks = (page, size) =>
  ajax(`${USER_URL}/bought/${page}/${size}`, {}, {}, "GET");
export const removeBought = bid =>
  ajax(`${USER_URL}/rmvBought/${bid}`, { bid }, {}, "POST");
export const getCart = (page, size) =>
  ajax(`${USER_URL}/cart/${page}/${size}`, {}, {}, "GET");
export const buyBooks = (bids, shops, price) =>
  ajax(`${USER_URL}/buy`, { bids, shops, price }, {}, "POST");
export const addCart = bid =>
  ajax(`${USER_URL}/add/${bid}`, { bid }, {}, "POST");
export const removeCart = (bid, type = false) =>
  ajax(`${USER_URL}/rmvCart/${bid}/${type}`, {}, {}, "DELETE");
export const addComment = comment =>
  ajax(`${USER_URL}/writeComment`, { comment }, {}, "POST");
export const addAddress = address =>
  ajax(`${USER_URL}/addAddress`, { address }, {}, "POST");
export const delAddress = index =>
  ajax(`${USER_URL}/delAddress/${index}`, {}, {}, "DELETE");
export const editAddress = (index, address) =>
  ajax(`${USER_URL}/editAddress/${index}`, { index, address }, {}, "PUT");
export const editBlance = balance =>
  ajax(`${USER_URL}/editBlance`, { balance }, {}, "PUT");
export const sendCode = () => ajax(`${USER_URL}/code`, {}, {}, "GET");
export const editEmail = (id, value, oldPwd, email) =>
  ajax(`${USER_URL}/editEmail`, { id, value, oldPwd, email }, {}, "PUT");
export const editPassword = (id, value, oldPwd, newPwd) =>
  ajax(`${USER_URL}/editPassword`, { id, value, oldPwd, newPwd }, {}, "PUT");
export const fgtPwd = (id, value, name, pwd) =>
  ajax(`${USER_URL}/fgtPwd`, { id, value, name, pwd }, {}, "PUT");

export const getBooks = () => ajax(`${BOOK_URL}`, {}, {}, "GET");
export const getBook = bid => ajax(`${BOOK_URL}/${bid}`, {}, {}, "GET");
export const delBook = bid => ajax(`${BOOK_URL}/${bid}`, {}, {}, "DELETE");
export const editBook = bid => ajax(`${BOOK_URL}/${bid}`, {}, {}, "PUT");
export const addBook = book => ajax(`${BOOK_URL}`, { book }, {}, "POST");
export const getBookNameLike = name =>
  ajax(`${BOOK_URL}/like`, { name }, {}, "GET");
export const getSomeBooks = (page, size) =>
  ajax(`${BOOK_URL}/getBooks`, { page, size }, {}, "GET");
export const getPartition = (name, page, size) =>
  ajax(`${BOOK_URL}/partition/${name}/${page}/${size}`, {}, {}, "GET");

export const getComments = () => ajax(`${COMMENT_URL}`, {}, {}, "GET");
export const getCommentsByBid = (bid, page, size) =>
  ajax(`${COMMENT_URL}/bid/${bid}`, { page, size }, {}, "POST");
export const getCommentsByCid = cid =>
  ajax(`${COMMENT_URL}/cid/${cid}`, {}, {}, "GET");

export const getSecKillShops = () => ajax(`${SECKILL_URL}`, {}, {}, "GET");
export const getSecKillShop = sid =>
  ajax(`${SECKILL_URL}/${sid}`, {}, {}, "GET");

export const getPartitionInfo = type =>
  ajax(`${PARTITION_URL}/${type}`, {}, {}, "GET");
