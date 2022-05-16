<template>
  <div>
    <div id="app">
      <component :is="AppLayout">
        <router-view />
      </component>
    </div>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";

export default {
  name: "AppDefaultLayout",
  components: {
    AppLayout,
  },
  computed: {
    layout() {
      const layout = this.$route.meta.layout || "AppDefaultLayout";
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
