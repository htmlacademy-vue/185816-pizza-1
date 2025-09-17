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
          :checked="selectItem.id === id ? id : null"
          @change="
            $emit('replace', {
              entity,
              payload: { id, image, name, description, ...other },
            })
          "
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
import { Builder } from "@/common/enums/entity";

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
    selectItem: {
      type: [Object, Array],
      required: true,
    },
  },
  computed: {
    entity: () => Builder.DOUGH,
    itemsNormalize() {
      return this.items.map(({ image, ...item }) => ({
        ...item,
        image: replacePath(image).split("-").at(-1),
      }));
    },
  },
};
</script>
