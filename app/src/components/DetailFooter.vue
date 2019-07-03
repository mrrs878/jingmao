<template>
  <div class="footer">
    <div class="icons">
      <icon-svg iconClass="iconshop" text="店铺"></icon-svg>
      <icon-svg iconClass="iconlike" text="收藏"></icon-svg>
      <icon-svg iconClass="iconcart" text="购物车" @click.native="$router.push('/cart')"></icon-svg>
    </div>
    <div class="buttons">
      <button class="buy" @click="buyShop">立即购买</button>
      <button class="add-cart" @click="addCart">加入购物车</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  props: {
    bid: {
      type: String,
      required: true
    }
  },
  methods: {
    buyShop() {
      this.user.buyBook({
        bid: this.bid,
        cb: res => {
          console.log(res);
        }
      });
    },
    addCart() {
      this.user.addCart({
        bid: this.bid,
        cb: res => {
          this.$dialog.toast({
            mes: res.msg,
            timeout: 1500
          });
          console.log(res);
        }
      });
    }
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>
<style lang='less' scoped>
.footer {
  display: flex;
  height: 1rem;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  margin-right: -0.4rem;
  border-top: 1px solid #ccc;
  background-color: #fff;
  .icons {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 50%;
    height: 100%;
  }
  .buttons {
    width: 50%;
    height: 100%;
    button {
      border: none;
      height: 100%;
      font-size: 0.32rem;
      width: 50%;
      color: #fff;
    }
    .buy {
      background-color: #ffbe23;
    }
    .add-cart {
      background-color: red;
    }
  }
}
</style>