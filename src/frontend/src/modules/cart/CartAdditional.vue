<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li
        class="additional-list__item sheet"
        v-for="miscItem in misc"
        :key="miscItem.id"
      >
        <p class="additional-list__description">
          <img
            :src="require(`@/assets/img/${miscItem.image}`)"
            width="39"
            height="60"
            :alt="miscItem.name"
          />
          <span>{{ miscItem.name }}</span>
        </p>

        <div class="additional-list__wrapper">
          <div class="counter additional-list__counter">
            <button
              type="button"
              class="counter__button counter__button--minus"
              :disabled="miscItem.multiplier === 0"
              @click.prevent="removeMiscItem(miscItem)"
            >
              <span class="visually-hidden">Меньше</span>
            </button>
            <input
              type="text"
              name="counter"
              class="counter__input"
              :value="miscItem.multiplier"
            />
            <button
              type="button"
              class="counter__button counter__button--plus counter__button--orange"
              @click.prevent="addMiscItem(miscItem)"
            >
              <span class="visually-hidden">Больше</span>
            </button>
          </div>

          <div class="additional-list__price">
            <b>× {{ miscItem.price }} ₽</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CartAdditional",
  props: {
    misc: {
      type: Array,
      required: true,
    },
  },
  methods: {
    ...mapActions("Cart", ["updateMiscItem"]),
    addMiscItem(miscItem) {
      return this.updateMiscItem({
        ...miscItem,
        add: true,
      });
    },
    removeMiscItem(miscItem) {
      return this.updateMiscItem({
        ...miscItem,
        add: false,
      });
    },
  },
};
</script>

<style scoped></style>
