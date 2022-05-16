<template>
  <div>
    <div id="app">
      <AppHeader />
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/layouts/AppHeader";

export default {
  name: "AppLayout",
  components: { AppHeader },
};
</script>

<style scoped></style>
