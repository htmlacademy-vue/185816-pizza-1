import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules/index";
import vuexPlugins from "@/plugins/vuexPlugins";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notifications: [],
  },
  getters: {},
  mutations: {
    CREATE_NOTICE(state, payload) {
      state.notifications.push(payload);
    },
  },
  actions: {
    createNotification({ commit }, payload) {
      commit("CREATE_NOTICE", payload);
    },
  },
  modules,
  plugins: [vuexPlugins],
});
