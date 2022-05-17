<template>
  <component :is="popup"></component>
</template>

<script>
import { capitalize } from "@/common/utils";

export default {
  name: "LoginPopup",
  computed: {
    popup() {
      return () =>
        import(
          `../modules/popups/${this.capitalize(this.$route.meta.popup)}View.vue`
        );
    },
  },
  methods: {
    capitalize(string) {
      return capitalize(string);
    },
  },
};
</script>

<style scoped></style>
