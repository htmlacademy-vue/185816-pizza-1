import Vue from "vue";
import Notifier from "@/plugins/notifier";
import store from "@/store";
import JwtService from "@/services/jwt.service";
import { createResources } from "@/common/heplers";

const plugins = {
  install(Vue) {
    Vue.mixin({
      computed: {
        $jwt: () => JwtService,
        $notifier: () => new Notifier(store),
        $api: () => createResources(this.$notifier),
      },
    });
  },
};

Vue.use(plugins);
