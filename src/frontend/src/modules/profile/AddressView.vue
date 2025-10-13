<template>
  <div class="layout__address">
    <div class="sheet address-form" v-if="!isEdit">
      <div class="address-form__header">
        <b>{{ item.name }}</b>
        <div class="address-form__edit">
          <button type="button" class="icon" @click="edit">
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <p>{{ item.street }}, д. {{ item.building }}, кв. {{ item.flat }}</p>
      <small v-if="item.comment">{{ item.comment }}</small>
    </div>
    <address-form
      :item="item"
      v-if="isEdit"
      :order="order"
      @delete="(item) => $emit('delete', item)"
      @update="update"
    />
  </div>
</template>

<script>
import AddressForm from "@/modules/profile/AddressForm.vue";

export default {
  name: "AddressView",
  components: { AddressForm },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isEdit: false,
    };
  },
  methods: {
    edit() {
      this.isEdit = true;
    },
    update(data) {
      this.isEdit = false;
      this.$emit("update", data);
    },
  },
};
</script>
