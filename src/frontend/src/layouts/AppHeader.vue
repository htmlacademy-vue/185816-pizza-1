<template>
  <header class="header">
    <div class="header__logo">
      <router-link :to="{ name: 'Index' }" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <nav v-if="isAuthenticated" style="margin-left: 70px">
      <ul
        style="
          display: flex;
          list-style: none;
          color: #d7d7d7;
          height: 100%;
          justify-content: space-between;
          align-items: center;
          margin: 0;
        "
      >
        <li style="margin-right: 20px">
          <router-link to="/profile">
            <span style="color: #fff; font-weight: bolder">Профиль</span>
          </router-link>
        </li>
        <li>
          <router-link to="/orders">
            <span style="color: #fff; font-weight: bolder"
              >Заказы</span
            ></router-link
          >
        </li>
      </ul>
    </nav>
    <div class="header__cart">
      <router-link :to="{ name: 'Cart' }">{{ sumOrders }} ₽</router-link>
    </div>
    <div
      class="header__user"
      v-if="isAuthenticated"
      style="
        display: flex;
        justify-content: space-between;
        align-items: baseline;
      "
    >
      <router-link to="profile">
        <img
          src="@/assets/img/users/user.jpg"
          :alt="user.name"
          width="32"
          height="32"
        />
        <span>{{ user.name }}</span>
      </router-link>
      <a @click.prevent.stop="$logout" class="header__logout"
        ><span>Выйти</span></a
      >
    </div>
    <div class="header__user" v-else>
      <router-link :to="{ name: 'Login' }" class="header__login">
        <span>Войти</span>
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import logout from "@/common/mixins/logout";

export default {
  name: "AppHeader",
  mixins: [logout],
  computed: {
    ...mapState("Auth", ["user", "isAuthenticated"]),
    ...mapGetters("Cart", ["sumOrders"]),
  },
  methods: {
    ...mapActions("Auth", ["login"]),
  },
};
</script>

<style scoped></style>
