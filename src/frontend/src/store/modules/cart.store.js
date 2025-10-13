import {
  ADD_ENTITY,
  CLEAR_ENTITY,
  DELETE_ENTITY,
  REPLACE_ENTITY,
  UPDATE_ENTITY,
} from "@/store/mutations";
import Module from "@/common/enums/module";
import { Cart } from "@/common/enums/entity";
import { v4 as uuidv4 } from "uuid";
import { BuilderCollection } from "@/common/enums/builder";

const module = Module.CART;
// TODO: объединить с Orders
export default {
  namespaced: true,
  state: {
    [Cart.ORDERS]: [],
    [Cart.MISC]: [],
  },
  getters: {
    isEmpty(state) {
      return state[Cart.ORDERS].length === 0;
    },
    selectMisc(state, getters, rootState, rootGetters) {
      return state[Cart.MISC].map((item) => ({
        ...item,
        ...rootGetters.getEntityByID({
          entity: BuilderCollection.INGREDIENTS,
          id: item.id,
        }),
      }));
    },
    totalPrice(state) {
      return state[Cart.ORDERS].reduce(
        (acc, { totalPrice }) => acc + totalPrice,
        0
      );
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
          payload: { ...payload, id: payload.id ? payload.id : uuidv4() },
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
    clearCart({ commit }) {
      commit(
        REPLACE_ENTITY,
        {
          module,
          entity: Cart.MISC,
          payload: [],
        },
        { root: true }
      );

      commit(
        CLEAR_ENTITY,
        {
          module,
          entity: Cart.ORDERS,
          payload: [],
        },
        { root: true }
      );
    },
  },
};
