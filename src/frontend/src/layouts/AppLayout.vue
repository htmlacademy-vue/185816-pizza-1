<template>
  <div>
    <div id="app">
      <AppHeader />
      <main class="content">
        <IndexPage />
      </main>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/layouts/AppHeader";
import IndexPage from "../views/Index";

export default {
  name: "AppLayout",
  components: { AppHeader, IndexPage },
};
</script>

<style scoped></style>
