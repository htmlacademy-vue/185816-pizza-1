<template>
  <form method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>
        <ul>
          <li
            v-for="(item, idx) of orders"
            :key="idx"
            class="item"
            @click="CHECK(item)"
          >
            {{ item }}
          </li>
        </ul>
        <div class="sheet cart__empty">
          <p>В корзине нет ни одного товара {{ totalPrice }}</p>
        </div>
        <div>
          <!--          <cart-orders :items="orders" />-->
          <!--          <cart-additional :items="misc" />-->
          <!--          <cart-form />-->
        </div>
      </div>
    </main>
    <!--    <cart-footer :sum="sumOrders" />-->
  </form>
</template>

<script>
// import CartFooter from "@/modules/cart/CartFooter";
import { mapGetters, mapMutations, mapState } from "vuex";
// import CartOrders from "@/modules/cart/CartOrders";
// import CartAdditional from "@/modules/cart/CartAdditional";
// import CartForm from "@/modules/cart/CartForm";

export default {
  name: "CartView",
  // components: {
  //   CartOrders,
  //   CartFooter,
  //   CartAdditional,
  //   CartForm,
  // },
  computed: {
    ...mapState("Cart", ["orders", "misc"]),
    ...mapGetters("Cart", ["totalPrice"]),
  },
  methods: {
    ...mapMutations("Cart", ["CHECK"]),
  },
};
</script>

<style scoped></style>
