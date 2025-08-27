<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>
      <div class="sheet__content diameter">
        <RadioButton
          v-for="({ id, name, ...other }, idx) of items"
          :key="id"
          :class="['diameter__input', `diameter__input--${sizeMap[idx]}`]"
          name="diameter"
          hidden
          :value="id"
          @change="setItem({ id, name, ...other })"
          v-model="checked"
        >
          <b>{{ name }}</b>
        </RadioButton>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/RadioButtonNew";
import PropertyBuilder from "@/common/enums/property-builder";

const sizeMap = ["small", "normal", "big"];

export default {
  name: "SelectDiameter",
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
    sizeMap: () => sizeMap,
    checkedItem() {
      return this.items.filter(({ id }) => id === this.checked).at(0) || {};
    },
  },
  mounted() {
    this.setItem(this.checkedItem);
  },
  methods: {
    setItem(item) {
      console.log("Set diameter", item);
      this.$emit("setItem", { property: PropertyBuilder.SIZE, item });
    },
  },
};
</script>
