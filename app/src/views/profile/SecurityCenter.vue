<template>
  <div class="content">
    <profile-header title="安全中心"></profile-header>
    <ul class="items padding br">
      <li @click="$router.push('/profile/changePwd')">
        <icon-svg icon-class="iconpassword"></icon-svg>
        <span>修改密码</span>
        <icon-svg icon-class="iconright"></icon-svg>
      </li>
      <li @click="$router.push('/profile/changeEmail')">
        <icon-svg icon-class="iconemail"></icon-svg>
        <span>更改邮箱</span>
        <icon-svg icon-class="iconright"></icon-svg>
      </li>
      <li @click="$router.push('/profile/changeBlance')">
        <icon-svg icon-class="iconbalance"></icon-svg>
        <span>账户余额</span>
        <icon-svg icon-class="iconright"></icon-svg>
      </li>
    </ul>
    <div class="padding">
      <yd-button size="large" type="danger" @click.native="logout">退出登录</yd-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$dialog.confirm({
        mes: "确定退出嘛？",
        opts: () => {
          this.user.logout({
            cb: () => {
              this.$dialog.toast({
                mes: "退出成功",
                timeout: 1500
              });
              this.$router.push("/profile/login");
            }
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
  padding-top: 1rem;
}
.items {
  li {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1rem;
    font-size: 0.32rem;
    position: relative;
    span {
      width: 3rem;
      text-align: justify;
      line-height: 1rem;
      height: 1rem;
      margin-right: 2.5rem;
    }
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