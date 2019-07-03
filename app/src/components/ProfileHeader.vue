<template>
  <div>
    <header>
      <icon-svg icon-class="iconback" @click.native="$router.back()"></icon-svg>
      <span>{{title}}</span>
      <icon-svg icon-class="iconmore" class="more" @click.native="showNav = !showNav"></icon-svg>
    </header>
    <transition class="nav" name="nav">
      <div class="nav" v-show="showNav">
        <yd-icon name="home" size="0.54rem" @click.native="$router.push('/home')"></yd-icon>
        <yd-icon name="search" size="0.54rem" @click.native="$router.push('/search')"></yd-icon>
        <yd-icon name="shopcart" size="0.54rem" @click.native="$router.push('/cart')"></yd-icon>
        <yd-icon name="ucenter-outline" size="0.54rem" @click.native="$router.push('/profile')"></yd-icon>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {showNav: false};
  },
  props: {
    title: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang='less' scoped>
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
  z-index: 2;
  padding: 0 0.25rem;
  span {
    height: 1rem;
    line-height: 1rem;
    width: 2rem;
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
  z-index: 6;
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