import PropertyBuilder from "@/common/enums/property-builder";

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
      state.builder[property] = state.builder[property].filter(
        ({ id }) => id !== itemID
      );
    },
  },
  actions: {
    loadBuilder: {
      root: true,
      handler: async function ({ commit }) {
        try {
          const promises = [
            this.$api.dough.query(),
            this.$api.sauces.query(),
            this.$api.ingredients.query(),
            this.$api.sizes.query(),
          ];

          const results = await Promise.all(promises);

          commit("START_STATE", {
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
  },
};
