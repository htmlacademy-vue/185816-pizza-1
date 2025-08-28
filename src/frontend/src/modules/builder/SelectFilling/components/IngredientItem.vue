<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click.prevent.self="minus"
      :disabled="count <= Limit.COUNT_MIN"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      disabled
      :value="count"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click.prevent.self="plus"
      :disabled="count >= Limit.COUNT_MAX"
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
    syncCount: {
      type: Number,
    },
  },
  data() {
    return { count: Limit.COUNT_MIN };
  },
  computed: {
    Limit: () => Limit,
  },
  watch: {
    syncCount(newVal) {
      this.count = newVal;
    },
  },
  methods: {
    plus() {
      this.count += Limit.COUNT_STEP;
      this.$emit("plus");
    },
    minus() {
      this.count -= Limit.COUNT_STEP;
      this.$emit("minus");
    },
  },
};
</script>
