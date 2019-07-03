import Vue from "vue";
import App from "./App.vue";
import router from "./route/router";
import store from "./store/store";

import YDUI from "vue-ydui";
import "vue-ydui/dist/ydui.rem.css";
import IconSvg from "./components/IconSvg.vue";
import ProfileHeader from "./components/ProfileHeader";
import vueTouch from "kim-vue-touch";

Vue.config.productionTip = false;

Vue.use(YDUI);
Vue.use(vueTouch);
Vue.component("icon-svg", IconSvg);
Vue.component("profile-header", ProfileHeader);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
