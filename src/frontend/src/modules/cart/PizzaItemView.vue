<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="item.name"
      />
      <div class="product__text">
        <h2>{{ item.name }}</h2>
        <ul>
          <li>
            {{ item[BuilderCollection.SIZES].name }},
            {{ item[BuilderCollection.DOUGH].name }},
          </li>
          <li>Соус: {{ item[BuilderCollection.SAUCES].name }}</li>
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
        @click="minus"
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
        @click="plus"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>

    <div class="cart-list__price">
      <b>{{ totalPrice }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button type="button" class="cart-list__edit">Изменить</button>
      <button
        type="button"
        class="cart-list__edit"
        @click="deleteOrder(item.id)"
      >
        Удалить
      </button>
    </div>
  </li>
</template>

<script>
import { mapActions } from "vuex";
import { BuilderCollection } from "@/common/enums/builder";

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
      return this.item[BuilderCollection.INGREDIENTS]
        .map(({ name }) => name)
        .join(", ");
    },
    totalPrice() {
      return this.item.totalPrice * this.item.multiplier;
    },
    BuilderCollection: () => BuilderCollection,
  },
  methods: {
    ...mapActions("Cart", ["deleteOrder", "updateOrder"]),
    plus() {
      this.updateOrder({
        id: this.item.id,
        payload: {
          multiplier: (this.item.multiplier += 1),
        },
      });
    },
    minus() {
      this.updateOrder({
        id: this.item.id,
        payload: {
          multiplier: (this.item.multiplier -= 1),
        },
      });

      if (this.item.multiplier < 1) {
        return this.deleteOrder(this.item.id);
      }
    },
  },
};
</script>

<style scoped></style>
