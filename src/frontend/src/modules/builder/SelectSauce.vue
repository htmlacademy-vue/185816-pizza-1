<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <RadioButton
            :class="['radio', 'ingredients__input']"
            v-for="{ id, name, ...other } of items"
            :key="id"
            name="sauce"
            :id="id"
            :value="id"
            :checked="checked"
            @change="setItem({ id, name, ...other })"
          >
            <b>{{ name }}</b>
          </RadioButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/RadioButtonNew";
import { BuilderCollection } from "@/common/enums/builder";

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
    builder: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    checked() {
      return this.builder[BuilderCollection.SAUCES].id;
    },
  },
  methods: {
    setItem(item) {
      console.log("Set sauce", item);
      this.$emit("setItem", {
        property: BuilderCollection.SAUCES,
        item,
      });
    },
  },
};
</script>
