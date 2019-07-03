<template>
  <div class="content padding-top">
    <profile-header :title="$route.params.pathMatch"></profile-header>
    <div class="partition-info padding" v-show="partitionInfo.name">
      <img :src="partitionInfo.cover" alt>
      <span>{{partitionInfo.summary}}</span>
    </div>
    <keep-alive>
      <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
        <ul slot="list" class="cart-list padding">
          <li
            v-for="book in bookList"
            :key="book.index"
            @click="$router.push(`/home/detail/shop/${book.bid}`)"
          >
            <img :src="book.carousel[0]" width="30%" alt>
            <div class="shop-info">
              <p class="title">{{book.name}}</p>
              <div class="text">{{book.content}}</div>
              <div class="price">
                <p>￥{{book.price}}</p>
              </div>
            </div>
          </li>
        </ul>
        <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
      </yd-infinitescroll>
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      title_: "",
      partitionInfo: {},
      page: 0,
      size: 6,
      bookList: []
    };
  },
  methods: {
    loadList() {
      let { page, size, title_ } = this;
      this.book.getSomeBooks({
        name: title_,
        page: page,
        size: size,
        cb: res => {
          const _list = res.data.books;
          this.bookList = [...this.bookList, ..._list];

          if (res.code === 202) {
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
  beforeCreate() {
    this.$dialog.loading.open('很快加载好了...');
  },
  created() {
    let { page, size, title_ } = this;
    title_ = this.$route.params.pathMatch;
    this.partition.getPartitionInfo({
      name: title_,
      cb: res => {
        this.partitionInfo = res.data.partition;
      }
    });
    this.book.getPartition({
      name: title_,
      page,
      size,
      cb: res => {
        this.bookList = res.data.books;
        this.page++;
    this.$dialog.loading.close();
      }
    });

  },
  computed: {
    ...mapState(["partition", "book"])
  }
};
</script>
<style lang='less' scoped>
@import "../../common/less/app.less";
.partition-info {
  padding: 0.25rem;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  img {
    width: 2rem;
  }
  span {
    align-self: flex-start;
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
li {
  display: flex;
  position: relative;
  padding-bottom: 0.25rem;
  margin-top: 0.4rem;
  &::after {
    content: " ";
    display: block;
    height: 1px;
    width: 100%;
    position: absolute;
    bottom: 0;
    background-color: #ccc;
  }
  .select-icon {
    align-self: center;
  }
  .shop-info {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    .title {
      font-size: 0.32rem;
      width: 100%;
    }
    .text {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      width: 100%;
    }
    .price {
      font-size: 0.32rem;
      color: red;
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 0.5rem;
      line-height: 0.5rem;
    }
  }
}
</style>