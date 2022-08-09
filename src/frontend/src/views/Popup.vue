<template>
  <component :is="popupName"></component>
</template>

<script>
import LoginView from "@/modules/popups/LoginView";
import SuccessView from "@/modules/popups/SuccessView";

export default {
  name: "Popup",
  components: {
    LoginView,
    SuccessView,
  },
  data() {
    return {
      popups: {
        login: "loginView",
        success: "SuccessView",
      },
    };
  },
  computed: {
    popupName() {
      return this.popups[this.$route.meta.popup];
    },
  },
};
</script>

<style scoped></style>
