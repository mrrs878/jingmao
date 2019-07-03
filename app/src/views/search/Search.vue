<template>
  <div class="content">
    <yd-navbar title="搜索">
      <span @click="$router.back()" slot="left">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </span>
    </yd-navbar>
    <yd-search v-model="keyWord" :on-submit="submitHandler" style="font-size: 0.32rem;"></yd-search>
    <ul class="result padding">
      <li v-for="book in books" :key="book.index" @click="$router.push(`/home/detail/shop/${book.bid}`)">
        <span>{{book.name}}</span>
        <icon-svg icon-class="iconright"></icon-svg>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      keyWord: "",
      books: []
    };
  },
  methods: {
    submitHandler() {
      this.book.getBookNameLike({
        name: this.keyWord,
        cb: res => {
          this.books = res.data.books;
        }
      });
    }
  },
  computed: {
    ...mapState(["book"])
  }
};
</script>
<style lang='less' scoped>
@import "../../common/less/app.less";
.content {
  padding-top: 0;
  .result {
    li {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1rem;
      font-size: 0.32rem;
      position: relative;
      span {
        width: 100%;
        line-height: 1rem;
        height: 1rem;
      }
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        height: 1px;
        width: 100%;
        background: #ccc;
      }
    }
  }
}
</style>