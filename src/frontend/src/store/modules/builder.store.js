import pizza from "@/static/pizza.json";
import {
  CLEAR_BUILDER,
  SET_DOUGH,
  SET_PIZZA_NAME,
  SET_PIZZA_PRICE,
  SET_SAUCE,
  SET_SIZE,
  UPDATE_INGREDIENT,
} from "@/store/mutations";

export default {
  namespaced: true,
  state: {
    doughs: pizza.dough,
    ingredients: pizza.ingredients.map((item) => ({ ...item, count: 0 })),
    sauces: pizza.sauces,
    sizes: pizza.sizes,
    pizza: {
      dough: pizza.dough[0],
      ingredients: [],
      size: pizza.sizes[0],
      sauce: pizza.sauces[1],
      name: "",
      price: 0,
    },
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
     * @returns {Number}
     */
    summIngredients(state, getters) {
      if (getters.changeIngredients.length !== 0) {
        return getters.changeIngredients
          .map((fill) => fill.price * fill.count)
          .reduce((prev, current) => prev + current);
      } else {
        return 0;
      }
    },
    /**
     * Calculate pizza to cart
     * @return {number}
     */
    calculatedPrice: function (state, getters) {
      let startPrice = 0;

      startPrice = startPrice + getters.summIngredients;

      if (state.pizza.dough) {
        startPrice = startPrice + state.pizza.dough.price;
      }

      if (state.pizza.sauce) {
        startPrice = startPrice + state.pizza.sauce.price;
      }

      if (state.pizza.size) {
        startPrice = startPrice * state.pizza.size.multiplier;
      }

      state.pizza.price = startPrice;

      return startPrice;
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
      state.pizza.dough = state.doughs.find(
        (doughItem) => doughItem.id === dough.id
      );
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
      state.pizza.sauce = state.sauces.find(
        (sauceItem) => sauceItem.id === sauce.id
      );
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
      state.pizza.size = state.sizes.find(
        (sizeItem) => sizeItem.id === size.id
      );
    },
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
      state.pizza.ingredients = state.ingredients.filter(
        (item) => item.count !== 0
      );

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
      state.pizza.name = name;
    },
    [SET_PIZZA_PRICE](state, price) {
      state.pizza.price = price;
    },
    [CLEAR_BUILDER](state) {
      state.pizza.ingredients = [];
      state.pizza.name = "";
      state.ingredients.map((ingredient) => (ingredient.count = 0));
    },
  },
  actions: {
    setDough({ commit }, dough) {
      commit(SET_DOUGH, { id: dough.id, price: dough.value });
    },
    setSauce({ commit }, sauce) {
      commit(SET_SAUCE, { id: sauce.id, price: sauce.value });
    },
    setSize({ commit }, size) {
      commit(SET_SIZE, { id: size.id, multiplier: size.value });
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
    clearBuilder({ commit }) {
      commit(CLEAR_BUILDER);
    },
  },
};
