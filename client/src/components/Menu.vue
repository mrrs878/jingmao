<template>
  <div class="my-menu">
    <icon-svg class="refresh" @click.native="refreshClietnInfo" iconClass="iconshuaxin"></icon-svg>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :unique-opened="true"
      :collapse="isCollapse"
      :router="false"
    >
      <el-menu-item index="profile" @click="$router.push('/profile')">
        <icon-svg icon-class="iconyidiandiantubiao08"></icon-svg>
        <span slot="title">用户信息</span>
      </el-menu-item>
      <el-menu-item index="book" @click="$router.push('/book')">
        <icon-svg icon-class="iconbook"></icon-svg>
        <span slot="title">书籍管理</span>
      </el-menu-item>
      <el-menu-item index="order" @click="$router.push('/order')">
        <icon-svg icon-class="iconorder"></icon-svg>
        <span slot="title">订单管理</span>
      </el-menu-item>
      <el-menu-item index="secKill" @click="$router.push('/secKill')">
        <icon-svg icon-class="iconyingxiaogongju-tuangoumiaosha"></icon-svg>
        <span slot="title">秒杀管理</span>
      </el-menu-item>
      <el-menu-item index="comment" @click="$router.push('/comment')">
        <icon-svg icon-class="iconcomment"></icon-svg>
        <span slot="title">评论管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isCollapse: true,
    }
  },
  computed: {
    ...mapState(['client']),
  },
  methods: {
    refreshClietnInfo() {
      console.log('111');
      this.client.updateInfo()
    },
  },
}
</script>
<style lang='less' scoped>
.refresh {
  position: fixed;
  top: 20px;
  left: 20px;
  &:hover {
    cursor: pointer;
  }
}
.my-menu {
  position: fixed;
  top: 60px;
  left: 0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>