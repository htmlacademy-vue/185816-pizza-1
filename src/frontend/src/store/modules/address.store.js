import {
  REPLACE_ENTITY,
  ADD_ENTITY,
  DELETE_ENTITY,
  UPDATE_ENTITY,
} from "@/store/mutations";
import Module from "@/common/enums/module";
import { CrudCollection } from "@/common/heplers";

const module = Module.ADDRESS;
const entity = "items";

export default {
  namespaced: true,
  state: {
    items: [],
  },
  getters: {
    orderItems: (state) => state.items.sort((a, b) => a.id - b.id),
    orderByID: (state) => (id) =>
      CrudCollection.getElementByID(state.items, id),
  },
  actions: {
    async fetchItems({ commit }) {
      const payload = await this.$api.addresses.query();

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
    async createItem({ commit }, payload) {
      const { id } = await this.$api.addresses.post(payload);

      commit(
        ADD_ENTITY,
        {
          module,
          entity,
          payload: { id, ...payload },
        },
        { root: true }
      );
    },
    async deleteItem({ commit }, { id }) {
      await this.$api.addresses.delete(id);

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
    async updateItem({ commit }, payload) {
      await this.$api.addresses.put(payload);

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
  },
};
