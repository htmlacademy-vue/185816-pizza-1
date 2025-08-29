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
        <h2>{{ item.name }}</h2>
        <ul>
          <li>
            {{ item.sizes.name }},
            {{ item.dough.name }}
          </li>
          <li>Соус: {{ item.sauces.name }}</li>
          <li v-if="fill">
            Начинка:
            {{ fill }}
          </li>
        </ul>
      </div>
    </div>

    <div class="counter cart-list__counter">
      <button
        type="button"
        class="counter__button counter__button--minus"
        :disabled="item.multiplier < 1"
        @click="setMultiplier({ add: false, id: item.id })"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input
        type="text"
        name="counter"
        class="counter__input"
        :value="item.multiplier"
      />
      <button
        type="button"
        class="counter__button counter__button--plus counter__button--orange"
        @click="setMultiplier({ add: true, id: item.id })"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>

    <div class="cart-list__price">
      <b>{{ item.totalPrice }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button type="button" class="cart-list__edit">Изменить</button>
      <button type="button" class="cart-list__edit" @click="deleteOrder(item)">
        Удалить
      </button>
    </div>
  </li>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "itemItemView",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    fill() {
      return this.item.selectedIngredients.map(({ name }) => name).join(", ");
    },
  },
  methods: {
    ...mapActions("Cart", ["setMultiplier", "deleteOrder"]),
  },
};
</script>

<style scoped></style>
