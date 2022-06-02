import { ADD_ORDER_ITEM, REMOVE_ORDER_ITEM } from "@/store/mutations";
import { v4 as uuidv4 } from "uuid";

export default {
  namespaced: true,
  state: {
    orderItems: [],
  },
  mutations: {
    [ADD_ORDER_ITEM](state, orderItem) {
      return state.orderItems.push({
        id: uuidv4(),
        orders: orderItem,
      });
    },
    [REMOVE_ORDER_ITEM](state, order) {
      const index = state.orderItems.findIndex(
        (orderItem) => orderItem.id === order.id
      );

      return state.orderItems.splice(index, 1);
    },
  },
  actions: {
    addOrder({ commit }, orders) {
      commit(ADD_ORDER_ITEM, orders);
    },
  },
};
