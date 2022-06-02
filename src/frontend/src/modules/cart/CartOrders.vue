<template>
  <ul class="cart-list sheet">
    <pizza-item-view
      v-for="pizza in pizzas"
      :key="pizza.id"
      :id="pizza.id"
      :name="pizza.name"
      :sauce="pizza.sauce.name"
      :dough="pizza.dough.name"
      :ingredients="pizza.ingredients"
      :price="pizza.price"
      :size="pizza.size.name"
      :multiplier="pizza.multiplier"
    />
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
