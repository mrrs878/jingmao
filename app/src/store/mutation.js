import { UPDATE_USER_INFO } from "./mutation-type";
import Vue from "vue";

export default {
  update(state, { target, data }) {
    for (let name in data) {
      Vue.set(target, name, data[name]);
    }
  },

  [UPDATE_USER_INFO](state, user) {
    state.user.data = user;
  }
};
