<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <RadioButton
          v-for="dough in doughs"
          :key="dough.id"
          :class="['dough__input', `dough__input--${dough.image}`]"
          name="dough"
          :id="dough.id"
          :value="dough.price"
          :title="dough.name"
          hidden
          :checked="dough.selected"
          @setValue="setDough"
        >
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </RadioButton>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/RadioButton";

export default {
  name: "BuilderDoughSelector",
  components: {
    RadioButton,
  },
  props: {
    doughs: {
      type: Array,
      required: true,
    },
  },
  methods: {
    /**
     * Emit value to parent
     * @param {object} dough
     *
     * {
     *   id: Number,
     *   value: Number
     * }
     */
    setDough(dough) {
      this.$emit("setDough", dough);
    },
  },
};
</script>
