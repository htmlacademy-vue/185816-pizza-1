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
    <div class="header__cart">
      <router-link :to="{ name: 'Cart' }">{{ sumOrders }} ₽</router-link>
    </div>
    <div class="header__user" v-if="isAuth">
      <router-link to="profile">
        <img
          src="@/assets/img/users/user.jpg"
          :alt="user.name"
          width="32"
          height="32"
        />
        <span>{{ user.name }}</span>
      </router-link>
      <a href="#" class="header__logout"><span>Выйти</span></a>
    </div>
    <div class="header__user" v-else>
      <router-link :to="{ name: 'Login' }" class="header__login">
        Войти
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "AppHeader",
  computed: {
    ...mapState("Auth", ["user", "isAuth"]),
    ...mapGetters("Cart", ["sumOrders"]),
  },
};
</script>

<style scoped></style>
