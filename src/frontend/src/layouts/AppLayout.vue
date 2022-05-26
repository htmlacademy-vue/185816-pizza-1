<template>
  <div id="app">
    <component :is="layout">
      <main class="content">
        <slot />
      </main>
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
  mounted() {
    console.log(this.$store.state.msg);
  },
};
</script>

<style scoped></style>
