<template>
  <ul class="cart-list sheet">
    <pizza-item-view v-for="pizza of pizzas" :key="pizza.id" :pizza="pizza" />
  </ul>
</template>

<script>
import PizzaItemView from "@/modules/cart/PizzaItemView";

export default {
  name: "CartOrders",
  components: {
    PizzaItemView,
  },
  props: {
    pizzas: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped></style>
