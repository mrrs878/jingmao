<template>
  <div class="content padding-top">
    <profile-header title="用户信息"></profile-header>
    <div class="user-info">
      <br>
      <img :src="user.data.avatar" v-if="user.data.avatar" alt="">
      <img src="../../assets/img/default_avatar.png" v-else alt="">
      <br>
      <div class="info-item">
        <span>用户名：</span>
        <input type="text" v-model="user.data.name">
      </div>
      <div class="info-item">
        <span>邮箱：</span>
        <input type="text" v-model="user.data.email">
      </div>
    <yd-button size="large" type="primary" @click.native="reg">确认修改</yd-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>
<style lang='less' scoped>
@import "../../common/less/app.less";
.user-info {
  img {
    display: block;
    width: 2rem;
    border-radius: 50%;
    margin: 0.5rem auto;
  }
  .info-item {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    span {
      height: 0.8rem;
      line-height: 0.8rem;
      width: 1.5rem;
      font-size: 0.32rem;
      text-align: justify;
      &::after {
        width: 100%;
        visibility: hidden;
        overflow: hidden;
        content: "";
        display: inline-block;
        height: 0;
      }
    }
    input {
      width: 60%;
      height: 0.8rem;
      line-height: 0.8rem;
      border: none;
      font-size: 0.3rem;
      font-family: fontFamily;
    }
    position: relative;
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
</style>