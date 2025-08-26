<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      {{ doughs }}
      {{ checked }}
      <div class="sheet__content dough">
        <RadioButton
          v-for="{ id, image, name, description } of doughsNormalize"
          :key="id"
          :class="['dough__input', `dough__input--${image}`]"
          hidden
          name="dough"
          :value="id"
          @change="setDough"
          v-model="checked"
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
  data() {
    return {
      checked: 0,
    };
  },
  computed: {
    doughsNormalize() {
      return this.doughs.map(({ image, ...item }) => ({
        ...item,
        image: image.match(/-.+\./g).at(0).replace("-", "").replace(".", ""),
      }));
    },
  },
  methods: {
    /**
     * Emit value to parent
     *
     * {
     *   id: Number,
     *   value: Number
     * }
     * @param id
     */
    setDough(id) {
      console.log(id);
      this.$emit("setDough", id);
    },
  },
};
</script>
