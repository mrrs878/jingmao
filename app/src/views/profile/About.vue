<template>
  <div class="content padding padding-top">
    <profile-header title="关于我"></profile-header>
    <div class="item">
      <p class="title">简介</p>
      <span>食品科学与工程>自学计算机(后端方向)>转前端菜鸟一枚</span>
    </div>
    <div class="item">
      <p class="title">技术栈</p>
      <span class="br">前端：基础、JavaScript、Vue.js(全家桶)、React.js(全家桶)、Flutter、工程化</span>
      <span>后端：基础、Node.js、Express、Mongoose、C++</span>
    </div>
    <div class="item">
      <p class="title">联系我</p>
      <a href="https://github.com/mrrs878" class="br">GitHub: https://github.com/mrrs878</a>
      <span class="br">QQ: 879343544</span>
      <span>WeChat: l115211314</span>
    </div>
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