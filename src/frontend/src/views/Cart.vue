<template>
  <form method="post" class="layout-form">
    <slot name="popup" />
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>
        <div class="sheet cart__empty" v-if="isEmpty">
          <p>В корзине нет ни одного товара</p>
        </div>
        <div v-else>
          <cart-orders
            @update="updateItem"
            @delete="deleteItemOrder"
            @edit="editOrder"
            :items="pizzas"
          />
          <cart-additional
            @add="addItem"
            @delete="deleteItem"
            @update="updateItem"
            :items="misc"
          />
          <cart-form
            @set="(data) => (address = data)"
            :phone="isAuthenticated ? user.phone : ''"
            :addresses="addresses"
          />
        </div>
      </div>
    </main>
    <cart-footer @makeOrder="makeOnOrder" />
    <router-view />
  </form>
</template>

<script>
import CartFooter from "@/modules/cart/CartFooter";
import { mapActions, mapGetters, mapState } from "vuex";
import CartOrders from "@/modules/cart/CartOrders";
import CartAdditional from "@/modules/cart/CartAdditional";
import CartForm from "@/modules/cart/CartForm";
import { Cart } from "@/common/enums/entity";

export default {
  name: "CartView",
  components: {
    CartOrders,
    CartFooter,
    CartAdditional,
    CartForm,
  },
  data() {
    return {
      address: {},
    };
  },
  computed: {
    ...mapState(["misc"]),
    ...mapState("Auth", ["user", "isAuthenticated"]),
    ...mapState("Cart", {
      pizzas: (state) => state[Cart.ORDERS],
      orderMisc: (state) => state[Cart.MISC],
    }),
    ...mapState("Address", {
      addresses: "items",
    }),
    ...mapGetters("Cart", ["isEmpty", "sumOrders", "selectMisc"]),
  },
  async mounted() {
    if (this.isAuthenticated) {
      await this.fetchAddresses();
    }
  },
  methods: {
    ...mapActions("Cart", ["deleteItem", "updateItem", "addItem", "clearCart"]),
    ...mapActions("Address", {
      fetchAddresses: "fetchItems",
    }),
    editOrder(payload) {
      this.$store.state.Builder = payload;

      this.$router.push("/");
    },
    deleteItemOrder(payload) {
      this.deleteItem(payload);

      if (this.pizzas.length < 1) {
        this.clearCart();
      }
    },
    async makeOnOrder() {
      const { phone, type, ...address } = this.address;
      const pizzas = this.pizzas.map(
        ({ doughId, sizeId, sauceId, name, ingredients, quantity }) => ({
          name,
          doughId,
          sauceId,
          sizeId,
          quantity,
          ingredients: ingredients.map(({ id, quantity }) => ({
            ingredientId: id,
            quantity,
          })),
        })
      );

      const misc = this.orderMisc.map(({ id, quantity }) => ({
        miscId: id,
        quantity,
      }));

      let request = {
        phone: this.isAuthenticated ? this.user.phone : phone,
        misc,
        pizzas,
      };

      if (this.isAuthenticated) {
        if (type < 0) {
          request["address"] = address;
        }

        if (type > 0) {
          request["addressId"] = type;
        }

        if (type === 0) {
          request["address"] = null;
        }

        request = {
          userId: this.user.id,
          ...request,
        };
        await this.$api.orders.post(request);
      } else {
        console.log({ address: { ...this.address }, ...request });
      }

      await this.clearCart();
      await this.$router.push("cart/success-popup");
    },
  },
};
</script>
