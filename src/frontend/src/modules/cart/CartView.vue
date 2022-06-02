<template>
  <form method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>
        <div class="sheet cart__empty" v-if="countOrders < 1">
          <p>В корзине нет ни одного товара</p>
        </div>
        <div v-else>
          <cart-orders :pizzas="orders" />
          <cart-additional />
          <cart-form />
        </div>
      </div>
    </main>
    <cart-footer :sum="sumOrders" />
  </form>
</template>

<script>
import CartFooter from "@/modules/cart/CartFooter";
import { mapGetters, mapState } from "vuex";
import CartOrders from "@/modules/cart/CartOrders";
import CartAdditional from "@/modules/cart/CartAdditional";
import CartForm from "@/modules/cart/CartForm";

export default {
  name: "CartView",
  components: {
    CartOrders,
    CartFooter,
    CartAdditional,
    CartForm,
  },
  computed: {
    ...mapState("Cart", ["orders"]),
    ...mapGetters("Cart", ["sumOrders"]),
    countOrders() {
      return this.orders.length;
    },
  },
};
</script>

<style scoped></style>
