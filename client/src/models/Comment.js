import { getCommentsByBid, getComments, addComment } from '../api/api'

class Comment {
  constructor(uid = '', content = '', bid = '') {
    this.uid = uid
    this.content = content
    this.bid = bid
  }

  getComments({ cb }) {
    getComments()
      .then(result => {
        cb(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  addComment({ comment, cb }) {
    addComment(comment)
      .then(result => {
        cb(result)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export default Comment
