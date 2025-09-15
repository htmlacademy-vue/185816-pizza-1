<template>
  <form method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>
        <div class="sheet cart__empty" v-if="isEmpty">
          <p>В корзине нет ни одного товара</p>
          <cart-additional :items="misc" />
        </div>
        <div v-else>
          <cart-orders :items="orders" />
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
    ...mapGetters("Cart", ["isEmpty", "sumOrders"]),
    ...mapState(["misc"]),
  },
};
</script>

<style scoped></style>
