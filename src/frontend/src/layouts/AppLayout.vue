<template>
  <div id="app">
    <component :is="layout">
      <slot />
    </component>
  </div>
</template>

<script>
import AppHeader from "@/layouts/AppHeader";

export default {
  name: "AppLayout",
  components: { AppHeader },
  computed: {
    layout() {
      const layout = this.$route.meta.layout || "AppLayoutDefault";
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>

<style scoped></style>
