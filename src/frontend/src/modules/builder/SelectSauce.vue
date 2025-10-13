<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>
    <UiRadioButton
      :class="['radio', 'ingredients__input']"
      v-for="{ id, name } of items"
      :key="id"
      name="sauce"
      :id="id"
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
</template>

<script>
import { Builder } from "@/common/enums/entity";

export default {
  name: "SelectSauce",
  props: {
    items: {
      type: Array,
      required: true,
    },
    selectItem: {
      type: [Number, Array],
      required: true,
    },
    builder: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    entity: Builder.SAUCES,
  }),
};
</script>
