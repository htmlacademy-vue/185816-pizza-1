<template>
  <form action="#" method="post">
    <div class="content__wrapper">
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
        @setIngredient="addIngredient"
        @removeIngredient="deleteIngredient"
      />
      <div class="content__pizza">
        <label class="input">
          <span class="visually-hidden">Название пиццы</span>
          <input
            type="text"
            name="pizza_name"
            placeholder="Введите название пиццы"
            @input="setName"
          />
        </label>

        <div
          class="content__constructor"
          :style="{ transform: `scale(${pizza.size.scale})` }"
        >
          <div
            :class="`pizza pizza--foundation--${DoughMap[pizza.dough.id]}-${
              SauceMap[pizza.sauce.id]
            }`"
            @drop.stop="onDropFill"
          >
            <div
              class="pizza__wrapper"
              @dragstart.prevent
              @dragover.prevent
              @dragenter.prevent
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
            </div>
          </div>
        </div>

        <div class="content__result">
          <p>Итого: {{ calculatedPrice }} ₽</p>
          <button
            type="button"
            class="button"
            :disabled="checkedDisabledSubmit"
            @click.prevent="addToCart"
          >
            Готовьте!
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import BuilderDoughSelector from "@/modules/builder/BuilderDoughSelector";
import BuilderDiameterSelector from "@/modules/builder/BuilderDiameterSelector";
import BuilderIngredientsSelector from "@/modules/builder/BuilderIngredientsSelector";
import { DataTransferType, DoughMap, SauceMap } from "@/common/constants";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "BuilderPizzaView",
  components: {
    BuilderDoughSelector,
    BuilderDiameterSelector,
    BuilderIngredientsSelector,
  },
  data() {
    return {
      DoughMap,
      SauceMap,
    };
  },
  computed: {
    ...mapState("Builder", ["pizza", "sizes", "sauces"]),
    ...mapGetters("Builder", [
      "getDoughs",
      "getIngredients",
      "getSizes",
      "getSauces",
    ]),
    /**
     * Transformation url image to class modification
     * @return {array}
     */
    transformedIngredients: function () {
      return this.getIngredients
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
      return this.getDoughs.map((dough) => ({
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
    /**
     * Disable or enable submit button
     * @return {boolean}
     */
    checkedDisabledSubmit() {
      return !(
        this.pizza.name.length > 0 && this.currentIngredients.length >= 1
      );
    },
  },
  methods: {
    ...mapActions("Builder", [
      "addIngredient",
      "deleteIngredient",
      "setPizzaName",
      "setSauce",
      "setDough",
      "setSize",
      "updateIngredients",
      "setPizzaPrice",
    ]),
    ...mapActions("Cart", ["addItem"]),
    setName(e) {
      return this.setPizzaName(e.target.value);
    },
    /**
     * Add ingredient for drop event
     * @param {object} dataTransfer
     */
    onDropFill({ dataTransfer }) {
      const ingredient = JSON.parse(
        dataTransfer.getData(DataTransferType.PAYLOAD)
      );
      this.addIngredient(ingredient);
    },
    addToCart() {
      this.updateIngredients(this.currentIngredients);
      this.setPizzaPrice(this.calculatedPrice);
      this.addItem(this.pizza);
    },
  },
};
</script>
