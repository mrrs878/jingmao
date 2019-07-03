<template>
  <div class="content">
    <header class="padding">
      <icon-svg iconClass="iconback" @click.native="$router.back()"></icon-svg>
      <span
        :class="$router.currentRoute.fullPath.includes('/detail/shop') ? 'active' : ''"
        @click="$router.push(`/home/detail/shop/${bid}`)"
      >商品</span>
      <span
        :class="$router.currentRoute.fullPath.includes('/detail/comment') ? 'active' : ''"
        @click="$router.push(`/home/detail/comment/${bid}`)"
      >评论</span>
      <icon-svg iconClass="iconmore" class="more" @click.native="showFooter = !showFooter"></icon-svg>
    </header>
    <transition name="nav">
      <div class="nav" v-show="showFooter">
        <yd-icon name="home" size="0.54rem" @click.native="$router.push('/home')"></yd-icon>
        <yd-icon name="search" size="0.54rem" @click.native="$router.push('/search')"></yd-icon>
        <yd-icon name="shopcart" size="0.54rem" @click.native="$router.push('/cart')"></yd-icon>
        <yd-icon name="ucenter-outline" size="0.54rem" @click.native="$router.push('/profile')"></yd-icon>
      </div>
    </transition>
    <router-view style="padding-top: 1rem;"></router-view>
    <Footer :bid="bid"></Footer>
  </div>
</template>

<script>
import Footer from "../../components/DetailFooter";

export default {
  data() {
    return {
      showFooter: false,
      bid: ''
    };
  },
  components: {
    Footer
  },
  mounted() {
    let fullPath = this.$router.currentRoute.fullPath;
    this.bid = fullPath.substring(fullPath.lastIndexOf("/") + 1);
  }
};
</script>
<style lang='less' scoped>
@import "../../common/less/app.less";

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
</style>