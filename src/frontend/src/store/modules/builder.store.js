import pizza from "@/static/pizza.json";
import {
  CLEAR_BUILDER,
  SET_PIZZA_NAME,
  SET_PIZZA_PRICE,
  UPDATE_INGREDIENT,
  SET_DEFAULT_BUILDER,
  SET_COMPONENT_PIZZA,
} from "@/store/mutations";

import { addSelectedProps, addCountProps } from "@/store/utils";

export default {
  namespaced: true,
  state: {
    doughs: pizza.dough.map(addSelectedProps),
    ingredients: pizza.ingredients.map(addCountProps),
    sauces: pizza.sauces.map(addSelectedProps),
    sizes: pizza.sizes.map(addSelectedProps),
    name: "",
  },
  getters: {
    /**
     * Return changes ingredients
     *
     * @param {*} state
     * @returns {Array}
     */
    changeIngredients(state) {
      return state.ingredients.filter((item) => item.count !== 0);
    },
    /**
     * Filtering changed filling
     *
     * @return {array}
     */
    currentIngredients(state, getters) {
      return getters.changeIngredients.map((fill) => ({
        ...fill,
        icon: fill.image.split("/").pop().split(".")[0],
      }));
    },
    /**
     * Return summ changes ingredients
     *
     * @param {*} state
     * @param getters
     * @returns {Number}
     */
    sumIngredients(state, getters) {
      if (getters.changeIngredients.length !== 0) {
        return getters.changeIngredients
          .map((fill) => fill.price * fill.count)
          .reduce((prev, current) => prev + current);
      } else {
        return 0;
      }
    },
    /**
     * Return current sauce, dough, size
     * @param state
     * @return {object}
     */
    currentComponentPizza: (state) => (component) => {
      return state[component].filter((item) => item.selected === true).pop();
    },
    /**
     * Calculate pizza to cart
     * @return {number}
     */
    calculatedPrice: function (state, getters) {
      return (
        (getters.sumIngredients +
          getters.currentComponentPizza("doughs").price +
          getters.currentComponentPizza("sauces").price) *
        getters.currentComponentPizza("sizes").multiplier
      );
    },
    /**
     * Return pizza object
     */
    pizza(state, getters) {
      return {
        dough: getters.currentComponentPizza("doughs"),
        sauce: getters.currentComponentPizza("sauces"),
        size: getters.currentComponentPizza("sizes"),
        ingredients: getters.changeIngredients,
        name: state.name,
        price: getters.calculatedPrice,
      };
    },
  },
  mutations: {
    /**
     *
     * @param {object} state
     * @param {object} ingredient
     * {
     *   "id": 4,
     *   "name": "Ветчина",
     *   "image": "/public/img/filling/ham.svg",
     *   "price": 42
     * }
     */
    [UPDATE_INGREDIENT](state, ingredient) {
      state.ingredients.find((item) => {
        if (item.id === ingredient.id) {
          ingredient.add ? item.count++ : item.count--;
        }
      });
    },
    /**
     * Set pizza name
     *
     * @param {object} state
     * @param {string} name
     * @return {*}
     */
    [SET_PIZZA_NAME](state, name) {
      state.name = name;
    },
    [SET_COMPONENT_PIZZA](state, { component, data }) {
      state[component].find((item) => {
        item.selected = item.id === data.id;
      });
    },
    [SET_PIZZA_PRICE](state, price) {
      state.pizza.price = price;
    },
    [CLEAR_BUILDER](state) {
      state.doughs = state.doughs.map(addSelectedProps);
      state.sizes = state.sizes.map(addSelectedProps);
      state.sauces = state.sauces.map(addSelectedProps);
      state.name = "";
      state.ingredients.map((ingredient) => (ingredient.count = 0));
    },
    [SET_DEFAULT_BUILDER](state) {
      state.doughs[0].selected = true;
      state.sizes[1].selected = true;
      state.sauces[0].selected = true;
    },
  },
  actions: {
    setDough({ commit }, dough) {
      commit(SET_COMPONENT_PIZZA, { component: "doughs", data: dough });
    },
    setSauce({ commit }, sauce) {
      commit(SET_COMPONENT_PIZZA, { component: "sauces", data: sauce });
    },
    setSize({ commit }, size) {
      commit(SET_COMPONENT_PIZZA, { component: "sizes", data: size });
    },
    addIngredient({ commit }, ingredient) {
      commit(UPDATE_INGREDIENT, ingredient);
    },
    deleteIngredient({ commit }, ingredient) {
      commit(UPDATE_INGREDIENT, ingredient);
    },
    setPizzaName({ commit }, name) {
      commit(SET_PIZZA_NAME, name);
    },
    setPizzaPrice({ commit }, price) {
      commit(SET_PIZZA_PRICE, price);
    },
    initDefault({ commit }) {
      commit(SET_DEFAULT_BUILDER);
    },
    clearBuilder({ commit }) {
      commit(CLEAR_BUILDER);
      commit(SET_DEFAULT_BUILDER);
    },
  },
};
