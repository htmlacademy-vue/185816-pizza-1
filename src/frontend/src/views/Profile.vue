<template>
  <main class="layout">
    <div class="layout__sidebar sidebar">
      <router-link :to="{ name: 'Index' }" class="logo layout__logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>

      <router-link class="layout__link" to="/orders"
        >История заказов</router-link
      >
      <router-link class="layout__link layout__link--active" to="/profile"
        >Мои данные</router-link
      >
    </div>

    <!-- Profile component -->
    <profile-view />
  </main>
</template>

<script>
import ProfileView from "@/modules/profile/index.vue";

export default {
  name: "Profile",
  components: { ProfileView },
};
</script>
