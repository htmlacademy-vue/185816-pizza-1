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
          :style="{ transform: `scale(${pizza.size.multiplier / 3})` }"
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
              <div v-for="(fill, index) in currentIngredients" :key="index">
                <div
                  v-for="(layer, index) in fill.count"
                  :key="index"
                  :class="[
                    'pizza__filling',
                    `pizza__filling--${fill.icon}`,
                    `pizza__filling--${ingredientLayer[layer]}`,
                  ]"
                ></div>
              </div>
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
import { mapGetters, mapActions, mapState } from "vuex";

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
      ingredientLayer: ["", "second", "third"],
    };
  },
  computed: {
    ...mapState("Builder", [
      "pizza",
      "sizes",
      "sauces",
      "ingredients",
      "doughs",
    ]),
    ...mapGetters("Builder", ["calculatedPrice", "currentIngredients"]),
    /**
     * Transformation url image to class modification
     * @return {array}
     */
    transformedIngredients(state) {
      return state.ingredients
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
     * Disable or enable submit button
     * @return {boolean}
     */
    checkedDisabledSubmit() {
      return !(this.pizza.name.length > 0 && this.pizza.ingredients.length > 0);
    },
  },
  mounted() {
    console.log(this.currentIngredients);
  },
  methods: {
    ...mapActions("Builder", [
      "addIngredient",
      "deleteIngredient",
      "setPizzaName",
      "setSauce",
      "setDough",
      "setSize",
      "setPizzaPrice",
      "clearBuilder",
    ]),
    ...mapActions("Cart", ["addOrder"]),
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
      setTimeout(this.clearBuilder, 1000);
      this.addOrder(this.pizza);
      this.$router.push("cart");
    },
  },
};
</script>
