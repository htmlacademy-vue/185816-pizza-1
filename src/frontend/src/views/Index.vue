<template>
  <div>
    <router-view></router-view>
    <BuilderPizzaView />
  </div>
</template>

<script>
import BuilderPizzaView from "@/modules/builder/BuilderPizzaView";

export default {
  name: "IndexPage",
  components: {
    BuilderPizzaView,
  },
  async mounted() {
    console.log(await this.$api.dough.query());
  },
};
</script>

<style scoped></style>
