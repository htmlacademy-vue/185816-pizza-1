import { BuilderCollection } from "@/common/enums/builder";
import { CrudState } from "@/common/heplers";
import { UPDATE_ENTITY } from "@/store/mutations";

export default {
  namespaced: true,
  state: {
    name: "",
    // Set builder components
    ...Object.fromEntries(
      Object.keys(BuilderCollection).map((item) => [item.toLowerCase(), []])
    ),
  },
  mutations: {
    LOAD_BUILDER(state, payload) {
      state = payload;
    },
    [UPDATE_ENTITY](state, { entity, payload }) {
      Array.isArray(state[entity])
        ? CrudState.addOrUpdate(state, entity, payload.id, payload)
        : CrudState.replace(state, entity, payload);
    },
  },
  actions: {
    updateItem({ commit }, payload) {
      commit(UPDATE_ENTITY, payload);
    },
    loadBuilder({ commit }) {
      commit("LOAD_BUILDER");
    },
  },
};
