import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules/index";
import vuexPlugins from "@/plugins/vuexPlugins";
import {
  DELETE_ENTITY,
  SET_ENTITY,
  CREATE_NOTICE,
  UPDATE_ENTITY,
  ADD_ENTITY,
} from "@/store/mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notifications: [],
  },
  getters: {},
  mutations: {
    [CREATE_NOTICE](state, payload) {
      state.notifications.push(payload);
    },
    [SET_ENTITY](state, { module, entity, value }) {
      module ? (state[module][entity] = value) : (state[entity] = value);
    },
    [ADD_ENTITY](state, { module, entity, value }) {
      if (module) {
        state[module][entity] = [...state[module][entity], value];
      } else {
        state[entity] = [...state[entity], value];
      }
    },
    [UPDATE_ENTITY](state, { module, entity, value }) {
      if (module) {
        const index = state[module][entity].findIndex(
          ({ id }) => id === value.id
        );
        if (~index) {
          state[module][entity].splice(index, 1, value);
        }
      } else {
        const index = state[entity].findIndex(({ id }) => id === value.id);
        if (~index) {
          state[entity].splice(index, 1, value);
        }
      }
    },
    [DELETE_ENTITY](state, { module, entity, id }) {
      if (module) {
        state[module][entity] = state[module][entity].filter(
          (e) => +e.id !== +id
        );
      } else {
        state[entity] = state[entity].filter((e) => +e.id !== +id);
      }
    },
  },
  actions: {
    createNotification({ commit }, payload) {
      commit("CREATE_NOTICE", payload);
    },
    async init({ dispatch }) {
      await dispatch("loadBuilder");
    },
  },
  modules,
  plugins: [vuexPlugins],
});
