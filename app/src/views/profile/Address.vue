<template>
  <div class="content">
    <profile-header title="地址管理"></profile-header>
    <ul class="items padding">
      <li
        v-for="(address, _index) in user.data.address"
        :key="_index"
        v-longtap="()=>vueTouch(_index)"
      >
        <span>{{address}}</span>
        <icon-svg
          icon-class="iconedit"
          @click.native="showEdit = true; placeholder = address; index = _index;"
        ></icon-svg>
      </li>
    </ul>
    <yd-popup v-model="showEdit" position="center" width="90%">
      <div class="edit-address">
        <input :placeholder="placeholder" v-model="newAddress">
        <button @click="editAddAddress">{{actionType ? "确认/关闭修改" : "确认/关闭添加"}}</button>
      </div>
    </yd-popup>
    <img
      src="../../assets/img/add.png"
      @click="showEdit = true; actionType = false"
      alt
      class="add-address"
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      showEdit: false,
      newAddress: "",
      placeholder: "",
      index: 0,
      actionType: true
    };
  },
  methods: {
    vueTouch(index) {
      this.$dialog.confirm({
        mes: "是否删除该地址",
        opts: () => {
          this.user.delAddress({
            index,
            cb: res => {
              this.user.updateInfo();
              this.$dialog.toast({ mes: res.msg, timeout: 1000 });
            }
          });
        }
      });
    },
    editAddAddress() {
      let { index, newAddress, placeholder, actionType } = this;
      this.showEdit = false;
      if (newAddress === placeholder || newAddress === null) {
        return;
      }
      if (actionType) {
        this.user.editAddress({
          index,
          address: newAddress,
          cb: res => {
            this.$dialog.toast({ mes: res.msg, timeout: 1000 });
            this.user.updateInfo();
            newAddress = "";
          }
        });
      } else {
        this.actionType = true;
        this.user.addAddress({
          address: newAddress,
          cb: res => {
            this.$dialog.toast({ mes: res.msg, timeout: 1000 });
            this.user.updateInfo();
            newAddress = "";
          }
        });
      }
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
.edit-address {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  padding-top: 0.5rem;
  input {
    width: 80%;
    border: none;
    border-bottom: 1px solid #ccc;
    font-size: 0.32rem;
    margin-top: 0.4rem;
  }
  button {
    margin-top: 0.4rem;
    border: none;
    border-radius: 8px;
    font-size: 0.28rem;
    color: #fff;
    height: 0.6rem;
    line-height: 0.6rem;
    background-color: #f1342f;
    width: 2.5rem;
  }
}
.add-address {
  position: fixed;
  bottom: 0.8rem;
  left: 0.8rem;
  width: 0.8rem;
}
</style>