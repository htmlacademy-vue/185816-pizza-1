<template>
  <app-layout>
    <router-view></router-view>
  </app-layout>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
export default {
  name: "App",
  components: { AppLayout },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
