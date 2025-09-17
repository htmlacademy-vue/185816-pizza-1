<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>
    <RadioButton
      :class="['radio', 'ingredients__input']"
      v-for="{ id, name, ...other } of items"
      :key="id"
      name="sauce"
      :id="id"
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
</template>

<script>
import RadioButton from "@/common/RadioButtonNew";
import { Builder } from "@/common/enums/entity";

export default {
  name: "SelectSauce",
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
    builder: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    entity: () => Builder.SAUCES,
  },
};
</script>
