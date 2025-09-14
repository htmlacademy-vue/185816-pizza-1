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

import { BuilderCollection, DefaultValue } from "@/common/enums/builder";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notifications: [],
    // Set props builder
    ...Object.fromEntries(
      Object.keys(BuilderCollection).map((item) => [item.toLowerCase(), []])
    ),
  },
  getters: {},
  mutations: {
    [CREATE_NOTICE](state, payload) {
      state.notifications = [...state.notifications, payload];
    },
    [SET_ENTITY](state, { module = null, entity, value }) {
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
    async init({ commit }) {
      try {
        const promises = Object.values(BuilderCollection).map((collection) =>
          this.$api[collection].query()
        );

        const data = await Promise.all(promises);

        Object.keys(BuilderCollection).forEach((item, idx) => {
          const entity = item.toLowerCase();
          commit(SET_ENTITY, { entity, value: data[idx] });
          commit(SET_ENTITY, {
            module: "Builder",
            entity,
            value:
              entity !== BuilderCollection.INGREDIENTS
                ? data[idx][DefaultValue[entity]]
                : [],
          });
        });
      } catch (e) {
        console.log(e, this.$api);
      }
    },
  },
  modules,
  plugins: [vuexPlugins],
});
