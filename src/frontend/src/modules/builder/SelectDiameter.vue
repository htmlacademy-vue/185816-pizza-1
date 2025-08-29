<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>
      <div class="sheet__content diameter">
        <RadioButton
          v-for="({ id, name, checked }, idx) of items"
          :key="id"
          :class="['diameter__input', `diameter__input--${sizeMap[idx]}`]"
          name="diameter"
          hidden
          :value="id"
          :checked="checked ? id : null"
          @change="$emit('setItem', id)"
        >
          <b>{{ name }}</b>
        </RadioButton>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/RadioButtonNew";

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
  computed: {
    sizeMap: () => sizeMap,
  },
};
</script>
