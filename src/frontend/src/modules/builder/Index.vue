<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <!--        <pre>-->
        <!--                          {{ builder }}-->
        <!--                        </pre-->
        <h1 class="title title--big">Конструктор пиццы</h1>
        <SelectDough
          :items="dough"
          :select-item="selectDough"
          @replace="replaceItem"
        />
        <SelectDiameter
          :items="sizes"
          :select-item="selectSize"
          @replace="replaceItem"
        />
        <SelectIngredients>
          <template #select-sauce>
            <SelectSauce
              :items="sauces"
              :select-item="selectSauce"
              @replace="replaceItem"
            />
          </template>
          <SelectFilling
            :items="ingredients"
            :select-items="selectIngredients"
            @add="addItem"
            @update="updateItem"
            @delete="deleteItem"
          />
        </SelectIngredients>
        <ResultBuilder
          :item="builder"
          @build="build"
          @add="addItem"
          @update="updateItem"
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
import { Cart } from "@/common/enums/entity";

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
    ...mapActions("Builder", [
      "updateItem",
      "replaceItem",
      "deleteItem",
      "addItem",
      "clearBuilder",
    ]),
    ...mapActions(["init"]),
    async build(payload) {
      if (payload.id) {
        await this.$store.dispatch("Cart/updateItem", {
          entity: Cart.ORDERS,
          payload,
        });
      } else {
        await this.$store.dispatch("Cart/addItem", {
          entity: Cart.ORDERS,
          payload,
        });
      }

      await this.clearBuilder();
      await this.init();
      await this.$router.push("cart");
    },
  },
};
</script>
