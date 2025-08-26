<template>
  <form action="#" method="post">
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>
      <div class="content__ingredients">
        <div class="sheet">
          <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
          <BuilderDoughSelector :doughs="doughs" @setDough="setDough" />
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import BuilderDoughSelector from "@/modules/builder/BuilderDoughSelector";
import { DataTransferType, DoughMap, SauceMap } from "@/common/constants";
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "BuilderPizzaView",
  components: {
    BuilderDoughSelector,
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
      "sizes",
      "sauces",
      "ingredients",
      "doughs",
      "name",
    ]),
    ...mapGetters("Builder", [
      "calculatedPrice",
      "currentIngredients",
      "currentComponentPizza",
      "changeIngredients",
      "pizza",
      "transformedIngredients",
    ]),
    size() {
      return this.currentComponentPizza("sizes");
    },
    dough() {
      return this.currentComponentPizza("doughs");
    },
    sauce() {
      return this.currentComponentPizza("sauces");
    },
    /**
     * Disable or enable submit button
     * @return {boolean}
     */
    checkedDisabledSubmit() {
      return !(this.name.length > 0 && this.changeIngredients.length > 0);
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
      "initDefault",
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
      this.addOrder(this.pizza);
      this.clearBuilder();
      this.$router.push("cart");
    },
  },
};
</script>
