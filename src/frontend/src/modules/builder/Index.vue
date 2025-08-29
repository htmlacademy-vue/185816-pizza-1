<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        {{ dough }}
        <SelectDough :items="dough" @setItem="setCheckedCollection" />
        <!--        <SelectDiameter-->
        <!--          :items="sizes"-->
        <!--          @setItem="-->
        <!--            (id) =>-->
        <!--              setCheckedCollection({ collection: BuilderCollection.SIZES, id })-->
        <!--          "-->
        <!--        />-->
        <!--        <SelectIngredients>-->
        <!--          <template #select-sauce>-->
        <!--            <SelectSauce :items="sauces" />-->
        <!--          </template>-->
        <!--          <SelectFilling :items="ingredients" />-->
        <!--        </SelectIngredients>-->
        <!--        <ResultBuilder-->
        <!--          :total-price="totalPrice"-->
        <!--          :item="{ ...builder, selectedIngredients }"-->
        <!--          @setItem="addCollectionProperty"-->
        <!--          @build="build"-->
        <!--        />-->
      </div>
    </form>
  </main>
</template>

<script>
// import { BuilderCollection } from "@/common/enums/builder";
import { mapActions, mapState } from "vuex";
import SelectDough from "@/modules/builder/SelectDough.vue";
// import SelectDiameter from "@/modules/builder/SelectDiameter.vue";
// import SelectIngredients from "@/modules/builder/SelectIngredients.vue";
// import SelectSauce from "@/modules/builder/SelectSauce.vue";
// import SelectFilling from "@/modules/builder/SelectFilling/Index.vue";
// import ResultBuilder from "@/modules/builder/ResultBuilder.vue";

export default {
  name: "BuilderPizzaView",
  components: {
    // ResultBuilder,
    // SelectFilling,
    // SelectSauce,
    // SelectIngredients,
    // SelectDiameter,
    SelectDough,
  },
  computed: {
    // BuilderCollection: () => BuilderCollection,
    ...mapState("Builder", ["ingredients", "sauces", "dough", "sizes"]),
  },
  methods: {
    ...mapActions("Builder", ["setCheckedCollection"]),
    ...mapActions("Cart", ["addOrder"]),
    build(item) {
      this.addOrder(item);
      this.initBuilder();
      this.$router.push("cart");
    },
  },
};
</script>
