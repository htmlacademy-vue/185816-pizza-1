<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        alt="Капричоза"
      />
      <div class="product__text">
        <h2>{{ lowerName }}</h2>
        <ul>
          <li>
            {{ pizza.size.name }},
            {{ lowerDough }}
          </li>
          <li>Соус: {{ lowerSauce }}</li>
          <li>
            Начинка:
            {{ ingredientsFlat }}
          </li>
        </ul>
      </div>
    </div>

    <div class="counter cart-list__counter">
      <button
        type="button"
        class="counter__button counter__button--minus"
        :disabled="pizza.size.multiplier < 1"
        @click="downMultiplier"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input
        type="text"
        name="counter"
        class="counter__input"
        :value="pizza.multiplier"
      />
      <button
        type="button"
        class="counter__button counter__button--plus counter__button--orange"
        @click="upMultiplier"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>

    <div class="cart-list__price">
      <b>{{ pizza.price }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button type="button" class="cart-list__edit">Изменить</button>
    </div>
  </li>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "PizzaItemView",
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ingredientsFlat() {
      return this.pizza.ingredients
        .map((ingredient) => ingredient.name.toLowerCase())
        .toString();
    },
    lowerName() {
      return this.pizza.name.toLowerCase();
    },
    lowerDough() {
      return this.pizza.dough.name.toLowerCase();
    },
    lowerSauce() {
      return this.pizza.sauce.name.toLowerCase();
    },
    sumPrice() {
      return this.pizza.price * this.multiplier;
    },
  },
  methods: {
    ...mapActions("Cart", ["setMultiplier"]),
    upMultiplier() {
      this.setMultiplier({
        add: true,
        id: this.pizza.id,
      });
    },
    downMultiplier() {
      this.setMultiplier({
        add: false,
        id: this.pizza.id,
      });
    },
  },
};
</script>

<style scoped></style>
