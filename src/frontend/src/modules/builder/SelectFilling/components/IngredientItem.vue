<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click.prevent.self="minus"
      :disabled="quantity <= Limit.COUNT_MIN"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      disabled
      v-model="quantity"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click.prevent.self="plus"
      :disabled="quantity >= Limit.COUNT_MAX"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
import { Limit } from "@/common/enums/builder";

export default {
  name: "IngredientItem",
  props: {
    quantity: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    Limit: () => Limit,
  },
  methods: {
    plus() {
      this.$emit("update", this.quantity + 1);
    },
    minus() {
      this.$emit("update", this.quantity - 1);
    },
  },
};
</script>
