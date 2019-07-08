<template>
  <div class="content">
    <profile-header title="购物车"></profile-header>
    <keep-alive>
      <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" style="padding-top: 1rem;">
        <ul slot="list" class="cart-list padding">
          <li v-for="shop in shopList" :key="shop.index">
            <icon-svg
              class="select-icon"
              :icon-class="(shop.selected || all) ? 'iconselect' : 'iconcircle'"
              @click.native="toggleSelect(shop)"
            />
            <img
              :src="shop.carousel[0]"
              width="30%"
              @click="$router.push(`/home/detail/shop/${shop.bid}`)"
              alt
            />
            <div class="shop-info">
              <p class="title">{{shop.name}}</p>
              <div class="text">{{shop.content}}</div>
              <div class="price">
                <p>￥{{shop.price}}</p>
                <icon-svg
                  style="margin-left: 0.5rem;"
                  icon-class="iconround-minus"
                  @click.native="decCount(shop)"
                ></icon-svg>
                <p>x{{shop.count}}</p>
                <icon-svg
                  style="margin-right: 0.5rem;"
                  icon-class="iconroundadd"
                  @click.native="incCount(shop)"
                ></icon-svg>
                <icon-svg icon-class="icondelete" @click.native="removeShop(shop.bid)"></icon-svg>
              </div>
            </div>
          </li>
        </ul>
        <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
      </yd-infinitescroll>
    </keep-alive>
    <div style="height: 1rem;"></div>
    <div class="footer">
      <div class="select-all">
        <icon-svg :icon-class="all ? 'iconselect' : 'iconcircle'"></icon-svg>
        <span @click="toggleAll">全选</span>
      </div>
      <span class="total">
        合计
        <span>￥{{selectPrice}}</span>
      </span>
      <button @click="settlement">结算({{selectBids.length}})</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

function roundNum(val, n) {
  return Math.round(val * Math.pow(10, n)) / Math.pow(10, n);
}

