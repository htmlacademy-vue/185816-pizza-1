import pizza from "@/static/pizza.json";
import {
  SET_DOUGH,
  SET_SAUCE,
  SET_SIZE,
  UPDATE_INGREDIENT,
  SET_PIZZA_NAME,
  UPDATE_CURRENT_INGREDIENTS,
  SET_PIZZA_PRICE,
  CLEAR_CURRENT_INGREDIENTS,
} from "@/store/mutations";

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
      name: "",
      price: 0,
    },
  },
  getters: {
    getIngredients: (state) => {
      return state.ingredients
        .map((ingredient) => ({
          ...ingredient,
          image: ingredient.image.split("/").pop().split(".").shift(),
          count: ingredient.count ? ingredient.count : 0,
        }))
        .sort((a, b) => a.id - b.id);
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
      const index = state.doughs.findIndex(
        (doughItem) => doughItem.id === dough.id
      );

      return (state.pizza.dough = state.doughs[index]);
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
      const index = state.sauces.findIndex(
        (sauceItem) => sauceItem.id === sauce.id
      );

      return (state.pizza.sauce = state.sauces[index]);
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
      const index = state.sizes.findIndex(
        (sizeItem) => sizeItem.id === size.id
      );

      return (state.pizza.size = state.sizes[index]);
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
      ingredient.add ? ingredient.count++ : ingredient.count--;

      const index = state.ingredients.findIndex(
        (fill) => fill.id === ingredient.id
      );

      state.ingredients.splice(index, 1);

      return state.ingredients.push(ingredient);
    },
    /**
     * Update changed ingredients
     *
     * @param {object} state
     * @param {array} ingredients
     * @return {*}
     */
    [UPDATE_CURRENT_INGREDIENTS](state, ingredients) {
      return (state.pizza.ingredients = ingredients);
    },
    /**
     * Set pizza name
     *
     * @param {object} state
     * @param {string} name
     * @return {*}
     */
    [SET_PIZZA_NAME](state, name) {
      return (state.pizza.name = name);
    },
    [SET_PIZZA_PRICE](state, price) {
      return (state.pizza.price = price);
    },
    [CLEAR_CURRENT_INGREDIENTS](state) {
      state.pizza.ingredients = [];
      return state.ingredients.map((ingredient) => (ingredient.count = 0));
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
    updateIngredients({ commit }, ingredients) {
      commit(UPDATE_CURRENT_INGREDIENTS, ingredients);
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
    clearCurrentIngredients({ commit }) {
      commit(CLEAR_CURRENT_INGREDIENTS);
    },
  },
};
