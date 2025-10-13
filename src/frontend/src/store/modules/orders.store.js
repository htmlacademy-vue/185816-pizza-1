import { DELETE_ENTITY, REPLACE_ENTITY } from "@/store/mutations";
import Module from "@/common/enums/module";

const module = Module.ORDERS;
const entity = "items";

export default {
  namespaced: true,
  state: {
    items: [],
  },
  mutations: {},
  actions: {
    async fetchOrderItems({ commit }) {
      const payload = await this.$api.orders.query();

      commit(
        REPLACE_ENTITY,
        {
          module,
          entity: "items",
          payload,
        },
        { root: true }
      );
    },
    async deleteItem({ commit }, { id }) {
      await this.$api.orders.delete(id);

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
  },
};
