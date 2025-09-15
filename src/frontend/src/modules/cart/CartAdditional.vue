<template>
  <div class="cart__additional">
    {{ misc }}
    <ul class="additional-list">
      <li
        class="additional-list__item sheet"
        v-for="{ id, image, name, quantity = 0, price } of quantifiedItems"
        :key="id"
      >
        <p class="additional-list__description">
          <img :src="image" width="39" height="60" :alt="name" />
          <span>{{ name }}</span>
        </p>

        <div class="additional-list__wrapper">
          <div class="counter additional-list__counter">
            <button
              type="button"
              class="counter__button counter__button--minus"
              :disabled="quantity === 0"
              @click="
                changeItem(
                  {
                    id,
                    image,
                    name,
                    quantity: (quantity -= 1),
                    price,
                  },
                  quantity + 1,
                  quantity
                )
              "
            >
              <span class="visually-hidden">Меньше</span>
            </button>
            <input
              type="text"
              name="counter"
              class="counter__input"
              disabled
              :value="quantity"
            />
            <button
              type="button"
              class="counter__button counter__button--plus counter__button--orange"
              @click="
                changeItem(
                  {
                    id,
                    image,
                    name,
                    quantity: (quantity += 1),
                    price,
                  },
                  quantity - 1,
                  quantity
                )
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
import { mapActions, mapGetters, mapState } from "vuex";

const entity = "misc";

export default {
  name: "CartAdditional",
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      quantity: 0,
    };
  },
  computed: {
    ...mapState("Cart", ["misc"]),
    ...mapGetters(["getEntityByID"]),
    quantifiedItems() {
      return this.items.map((item) => {
        const newItem = this.getEntityByID({
          module: "Cart",
          entity,
          id: item.id,
        });

        return { ...item, quantity: newItem ? newItem.quantity : 0 };
      });
    },
  },
  methods: {
    ...mapActions("Cart", ["addItem", "updateItem", "deleteItem", "clearCart"]),
    changeItem(payload, oldValue, newValue) {
      if (oldValue === 0 && newValue === 1) {
        this.addItem({ entity, payload });
      }

      if (oldValue === 1 && newValue === 0) {
        this.deleteItem({ entity, payload });
      }

      this.updateItem({ entity, payload });
    },
  },
};
</script>

<style scoped></style>
