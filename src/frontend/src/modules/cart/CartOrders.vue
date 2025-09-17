<template>
  <transition-group
    leave-active-class="animate__animated animate__backOutLeft"
    tag="ul"
  >
    <pizza-item-view
      @edit="(payload) => $emit('edit', payload)"
      @delete="(payload) => $emit('delete', payload)"
      @update="(payload) => $emit('update', payload)"
      v-for="item of items"
      :key="item.id"
      :item="item"
    />
  </transition-group>
</template>

<script>
import PizzaItemView from "@/modules/cart/PizzaItemView";

export default {
  name: "CartOrders",
  components: {
    PizzaItemView,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>
