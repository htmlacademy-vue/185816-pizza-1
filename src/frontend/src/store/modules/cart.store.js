import { ADD_ITEM_CART, DELETE_ITEM_CART } from "@/store/mutations";

export default {
  namespaced: true,
  state: {
    items: [],
  },
  mutations: {
    [ADD_ITEM_CART](state, item) {
      return state.items.push(item);
    },
    [DELETE_ITEM_CART](state, item) {
      const index = state.items.findIndex((i) => i.id === item.id);

      return state.items.splice(index, 1);
    },
  },
  actions: {
    addItem({ commit }, item) {
      commit(ADD_ITEM_CART, item);
    },
    deleteItem({ commit }, item) {
      commit(DELETE_ITEM_CART, item);
    },
  },
};
