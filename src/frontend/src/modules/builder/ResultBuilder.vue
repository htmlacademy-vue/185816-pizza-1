<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        v-model="name"
      />
    </label>
    <div
      class="content__constructor"
      :style="[{ transform: `scale(${scale})` }, { transition: `.3s` }]"
    >
      <div
        :class="`pizza pizza--foundation--${weight}-${sauce}`"
        @drop.stop="onDropFill"
      >
        <div
          class="pizza__wrapper"
          @dragstart.prevent
          @dragover.prevent
          @dragenter.prevent
        >
          <div v-for="{ id, image, count } of selectedIngredients" :key="id">
            <div
              v-for="(step, index) of count"
              :key="index"
              :class="[
                'pizza__filling',
                `pizza__filling--${image}`,
                `pizza__filling--${ingredientLayer[step]}`,
              ]"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div class="content__result">
      <p>Итого: {{ totalPrice }} ₽</p>
      <button
        @click.prevent.self="$emit('build', { ...item, name, totalPrice })"
        type="button"
        class="button"
        :disabled="name.length <= 0"
      >
        Готовьте!
      </button>
    </div>
  </div>
</template>

<script>
import { BuilderCollection } from "@/common/enums/builder";
import { DataTransferType } from "@/common/constants";

const doughMap = {
  1: "small",
  2: "big",
};

const sauceMap = {
  1: "tomato",
  2: "creamy",
};

const scaleMap = {
  1: 0.8,
  2: 0.9,
  3: 1,
};

export default {
  name: "ResultBuilder",
  props: {
    item: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      name: "",
      ingredientLayer: ["", "second", "third"],
    };
  },
  computed: {
    selectedIngredients() {
      return this.item.selectedIngredients;
    },
    weight() {
      return doughMap[this.item[BuilderCollection.DOUGH].id];
    },
    sauce() {
      return sauceMap[this.item[BuilderCollection.SAUCES].id];
    },
    scale() {
      return scaleMap[this.item[BuilderCollection.SIZES].multiplier];
    },
  },
  methods: {
    onDropFill({ dataTransfer }) {
      const { item } = JSON.parse(
        dataTransfer.getData(DataTransferType.PAYLOAD)
      );
      this.$emit("setItem", { property: BuilderCollection.INGREDIENTS, item });
    },
  },
};
</script>
