<template>
  <div class="content">
    <yd-navbar title="忘记密码">
      <span @click="$router.back()" slot="left">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </span>
    </yd-navbar>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">邮&emsp;箱：</span>
        <yd-input slot="right" regex="email" required v-model="email" max="20" placeholder="请输入邮箱"></yd-input>
      </yd-cell-item>
      <yd-button size="large" type="primary" @click.native="sendCode">发送验证码</yd-button>
      <br />
      <yd-cell-item>
        <span slot="left">验证码：</span>
        <yd-input slot="right" required v-model="code" placeholder="请输入验证码"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">用户名：</span>
        <yd-input slot="right" required v-model="name" placeholder="请输入用户名"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">密&emsp;码：</span>
        <yd-input slot="right" type="password" required v-model="pwd" placeholder="请输入密码"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">确&emsp;认：</span>
        <yd-input slot="right" required type="password" v-model="rPwd" placeholder="请确认密码"></yd-input>
      </yd-cell-item>
      <yd-button size="large" type="primary" @click.native="forgetPwd">完成</yd-button>
    </yd-cell-group>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      email: "",
      name: "",
      id: "",
      code: "",
      pwd: "",
      rPwd: ""
    };
  },
  methods: {
    sendCode() {
      this.user.sendCode({
        password: this.oldPassword,
        cb: res => {
          this.id = res.data.id;
          this.$dialog.toast({
            mes: res.data.value,
            timeout: 1500
          });
        }
      });
    },
    forgetPwd() {
      let { id, code, name, pwd } = this;
      this.user.fgtPwd({
        id,
        value: code,
        name,
        pwd,
        cb: res => {
          this.$dialog.toast({
            mes: res.msg,
            timeout: 1500
          });
          if(res.code === 200) {
            this.$router.push('/profile/login')
          }
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