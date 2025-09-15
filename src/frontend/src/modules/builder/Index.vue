<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <!--        <pre>-->
        <!--          {{ $store.state.Builder }}-->
        <!--        </pre>-->
        <h1 class="title title--big">Конструктор пиццы</h1>
        <SelectDough
          :items="dough"
          :select-item="selectDough"
          @setItem="
            (payload) =>
              updateItem({ entity: BuilderCollection.DOUGH, payload })
          "
        />
        <SelectDiameter
          :items="sizes"
          :select-item="selectSize"
          @setItem="
            (payload) =>
              updateItem({ entity: BuilderCollection.SIZES, payload })
          "
        />
        <SelectIngredients>
          <template #select-sauce>
            <SelectSauce
              :items="sauces"
              :select-item="selectSauce"
              @setItem="
                (payload) =>
                  updateItem({ entity: BuilderCollection.SAUCES, payload })
              "
            />
          </template>
          <SelectFilling
            :items="ingredients"
            :select-items="selectIngredients"
            @setItem="
              (payload) =>
                updateItem({ entity: BuilderCollection.INGREDIENTS, payload })
            "
          />
        </SelectIngredients>
        <ResultBuilder
          :item="builder"
          @setItem="
            (payload) =>
              updateItem({ entity: BuilderCollection.INGREDIENTS, payload })
          "
          @build="build"
        />
      </div>
    </form>
  </main>
</template>

<script>
import { BuilderCollection } from "@/common/enums/builder";
import { mapActions, mapState } from "vuex";
import SelectDough from "@/modules/builder/SelectDough.vue";
import SelectDiameter from "@/modules/builder/SelectDiameter.vue";
import SelectIngredients from "@/modules/builder/SelectIngredients.vue";
import SelectSauce from "@/modules/builder/SelectSauce.vue";
import SelectFilling from "@/modules/builder/SelectFilling/Index.vue";
import ResultBuilder from "@/modules/builder/ResultBuilder.vue";

export default {
  name: "BuilderPizzaView",
  components: {
    ResultBuilder,
    SelectFilling,
    SelectSauce,
    SelectIngredients,
    SelectDiameter,
    SelectDough,
  },
  computed: {
    BuilderCollection: () => BuilderCollection,
    ...mapState([
      ...Object.keys(BuilderCollection).map((item) => item.toLowerCase()),
    ]),
    ...mapState("Builder", {
      selectDough: (state) => state[BuilderCollection.DOUGH],
      selectSize: (state) => state[BuilderCollection.SIZES],
      selectSauce: (state) => state[BuilderCollection.SAUCES],
      selectIngredients: (state) => state[BuilderCollection.INGREDIENTS],
      builder: (state) => state,
    }),
  },
  methods: {
    ...mapActions("Cart", ["addOrder"]),
    ...mapActions("Builder", ["updateItem"]),
    ...mapActions(["init"]),
    async build(item) {
      await this.addOrder(item);
      await this.init();
      await this.$router.push("cart");
    },
  },
};
</script>
