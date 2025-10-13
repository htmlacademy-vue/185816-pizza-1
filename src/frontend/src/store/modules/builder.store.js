import { Builder } from "@/common/enums/entity";
import { QUANTITY } from "@/common/constants";

import {
  ADD_ENTITY,
  DELETE_ENTITY,
  REPLACE_ENTITY,
  UPDATE_ENTITY,
  CLEAR_ENTITY,
} from "@/store/mutations";
import Module from "@/common/enums/module";
import { BuilderCollection } from "@/common/enums/builder";

const module = Module.BUILDER;

export default {
  namespaced: true,
  state: {
    [Builder.NAME]: "",
    [Builder.ID]: null,
    [QUANTITY]: 1,
    [Builder.DOUGH]: 0,
    [Builder.SIZES]: 0,
    [Builder.INGREDIENTS]: [],
    [Builder.SAUCES]: 0,
  },
  getters: {
    selectDough(state, getters, rootState, rootGetters) {
      return rootGetters.getEntityByID({
        entity: BuilderCollection.DOUGH,
        id: state[Builder.DOUGH],
      });
    },
    selectSauce(state, getters, rootState, rootGetters) {
      return rootGetters.getEntityByID({
        entity: BuilderCollection.SAUCES,
        id: state[Builder.SAUCES],
      });
    },
    selectSize(state, getters, rootState, rootGetters) {
      return rootGetters.getEntityByID({
        entity: BuilderCollection.SIZES,
        id: state[Builder.SIZES],
      });
    },
    selectIngredients(state, getters, rootState, rootGetters) {
      return state.ingredients.map((item) => ({
        ...item,
        ...rootGetters.getEntityByID({
          entity: BuilderCollection.INGREDIENTS,
          id: item.id,
        }),
      }));
    },
  },
  mutations: {
    [CLEAR_ENTITY](state) {
      state.name = "";
      state.id = null;
      state.quantity = 1;
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
      commit(CLEAR_ENTITY);
    },
  },
};
