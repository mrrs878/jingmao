<template>
  <div class="content">
    <yd-slider autoplay="3000">
      <yd-slider-item v-for="item in bookData.carousel" :key="item.index">
        <img :src="item" width="100%">
      </yd-slider-item>
    </yd-slider>
    <div class="book-name jingmao padding">{{bookData.name}}</div>
    <div class="book-content padding">{{bookData.content}}</div>
    <div class="book-price padding">
      <p>￥{{bookData.price}}</p>
      <p class="kill-price">￥{{bookData.price}}</p>
    </div>
    <div class="book-rate padding" name="comment">
      <yd-rate :readonly="true" v-model="bookData.rate" :show-text="tipText"></yd-rate>
      <span class="no-rate" v-if="!bookData.rate">暂无评分</span>
      <span class="cmt" @click="openComment">我要写评论</span>
    </div>
    <div class="book-comments padding">
      <p class="comment-title">评论</p>
      <yd-infinitescroll
        v-if="commentList.length"
        :callback="loadComments"
        ref="infinitescrollDemo"
      >
        <ul slot="list">
          <li v-for="comment in commentList" :key="comment.index">
            <div class="user-info">
              <img :src="comment.uavatar">
              <span>{{comment.uname}}</span>
              <yd-rate :readonly="true" v-model="comment.rate" :show-text="tipText"></yd-rate>
            </div>
            <span class="content">{{comment.content}}</span>
          </li>
        </ul>
        <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
      </yd-infinitescroll>
      <p class="no-comment" v-else>暂无评论</p>
    </div>
    <yd-popup v-model="showWriteComment" position="center" width="90%">
      <div class="write-comment">
        <yd-cell-group title="评论">
          <textarea name id v-model="content" cols="30" rows="5" placeholder="留下您的评论"></textarea>
          <yd-rate v-model="rate" :show-text="tipText"></yd-rate>
        </yd-cell-group>
        <p style="text-align: center;">
          <yd-button @click.native="writeComment" style="border-radius: 5px;">提交评论/关闭</yd-button>
        </p>
      </div>
    </yd-popup>
    <div style="height: 2rem;"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      bid: "",
      page: 0,
      pageSize: 6,
      bookData: {},
      tipText: [
        '<span style="color:red;">$</span>',
        '<span style="color:red;">$</span>',
        '<span style="color:red;">$</span>',
        '<span style="color:red;">$</span>',
        '<span style="color:red;">$</span>'
      ],
      content: "",
      rate: 0,
      commentList: [],
      showWriteComment: false
    };
  },
  methods: {
    openComment() {
      if (!this.user.isLogin()) {
        this.$dialog.toast({
          mes: "请先登录!",
          timeout: 1500
        });
        return;
      }
      this.showWriteComment = true;
    },
    writeComment() {
      let { bookData, content, rate } = this;
      this.book.addComment({
        comment: {
          bid: bookData.bid,
          content,
          rate
        },
        cb: res => {
          this.commentList.push({ uavatar: this.user.data.avatar, uname: this.user.data.name, rate, content })
          this.user.updateInfo()
        }
      });
      this.showWriteComment = false;
    },
    loadComments() {
      this.book.getComments({
        bid: this.bid,
        page: this.page,
        size: this.pageSize,
        cb: res => {
          const _list = Object.freeze(res.data.comments);
          this.commentList = [...this.commentList, ..._list];

          if (_list.length < this.pageSize || this.page == 3) {
            this.$refs.infinitescrollDemo.$emit(
              "ydui.infinitescroll.loadedDone"
            );
            return;
          }
          this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad");

          this.page++;
        }
      });
    }
  },
  mounted() {
    let fullPath = this.$router.currentRoute.fullPath;
    this.bid = fullPath.substring(fullPath.lastIndexOf("/") + 1);
    this.book.getBook({
      bid: this.bid,
      cb: res => {
        this.bookData = res.data.book;
      }
    });
    let { bid, page, size } = this;
    this.book.getComments({
      bid,
      page,
      size,
      cb: res => {
        this.commentList = Object.freeze(res.data.comments);
      }
    });
  },
  computed: {
    ...mapState(["book", "user"])
  }
};
</script>
<style lang='less' scoped>
@import "../../common/less/app.less";
.book-name {
  border-top: 1px solid #ccc;
  padding-top: 0.2rem;
  font-size: 0.28rem;
  &.jingmao {
    background-position: 0 0.2rem;
  }
}
.book-content {
  font-size: 0.24rem;
  color: #666;
}
.book-price {
  margin-top: 0.5rem;
  color: red;
  font-size: 0.4rem;
  .kill-price {
    font-size: 0.24rem;
    color: #ccc;
    text-decoration: line-through;
  }
}
.book-rate {
  margin-top: 0.4rem;
  height: 1rem;
  border-top: 1px solid red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .no-rate {
    color: red;
    margin-right: 1rem;
  }
  .cmt {
    color: red;
    border: 1px solid red;
    border-radius: 5px;
    padding: 0.1rem;
  }
}
.write-comment {
  background-color: #fff;
  border-radius: 5px;
  padding: 0.2rem;
  textarea {
    padding: 0.2rem;
    width: 100%;
    border: none;
    font-size: 0.32rem;
  }
}
.book-comments {
  .comment-title {
    text-align: center;
    font-size: 0.32rem;
    margin-top: 0.4rem;
  }
  li {
    .no-comment {
      text-align: center;
      margin-top: 0.4rem;
      font-size: 0.32rem;
      color: red;
    }
    .user-info {
      margin-top: 0.4rem;
      margin-bottom: 0.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        margin-right: 1.5rem;
      }
      img {
        width: 1rem;
        border-radius: 50%;
        margin-right: 0.2rem;
        margin-top: 0 !important;
      }
    }
    .content {
      font-size: 0.26rem;
    }
    &::after {
      content: " ";
      display: block;
      border-bottom: 1px solid #ccc;
      transform: scaleY(0.5);
      padding-bottom: 0.5rem;
    }
  }
  .no-comment {
    font-size: 0.32rem;
    color: red;
    text-align: center;
    margin-top: 0.4rem;
  }
}
</style>
