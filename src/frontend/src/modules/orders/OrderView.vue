<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ item.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ orderCost + additionalCost }} ₽</span>
      </div>

      <div class="order__button">
        <button
          @click.prevent.stop="$emit('delete', { id: item.id })"
          type="button"
          class="button button--border"
        >
          Удалить
        </button>
      </div>
      <div class="order__button">
        <button @click.prevent.stop="repeatOrder" type="button" class="button">
          Повторить
        </button>
      </div>
    </div>
    <transition-group
      tag="ul"
      class="order__list"
      leave-active-class="animate__animated animate__backOutLeft"
    >
      <pizza-item-view
        v-for="pizza of item.orderPizzas"
        :key="pizza.id"
        :item="pizza"
        @calc="(cost) => pizzas.push(cost)"
      />
    </transition-group>

    <ul class="order__additional" v-if="additionalItems">
      <li v-for="additionalItem of additionalItems" :key="additionalItem.id">
        <img
          :src="additionalItem.image"
          width="20"
          height="30"
          alt="Coca-Cola 0,5 литра"
        />
        <p>
          <span>{{ additionalItem.name }}</span>
          <b
            >{{ additionalItem.price * additionalItem.quantity }} ₽ x
            {{ additionalItem.quantity }}</b
          >
        </p>
      </li>
    </ul>

    <p class="order__address" v-if="item.orderAddress">
      Адрес доставки: <span>улица {{ item.orderAddress.street }}</span
      >, <span>дом {{ item.orderAddress.building }}</span
      >,
      <span v-if="item.orderAddress.flat"
        >квартира {{ item.orderAddress.flat }}</span
      >
    </p>
  </section>
</template>

<script>
import PizzaItemView from "@/modules/orders/PizzaItemView.vue";
import { mapActions, mapGetters } from "vuex";
import { BuilderCollection } from "@/common/enums/builder";
import { calculateItems } from "@/common/utils";
import { Cart } from "@/common/enums/entity";

export default {
  name: "OrderView",
  components: { PizzaItemView },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      pizzas: [],
    };
  },
  computed: {
    ...mapGetters(["getEntityByID"]),
    additionalItems() {
      if (this.item.orderMisc) {
        return this.item.orderMisc.map(({ miscId, quantity }) => ({
          quantity,
          ...this.getEntityByID({ entity: BuilderCollection.MISC, id: miscId }),
        }));
      }

      return [];
    },
    additionalCost() {
      return calculateItems(this.additionalItems);
    },
    orderCost() {
      return calculateItems(this.pizzas);
    },
  },
  methods: {
    ...mapActions("Cart", ["replaceItem"]),
    repeatOrder() {
      const { orderPizzas = [], orderMisc = [] } = this.item;

      this.replaceItem({
        entity: Cart.MISC,
        payload: orderMisc.map(({ miscId, quantity }) => ({
          id: miscId,
          quantity,
        })),
      });

      this.replaceItem({
        entity: Cart.ORDERS,
        payload: orderPizzas.map(({ ingredients = [], ...item }) => ({
          ...item,
          ingredients: ingredients.map(({ ingredientId, quantity }) => ({
            id: ingredientId,
            quantity,
          })),
          totalPrice: 0,
        })),
      });

      this.$router.push("/cart");
    },
  },
};
</script>
