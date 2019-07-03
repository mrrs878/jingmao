<template>
  <div class="content padding padding-top">
    <profile-header title="此项目"></profile-header>
    <div class="item">
      <p class="title">简介</p>
      <span>基于Vue.js打造的简易商城APP，前后端分离，包含APP(客户端)、client(商户端)、server(服务端)三大模块</span>
    </div>
    <div class="item">
      <p class="title">技术栈/技术选型</p>
      <span class="br">前端：Vue.js、Vue-Router、Vuex、axios、less</span>
      <span>后端：Node.js、Express、Mongoose、JWT</span>
    </div>
    <div class="item">
      <p class="title">UI库</p>
      <a href="https://element.eleme.cn/#/zh-CN/component/installation" class="br">client端：ElementUI</a>
      <a href="http://vue.ydui.org">app端：YDUI</a>
    </div>
    <div class="item">
      <p class="title">APP已完成功能：</p>
      <span class="br">登录模块：登录、注册、忘记密码</span>
      <span class="br">主页模块：商品展示...</span>
      <span class="br">搜索模块：商品模糊搜索...</span>
      <span class="br">购物车模块：购物车商品展示；商品增、删、改、结算...</span>
      <span class="br">个人中心模块：更改用户基础信息、修改密码/邮箱、更改地址...</span>
    </div>
    <div class="item">
      <p class="title">client已完成功能</p>
      <span>商品增、删、改、查</span>
    </div>
    <footer>Powered By MrRS</footer>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang='less' scoped>
@import "../../common/less/app.less";

.item {
  margin-top: 0.5rem;
  .title {
    font-size: 0.32rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
  }
}
footer {
  width: 100%;
  position: fixed;
  bottom: 0.5rem;
  left: 0;
  color: red;
  font-size: 0.32rem;
  text-align: center;
}
</style>