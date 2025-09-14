<template>
  <app-layout>
    <router-view></router-view>
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
@import "~@/assets/scss/app";
</style>
