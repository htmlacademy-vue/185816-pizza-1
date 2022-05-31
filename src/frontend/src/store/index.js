import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    msg: "hello",
  },
  getters: {},
  mutations: {},
  actions: {},
  modules,
});
