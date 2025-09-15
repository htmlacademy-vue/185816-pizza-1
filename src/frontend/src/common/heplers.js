import resources from "@/common/enums/resources";
import {
  AuthApiService,
  ReadOnlyApiService,
  CrudApiService,
} from "@/services/api";

export const createResources = (notifier) => {
  return {
    [resources.USERS]: new ReadOnlyApiService(resources.USERS, notifier),
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.PIZZA]: new CrudApiService(resources.PIZZA, notifier),
    [resources.DOUGHS]: new ReadOnlyApiService(resources.DOUGHS, notifier),
    [resources.SIZES]: new ReadOnlyApiService(resources.SIZES, notifier),
    [resources.INGREDIENTS]: new ReadOnlyApiService(
      resources.INGREDIENTS,
      notifier
    ),
    [resources.SAUCES]: new ReadOnlyApiService(resources.SAUCES, notifier),
  };
};

export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Auth/getMe");
};

export const CrudState = {
  add(state, entity, payload) {
    state[entity] = [...state[entity], payload];
  },
  replace(state, entity, payload) {
    state[entity] = payload;
  },
  deleteByID(state, entity, id) {
    state[entity] = state[entity].filter((item) => item.id !== id);
  },
  addOrUpdate(state, entity, id, payload) {
    const index = state[entity].findIndex((item) => item.id === id);
    if (~index) {
      this.deleteByID(state, entity, id);
      this.add(state, entity, payload);
    } else {
      this.add(state, entity, payload);
    }
  },
  getIndexByID(state, entity, id) {
    const index = state[entity].findIndex((item) => item.id === id);

    if (~index) {
      return index;
    }

    return 0;
  },
};
