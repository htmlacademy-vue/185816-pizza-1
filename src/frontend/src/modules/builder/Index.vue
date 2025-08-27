<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        {{ builder }}
        <h1 class="title title--big">Конструктор пиццы</h1>
        <SelectDough :items="doughs" @setItem="setBinaryProperty" />
        <SelectDiameter :items="sizes" @setItem="setBinaryProperty" />
        <SelectIngredients :items="ingredients">
          <template #select-sauce>
            <SelectSauce :items="sauces" @setItem="setBinaryProperty" />
          </template>
          <SelectFilling
            :items="ingredients"
            @setItem="addCollectionProperty"
          />
        </SelectIngredients>
        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <div class="content__constructor">
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas"></div>
                <div class="pizza__filling pizza__filling--bacon"></div>
                <div class="pizza__filling pizza__filling--cheddar"></div>
              </div>
            </div>
          </div>

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import { mapActions, mapState } from "vuex";
import SelectDough from "@/modules/builder/SelectDough.vue";
import SelectDiameter from "@/modules/builder/SelectDiameter.vue";
import SelectIngredients from "@/modules/builder/SelectIngredients.vue";
import SelectSauce from "@/modules/builder/SelectSauce.vue";
import SelectFilling from "@/modules/builder/SelectFilling.vue";

export default {
  name: "BuilderPizzaView",
  components: {
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
      "doughs",
      "sizes",
      "builder",
    ]),
  },
  methods: {
    ...mapActions("Builder", ["setBinaryProperty", "addCollectionProperty"]),
  },
};
</script>
