import Index from "@/views/Index";
import Login from "@/views/Login";
import Orders from "@/views/Orders";
import Cart from "@/views/Cart";
import Profile from "@/views/Profile";

export default [
  {
    path: "/",
    name: "Index",
    component: Index,
    meta: {
      layout: "AppLayout",
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
    meta: {
      layout: "AppLayout",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      layout: "AppLayout",
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      layout: "AppLayout",
    },
  },
];
