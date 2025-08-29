<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li
        class="additional-list__item sheet"
        v-for="{ id, image, name, multiplier, price } of items"
        :key="id"
      >
        <p class="additional-list__description">
          <img
            :src="require(`@/assets/img/${image}`)"
            width="39"
            height="60"
            :alt="name"
          />
          <span>{{ name }}</span>
        </p>

        <div class="additional-list__wrapper">
          <div class="counter additional-list__counter">
            <button
              type="button"
              class="counter__button counter__button--minus"
              :disabled="multiplier === 0"
              @click.prevent="
                updateMisc({
                  id,
                  payload: {
                    multiplier: (multiplier -= 1),
                  },
                })
              "
            >
              <span class="visually-hidden">Меньше</span>
            </button>
            <input
              type="text"
              name="counter"
              class="counter__input"
              :value="multiplier"
            />
            <button
              type="button"
              class="counter__button counter__button--plus counter__button--orange"
              @click.prevent="
                updateMisc({
                  id,
                  payload: {
                    multiplier: (multiplier += 1),
                  },
                })
              "
            >
              <span class="visually-hidden">Больше</span>
            </button>
          </div>

          <div class="additional-list__price">
            <b>× {{ price }} ₽</b>
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
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    ...mapActions("Cart", ["updateMisc"]),
  },
};
</script>

<style scoped></style>
