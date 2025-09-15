import Vue from "vue";
import App from "./App.vue";
import router from "@/router/index";
import store from "@/store/index";
import "@/plugins/vuePlugins";

Vue.config.productionTip = false;

console.log(store);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
