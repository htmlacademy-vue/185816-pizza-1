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
    orders: new Set(),
    misc: misc.map((item) => ({ ...item, multiplier: 0 })),
  },
  mutations: {
    /**
     * Add pizza to cart
     * @param state
     * @param {object} order
     * @return {number}
     */
    [ADD_ITEM_CART](state, order) {
      state.orders.add({
        id: uuidv4(),
        multiplier: 1,
        totalPrice: order.totalPrice,
        mics: [],
        ...order,
      });
    },
    [DELETE_ITEM_CART](state, order) {
      state.orders = state.orders.filter((items) => items.id !== order.id);
    },
    [SET_ORDER_MULTIPLIER](state, order) {
      state.orders.find((item) => {
        if (item.id === order.id) {
          order.add ? item.multiplier++ : item.multiplier--;
        }
      });

      state.orders = state.orders.filter((item) => item.multiplier !== 0);
    },
    [CLEAR_CART](state) {
      state.orders = [];
      state.misc.map((miscItem) => (miscItem.multiplier = 0));
    },
    /**
     * Up and down multiplier misc
     * @param {object} state
     * @param {object} miscItem
     */
    [SET_MULTIPLIER_MISC](state, miscItem) {
      state.misc.find((item) => {
        if (item.id === miscItem.id) {
          miscItem.add ? item.multiplier++ : item.multiplier--;
        }
      });
    },
    CHECK(state, item) {
      console.log(state.orders.has(item));
    },
    // [CHANGE_ORDER_MULTIPLIER](state, { id, plus, minus }) {
    //   state.orders.find((item) => {
    //     if (item.id === miscItem.id) {
    //       miscItem.add ? item.multiplier++ : item.multiplier--;
    //     }
    //   });
    // },
  },
  // getters: {
  //   isEmpty(state) {
  //     return state.orders.values().length === 0;
  //   },
  //   sumOrders(state) {
  //     if (state.orders.length !== 0) {
  //       return state.orders
  //         .values()
  //         .reduce((sum, order) => sum + order.totalPrice * order.multiplier, 0);
  //     } else {
  //       return 0;
  //     }
  //   },
  //   scopeOrders(state, getters) {
  //     return {
  //       orders: state.orders,
  //       misc: state.misc.filter((item) => item.multiplier !== 0),
  //       sum: getters.sumOrders,
  //     };
  //   },
  // },
  getters: {
    totalPrice(state) {
      return Array.from(state.orders).reduce(
        (acc, item) => acc + item.totalPrice,
        0
      );
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
