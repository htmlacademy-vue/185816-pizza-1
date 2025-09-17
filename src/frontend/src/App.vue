<template>
  <app-layout>
    <transition
      name="view"
      appear
      enter-active-class="animate__animated animate__fadeIn"
      :duration="{ enter: 100, leave: 100 }"
    >
      <router-view />
    </transition>
  </app-layout>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import { setAuth } from "@/common/heplers";

export default {
  name: "App",
  components: { AppLayout },
  created() {
    window.onerror = function (msg, url, line, col, error) {
      console.error(error);
    };
    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }
    this.$store.dispatch("init");
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/style";
</style>
