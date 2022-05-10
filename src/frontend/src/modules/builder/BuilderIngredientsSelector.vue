<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <RadioButton
            v-for="sauce in sauces"
            :key="sauce.id"
            :className="['radio', 'ingredients__input']"
            name="souce"
            :value="sauce.id"
            :title="sauce.name"
            :checked="true"
          />
        </div>

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
                  @click="pizzaIngredients[ingredient.id - 1].count--"
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
                  @click="pizzaIngredients[ingredient.id - 1].count++"
                >
                  <span class="visually-hidden">Больше</span>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/RadioButton";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    RadioButton,
  },
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
    sauces: {
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
  mounted() {
    console.log(this.pizzaIngredients);
  },
};
</script>
