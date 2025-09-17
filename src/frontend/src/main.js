import Vue from "vue";
import App from "./App.vue";
import router from "@/router/index";
import store from "@/store/index";
import "@/plugins/vuePlugins";
import { validator } from "@/directives";

Vue.config.productionTip = false;

Vue.directive("validate", validator);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
