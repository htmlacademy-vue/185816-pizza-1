<template>
  <li class="order__item">
    <div class="product">
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
          <li>{{ selectSize.name }}, {{ selectDough.name }}</li>
          <li>Соус: {{ selectSauce.name }}</li>
          <li v-if="fill">
            Начинка:
            {{ fill }}
          </li>
        </ul>
      </div>
    </div>

    <p class="order__price">
      {{ totalCount }}
      ₽ x
      {{ item.quantity }}
    </p>
  </li>
</template>

<script>
import { mapGetters } from "vuex";
import { BuilderCollection } from "@/common/enums/builder";
import { calculatePizza } from "@/common/utils";

export default {
  name: "PizzaItemView",
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters(["getEntityByID"]),
    selectDough() {
      return this.getEntityByID({
        entity: BuilderCollection.DOUGH,
        id: this.item.doughId,
      });
    },
    selectSauce() {
      return this.getEntityByID({
        entity: BuilderCollection.SAUCES,
        id: this.item.sauceId,
      });
    },
    selectSize() {
      return this.getEntityByID({
        entity: BuilderCollection.SIZES,
        id: this.item.sizeId,
      });
    },
    selectIngredients() {
      if (this.item.ingredients) {
        return this.item.ingredients.map(({ ingredientId }) => {
          const { name } = this.getEntityByID({
            entity: BuilderCollection.INGREDIENTS,
            id: ingredientId,
          });

          return {
            name,
          };
        });
      }

      return [];
    },
    fill() {
      return this.selectIngredients.map(({ name }) => name).join(", ");
    },
    totalCount() {
      return calculatePizza(
        this.selectDough,
        this.selectSauce,
        this.selectSize,
        this.selectIngredients
      );
    },
  },
  mounted() {
    this.$emit("calc", {
      id: this.item.id,
      price: this.totalCount,
      quantity: this.item.quantity,
    });
  },
};
</script>
