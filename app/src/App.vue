<template>
  <div id="app">
    <router-view/>
    <yd-tabbar :fixed="true" v-if="showFooter.includes(this.$route.name)">
      <yd-tabbar-item title="首页" link="/home" :active="isCurrent('/home')">
        <yd-icon name="home" slot="icon" size="0.54rem"></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="搜索" link="/search" :active="isCurrent('/search')">
        <yd-icon name="search" slot="icon" size="0.54rem"></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="购物车" link="/cart" :active="isCurrent('/cart')">
        <yd-icon name="shopcart" slot="icon" size="0.54rem"></yd-icon>
        <!-- <yd-badge slot="badge" type="danger">{{cartSize}}</yd-badge> -->
      </yd-tabbar-item>
      <yd-tabbar-item title="个人中心" link="/profile" :active="isCurrent('/profile')">
        <yd-icon name="ucenter-outline" slot="icon" size="0.54rem"></yd-icon>
      </yd-tabbar-item>
    </yd-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      showFooter: ['caer', 'search', 'profile', 'home']
    }
  },
  methods: {
    isCurrent(path) {
      return (this.$route.path === path);
    }
  },
  computed: {
    ...mapState(['user']),
    cartSize() {
      return this.user.data.cart.length
    }
  }
};
</script>

<style lang="less">
html,
body {
  height: 100%;
  width: 100%;
  background-color: #fff !important;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
