<template>
  <form action="#" method="post">
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>
      <div class="content__ingredients">
        <div class="sheet">
          <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
          <BuilderDoughSelector :doughs="transformedDoughs" />
        </div>
      </div>
      <BuilderDiameterSelector :sizes="sizes" />
      <BuilderIngredientsSelector
        :sauces="sauces"
        :ingredients="transformedIngredients"
      />
      <div class="content__pizza">
        <label class="input">
          <span class="visually-hidden">Название пиццы</span>
          <input
            type="text"
            name="pizza_name"
            placeholder="Введите название пиццы"
          />
        </label>

        <div class="content__constructor">
          <div class="pizza pizza--foundation--big-tomato">
            <div class="pizza__wrapper">
              <div class="pizza__filling pizza__filling--ananas"></div>
              <div class="pizza__filling pizza__filling--bacon"></div>
              <div class="pizza__filling pizza__filling--cheddar"></div>
            </div>
          </div>
        </div>

        <div class="content__result">
          <p>Итого: 0 ₽</p>
          <button type="button" class="button" disabled>Готовьте!</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import pizza from "@/static/pizza.json";
import BuilderDoughSelector from "@/modules/builder/BuilderDoughSelector";
import BuilderDiameterSelector from "@/modules/builder/BuilderDiameterSelector";
import BuilderIngredientsSelector from "@/modules/builder/BuilderIngredientsSelector";

export default {
  name: "BuilderPizzaView",
  components: {
    BuilderDoughSelector,
    BuilderDiameterSelector,
    BuilderIngredientsSelector,
  },
  data() {
    return {
      ingredients: pizza.ingredients,
      sauces: pizza.sauces,
      sizes: pizza.sizes,
      doughs: pizza.dough,
    };
  },
  computed: {
    transformedIngredients: function () {
      return this.ingredients.map((ingredient) => ({
        ...ingredient,
        image: ingredient.image.split("/").pop().split(".").shift(),
      }));
    },
    transformedDoughs: function () {
      return this.doughs.map((dough) => ({
        ...dough,
        image: dough.image.split("/").pop().split(".").shift().split("-").pop(),
      }));
    },
  },
};
</script>
