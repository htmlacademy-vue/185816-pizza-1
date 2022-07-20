import pizza from "@/static/pizza.json";
import {
  CLEAR_BUILDER,
  SET_DOUGH,
  SET_PIZZA_NAME,
  SET_PIZZA_PRICE,
  SET_SAUCE,
  SET_SIZE,
  UPDATE_CURRENT_INGREDIENTS,
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
     * Filtering changed filling
     * @return {array}
     */
    currentIngredients(state) {
      const arrayTemplate = [1, 2, 3, 4, 5];

      return state.ingredients
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
    calculatedPrice: function (state) {
      let startPrice = 0;

      if (state.pizza.ingredients.length !== 0) {
        startPrice =
          startPrice +
          state.pizza.ingredients
            .map((fill) => fill.price * fill.count)
            .reduce((prev, current) => prev + current);
      }

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
      const currentIngredient = state.ingredients.findIndex(
        (item) => item.id === ingredient.id
      );

      if (ingredient.add) {
        state.ingredients[currentIngredient].count = ingredient.count + 1;
      } else {
        state.ingredients[currentIngredient].count = ingredient.count + -1;
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
      state.pizza.ingredients = ingredients;
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
    clearBuilder({ commit }) {
      commit(CLEAR_BUILDER);
    },
  },
};
