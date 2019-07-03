import Login from "../views/profile/Login.vue";
import FgtPwd from "../views/profile/FgtPwd.vue";
import Reg from "../views/profile/Reg.vue";

import Profile from "../views/profile/Profile.vue";
import MyOrder from "../views/profile/Order.vue";
import SecurityCenter from "../views/profile/SecurityCenter.vue";
import ChangePwd from "../views/profile/ChangePwd.vue";
import ChangeEmail from "../views/profile/ChangeEmail.vue";
import ChangeBlance from "../views/profile/ChangeBlance.vue";
import Address from "../views/profile/Address.vue";
import Project from "../views/profile/Project.vue";
import About from "../views/profile/About.vue";
import UserInfo from "../views/profile/UserInfo.vue";

export default [
  {
    path: "/profile",
    name: "profile",
    component: Profile
  },
  {
    path: "/profile/login",
    name: "login",
    component: Login
  },
  {
    path: "/profile/fgtPwd",
    name: "forgetPwd",
    component: FgtPwd
  },
  {
    path: "/profile/reg",
    name: "register",
    component: Reg
  },
  {
    path: "/profile/order",
    name: "myOrder",
    component: MyOrder
  },
  {
    path: "/profile/securityCenter",
    name: "securityCenter",
    component: SecurityCenter
  },
  {
    path: "/profile/changePwd",
    name: "changePwd",
    component: ChangePwd
  },
  {
    path: "/profile/changeEmail",
    name: "changeEmail",
    component: ChangeEmail
  },
  {
    path: "/profile/changeBlance",
    name: "changeBlance",
    component: ChangeBlance
  },
  {
    path: "/profile/address",
    name: "address",
    component: Address
  },
  {
    path: "/profile/project",
    name: "project",
    component: Project
  },
  {
    path: "/profile/about",
    name: "about",
    component: About
  },
  {
    path: "/profile/userInfo",
    name: "userInfo",
    component: UserInfo
  }
];
