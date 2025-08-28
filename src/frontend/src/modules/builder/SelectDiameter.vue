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
          :checked="checked"
          @change="setItem({ id, name, ...other })"
        >
          <b>{{ name }}</b>
        </RadioButton>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/RadioButtonNew";
import { BuilderProperty } from "@/common/enums/builder";

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
    builder: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    sizeMap: () => sizeMap,
    checked() {
      return this.builder[BuilderProperty.SIZE].id;
    },
  },
  methods: {
    setItem(item) {
      console.log("Set diameter", item);
      this.$emit("setItem", { property: BuilderProperty.SIZE, item });
    },
  },
};
</script>
