<template>
  <form action="#" method="post">
    <div class="content__wrapper" @drop="onDropFill">
      <h1 class="title title--big">Конструктор пиццы</h1>
      <div class="content__ingredients">
        <div class="sheet">
          <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
          <BuilderDoughSelector
            :doughs="transformedDoughs"
            :default-dough="pizza.dough"
            @setDough="setDough"
          />
        </div>
      </div>
      <BuilderDiameterSelector
        :sizes="sizes"
        :default-diameter="pizza.size"
        @setSize="setSize"
      />
      <BuilderIngredientsSelector
        :sauces="sauces"
        :ingredients="transformedIngredients"
        :default-sauce="pizza.sauce"
        @setSauce="setSauce"
        @setIngredient="setIngredient"
        @removeIngredient="setIngredient"
      />
      <div class="content__pizza">
        <label class="input">
          <span class="visually-hidden">Название пиццы</span>
          <input
            type="text"
            name="pizza_name"
            placeholder="Введите название пиццы"
            v-model="pizzaName"
          />
        </label>

        <div class="content__constructor" style="position: relative">
          <div class="pizza pizza--foundation--big-tomato">
            <div
              class="pizza__wrapper"
              draggable="true"
              @dragstart.prevent
              @dragover.prevent
              @dragenter.prevent
              aria-dropeffect="copy"
            >
              <div
                v-for="(fill, index) in currentIngredients"
                :key="index"
                :class="[
                  'pizza__filling',
                  `pizza__filling--${fill.image}`,
                  `pizza__filling--${fill.add}`,
                ]"
              ></div>
              <ul
                class="ingredients__list"
                style="position: absolute; width: 100%; height: 100%"
              ></ul>
            </div>
          </div>
        </div>

        <div class="content__result">
          <p>Итого: {{ calculatedPrice }} ₽</p>
          <button type="button" class="button" :disabled="checkDisabledSubmit">
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
import { DataTransferType } from "@/common/constants";

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
      pizza: {
        sauce: pizza.sauces[0],
        dough: pizza.dough[0],
        size: pizza.sizes[1],
        ingredients: [],
      },
      pizzaName: "",
    };
  },
  computed: {
    /**
     * Transformation url image to class modification
     * @return {array}
     */
    transformedIngredients: function () {
      return this.ingredients
        .map((ingredient) => ({
          ...ingredient,
          image: ingredient.image.split("/").pop().split(".").shift(),
          count: ingredient.count ? ingredient.count : 0,
        }))
        .sort((a, b) => a.id - b.id);
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
    /**
     * Filtering changed filling
     * @return {array}
     */
    currentIngredients() {
      const arrayTemplate = [1, 2, 3, 4, 5];

      return this.transformedIngredients
        .filter((fill) => fill.count !== 0)
        .map((fill) => {
          const fillCountArr = arrayTemplate.slice(0, fill.count);
          return fillCountArr.map((el, index) => {
            if (index === 1) {
              return {
                ...fill,
                add: "second",
              };
            }

            if (index === 2) {
              return {
                ...fill,
                add: "third",
              };
            }

            return fill;
          });
        })
        .flat();
    },
    /**
     * Calculate pizza to cart
     * @return {number}
     */
    calculatedPrice: function () {
      let price = 0;

      if (this.currentIngredients.length !== 0) {
        price =
          price +
          this.transformedIngredients
            .map((fill) => fill.price * fill.count)
            .reduce((prev, current) => prev + current);
      }

      if (this.pizza.dough) {
        price = price + this.pizza.dough.price;
      }

      if (this.pizza.sauce) {
        price = price + this.pizza.sauce.price;
      }

      if (this.pizza.size) {
        price = price * this.pizza.size.multiplier;
      }

      return price;
    },
    checkDisabledSubmit() {
      return !(
        this.pizzaName.length > 0 && this.currentIngredients.length >= 1
      );
    },
  },
  methods: {
    /**
     * Define sauce
     * @param {object} sauce
     */
    setSauce(sauce) {
      this.pizza.sauce = {
        id: sauce.id,
        price: sauce.value,
      };
    },
    /**
     * Define dough
     * @param {object} dough
     */
    setDough(dough) {
      this.pizza.dough = {
        id: dough.id,
        price: dough.value,
      };
    },
    /**
     * Define size
     * @param {object} size
     */
    setSize(size) {
      this.pizza.size = {
        id: size.id,
        multiplier: size.value,
      };
    },
    /**
     * Update information for ingredient
     * @param ingredient
     */
    setIngredient(ingredient) {
      ingredient.add ? ingredient.count++ : ingredient.count--;
      console.log(ingredient);
      this.removeIngredient(ingredient);
      this.ingredients.push(ingredient);
    },
    /**
     * Delete ingredient by index
     * @param ingredient
     */
    removeIngredient(ingredient) {
      const index = this.ingredients.findIndex(
        (fill) => fill.id === ingredient.id
      );
      this.ingredients.splice(index, 1);
    },
    /**
     * Add ingredient for drop event
     * @param {object} dataTransfer
     */
    onDropFill({ dataTransfer }) {
      const ingredient = JSON.parse(
        dataTransfer.getData(DataTransferType.PAYLOAD)
      );
      ingredient.count++;
      this.setIngredient(ingredient);
    },
  },
};
</script>
