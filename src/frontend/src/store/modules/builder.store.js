import { BuilderCollection, DefaultValue } from "@/common/enums/builder";

export default {
  namespaced: true,
  state: {
    builder: {
      [BuilderCollection.DOUGH]: {},
      [BuilderCollection.SAUCES]: {},
      [BuilderCollection.INGREDIENTS]: [],
      [BuilderCollection.SIZES]: {},
    },
  },
  getters: {
    selectedIngredients(state) {
      return state.builder[BuilderCollection.INGREDIENTS].reduce(
        (acc, item) => {
          const findElem = acc.find(({ id }) => id === item.id);

          if (findElem) {
            findElem.count += 1;
            return [...acc];
          }

          return [...acc, { ...item, count: 1 }];
        },
        []
      );
    },
    totalPrice(state, getters) {
      const totalIngredients = getters.selectedIngredients.reduce(
        (acc, item) => acc + item.price * item.count,
        0
      );
      return (
        (totalIngredients +
          state.builder[BuilderCollection.DOUGH].price +
          state.builder[BuilderCollection.SAUCES].price) *
        state.builder[BuilderCollection.SIZES].multiplier
      );
    },
  },
  mutations: {
    LOAD_RESOURCES(state, { collection, results }) {
      collection.forEach((item, idx) => {
        state[item] = results[idx];
      });
    },
    INIT_BUILDER(state) {
      const collectionBuilder = Object.values(BuilderCollection);

      collectionBuilder.forEach((item) => {
        if (item === BuilderCollection.INGREDIENTS) {
          return (state.builder[item] = []);
        }

        state.builder[item] = state[item][DefaultValue[item.toUpperCase()]];
      });
    },
    CREATE_BUILDER(state, payload) {
      state.builder = payload;
    },
    SET_BINARY_PROPERTY(state, { property, item }) {
      state.builder[property] = item;
      console.log(state.builder);
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

          const collection = Object.values(BuilderCollection);

          await dispatch("loadCollections", { collection, results });
          await dispatch("initBuilder");
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
      commit("LOAD_RESOURCES", payload);
    },
    initBuilder({ commit }) {
      commit("INIT_BUILDER");
    },
    createBuilder({ commit }, payload) {
      commit("CREATE_BUILDER", payload);
    },
  },
};
