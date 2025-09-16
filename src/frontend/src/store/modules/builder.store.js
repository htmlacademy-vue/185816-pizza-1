import { BuilderCollection } from "@/common/enums/builder";
import {
  ADD_ENTITY,
  DELETE_ENTITY,
  REPLACE_ENTITY,
  UPDATE_ENTITY,
} from "@/store/mutations";
import Module from "@/common/enums/module";

const module = Module.BUILDER;

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
    CLEAR_BUILDER(state) {
      state.name = "";
      state.id = null;
    },
  },
  actions: {
    replaceItem({ commit }, { entity, payload }) {
      commit(
        REPLACE_ENTITY,
        {
          module,
          entity,
          payload,
        },
        { root: true }
      );
    },
    updateItem({ commit }, { entity, payload }) {
      commit(
        UPDATE_ENTITY,
        {
          module,
          entity,
          payload,
        },
        { root: true }
      );
    },
    addItem({ commit }, { entity, payload }) {
      commit(
        ADD_ENTITY,
        {
          module,
          entity,
          payload,
        },
        { root: true }
      );
    },
    deleteItem({ commit }, { entity, payload: { id } }) {
      commit(
        DELETE_ENTITY,
        {
          module,
          entity,
          id,
        },
        { root: true }
      );
    },
    clearBuilder({ commit }) {
      commit("CLEAR_BUILDER");
    },
  },
};
