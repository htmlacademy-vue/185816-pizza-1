<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <RadioButton
          v-for="{ id, image, name, description, ...other } of itemsNormalize"
          :key="id"
          :class="['dough__input', `dough__input--${image}`]"
          hidden
          name="dough"
          :value="id"
          @change="setItem({ id, image, name, description, ...other })"
          v-model="checked"
        >
          <b>{{ name }}</b>
          <span>{{ description }}</span>
        </RadioButton>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/RadioButtonNew";
import { replacePath } from "@/modules/utils";
import { PropertyBuilder } from "@/common/enums/builder";

export default {
  name: "SelectDough",
  components: {
    RadioButton,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      checked: 2,
    };
  },
  computed: {
    itemsNormalize() {
      return this.items.map(({ image, ...item }) => ({
        ...item,
        image: replacePath(image),
      }));
    },
    checkedItem() {
      return (
        this.itemsNormalize.filter(({ id }) => id === this.checked).at(0) || {}
      );
    },
  },
  created() {
    this.setItem(this.checkedItem);
  },
  methods: {
    setItem(item) {
      console.log("Checked dough", item);
      this.$emit("setItem", {
        property: PropertyBuilder.DOUGH,
        item,
      });
    },
  },
};
</script>
