<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <RadioButton
          v-for="size in sizes"
          :key="size.id"
          :className="[
            'diameter__input',
            `diameter__input--${sizesMap[size.id]}`,
          ]"
          name="diameter"
          :value="size.id"
          :title="size.name"
          :hidden="true"
          :checked="true"
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
};
</script>
