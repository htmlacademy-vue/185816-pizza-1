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
            :disabled="pizzaIngredients[ingredient.id - 1].count === 0"
            @click="removeIngredient(ingredient.id)"
          >
            <span class="visually-hidden">Меньше</span>
          </button>
          <input
            type="text"
            name="counter"
            class="counter__input"
            :value="pizzaIngredients[ingredient.id - 1].count"
          />
          <button
            type="button"
            class="counter__button counter__button--plus"
            @click="addIngredient(ingredient.id)"
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
  data() {
    return {
      pizzaIngredients: this.ingredients.map((ingredient) => ({
        id: ingredient.id,
        count: 0,
      })),
    };
  },
  methods: {
    addIngredient(id) {
      this.pizzaIngredients[id - 1].count++;
      this.$emit("getIngredients", this.pizzaIngredients);
    },
    removeIngredient(id) {
      this.pizzaIngredients[id - 1].count--;
      this.$emit("getIngredients", this.pizzaIngredients);
    },
  },
};
</script>
