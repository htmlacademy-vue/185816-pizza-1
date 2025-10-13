<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>
      <div class="sheet__content diameter">
        <UiRadioButton
          v-for="{ id, name } of items"
          :key="id"
          :class="['diameter__input', `diameter__input--${sizeMap[id]}`]"
          name="diameter"
          hidden
          :value="id"
          :checked="selectItem"
          @change="
            $emit('replace', {
              entity,
              payload: id,
            })
          "
        >
          <span>{{ name }}</span>
        </UiRadioButton>
      </div>
    </div>
  </div>
</template>

<script>
import { Builder } from "@/common/enums/entity";

const sizeMap = ["small", "normal", "big"];

export default {
  name: "SelectDiameter",
  props: {
    items: {
      type: Array,
      required: true,
    },
    selectItem: {
      type: [Number, Array],
      required: true,
    },
  },
  data: () => ({
    entity: Builder.SIZES,
    sizeMap,
  }),
};
</script>
