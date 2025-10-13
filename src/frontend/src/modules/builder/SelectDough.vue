<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <UiRadioButton
          v-for="{ id, image, name, description } of itemsNormalize"
          :key="id"
          :class="['dough__input', `dough__input--${image}`]"
          hidden
          name="dough"
          :value="id"
          :checked="selectItem"
          @change="
            $emit('replace', {
              entity,
              payload: id,
            })
          "
        >
          <b>{{ name }}</b>
          <span>{{ description }}</span>
        </UiRadioButton>
      </div>
    </div>
  </div>
</template>

<script>
import { replacePath } from "@/modules/utils";
import { Builder } from "@/common/enums/entity";

export default {
  name: "SelectDough",
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
    entity: Builder.DOUGH,
  }),
  computed: {
    itemsNormalize() {
      return this.items.map(({ image, ...item }) => ({
        ...item,
        image: replacePath(image).split("-").at(-1),
      }));
    },
  },
};
</script>
