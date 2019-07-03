<template>
  <div class="content padding">
    <yd-navbar title="登录"></yd-navbar>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">用户名：</span>
        <yd-input slot="right" required v-model="name" max="20" placeholder="请输入用户名"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">密&emsp;码：</span>
        <yd-input slot="right" type="password" v-model="pwd" placeholder="请输入密码"></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <yd-button size="large" type="primary" @click.native="login">登录</yd-button>
    <div class="actions">
      <span @click="$router.push('/profile/fgtPwd')">忘记密码</span>
      <span @click="$router.push('/profile/reg')">注册</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      name: "",
      pwd: ""
    };
  },
  methods: {
    ...mapActions(["updateUserInfo"]),
    login() {
      this.user.login({
        name: this.name,
        pwd: this.pwd,
        cb: res => {
          if (res.code === 200) {
            this.$router.push("/home");
          }
          this.$dialog.toast({
            mes: res.msg,
            timeout: 1000,
            icon: res.code === 200 ? "success" : "error",
            callback: () => {}
          });
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
@import "../../common/less/app.less";
.content {
  .actions {
    margin-top: 0.5rem;
    font-size: 16px;
    color: @color;
    display: flex;
    justify-content: space-between;
  }
}
</style>