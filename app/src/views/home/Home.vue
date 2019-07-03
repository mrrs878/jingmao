<template>
  <div class="content">
    <header class="header padding">
      <img src="../../assets/img/jm_logo.png" width="60px;" alt>
      <span type="text" class="search" @click="$router.push('/search')">搜索</span>
      <span class="right" @click="$router.push(user.isLogin() ? '/profile' : '/profile/login')">
        <icon-svg v-if="user.isLogin()" icon-class="iconprofile_light"></icon-svg>
        <span style="color: #000;" v-else>登录</span>
      </span>
    </header>
    <div class="item padding">
      <img src="../../assets/img/tslc-bt.jpg" alt width="100%">
      <div class="container">
        <div @click="$router.push('/partition/css')">
          <span class="title">CSS(3)</span>
          <p class="favorable">每满100减40</p>
          <img src="../../assets/img/css3.jpg" width="100%" alt srcset>
        </div>
        <div @click="$router.push('/partition/html')" class="left-right">
          <span class="title">HTML(5)</span>
          <p class="favorable">买3送1</p>
          <img src="../../assets/img/html5.jpg" width="100%" alt srcset>
        </div>
        <div @click="$router.push('/partition/js')">
          <span class="title">javascript</span>
          <p class="favorable">每满100减40</p>
          <img src="../../assets/img/javascript.jpg" width="70%" alt srcset>
        </div>
        <div class="top-bottom" @click="$router.push('/partition/platform')">
          <span class="title">Vue.js/React</span>
          <p class="favorable">每满100减40</p>
          <img src="../../assets/img/react_vue.jpg" width="100%" alt srcset>
        </div>
        <div class="top-bottom left-right" @click="$router.push('/partition/jQuery')">
          <span class="title">jQuery</span>
          <p class="favorable">每满100减40</p>
          <img src="../../assets/img/jquery.jpg" width="100%" alt srcset>
        </div>
        <div class="top-bottom" @click="$router.push('/partition/nodejs')">
          <span class="title">Node.js</span>
          <p class="favorable">每满79减30</p>
          <img src="../../assets/img/node.jpg" width="100%" alt srcset>
        </div>
        <div @click="$router.push('/partition/flutter')">
          <span class="title">flutter</span>
          <p class="favorable">每满100减40</p>
          <img src="../../assets/img/flutter.jpg" width="100%" alt srcset>
        </div>
        <div class="left-right" @click="$router.push('/partition/nosql')">
          <span class="title">NoSQL</span>
          <p class="favorable">每满100减40</p>
          <img src="../../assets/img/nosql.jpg" width="100%" alt srcset>
        </div>
        <div @click="$router.push('/partition/go')">
          <span class="title">Go</span>
          <p class="favorable">每满100减40</p>
          <img src="../../assets/img/go.png" width="100%" alt srcset>
        </div>
      </div>
    </div>
    <div class="sec-kill padding">
      <img src="../../assets/img/mao_title.jpg" width="100%" alt>
      <div class="kill-wrap" ref="killWrap">
        <ul class="kill-list" ref="killTab">
          <li class="kill-item" v-for="shop in secKillShops" :key="shop.index">
            <img :src="shop.cover" width="100%" alt>
            <p class="name">{{shop.name}}</p>
            <p class="price">￥ {{shop.killPrice}}</p>
            <P class="no-price">￥ {{shop.price}}</P>
          </li>
        </ul>
      </div>
    </div>
    <div class="recommend">
      <img src="../../assets/img/mao_title -1.jpg" width="100%" alt>
      <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
        <yd-list
          theme="1"
          slot="list"
          style="display: flex; justify-content: space-around; flex-wrap: wrap;"
        >
          <yd-list-item
            v-for="item in bookList"
            :key="item.index"
            style="margin-top: 0.2rem; width: 48%;"
            @click.native="$router.push(`/home/detail/shop/${item.bid}`)"
          >
            <img slot="img" :src="item.carousel[0]">
            <span slot="title">{{item.name}}</span>
            <yd-list-other slot="other">
              <div>
                <span class="list-price" style="color: red; font-size: 0.32rem;">
                  <p
                    style="font-size: 0.24rem; border: 1px solid red; margin: 0.1rem; border-radius: 5px; padding:1px;"
                  >京猫自营</p>
                  <em>¥</em>
                  {{item.price}}
                </span>
              </div>
            </yd-list-other>
          </yd-list-item>
        </yd-list>
        <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
      </yd-infinitescroll>
    </div>
    <yd-backtop></yd-backtop>
    <div style="height: 2rem;"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      page: 0,
      pageSize: 6,
      bookList: [],
      secKillShops: []
    };
  },
  methods: {
    personScroll() {
      let width = 10 * 2;
      this.$refs.killTab.style.width = width + "rem";
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.killWrap, {
            startX: 0,
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    loadList() {
      this.book.getSomeBooks({
        page: this.page,
        size: this.pageSize,
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
  computed: {
    ...mapState(["user", "book", "secKill"])
  },
  created() {
    this.$nextTick(() => {
      this.personScroll();
    });
  },
  mounted() {
    this.book.getSomeBooks({
      page: this.page,
      size: this.pageSize,
      cb: res => {
        this.bookList = res.data.books;
        this.page++;
      }
    });

    this.secKill.getShops({
      cb: res => {
        this.secKillShops = res.data.shops;
        this.secKillShops.push({
          name: "点击查看更多",
          cover: "http://img60.ddimg.cn/upload_img/00610/new_index/more.png",
          price: "?",
          killPrice: "?"
        });
      }
    });
  }
};
</script>
<style lang='less' scoped>
@import "../../common/less/app.less";
.content {
  padding-top: 0;
  .header {
    display: flex;
    justify-content: space-between;
    height: 0.8rem;
    font-size: 16px;
    line-height: 0.8rem;
    .search {
      border: none;
      border-bottom: 1px solid #ccc;
      text-align: center;
      width: 60%;
      background: url("../../assets/img/search.png") no-repeat top center;
      background-size: 0.4rem 0.4rem;
      background-position: 1rem 0.2rem;
    }
  }
  .item {
    .container {
      display: grid;
      // grid-gap: 10px;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 3.5rem 3.5rem 3.5rem;
      text-align: center;
      margin-bottom: 0.5rem;
      div {
        padding-top: 0.2rem;
      }
      .top-bottom {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
      }
      .left-right {
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
      }
      .title {
        font-size: 16px;
        color: #666;
        margin-top: 0.2rem;
      }
      .favorable {
        color: red;
      }
    }
  }
  .kill-wrap {
    overflow: hidden;
    margin-bottom: 0.5rem;
    .kill-list {
      .kill-item {
        display: inline-block;
        width: 2rem;
        margin-right: 10px;
        .name {
          font-size: 0.2rem;
          margin-top: 0.4rem;
          color: #323232;
          line-height: 0.4rem;
          height: 0.8rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .price {
          color: red;
          font-size: 0.4rem;
          font-weight: 700;
        }
        .no-price {
          text-decoration: line-through;
          color: #ccc;
        }
      }
    }
  }
  .recommend {
    background-color: #eff4fa;
    h2 {
      text-align: center;
      color: #666;
      font-size: 0.32rem;
    }
  }
}
</style>