<template>
  <form action="#" method="post">
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>
      <div class="content__ingredients">
        <div class="sheet">
          <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
          <BuilderDoughSelector
            :doughs="transformedDoughs"
            @setDough="setDough"
          />
        </div>
      </div>
      <BuilderDiameterSelector :sizes="sizes" @setSize="setSize" />
      <BuilderIngredientsSelector
        :sauces="sauces"
        :ingredients="transformedIngredients"
        @setSauce="setSauce"
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
          <p>Итого: {{ price }} ₽</p>
          <button type="button" class="button" :disabled="!currentPizza.dough">
            Готовьте!
          </button>
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
      /**
       * Mock pizza components
       */
      ingredients: pizza.ingredients,
      sauces: pizza.sauces,
      sizes: pizza.sizes,
      doughs: pizza.dough,
      /**
       * Pizza to cart
       */
      currentPizza: {
        sauce: false,
        dough: false,
        size: false,
        ingredients: [],
      },
      price: 0,
      isSubmitDisabled: true,
    };
  },
  computed: {
    /**
     * Transformation url image to class modification
     * @return {array}
     */
    transformedIngredients: function () {
      return this.ingredients.map((ingredient) => ({
        ...ingredient,
        image: ingredient.image.split("/").pop().split(".").shift(),
      }));
    },
    /**
     * Transformation url image to class modification
     * @return {array}
     */
    transformedDoughs: function () {
      return this.doughs.map((dough) => ({
        ...dough,
        image: dough.image.split("/").pop().split(".").shift().split("-").pop(),
      }));
    },
  },
  watch: {
    currentPizza: {
      handler: function () {
        this.calculatePrice();
      },
      deep: true,
    },
  },
  methods: {
    /**
     * Define sauce
     * @param {object} sauce
     */
    setSauce(sauce) {
      this.currentPizza.sauce = sauce;
    },
    /**
     * Define ingredients
     * @param {array} ingredients
     */
    setIngredients(ingredients) {
      this.currentPizza.ingredients = ingredients;
    },
    /**
     * Define dough
     * @param {object} dough
     */
    setDough(dough) {
      this.currentPizza.dough = dough;
    },
    /**
     * Define size
     * @param {object} size
     */
    setSize(size) {
      this.currentPizza.size = size;
    },
    calculatePrice() {
      this.price = 0;
      if (this.currentPizza.ingredients.length !== 0) {
        this.price = this.currentPizza.ingredients
          .filter((ingredient) => ingredient.count !== 0)
          .map((fill) => fill.count * fill.price)
          .reduce((prev, current) => prev + current);
      }

      if (this.currentPizza.dough) {
        this.price = this.price + this.currentPizza.dough.value;
      }

      if (this.currentPizza.sauce) {
        this.price = this.price + this.currentPizza.sauce.value;
      }

      if (this.currentPizza.size) {
        this.price = this.price * this.currentPizza.size.value;
      }
    },
  },
};
</script>
