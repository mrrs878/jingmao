<template>
  <div class="content padding-top">
    <profile-header title="我的订单"></profile-header>
    <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
      <ul slot="list" class="cart-list padding">
        <li v-for="shop in shopList" :key="shop.index">
          <img :src="shop.carousel[0]" width="30%" alt />
          <div class="shop-info">
            <p class="title">{{shop.name}}</p>
            <div class="text">{{shop.content}}</div>
            <div class="price">
              <p>￥{{shop.price}}</p>
              <p>x{{shop.count}}</p>
              <icon-svg icon-class="icondelete" @click.native="removeShop(shop.bid)"></icon-svg>
            </div>
          </div>
        </li>
      </ul>
      <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
    </yd-infinitescroll>
    <div style="height: 1rem;"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

function mergeList(src, dst) {
  src.forEach((element, index) => {
    element["selected"] = false;
    element["count"] = 1;
    if (
      !dst.find(em => {
        if (em.bid === element.bid) {
          em["count"]++;
          return true;
        } else {
          return false;
        }
      })
    ) {
      dst.push(element);
    }
  });
}

export default {
  data() {
    return {
      page: 0,
      pageSize: 6,
      shopList: [],
      showFooter: false
    };
  },
  methods: {
    loadList() {
      if (localStorage.getItem("orderAll")) {
        this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.loadedDone");
        return;
      }
      this.user.getBought({
        page: this.page,
        size: this.pageSize,
        cb: res => {
          mergeList(res.data.books, this.shopList);
          localStorage.setItem("order", JSON.stringify(this.shopList));
          this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad");
          if (res.code === 201) {
            this.$refs.infinitescrollDemo.$emit(
              "ydui.infinitescroll.loadedDone"
            );
            localStorage.setItem("orderAll", true);
            return;
          }
          this.page++;
        }
      });
    },
    removeShop(bid) {
      this.$dialog.confirm({
        mes: "是否删除该订单？",
        opts: () => {
          this.user.removeBought({
            bid,
            cb: res => {
              this.shopList.splice(
                this.shopList.findIndex(elem => elem.bid === bid),
                1
              );
              this.user.updateInfo();
              this.$dialog.toast({ mes: res.msg, timeout: 1000 });
            }
          });
        }
      });
    }
  },
  computed: {
    ...mapState(["user", "book"])
  },
  mounted() {
    this.$dialog.loading.open("加载中...");
    if (localStorage.getItem("order")) {
      this.$dialog.loading.close();
      mergeList(JSON.parse(localStorage.getItem("order")), this.shopList);
      return;
    }
    this.user.getBought({
      page: this.page,
      size: this.pageSize,
      cb: res => {
        this.$dialog.loading.close();
        console.log(res.data.books);
        mergeList(res.data.books, this.shopList);
        localStorage.setItem("order", JSON.stringify(this.shopList));
        this.page++;
        if (res.code === 201) {
          this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.loadedDone");
          localStorage.setItem("orderAll", true);
          return;
        }
        if (this.shopList.length < 6) {
          this.loadList();
        }
      }
    });
  }
};
</script>
<style lang='less' scoped>
@import "../../common/less/app.less";
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
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.32rem;
  background-color: #fff;
  .select-all {
    width: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.32rem;
    margin-left: 0.25rem;
    &.active {
      color: #fff;
      background-color: red;
    }
  }
  .total {
    margin-left: 1.5rem;
    margin-right: 0.25rem;
    span {
      color: red;
    }
  }
  button {
    border: none;
    width: 2rem;
    height: 1rem;
    background-color: red;
    font-size: 0.32rem;
    color: #fff;
  }
  &::before {
    content: "";
    display: block;
    position: absolute;
    height: 0.01rem;
    width: 100%;
    transform: translateY(-0.5rem);
    background-color: #ccc;
  }
}
</style>