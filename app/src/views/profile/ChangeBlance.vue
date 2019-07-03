<template>
  <div class="content">
    <profile-header title="账户余额"></profile-header>
    <div class="blance">
      <span>￥ {{user.data.balance}}</span>
      <yd-button type="primary" @click.native="showEdit = true">立即充值</yd-button>
    </div>
    <yd-popup v-model="showEdit" position="center" width="90%">
      <div style="display: flex;
      justify-content: center;
      align-items: center;">
        <yd-spinner v-model="blance"></yd-spinner>
        <yd-button @click.native="editBlance">完成</yd-button>
      </div>
    </yd-popup>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      showEdit: false,
      blance: 0
    };
  },
  methods: {
    editBlance() {
      this.showEdit = false;
      this.user.editBlance({
        blance: this.blance,
        cb: res => {
          console.log(res);
          this.user.updateInfo()
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
.blance {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  span {
    width: 80%;
    text-align: center;
    font-size: 0.8rem;
    color: red;
  }
  button {
    width: 80%;
    height: 1rem;
    font-size: 0.32rem;
  }
}
</style>