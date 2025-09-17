<template>
  <div>
    <router-view></router-view>
    <BuilderPizzaView />
  </div>
</template>

<script>
import BuilderPizzaView from "@/modules/builder/Index";

export default {
  name: "IndexPage",
  components: {
    BuilderPizzaView,
  },
};
</script>

<style scoped></style>
