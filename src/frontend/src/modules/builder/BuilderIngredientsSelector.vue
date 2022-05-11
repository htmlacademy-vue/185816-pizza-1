<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <RadioButton
            v-for="sauce in sauces"
            :key="sauce.id"
            :className="['radio', 'ingredients__input']"
            name="sauce"
            :value="sauce.id"
            :title="sauce.name"
            @input="getSauce"
          />
        </div>
        <BuilderFillingList
          :ingredients="ingredients"
          @getIngredients="getIngredients"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/RadioButton";
import BuilderFillingList from "@/modules/builder/BuilderFillingList";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    RadioButton,
    BuilderFillingList,
  },
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
    sauces: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getSauce(sauceId) {
      this.$emit("setSauce", sauceId);
    },
    getIngredients(ingredients) {
      this.$emit("setIngredients", ingredients);
    },
  },
};
</script>
