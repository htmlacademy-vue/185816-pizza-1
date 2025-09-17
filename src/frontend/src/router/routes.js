import { isAuth, isLoggedIn } from "@/common/middlewares";

export default [
  {
    path: "/",
    name: "Index",
    component: () => import("@/views/Index.vue"),
    meta: {
      layout: "AppLayoutDefault",
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("@/views/Cart.vue"),
    meta: {
      layout: "AppLayoutDefault",
    },
    children: [
      {
        path: "success-popup",
        name: "SuccessPopup",
        component: () => import("@/views/Popup.vue"),
        meta: {
          layout: "AppLayoutDefault",
          popup: "success",
        },
      },
    ],
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("@/views/Orders.vue"),
    meta: {
      layout: "AppLayoutDefault",
      middlewares: [isAuth],
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: {
      layout: "AppLayoutDefault",
      middlewares: [isLoggedIn],
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
    meta: {
      layout: "AppLayoutDefault",
      middlewares: [isAuth],
    },
  },
];
