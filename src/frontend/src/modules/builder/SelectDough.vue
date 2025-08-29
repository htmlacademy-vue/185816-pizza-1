<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <RadioButton
          v-for="{ id, image, name, description, checked } of itemsNormalize"
          :key="id"
          :class="['dough__input', `dough__input--${image}`]"
          hidden
          name="dough"
          :value="id"
          :checked="checked ? id : null"
          @change="setItem"
        >
          <b>{{ name }}</b> {{ checked }}
          <span>{{ description }}</span>
        </RadioButton>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/RadioButtonNew";
import { replacePath } from "@/modules/utils";

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
  computed: {
    itemsNormalize() {
      return this.items.map(({ image, ...item }) => ({
        ...item,
        image: replacePath(image),
      }));
    },
  },
  methods: {
    setItem(id) {
      this.$emit("setItem", { collection: "dough", id });
    },
  },
};
</script>
