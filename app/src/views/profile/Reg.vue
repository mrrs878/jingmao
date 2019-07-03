<template>
  <div class="content">
    <yd-navbar title="忘记密码">
      <span @click="$router.back()" slot="left">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </span>
    </yd-navbar>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">用户名：</span>
        <yd-input slot="right" required v-model="name" max="20" placeholder="请输入用户名"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">密&emsp;码：</span>
        <yd-input slot="right" type="password" v-model="pwd" placeholder="请输入密码"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">确&emsp;认：</span>
        <yd-input slot="right" type="password" v-model="rPwd" placeholder="请确认密码"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">邮&emsp;箱：</span>
        <yd-input slot="right" required regex="email" v-model="email" placeholder="请输入邮箱"></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <yd-button size="large" type="primary" @click.native="reg">注册</yd-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      name: "",
      pwd: "",
      rPwd: "",
      email: ""
    };
  },
  methods: {
    reg() {
      let { name, pwd, rPwd, email } = this;
      if (pwd !== rPwd) {
        this.$dialog.toast({
          mes: "两次输入的密码不一致，请确认",
          timeout: 1000,
          icon: "error",
          callback: () => {}
        });
        return;
      }
      if (pwd.length < 8) {
        this.$dialog.toast({
          mes: "密码的长度必须大于8位",
          timeout: 1000,
          icon: "error",
          callback: () => {}
        });
        return;
      }
      this.user.reg({
        user: {
          name,
          pwd,
          email
        },
        cb: res => {
          this.$dialog.toast({
            mes: res.msg,
            timeout: 1000,
            icon: res.code === 200 ? "success" : "error",
            callback: () => {
              if (res.code === 200) {
                this.$router.push("/profile/login");
              }
            }
          });
          console.log(result);
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
</style>