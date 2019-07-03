<template>
  <div class="content padding-top">
    <profile-header title="修改密码"></profile-header>
    <br>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">邮&emsp;&emsp;&emsp;箱：</span>
        <yd-input slot="right" v-model="user.data.email" disabled></yd-input>
      </yd-cell-item>
      <yd-button type="primary" @click.native="sendCode">发送验证邮件</yd-button>
      <br>
      <br>
      <yd-cell-item>
        <span slot="left">验&emsp;证&emsp;码：</span>
        <yd-input slot="right" v-model="code" required placeholder="请输入邮箱验证码"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">原&emsp;密&emsp;码：</span>
        <yd-input slot="right" type="password" v-model="oldPassword" placeholder="请输入原密码"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">新&emsp;密&emsp;码：</span>
        <yd-input slot="right" type="password" v-model="newPassword" placeholder="请输入新密码"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">确认新密码：</span>
        <yd-input slot="right" type="password" v-model="cfmPassword" placeholder="请确认新密码"></yd-input>
      </yd-cell-item>
      <yd-button type="primary" @click.native="changePwd">完成</yd-button>
    </yd-cell-group>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      oldPassword: "",
      code: "",
      newPassword: "",
      cfmPassword: "",
      id: ""
    };
  },
  methods: {
    sendCode() {
      this.user.sendCode({
        cb: res => {
          this.id = res.data.id;
          this.$dialog.toast({
            mes: res.data.value,
            timeout: 1500
          });
        }
      });
    },
    changePwd() {
      let { id, code, oldPassword, cfmPassword } = this;
      if (cfmPassword !== this.newPassword) {
        this.$dialog.toast({
          mes: "两次输入的密码不一致，请确认",
          timeout: 1500
        });
        return;
      }
      this.user.editPassword({
        id,
        value: code,
        oldPwd: oldPassword,
        newPwd: cfmPassword,
        cb: res => {
          this.$dialog.toast({
            mes: res.msg,
            timeout: 1500
          });
          if(res.code === 200) {
            this.$router.push('/profile/securityCenter')
            this.user.updateInfo();
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
button {
  width: 80%;
  display: block;
  margin: 0 auto;
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.32rem;
}
</style>