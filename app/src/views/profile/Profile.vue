<template>
  <div class="content">
    <profile-header title="个人中心"></profile-header>
    <div class="user-info">
      <div class="login" v-if="user.data.name" @click="$router.push('/profile/userInfo')">
        <img :src="user.data.avatar" alt="">
        <span>{{user.data.name}}</span>
      </div>
      <span class="no-login" v-else @click="$router.push('/profile/login')">登录/注册</span>
    </div>
    <ul class="actions padding">
      <li @click="$router.push('/profile/order')">
        <icon-svg icon-class="iconorder"></icon-svg>
        <span>我的订单</span>
        <icon-svg icon-class="iconright"></icon-svg>
      </li>
      <li @click="$router.push('/profile/securityCenter')">
        <icon-svg icon-class="iconsecurity"></icon-svg>
        <span>安全中心</span>
        <icon-svg icon-class="iconright"></icon-svg>
      </li>
      <li @click="$router.push('/profile/address')">
        <icon-svg icon-class="iconweibiaoti102"></icon-svg>
        <span>收货地址</span>
        <icon-svg icon-class="iconright"></icon-svg>
      </li>
      <li @click="$router.push('/profile/project')">
        <icon-svg icon-class="iconproject"></icon-svg>
        <span>此项目</span>
        <icon-svg icon-class="iconright"></icon-svg>
      </li>
      <li @click="$router.push('/profile/about')">
        <icon-svg icon-class="iconabout"></icon-svg>
        <span>关于作者</span>
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
      showFooter: false
    };
  },
  computed: {
    ...mapState(['user'])
  }
};
</script>
<style lang='less' scoped>
@import "../../common/less/app.less";
.content {
  padding-top: 1rem;
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
.user-info {
  height: 4rem;
  background: url("http://img61.ddimg.cn/upload_img/00610/home/user-bg.jpg")
    center center no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  .no-login {
    font-size: 0.32rem;
    color: #ccc;
    border: 1px solid #ccc;
    border-radius: 20px;
    padding: 0.2rem 0.4rem;
  }
  .login {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    font-size: 0.32rem;
    color: #ccc;
    img {
      width: 2rem;
      border-radius: 50%;
    }
    span {
      margin-top: 0.25rem;
      width: 100%;
      text-align: center;
    }
  }
}
.actions {
  margin-top: 0.5rem;
  li {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.32rem;
    position: relative;
    span {
      width: 1.5rem;
      text-align: justify;
      line-height: 1rem;
      height: 1rem;
      margin-right: 4rem;
      &::after {
        width: 100%;
        visibility: hidden;
        overflow: hidden;
        content: "";
        display: inline-block;
        height: 0;
      }
    }
    &::after {
      content: "";
      height: 1px;
      width: 100%;
      position: absolute;
      bottom: 0;
      transform: scaleY(0.5);
      background-color: #ccc;
    }
  }
}
</style>