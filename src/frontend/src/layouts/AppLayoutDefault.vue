<template>
  <div>
    <AppHeader />
    <slot />
  </div>
</template>

<script>
import AppHeader from "@/layouts/AppHeader";
export default {
  name: "AppLayoutDefault",
  components: {
    AppHeader,
  },
};
</script>
