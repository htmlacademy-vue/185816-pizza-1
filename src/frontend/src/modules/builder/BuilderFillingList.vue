<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        class="ingredients__item"
        v-for="ingredient in ingredients"
        :key="ingredient.id"
        :draggable="ingredient.count < 3"
        @dragstart.self="onDragFill($event, ingredient)"
        @dragover.prevent
        @dragenter.prevent
        aria-dropeffect="move"
      >
        <span :class="`filling filling--${ingredient.image}`">
          {{ ingredient.name }}
        </span>

        <div class="counter counter--orange ingredients__counter">
          <button
            type="button"
            class="counter__button counter__button--minus"
            @click="removeIngredient(ingredient)"
            :disabled="ingredient.count === 0"
          >
            <span class="visually-hidden">Меньше</span>
          </button>
          <input
            type="text"
            name="counter"
            class="counter__input"
            :value="ingredient.count"
          />
          <button
            type="button"
            class="counter__button counter__button--plus"
            @click="addIngredient(ingredient)"
            :disabled="ingredient.count >= 3"
          >
            <span class="visually-hidden">Больше</span>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  DataTransferType,
  DataTransferDropEffect,
  DataTransferAllowEffect,
} from "@/common/constants";

export default {
  name: "BuilderFillingList",
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
  },
  methods: {
    /**
     * Add ingredients and emit to parent
     * @param {object} ingredient
     */
    addIngredient(ingredient) {
      this.$emit("setIngredient", {
        ...ingredient,
        add: true,
      });
    },
    /**
     * Remove ingredients and emit to parent
     * @param {object} ingredient
     */
    removeIngredient(ingredient) {
      this.$emit("removeIngredient", {
        ...ingredient,
        add: false,
      });
    },
    /**
     * Passing ingredient to drop zone
     * @param {object} dataTransfer
     * @param {object} ingredient
     */
    onDragFill({ dataTransfer }, ingredient) {
      dataTransfer.effectAllowed = DataTransferAllowEffect.MOVE;
      dataTransfer.dropEffect = DataTransferDropEffect.MOVE;
      dataTransfer.setData(
        DataTransferType.PAYLOAD,
        JSON.stringify({
          ...ingredient,
          add: true,
        })
      );
    },
  },
};
</script>
