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
          :checked="selectItem.id === id ? id : null"
          @change="
            $emit('replace', {
              entity,
              payload: { id, name, ...other },
            })
          "
        >
          <span>{{ name }}</span>
        </RadioButton>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/RadioButtonNew";
import { Builder } from "@/common/enums/entity";

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
    selectItem: {
      type: [Object, Array],
      required: true,
    },
  },
  computed: {
    sizeMap: () => sizeMap,
    entity: () => Builder.SIZES,
  },
};
</script>
