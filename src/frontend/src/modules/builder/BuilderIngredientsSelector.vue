<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <RadioButton
            :class="['radio', 'ingredients__input']"
            v-for="sauce in sauces"
            :key="sauce.id"
            name="sauce"
            :id="sauce.id"
            :value="sauce.price"
            :title="sauce.name"
            :checked="sauce.id === 2"
            @setValue="setSauce"
          />
        </div>
        <BuilderFillingList
          :ingredients="ingredients"
          @setIngredient="setIngredient"
          @removeIngredient="removeIngredient"
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
    /**
     * Emit value to parent
     * @param {object} sauce
     *
     * {
     *   id: Number,
     *   value: Number
     * }
     */
    setSauce(sauce) {
      this.$emit("setSauce", sauce);
    },
    /**
     * Emit to parent ingredients
     * @param {object} ingredient
     */
    setIngredient(ingredient) {
      this.$emit("setIngredient", ingredient);
    },
    removeIngredient(ingredient) {
      this.$emit("removeIngredient", ingredient);
    },
  },
};
</script>
