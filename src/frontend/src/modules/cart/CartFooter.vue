<template>
  <section class="footer">
    <div class="footer__more">
      <a
        href="#"
        class="button button--border button--arrow"
        @click.prevent="$router.push('/')"
        >Хочу еще одну
      </a>
    </div>
    <p class="footer__text">
      Перейти к конструктору<br />чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b>Итого: {{ totalPrice + calculateItems(selectMisc) }} ₽</b>
    </div>

    <div class="footer__submit">
      <button
        type="submit"
        class="button"
        @click.prevent="$emit('makeOrder')"
        :disabled="orders.length < 1"
      >
        Оформить заказ
      </button>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { calculateItems } from "@/common/utils";

export default {
  name: "CartFooter",
  computed: {
    ...mapState("Cart", ["orders"]),
    ...mapGetters("Cart", ["totalPrice", "selectMisc"]),
  },
  methods: {
    calculateItems,
  },
};
</script>
