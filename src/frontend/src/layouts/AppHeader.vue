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
      <router-link :to="{ name: 'Cart' }">{{ orders }} ₽</router-link>
    </div>
    <div class="header__user">
      <router-link :to="{ name: 'Login' }" class="header__login">
        Войти
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppHeader",
  computed: {
    ...mapState("Cart", ["items"]),
    orders() {
      if (this.items.length !== 0) {
        const prices = this.items.map((i) => i.price);

        return prices.reduce((prev, current) => prev + current);
      } else {
        return 0;
      }
    },
  },
};
</script>

<style scoped></style>
