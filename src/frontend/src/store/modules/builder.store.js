import { PropertyBuilder } from "@/common/enums/builder";

export default {
  namespaced: true,
  state: {
    doughs: [],
    ingredients: [],
    sauces: [],
    sizes: [],
    builder: {
      /**
       *   {
       *     "id": 1,
       *      "name": "Тонкое",
       *      "image": "/public/img/dough-light.svg",
       *      "description": "Из твердых сортов пшеницы",
       *      "price": 300
       *     },
       */
      [PropertyBuilder.DOUGH]: {},
      /**
       * [{
       *         "id": 2,
       *         "name": "Чеддер",
       *         "image": "/public/img/filling/cheddar.svg",
       *         "price": 42
       *     },]
       */
      [PropertyBuilder.INGREDIENTS]: [],
      /**
       * { "id":1,"name":"Томатный","price":50 }
       */
      [PropertyBuilder.SAUCE]: {},
      /**
       * {
       *         "id": 1,
       *         "name": "23 см",
       *         "image": "/public/img/diameter.svg",
       *         "multiplier": 1
       *     }
       */
      [PropertyBuilder.SIZE]: {},
    },
  },
  getters: {
    selectedIngredients(state) {
      return state.builder[PropertyBuilder.INGREDIENTS].reduce((acc, item) => {
        const findElem = acc.find(({ id }) => id === item.id);

        if (findElem) {
          findElem.count += 1;
          return [...acc];
        }

        return [...acc, { ...item, count: 1 }];
      }, []);
    },
    totalPrice(state, getters) {
      const totalIngredients = getters.selectedIngredients.reduce(
        (acc, item) => acc + item.price * item.count,
        0
      );
      return (
        (totalIngredients +
          state.builder[PropertyBuilder.DOUGH].price +
          state.builder[PropertyBuilder.SAUCE].price) *
        state.builder[PropertyBuilder.SIZE].multiplier
      );
    },
  },
  mutations: {
    START_STATE(state, { dough, sizes, ingredients, sauces }) {
      state.doughs = dough;
      state.ingredients = ingredients;
      state.sauces = sauces;
      state.sizes = sizes;
    },
    SET_BINARY_PROPERTY(state, { property, item }) {
      state.builder[property] = item;
    },
    ADD_COLLECTION_PROPERTY(state, { property, item }) {
      state.builder[property].push(item);
    },
    DELETE_COLLECTION_PROPERTY(state, { property, item: { id: itemID } }) {
      const deleteIndexItem = state.builder[property].findIndex(
        ({ id }) => id === itemID
      );

      if (deleteIndexItem >= 0) {
        state.builder[property].splice(deleteIndexItem, 1);
      }
    },
  },
  actions: {
    loadBuilder: {
      root: true,
      handler: async function ({ dispatch }) {
        try {
          const promises = [
            this.$api.dough.query(),
            this.$api.sauces.query(),
            this.$api.ingredients.query(),
            this.$api.sizes.query(),
          ];

          const results = await Promise.all(promises);

          // TODO: сделать циклом в массив
          await dispatch("loadCollections", {
            dough: results.at(0),
            sauces: results.at(1),
            ingredients: results.at(2),
            sizes: results.at(3),
          });
        } catch (e) {
          console.log(e, this.$api);
        }
      },
    },
    setBinaryProperty({ commit }, payload) {
      commit("SET_BINARY_PROPERTY", payload);
    },
    addCollectionProperty({ commit }, payload) {
      commit("ADD_COLLECTION_PROPERTY", payload);
    },
    removeCollectionProperty({ commit }, payload) {
      commit("DELETE_COLLECTION_PROPERTY", payload);
    },
    loadCollections({ commit }, payload) {
      commit("START_STATE", payload);
    },
  },
};
