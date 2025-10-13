<template>
  <form
    @submit.prevent.stop="onSubmit"
    action="test.html"
    method="post"
    class="address-form address-form--opened sheet"
  >
    <div class="address-form__header">
      <b>Адрес № {{ order }}</b>
    </div>

    <div class="address-form__wrapper">
      <div class="address-form__input">
        <label class="input">
          <span>Название адреса*</span>
          <input
            type="text"
            name="name"
            placeholder="Введите название адреса"
            v-validate="['required']"
            :style="{
              borderColor: currentError('name') ? 'crimson' : 'gray',
            }"
            v-model="formData['name']"
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--normal">
        <label class="input">
          <span>Улица*</span>
          <input
            type="text"
            name="street"
            placeholder="Введите название улицы"
            v-validate="['required']"
            :style="{
              borderColor: currentError('street') ? 'crimson' : 'gray',
            }"
            v-model="formData['street']"
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Дом*</span>
          <input
            type="text"
            name="building"
            placeholder="Введите номер дома"
            v-validate="['required']"
            :style="{
              borderColor: currentError('building') ? 'crimson' : 'gray',
            }"
            v-model="formData['building']"
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Квартира</span>
          <input
            type="text"
            name="flat"
            placeholder="Введите № квартиры"
            v-model="formData['flat']"
          />
        </label>
      </div>
      <div class="address-form__input">
        <label class="input">
          <span>Комментарий</span>
          <input
            type="text"
            name="comment"
            placeholder="Введите комментарий"
            v-model="formData['comment']"
          />
        </label>
      </div>
    </div>

    <div class="address-form__buttons">
      <button
        v-if="!createOnly"
        type="button"
        class="button button--transparent"
        @click="$emit('delete', item)"
      >
        Удалить
      </button>
      <button type="submit" class="button">Сохранить</button>
    </div>
  </form>
</template>
<script>
import { CrudCollection } from "@/common/heplers";

export default {
  name: "AddressForm",
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    createOnly: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      formData: {},
      errors: [],
    };
  },
  mounted() {
    this.formData = { ...this.formData, ...this.item };
  },
  computed: {
    currentError: function () {
      return function (id) {
        return CrudCollection.getElement(this.errors, (item) =>
          item.id.match(id)
        );
      };
    },
  },
  methods: {
    onSubmit() {
      if (this.createOnly) {
        return this.$emit("create", this.formData);
      }

      return this.$emit("update", this.formData);
    },
  },
};
</script>
