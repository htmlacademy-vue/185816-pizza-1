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
  /**
   * Validate collection argument on Array
   * @param collection
   * @private
   */
  _validator(collection) {
    if (!Array.isArray(collection)) {
      throw new SyntaxError(
        `Collection expected Array, got ${typeof collection}`
      );
    }
  },

  /**
   * Add element to collection
   * @param collection
   * @param items
   */
  add(collection, ...items) {
    this._validator(collection);
    collection.splice(0, 0, ...items);
  },

  /**
   * Delete element to collection by ID
   * @param collection
   * @param itemID
   */
  deleteByID(collection, itemID) {
    this._validator(collection);
    const index = this.getIndexByID(collection, itemID);

    if (~index) {
      collection.splice(index, 1);
    }
  },

  /**
   * Update element to collection by ID
   * @param collection
   * @param itemID
   * @param payload
   */
  updateByID(collection, itemID, payload) {
    this._validator(collection);
    const index = this.getIndexByID(collection, itemID);

    if (~index) {
      const oldItem = collection[index];
      collection.splice(index, 1);
      collection.splice(index, 0, { ...oldItem, ...payload });
    }
  },

  /**
   * Search element index by ID in collection
   * @param collection
   * @param itemID
   * @returns {*}
   */
  getIndexByID(collection, itemID) {
    this._validator(collection);
    return collection.findIndex(({ id }) => id === itemID);
  },

  /**
   * Get element by ID in collection
   * @param collection
   * @param itemID
   * @returns {*}
   */
  getElementByID(collection, itemID) {
    this._validator(collection);
    return collection.find(({ id }) => id === itemID);
  },

  /**
   * Get element common function
   * @param collection
   * @param callback
   * @returns {*}
   */
  getElement(collection, callback) {
    this._validator(collection);
    return collection.find(callback);
  },

  /**
   * Clear collection to empty array
   * @param collection
   */
  clear(collection) {
    this._validator(collection);
    collection.splice(0, collection.length);
  },
};
