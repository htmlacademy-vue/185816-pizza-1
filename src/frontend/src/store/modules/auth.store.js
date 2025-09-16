import { REPLACE_ENTITY } from "@/store/mutations";
import Module from "@/common/enums/module";
import { Auth } from "@/common/enums/entity";
import { capitalize } from "@/common/utils";

const module = capitalize(Module.AUTH);

export default {
  namespaced: true,
  state: {
    isAuthenticated: false, // для проверки, авторизован пользователь или нет
    user: null, // здесь мы будем хранить авторизованного пользователя
  },

  getters: {
    getUserAttribute: (state) => (attr) => state.user ? state.user[attr] : "",
  },

  actions: {
    // во время успешного логина:
    async login({ dispatch }, credentials) {
      const data = await this.$api.auth.login(credentials);
      // 1. получаем с сервера токен и сохраняем его в LocalStorage
      this.$jwt.saveToken(data.token);
      // 2. Добавляем заголовок авторизации в axios
      this.$api.auth.setAuthHeader();
      // 3. Отправляем запрос на получение профиля пользователя
      dispatch("getMe");
    },
    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      // удаляем токен в LocalStorage
      this.$jwt.destroyToken();
      // Обновляем заголовок авторизации в axios (по факту очищаем его)
      this.$api.auth.setAuthHeader();
      // Указываем, что пользователь не авторизован, и очищаем объект пользователя
      commit(
        REPLACE_ENTITY,
        { module: module, entity: Auth.IS_AUTHENTICATED, value: false },
        { root: true }
      );
      commit(
        REPLACE_ENTITY,
        { module, entity: Auth.USER, value: null },
        { root: true }
      );
    },
    async getMe({ commit, dispatch }) {
      try {
        const data = await this.$api.auth.getMe();
        commit(
          REPLACE_ENTITY,
          { module, entity: Auth.IS_AUTHENTICATED, value: true },
          { root: true }
        );
        commit(
          REPLACE_ENTITY,
          { module, entity: Auth.USER, value: data },
          { root: true }
        );
      } catch {
        dispatch("logout", false);
      }
    },
  },
};