function mergeList(src, dst) {
  let listItemCount = 0;
  src.forEach((element, index) => {
    element["selected"] = false;
    element["count"] =  element["count"] || 1;
    if (
      !dst.find(em => {
        if (em.bid === element.bid) {
          em["count"] += element["count"];
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

function rmvSelect(src, param) {
  let index = src.findIndex(em => em.bid === param);
  src.splice(index, 1);
}

export default {
  data() {
    return {
      all: false,
      page: 0,
      pageSize: 6,
      shopList: [],
      showEditShop: false,
      showFooter: false,
      selectPrice: 0,
      selectBids: [],
      selectShops: [],
      showTotalPrice: ""
    };
  },
  methods: {
    loadList() {
      if (localStorage.getItem("cartAll")) {
        this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.loadedDone");
        return;
      }
      this.user.getCart({
        page: this.page,
        size: this.pageSize,
        cb: res => {
          if (this.all) {
            res.data.cart.forEach(element => {
              this.selectPrice += element.price;
              this.selectPrice = roundNum(this.selectPrice, 2);
              this.selectBids.push(element.bid);
              this.selectShops.push(element);
            });
          }
          mergeList(res.data.cart, this.shopList);
          localStorage.setItem("cart", JSON.stringify(this.shopList));
          this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad");
          if (res.code === 201) {
            this.$refs.infinitescrollDemo.$emit(
              "ydui.infinitescroll.loadedDone"
            );
            localStorage.setItem("cartAll", true)
            return;
          }
          this.page++;
        }
      });
    },
    editCart() {},
    removeShop(bid) {
      this.$dialog.confirm({
        mes: "是否删除该书籍？",
        opts: () => {
          rmvSelect(this.shopList, bid);
          let _cart = JSON.parse(localStorage.getItem("cart"));
          rmvSelect(_cart, bid);
          localStorage.setItem("cart", JSON.stringify(_cart));
          this.user.removeCart({
            bid,
            cb: res => {
              console.log(res);
              this.$dialog.toast({ mes: res.msg, timeout: 1000 });
              this.user.updateInfo();
            }
          });
        }
      });
    },
    settlement() {
      if (this.selectPrice === 0) {
        this.$dialog.toast({ mes: "未选择任何商品！", timeout: 1000 });
        return;
      }
      if (this.user.data.balance < this.selectPrice) {
        this.$dialog.toast({ mes: "账户余额不足", timeout: 1000 });
        return;
      }
      this.user.buyBooks({
        bids: this.selectBids,
        shops: this.selectShops,
        price: this.selectPrice,
        cb: res => {
          let _order = [...this.selectShops]
          if(localStorage.getItem("order")) {
            _order = _order.concat(JSON.parse(localStorage.getItem("order")))
          }
          localStorage.setItem("order", JSON.stringify(_order));
          this.$dialog.toast({ mes: "购买成功", timeout: 1000 });
          this.user.updateInfo();
          this.$router.push("/profile/order");
        }
      });
    },
    toggleAll() {
      if (!this.all && this.selectBids.length >= this.shopList) {
        this.all = true;
        return;
      }
      this.selectPrice = 0;
      this.selectCount = 0;
      this.selectBids = [];
      if (!this.all) {
        this.shopList.forEach(element => {
          this.selectPrice += element.price * element.count;
          this.selectPrice = roundNum(this.selectPrice, 2);
          this.selectCount += element.count;
          for (let index = 0; index < element.count; ++index) {
            this.selectBids.push(element.bid);
            this.selectShops.push(element)
          }
        });
      } else {
        this.shopList.forEach(element => {
          element.selected = false;
        });
      }
      this.all = !this.all;
    },
    toggleSelect(shop) {
      if (this.all) {
        return;
      }
      if (!shop.selected) {
        this.selectPrice += shop.price * shop.count;
        this.selectPrice = roundNum(this.selectPrice, 2);
        for (let index = 0; index < shop.count; ++index) {
          this.selectBids.push(shop.bid);
          this.selectShops.push(shop)
        }
      } else {
        this.selectPrice -= shop.price * shop.count;
        this.selectPrice = roundNum(this.selectPrice, 2);
        for (let index = 0; index < shop.count; ++index) {
          rmvSelect(this.selectBids, shop.bid);
          rmvSelect(this.selectShops, shop.bid);
        }
        shop.count = 1;
      }
      shop.selected = !shop.selected;
    },
    decCount(shop) {
      if (shop.selected === false) {
        shop.count--;
        this.user.removeCart({
          bid: shop.bid,
          type: true,
          cb: res => {
            console.log(res);
            this.user.updateInfo();
          }
        });
        return;
      }
      if (shop.count === 1) {
        shop.count = 1;
      } else {
        shop.count--;
        this.selectPrice -= shop.price;
        this.selectPrice = roundNum(this.selectPrice, 2);
        rmvSelect(this.selectBids, shop.bid);
        rmvSelect(this.selectShops, shop.bid)
      }
    },
    incCount(shop) {
      if (shop.selected === false && !this.all) {
        this.toggleSelect(shop);
      }
      this.selectBids.push(shop.bid);
      this.selectShops.push(shop)
      shop.count++;
      this.selectPrice += shop.price;
      this.selectPrice = roundNum(this.selectPrice, 2);
    }
  },
  computed: {
    ...mapState(["user", "book"])
  },
  mounted() {
    this.$dialog.loading.open("加载中...");
    if (localStorage.getItem("cart")) {
      this.$dialog.loading.close();
      mergeList(JSON.parse(localStorage.getItem("cart")), this.shopList)
      return;
    }
    this.user.getCart({
      page: this.page,
      size: this.pageSize,
      cb: res => {
        this.$dialog.loading.close();
        mergeList(res.data.cart, this.shopList);
        localStorage.setItem("cart", JSON.stringify(this.shopList));
        this.page++;
        if (res.code === 201) {
          this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.loadedDone");
          localStorage.setItem("cartAll", true)
          return;
        }
        if(this.shopList.length < 6) {
          this.loadList()
        }
      }
    });
  }
};
</script>
<style lang='less' scoped>
@import "../../common/less/app.less";
.content {
  padding-top: 0;
}
header {
  height: 1rem;
  font-size: 0.32rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  z-index: 3;
  padding: 0 0.25rem;
  span {
    height: 1rem;
    line-height: 1rem;
    width: 1rem;
    text-align: center;
    &.active {
      color: red;
      border-bottom: 2px solid red;
    }
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
.nav {
  height: 1rem;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  color: red;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: 1rem;
  left: 0;
  z-index: 3;
}
.nav-enter-to {
  transition: all 0.8s ease;
}
.nav-enter {
  opacity: 0;
  transform: translateY(-1rem);
}
.nav-leave-to {
  opacity: 0;
  transition: all 0.8s ease;
  transform: translateY(-1rem);
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