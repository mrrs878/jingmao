<template>
  <div class="content padding-top">
    <profile-header title="更改邮箱"></profile-header>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">原&emsp;邮&emsp;箱：</span>
        <yd-input slot="right" type="email" v-model="user.data.email" disabled></yd-input>
      </yd-cell-item>
      <yd-button type="primary" @click.native="sendCode">发送验证邮件</yd-button>
      <br>
      <br>
      <yd-cell-item>
        <span slot="left">验&emsp;证&emsp;码：</span>
        <yd-input slot="right" v-model="value" placeholder="请输入邮箱验证码"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">原&emsp;&emsp;&emsp;码：</span>
        <yd-input slot="right" type="password" v-model="oldPassword" placeholder="请输入密码"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">新&emsp;邮&emsp;箱：</span>
        <yd-input slot="right" type="email" required v-model="newEmail" placeholder="请输入新邮箱"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">确认新邮箱：</span>
        <yd-input slot="right" type="email" required v-model="cfmEmail" placeholder="请确认新邮箱"></yd-input>
      </yd-cell-item>
      <yd-button type="primary" @click.native="changeEmail">完成</yd-button>
    </yd-cell-group>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      oldPassword: "",
      id: "",
      value: "",
      newEmail: "",
      cfmEmail: ""
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
    changeEmail() {
      let { id, value, email, oldPassword, cfmEmail, newEmail } = this;
      if (cfmEmail !== newEmail) {
        this.$dialog.toast({
          mes: "两次输入的邮箱不一致，请确认",
          timeout: 1500
        });
        return;
      }
      this.user.editEmail({
        id,
        value,
        oldPwd: oldPassword,
        email: newEmail,
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