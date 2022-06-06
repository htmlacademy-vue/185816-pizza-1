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
    /**
     * Transformation url image to class modification
     * @return {array}
     */
    transformedIngredients(state) {
      return state.ingredients
        .map((ingredient) => ({
          ...ingredient,
          image: ingredient.image.split("/").pop().split(".").shift(),
          count: ingredient.count ? ingredient.count : 0,
        }))
        .sort((a, b) => a.id - b.id);
    },
    /**
     * Filtering changed filling
     * @return {array}
     */
    currentIngredients(state, getters) {
      const arrayTemplate = [1, 2, 3, 4, 5];

      return getters.transformedIngredients
        .filter((fill) => fill.count !== 0)
        .map((fill) => {
          const fillCountArr = arrayTemplate.slice(0, fill.count);
          return fillCountArr.map((el, index) => {
            if (index === 1) {
              return {
                ...fill,
                add: "second",
              };
            }

            if (index === 2) {
              return {
                ...fill,
                add: "third",
              };
            }

            return fill;
          });
        })
        .flat();
    },
    /**
     * Calculate pizza to cart
     * @return {number}
     */
    calculatedPrice: function (state, getters) {
      if (getters.currentIngredients.length !== 0) {
        state.pizza.price =
          state.pizza.price +
          this.transformedIngredients
            .map((fill) => fill.price * fill.count)
            .reduce((prev, current) => prev + current);
      }

      if (state.pizza.dough) {
        state.pizza.price = state.pizza.price + state.pizza.dough.price;
      }

      if (state.pizza.sauce) {
        state.pizza.price = state.pizza.price + state.pizza.sauce.price;
      }

      if (state.pizza.size) {
        state.pizza.price = state.pizza.price * state.pizza.size.multiplier;
      }

      return state.pizza.price;
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
      const current = state.doughs.find(
        (doughItem) => doughItem.id === dough.id
      );

      return (state.pizza.dough = current);
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
      const current = state.sauces.find(
        (sauceItem) => sauceItem.id === sauce.id
      );

      return (state.pizza.sauce = current);
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
      const current = state.sizes.find((sizeItem) => sizeItem.id === size.id);

      return (state.pizza.size = current);
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
      state.ingredients = state.ingredients.filter(
        (ingredientItem) => ingredientItem.id !== ingredient.id
      );

      if (ingredient.add) {
        return state.ingredients.push({
          ...ingredient,
          count: ingredient.count + 1,
        });
      } else {
        return state.ingredients.push({
          ...ingredient,
          count: ingredient.count - 1,
        });
      }
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
