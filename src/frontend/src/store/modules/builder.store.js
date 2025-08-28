import {
  BuilderProperty,
  BuilderCollection,
  DefaultValue,
} from "@/common/enums/builder";

const initDefaultSchemeBuilder = [...Object.values(DefaultValue)];

export default {
  namespaced: true,
  state: {
    builder: {
      [BuilderProperty.DOUGH]: {},
      [BuilderProperty.SAUCE]: {},
      [BuilderProperty.INGREDIENTS]: [],
      [BuilderProperty.SIZE]: {},
    },
  },
  getters: {
    selectedIngredients(state) {
      return state.builder[BuilderProperty.INGREDIENTS].reduce((acc, item) => {
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
          state.builder[BuilderProperty.DOUGH].price +
          state.builder[BuilderProperty.SAUCE].price) *
        state.builder[BuilderProperty.SIZE].multiplier
      );
    },
  },
  mutations: {
    START_STATE(state, { collection, results }) {
      collection.forEach((item, idx) => {
        state[item] = results[idx];
      });

      const collectionBuilder = Object.values(BuilderProperty);

      collectionBuilder.forEach((item, idx) => {
        if (item === BuilderProperty.INGREDIENTS) {
          return (state.builder[item] = []);
        }

        state.builder[item] = results[idx][initDefaultSchemeBuilder[idx]];
      });
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
