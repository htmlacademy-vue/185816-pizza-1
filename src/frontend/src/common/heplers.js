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
    [resources.MISC]: new ReadOnlyApiService(resources.MISC, notifier),
    [resources.ADDRESSES]: new CrudApiService(resources.ADDRESSES, notifier),
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
};

export const CrudCollection = {
  _validator(collection) {
    if (!Array.isArray(collection)) {
      throw new SyntaxError(
        `Collection expected Array, got ${typeof collection}`
      );
    }
  },

  add(collection, ...items) {
    this._validator(collection);
    collection.splice(0, 0, ...items);
  },

  deleteByID(collection, itemID) {
    this._validator(collection);
    const index = this.getIndexByID(collection, itemID);

    if (~index) {
      collection.splice(index, 1);
    }
  },

  updateByID(collection, itemID, payload) {
    this._validator(collection);
    const index = this.getIndexByID(collection, itemID);

    if (~index) {
      const oldItem = collection[index];
      collection.splice(index, 1);
      collection.splice(index, 0, { ...oldItem, ...payload });
    }
  },

  getIndexByID(collection, itemID) {
    this._validator(collection);
    return collection.findIndex(({ id }) => id === itemID);
  },

  getElementByID(collection, itemID) {
    this._validator(collection);
    return collection.find(({ id }) => id === itemID);
  },

  clear(collection) {
    this._validator(collection);
    collection.splice(0, collection.length);
  },
};
