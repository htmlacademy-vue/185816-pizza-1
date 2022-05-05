<template>
  <form action="#" method="post">
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>
      <div class="content__dough">
        <div class="sheet">
          <h2 class="title title--small sheet__title">Выберите тесто</h2>
          <div class="sheet__content dough">
            <label
              v-for="dough in transformDoughs"
              :key="dough.id"
              :class="`dough__input dough__input--${dough.image}`"
            >
              <input
                type="radio"
                name="dought"
                value="light"
                class="visually-hidden"
                checked
              />
              <b>{{ dough.name }}</b>
              <span>{{ dough.description }}</span>
            </label>
          </div>
        </div>
      </div>
      <div class="content__diameter">
        <div class="sheet">
          <h2 class="title title--small sheet__title">Выберите размер</h2>

          <div class="sheet__content diameter">
            <label
              v-for="size in sizes"
              :key="size.id"
              :class="`diameter__input diameter__input--${sizesMap[size.id]}`"
            >
              <input
                type="radio"
                name="diameter"
                :value="size.id"
                class="visually-hidden"
              />
              <span>{{ size.name }}</span>
            </label>
          </div>
        </div>
      </div>
      <div class="content__ingredients">
        <div class="sheet">
          <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

          <div class="sheet__content ingredients">
            <div class="ingredients__sauce">
              <p>Основной соус:</p>

              <label
                class="radio ingredients__input"
                v-for="sauce in sauces"
                :key="sauce.id"
              >
                <input type="radio" name="sauce" :value="sauce.id" checked />
                <span>{{ sauce.name }}</span>
              </label>
            </div>

            <div class="ingredients__filling">
              <p>Начинка:</p>

              <ul class="ingredients__list">
                <li
                  class="ingredients__item"
                  v-for="ingredient in transformIngredients"
                  :key="ingredient.id"
                >
                  <span :class="`filling filling--${ingredient.image}`">
                    {{ ingredient.name }}
                  </span>

                  <div class="counter counter--orange ingredients__counter">
                    <button
                      type="button"
                      class="counter__button counter__button--minus"
                      disabled
                    >
                      <span class="visually-hidden">Меньше</span>
                    </button>
                    <input
                      type="text"
                      name="counter"
                      class="counter__input"
                      value="0"
                    />
                    <button
                      type="button"
                      class="counter__button counter__button--plus"
                    >
                      <span class="visually-hidden">Больше</span>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

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
</template>

<script>
import pizza from "../static/pizza.json";
import sizesMap from "../common/sizesMap";

export default {
  name: "IndexPage",
  data() {
    return {
      ingredients: pizza.ingredients,
      sauces: pizza.sauces,
      sizes: pizza.sizes,
      doughs: pizza.dough,
      sizesMap,
    };
  },
  computed: {
    transformIngredients: function () {
      return this.ingredients.map((ingredient) => ({
        id: ingredient.id,
        name: ingredient.name,
        image: ingredient.image.split("/").pop().split(".").shift(),
        price: ingredient.price,
      }));
    },
    transformDoughs: function () {
      return this.doughs.map((dough) => ({
        id: dough.id,
        name: dough.name,
        image: dough.image.split("/").pop().split(".").shift().split("-").pop(),
        description: dough.description,
        price: dough.price,
      }));
    },
  },
};
</script>

<style scoped></style>
