import pizza from "@/static/pizza.json";
import { SET_DOUGH, SET_SAUCE, SET_SIZE } from "@/store/mutations";

export default {
  namespaced: true,
  state: {
    doughs: pizza.dough,
    ingredients: pizza.ingredients,
    sauces: pizza.sauces,
    sizes: pizza.sizes,
    pizza: {
      dough: pizza.dough[0],
      ingredients: [],
      size: pizza.sizes[0],
      sauce: pizza.sauces[1],
    },
  },
  getters: {
    getIngredients: (state) => {
      return state.ingredients;
    },
    getSauces: (state) => {
      return state.sauces;
    },
    getSizes: (state) => {
      return state.sizes;
    },
    getDoughs: (state) => {
      return state.doughs;
    },
  },
  mutations: {
    /**
     * @param {object} state
     * @param {object} dough
     * {
     *  "id": 1,
     *  "name": "Тонкое",
     *  "image": "/public/img/dough-light.svg",
     *  "description": "Из твердых сортов пшеницы",
     *  "price": 300
     * }
     */
    [SET_DOUGH](state, dough) {
      return (state.pizza.dough = dough);
    },
    /**
     * @param {object} state
     * @param {object} sauce
     * {
     *  "id": 1,
     *  "name": "Томатный",
     *  "price": 50
     * }
     */
    [SET_SAUCE](state, sauce) {
      return (state.pizza.sauce = sauce);
    },
    /**
     * @param {object} state
     * @param {object} size
     * {
     *   "id": 1,
     *   "name": "23 см",
     *   "image": "/public/img/diameter.svg",
     *   "multiplier": 1
     * }
     */
    [SET_SIZE](state, size) {
      return (state.pizza.size = size);
    },
  },
  actions: {
    setDough({ commit }, dough) {
      commit(SET_DOUGH, dough);
    },
    setSauce({ commit }, sauce) {
      commit(SET_SAUCE, sauce);
    },
    setSize({ commit }, size) {
      commit(SET_SIZE, size);
    },
  },
};
