<template>
  <main class="content">
    <form action="#" method="post">
      }
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <SelectDough
          :items="dough"
          :builder="builder"
          @setItem="setBinaryProperty"
        />
        <SelectDiameter
          :items="sizes"
          :builder="builder"
          @setItem="setBinaryProperty"
        />
        <SelectIngredients>
          <template #select-sauce>
            <SelectSauce
              :items="sauces"
              :builder="builder"
              @setItem="setBinaryProperty"
            />
          </template>
          <SelectFilling
            :items="ingredientsMerge"
            @setItem="addCollectionProperty"
            @deleteItem="removeCollectionProperty"
          />
        </SelectIngredients>
        <ResultBuilder
          :total-price="totalPrice"
          :item="{ ...builder, selectedIngredients }"
          @setItem="addCollectionProperty"
          @build="build"
        />
      </div>
    </form>
  </main>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
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
    ...mapState("Builder", [
      "ingredients",
      "sauces",
      "dough",
      "sizes",
      "builder",
    ]),
    ...mapGetters("Builder", ["selectedIngredients", "totalPrice"]),
    ingredientsMerge() {
      return this.ingredients.map((item) => {
        const searchItem = this.selectedIngredients.find(
          (subItem) => subItem.id === item.id
        );

        if (searchItem) {
          return {
            ...item,
            ...searchItem,
          };
        }

        return item;
      });
    },
  },
  methods: {
    ...mapActions("Builder", [
      "setBinaryProperty",
      "addCollectionProperty",
      "removeCollectionProperty",
    ]),
    ...mapActions("Cart", ["addOrder"]),
    build(item) {
      this.addOrder(item);
      this.$router.push("cart");
    },
  },
};
</script>
