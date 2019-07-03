<template>
  <div class="container">
    <side-menu></side-menu>
    <div class="book-cover">
      <img :src="bookInfo.cover" alt>
    </div>
    <div class="book-info">
      <p>书籍名称: {{bookInfo.name}}</p>
      <p>书籍作者: {{bookInfo.author}}</p>
      <p>书籍出版社：{{bookInfo.publisher}}</p>
      <p>书籍价格：{{bookInfo.price}}</p>
      <p>书籍添加时间：{{bookInfo.ctime}}</p>
    </div>
    <div class="book-comments">
      <p>评论</p>
      <br>
      <ul>
        <li v-for="item in bookInfo.comments" :key="item.index">
          <div class="comment">
            <div class="user-info">
              <a :href="item.uid"><img :src="item.uavatar" alt></a>
              <span class="uname">{{item.uname}}</span>
            </div>
            <p class="content">{{item.content}}</p>
            <span class="time">{{item.ctime}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      bookInfo: {},
    }
  },
  computed: {
    ...mapState(['book', 'user']),
  },
  beforeMount() {
    let currentPath = this.$router.currentRoute.fullPath
    let bid = currentPath.substring(currentPath.lastIndexOf('/') + 1)
    this.book.getBook({
      bid,
      cb: result => {
        this.bookInfo = result.data.data.book
      },
    })
  },
}
</script>
<style lang='less' scoped>
@import '../../assets/less/app.less';
.container {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  .book-cover {
    width: 20%;
    height: 300px;
    img {
      height: 300px;
      vertical-align: middle;
    }
  }
  .book-info {
    width: 40%;
    height: 300px;
    p {
      margin: 10px 0 20px;
    }
  }
  .book-comments {
    width: 50%;
    height: 300px;
    overflow: auto;
    margin-top: 10px;
    .comment {
      img {
        height: 30px;
      }
      .user-info {
        height: 30px;
        line-height: 30px;
        display: flex;
      }
      .content {
        display: block;
        width: 80%;
        height: 30px;
        line-height: 30px;
        padding-left: 10%;
      }
      .time {
        text-align: right;
        display: inline-block;
        width: 80%;
      }
    }
  }
}
</style>