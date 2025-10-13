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
          <li>{{ selectSize.name }}, {{ selectDough.name }},</li>
          <li>Соус: {{ selectSauce.name }}</li>
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
        :disabled="item.quantity < 1"
        @click="
          changeItem({ ...item, quantity: (item.quantity -= 1), totalPrice })
        "
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input
        type="text"
        name="counter"
        class="counter__input"
        :value="item.quantity"
      />
      <button
        type="button"
        class="counter__button counter__button--plus counter__button--orange"
        @click="
          changeItem({ ...item, quantity: (item.quantity += 1), totalPrice })
        "
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>

    <div class="cart-list__price">
      <b>{{ totalPrice }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button
        @click="$emit('edit', item)"
        type="button"
        class="cart-list__edit"
      >
        Изменить
      </button>
      <button
        type="button"
        class="cart-list__edit"
        @click="
          $emit('delete', {
            entity,
            payload: item,
          })
        "
      >
        Удалить
      </button>
    </div>
  </li>
</template>

<script>
import { BuilderCollection } from "@/common/enums/builder";
import { Builder, Cart } from "@/common/enums/entity";
import { mapGetters, mapState } from "vuex";
import { calculatePizza } from "@/common/utils";

export default {
  name: "PizzaItemView",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    entity: Cart.ORDERS,
  }),
  computed: {
    ...mapState("Cart", ["misc"]),
    ...mapGetters(["getEntityByID"]),
    selectDough() {
      return this.getEntityByID({
        entity: BuilderCollection.DOUGH,
        id: this.item[Builder.DOUGH],
      });
    },
    selectSauce() {
      return this.getEntityByID({
        entity: BuilderCollection.SAUCES,
        id: this.item[Builder.SAUCES],
      });
    },
    selectSize() {
      return this.getEntityByID({
        entity: BuilderCollection.SIZES,
        id: this.item[Builder.SIZES],
      });
    },
    selectIngredients() {
      return this.item.ingredients.map((item) => ({
        ...item,
        ...this.getEntityByID({
          entity: BuilderCollection.INGREDIENTS,
          id: item.id,
        }),
      }));
    },
    fill() {
      return this.selectIngredients.map(({ name }) => name).join(", ");
    },
    totalPrice() {
      return (
        calculatePizza(
          this.selectDough,
          this.selectSauce,
          this.selectSize,
          this.selectIngredients
        ) * this.item.quantity
      );
    },
  },
  methods: {
    changeItem(payload) {
      if (payload.quantity < 1) {
        this.$emit("delete", {
          entity: Cart.ORDERS,
          payload,
        });
      }

      this.$emit("update", {
        entity: Cart.ORDERS,
        payload,
      });
    },
  },
};
</script>
