import {
  ADD_ITEM_CART,
  DELETE_ITEM_CART,
  SET_ORDER_MULTIPLIER,
} from "@/store/mutations";
import { v4 as uuidv4 } from "uuid";

export default {
  namespaced: true,
  state: {
    orders: [],
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
        return state.orders[index].multiplier--;
      }
    },
  },
  getters: {
    sumOrders(state) {
      if (state.orders.length !== 0) {
        const prices = state.orders.map(
          (order) => order.price * order.multiplier
        );

        return prices.reduce((prev, current) => prev + current);
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
  },
};
