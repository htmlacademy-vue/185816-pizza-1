import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const { middlewares = [] } = to.meta;

  if (middlewares?.length) {
    for (const middleware of middlewares) {
      middleware({ to, from, next, store });
    }
  }

  return next();
});

export default router;
