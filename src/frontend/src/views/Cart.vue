<template>
  <div>
    <router-view></router-view>
    <cart-view />
  </div>
</template>

<script>
import CartView from "@/modules/cart/CartView";

export default {
  name: "Cart",
  components: {
    CartView,
  },
};
</script>
