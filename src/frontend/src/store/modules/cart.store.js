import {
  ADD_ENTITY,
  CLEAR_ENTITY,
  DELETE_ENTITY,
  UPDATE_ENTITY,
} from "@/store/mutations";
import { CrudState } from "@/common/heplers";
import { capitalize } from "@/common/utils";

const entity = "cart";
const module = capitalize(entity);

export default {
  namespaced: true,
  state: {
    orders: [],
    misc: [],
  },
  mutations: {
    [UPDATE_ENTITY](state, { entity, payload }) {
      CrudState.addOrUpdate(state, entity, payload.id, payload);
    },
  },
  getters: {
    isEmpty(state) {
      return state.orders.length === 0;
    },
    totalCountOrders(state) {
      return state.orders.reduce(
        (sum, order) => sum + order.totalPrice * order.quantity,
        0
      );
    },
    totalCountMics(state) {
      return state.misc.reduce(
        (sum, order) => sum + order.price * order.quantity,
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
    clearCart({ commit }) {
      commit(CLEAR_ENTITY, {
        module,
        entity: "misc",
      });

      commit(
        CLEAR_ENTITY,
        {
          module,
          entity: "orders",
        },
        { root: true }
      );
    },
  },
};
