import Home from "../views/home/Home.vue";
import Detail from "../views/home/Detail.vue";
import ShopDetail from "../views/home/DetailShop.vue";
import ShopComment from "../views/home/DetailComment.vue";
import BuyShop from "../views/home/BuyShop.vue";
import Partition from "../views/home/Partition.vue";

export default [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/home/detail",
    name: "detail",
    component: Detail,
    children: [
      {
        path: "shop/*",
        name: "shopDetail",
        component: ShopDetail
      },
      {
        path: "comment/*",
        name: "shopComment",
        component: ShopComment
      }
    ]
  },
  {
    path: "/home/buyShop/*",
    name: "buyShop",
    component: BuyShop
  },
  {
    path: "/partition/*",
    name: "partition",
    component: Partition
  }
];
