import Vue from "vue";
import Router from "vue-router";

import profileRoute from "./profile";
import homeRoute from "./home";
import searchRoute from "./search";
import cartRoute from "./cart";

const AUTH = ["myOrder", "cart", "changePwd", "changeEmail", "address"];

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savePosition) {
    if (savePosition) {
      return savePosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes: [...profileRoute, ...homeRoute, ...searchRoute, ...cartRoute]
});
router.beforeEach((to, from, next) => {
  if (AUTH.includes(to.name) && localStorage.token === undefined) {
    router.app.$dialog.toast({
      mes: "请先登录",
      timeout: 1500
    });
    router.push("/profile/login");
  }
  next();
});

export default router;
