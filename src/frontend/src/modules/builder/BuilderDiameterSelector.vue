<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <RadioButton
          v-for="size in sizes"
          :key="size.id"
          :class="['diameter__input', `diameter__input--${sizesMap[size.id]}`]"
          name="diameter"
          :id="size.id"
          :value="size.multiplier"
          :title="size.name"
          hidden
          :checked="size.id === 2"
          @setValue="setSize"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/RadioButton";
import sizesMap from "@/common/sizesMap";

export default {
  name: "BuilderDiameterSelector",
  components: {
    RadioButton,
  },
  props: {
    sizes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      sizesMap,
    };
  },
  methods: {
    /**
     * Emit parent value
     * @param {object} size
     *
     * {
     *   id: Number,
     *   value: Number
     * }
     */
    setSize(size) {
      console.log(size);
      this.$emit("setSize", size);
    },
  },
};
</script>
