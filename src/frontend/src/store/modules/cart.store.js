import misc from "@/static/misc.json";
import { v4 as uuidv4 } from "uuid";
import { CollectionCrud } from "@/common/utils";

export default {
  namespaced: true,
  state: {
    orders: [],
    misc: misc.map((item) => ({ ...item, multiplier: 0 })),
  },
  mutations: {
    ADD_ORDER(state, order) {
      CollectionCrud.add(state.orders, {
        id: uuidv4(),
        mics: [],
        multiplier: 1,
        ...order,
      });
    },
    UPDATE_ORDER(state, { id, payload }) {
      CollectionCrud.update(state.orders, id, payload);
    },
    DELETE_ORDER(state, id) {
      CollectionCrud.delete(state.orders, id);
    },
    UPDATE_MISC(state, { id, payload }) {
      CollectionCrud.update(state.misc, id, payload);
    },
    CLEAR_ORDERS(state) {
      CollectionCrud.clear(state.orders);
    },
    CLEAR_MISC(state) {
      state.misc.forEach(({ id }) => {
        CollectionCrud.update(state.misc, id, { multiplier: 0 });
      });
    },
  },
  getters: {
    isEmpty(state) {
      return state.orders.length === 0;
    },
    totalCountOrders(state) {
      return state.orders.reduce(
        (sum, order) => sum + order.totalPrice * order.multiplier,
        0
      );
    },
    totalCountMics(state) {
      return state.misc.reduce(
        (sum, order) => sum + order.price * order.multiplier,
        0
      );
    },
    sumOrders(state, getters) {
      return getters.totalCountOrders + getters.totalCountMics;
    },
    scopeOrders(state, getters) {
      return {
        orders: state.orders,
        misc: state.misc.filter((item) => item.multiplier !== 0),
        sum: getters.sumOrders,
      };
    },
  },
  actions: {
    addOrder({ commit }, order) {
      commit("ADD_ORDER", order);
    },
    deleteOrder({ commit }, id) {
      commit("DELETE_ORDER", id);
    },
    updateOrder({ commit }, payload) {
      commit("UPDATE_ORDER", payload);
    },
    updateMisc({ commit }, payload) {
      commit("UPDATE_MISC", payload);
    },
    clearCart({ commit }) {
      commit("CLEAR_ORDERS");
      commit("CLEAR_MISC");
    },
  },
};
