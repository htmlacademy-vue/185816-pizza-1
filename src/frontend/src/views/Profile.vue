<template>
  <main class="layout">
    <div class="layout__sidebar sidebar">
      <router-link :to="{ name: 'Index' }" class="logo layout__logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>

      <router-link class="layout__link" to="/orders"
        >История заказов
      </router-link>
      <router-link class="layout__link layout__link--active" to="/profile"
        >Мои данные
      </router-link>
    </div>

    <!-- Profile component -->
    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">Мои данные</h1>
      </div>

      <!-- User info -->
      <user-info v-if="user" :item="user" />

      <transition-group
        tag="div"
        leave-active-class="animate__animated animate__backOutLeft"
      >
        <address-view
          v-for="(item, idx) of orderItems"
          :order="idx + 1"
          :key="item.id"
          :item="item"
          @delete="(item) => deleteItem(item)"
          @update="(item) => updateItem(item)"
        />
      </transition-group>
      <transition
        tag="div"
        name="address_form"
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
        class="layout__actions"
      >
        <address-form
          v-if="isCreated"
          :order="orderItems.length + 1"
          @create="submit"
          create-only
        />
      </transition>
      <div class="layout__button">
        <button
          type="button"
          class="button button--border"
          v-show="!isCreated"
          @click.stop="isCreated = !isCreated"
        >
          Добавить новый адрес
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import UserInfo from "@/modules/profile/UserInfo.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import AddressView from "@/modules/profile/AddressView.vue";
import AddressForm from "@/modules/profile/AddressForm.vue";

export default {
  name: "Profile",
  components: { AddressForm, AddressView, UserInfo },
  data() {
    return {
      isCreated: false,
    };
  },
  computed: {
    ...mapState("Auth", ["user"]),
    ...mapGetters("Address", ["orderItems"]),
  },
  async mounted() {
    await this.fetchItems();
  },
  methods: {
    ...mapActions("Address", [
      "fetchItems",
      "createItem",
      "deleteItem",
      "updateItem",
    ]),
    submit(data) {
      this.createItem({ ...data, userId: this.user.id });
      this.isCreated = false;
    },
  },
};
</script>
