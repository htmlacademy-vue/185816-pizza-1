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
        <h2>{{ lowerNamePizzaComponents.name }}</h2>
        <ul>
          <li>
            {{ pizza.size.name }},
            {{ lowerNamePizzaComponents.dough }}
          </li>
          <li>Соус: {{ lowerNamePizzaComponents.sauce }}</li>
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
        @click="setMultiplier({ add: false, id: pizza.id })"
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
        @click="setMultiplier({ add: true, id: pizza.id })"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>

    <div class="cart-list__price">
      <b>{{ sumPrice }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button type="button" class="cart-list__edit">Изменить</button>
      <button type="button" class="cart-list__edit" @click="deleteOrder(pizza)">
        Удалить
      </button>
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
        .join();
    },
    lowerNamePizzaComponents() {
      return {
        name: this.pizza.name.toLowerCase(),
        dough: this.pizza.dough.name.toLowerCase(),
        sauce: this.pizza.sauce.name.toLowerCase(),
      };
    },
    sumPrice() {
      return this.pizza.price * this.pizza.multiplier;
    },
  },
  methods: {
    ...mapActions("Cart", ["setMultiplier", "deleteOrder"]),
  },
};
</script>

<style scoped></style>
