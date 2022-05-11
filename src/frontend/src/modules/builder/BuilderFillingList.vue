<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        class="ingredients__item"
        v-for="ingredient in ingredients"
        :key="ingredient.id"
      >
        <span :class="`filling filling--${ingredient.image}`">
          {{ ingredient.name }}
        </span>

        <div class="counter counter--orange ingredients__counter">
          <button
            type="button"
            class="counter__button counter__button--minus"
            @click="removeIngredient(ingredient)"
          >
            <span class="visually-hidden">Меньше</span>
          </button>
          <input type="text" name="counter" class="counter__input" />
          <button
            type="button"
            class="counter__button counter__button--plus"
            @click="addIngredient(ingredient)"
          >
            <span class="visually-hidden">Больше</span>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
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
      this.$emit("setIngredients", ingredient);
    },
    /**
     * Remove ingredients and emit to parent
     * @param {object} ingredient
     */
    removeIngredient(ingredient) {
      this.$emit("setIngredients", ingredient);
    },
  },
};
</script>
