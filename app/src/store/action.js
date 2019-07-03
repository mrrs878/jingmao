import { UPDATE_USER_INFO } from "./mutation-type";

export default {
  async updateUserInfo({ commit }, { user }) {
    commit(UPDATE_USER_INFO, user);
  }
};
