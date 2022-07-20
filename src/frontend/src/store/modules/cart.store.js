import {
  ADD_ITEM_CART,
  DELETE_ITEM_CART,
  SET_ORDER_MULTIPLIER,
  CLEAR_CART,
  SET_MULTIPLIER_MISC,
} from "@/store/mutations";

import misc from "@/static/misc.json";
import { v4 as uuidv4 } from "uuid";

export default {
  namespaced: true,
  state: {
    orders: [],
    misc,
  },
  mutations: {
    [ADD_ITEM_CART](state, order) {
      return state.orders.push({
        id: uuidv4(),
        multiplier: 1,
        ...order,
      });
    },
    [DELETE_ITEM_CART](state, order) {
      const index = state.orders.findIndex(
        (orderItem) => orderItem.id === order.id
      );

      return state.items.splice(index, 1);
    },
    [SET_ORDER_MULTIPLIER](state, order) {
      const index = state.orders.findIndex(
        (orderItem) => orderItem.id === order.id
      );

      if (order.add) {
        return state.orders[index].multiplier++;
      } else {
        state.orders[index].multiplier--;

        if (state.orders[index].multiplier === 0) {
          return state.orders.splice(index, 1);
        }
      }
    },
    [CLEAR_CART](state) {
      state.orders = [];
      return state.misc.map((miscItem) => (miscItem.multiplier = 0));
    },
    [SET_MULTIPLIER_MISC](state, miscItem) {
      state.misc = state.misc.filter((item) => item.id !== miscItem.id);

      if (miscItem.add) {
        return state.misc.push({
          ...miscItem,
          multiplier: miscItem.multiplier + 1,
        });
      } else {
        return state.misc.push({
          ...miscItem,
          multiplier: miscItem.multiplier - 1,
        });
      }
    },
  },
  getters: {
    sumOrders(state) {
      if (state.orders.length !== 0) {
        const misc = state.misc.map((miscItem) =>
          miscItem.multiplier !== 0 && miscItem.multiplier !== undefined
            ? miscItem.price * miscItem.multiplier
            : 0
        );
        const prices = state.orders.map(
          (order) => order.price * order.multiplier
        );

        return prices.concat(misc).reduce((prev, current) => prev + current);
      } else {
        return 0;
      }
    },
  },
  actions: {
    addOrder({ commit }, order) {
      commit(ADD_ITEM_CART, order);
    },
    deleteOrder({ commit }, order) {
      commit(DELETE_ITEM_CART, order);
    },
    setMultiplier({ commit }, order) {
      commit(SET_ORDER_MULTIPLIER, order);
    },
    clearCart({ commit }) {
      commit(CLEAR_CART);
    },
    updateMiscItem({ commit }, miscItem) {
      commit(SET_MULTIPLIER_MISC, miscItem);
    },
  },
};
