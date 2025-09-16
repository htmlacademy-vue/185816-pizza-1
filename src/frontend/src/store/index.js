import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules/index";
import vuexPlugins from "@/plugins/vuexPlugins";
import {
  DELETE_ENTITY,
  REPLACE_ENTITY,
  UPDATE_ENTITY,
  ADD_ENTITY,
  CLEAR_ENTITY,
} from "@/store/mutations";

import { BuilderCollection, DefaultValue } from "@/common/enums/builder";
import { CrudCollection } from "@/common/heplers";
import Module from "@/common/enums/module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notifications: [],
    // Set props builder
    ...Object.fromEntries(
      Object.keys(BuilderCollection).map((item) => [item.toLowerCase(), []])
    ),
  },
  getters: {
    getEntityByID:
      (state) =>
      ({ module = null, entity, id }) =>
        module
          ? CrudCollection.getElementByID(state[module][entity], id)
          : CrudCollection.getElementByID(state[entity], id),
    getEntityIndexByID:
      ({ module = null, entity, id }) =>
      (state) =>
        module
          ? CrudCollection.getIndexByID(state[module][entity], id)
          : CrudCollection.getIndexByID(state[entity], id),
  },
  mutations: {
    [REPLACE_ENTITY](state, { module = null, entity, payload }) {
      module ? (state[module][entity] = payload) : (state[entity] = payload);
    },
    [ADD_ENTITY](state, { module, entity, payload }) {
      module
        ? CrudCollection.add(state[module][entity], payload)
        : CrudCollection.add(state[entity], payload);
    },
    [UPDATE_ENTITY](
      state,
      { module = null, entity, payload: { id, ...payload } }
    ) {
      module
        ? CrudCollection.updateByID(state[module][entity], id, payload)
        : CrudCollection.updateByID(state[entity], id, payload);
    },
    [DELETE_ENTITY](state, { module = null, entity, id }) {
      module
        ? CrudCollection.deleteByID(state[module][entity], id)
        : CrudCollection.deleteByID(state[entity], id);
    },
    [CLEAR_ENTITY](state, { module = null, entity }) {
      module
        ? CrudCollection.clear(state[module][entity])
        : CrudCollection.clear(state[entity]);
    },
  },
  actions: {
    async init({ commit }) {
      try {
        const promises = Object.values(BuilderCollection).map((collection) =>
          this.$api[collection].query()
        );

        const data = await Promise.all(promises);

        Object.keys(BuilderCollection).forEach((item, idx) => {
          const entity = item.toLowerCase();
          commit(REPLACE_ENTITY, { entity, payload: data[idx] });
          commit(REPLACE_ENTITY, {
            module: Module.BUILDER,
            entity,
            payload:
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
