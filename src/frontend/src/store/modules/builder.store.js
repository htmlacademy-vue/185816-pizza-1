import { BuilderCollection, DefaultValue } from "@/common/enums/builder";
import { CollectionCrud } from "@/common/utils";

export default {
  namespaced: true,
  state: {
    dough: [],
    sauce: [],
    ingredients: [],
    sizes: [],
  },
  mutations: {
    LOAD_RESOURCES(state, payload) {
      Object.values(BuilderCollection).forEach((collection, idx) => {
        state[collection] = payload[idx];
      });

      console.log("Resources load", state);
    },
    DEFINE_DEFAULT_VALUE(state) {
      for (const [key, id] of Object.entries(DefaultValue)) {
        const collectionName = key.toLowerCase();

        if (collectionName !== BuilderCollection.INGREDIENTS) {
          CollectionCrud.select(state[collectionName], id, "checked");
        }
      }
    },
    SET_CHECKED_COLLECTION(state, { collection, id }) {
      CollectionCrud.select(state[collection], id, "checked");
    },
    SET_MULTIPLIER_COLLECTION(state, { collection, id, payload }) {
      CollectionCrud.update(state[collection], id, payload);
    },
  },
  actions: {
    loadBuilder: {
      root: true,
      handler: async function ({ dispatch }) {
        try {
          const promises = Object.values(BuilderCollection).map((collection) =>
            this.$api[collection].query()
          );

          const data = await Promise.all(promises);

          await dispatch("loadResources", data);
          await dispatch("defineDefaultValue", data);
        } catch (e) {
          console.log(e, this.$api);
        }
      },
    },
    setCheckedCollection({ commit }, payload) {
      commit("SET_CHECKED_COLLECTION", payload);
    },
    setMultiplierCollection({ commit }, payload) {
      commit("SET_MULTIPLIER_COLLECTION", payload);
    },
    removeCollectionProperty({ commit }, payload) {
      commit("DELETE_COLLECTION_PROPERTY", payload);
    },
    loadResources({ commit }, payload) {
      commit("LOAD_RESOURCES", payload);
    },
    defineDefaultValue({ commit }) {
      commit("DEFINE_DEFAULT_VALUE");
    },
    createBuilder({ commit }, payload) {
      commit("CREATE_BUILDER", payload);
    },
  },
};
