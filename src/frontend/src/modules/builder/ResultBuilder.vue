<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы<sub>*</sub></span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы
          *"
        v-model.trim="name"
        v-validate="['required']"
        :style="{
          borderColor: currentError('pizza_name') ? 'crimson' : 'gray',
        }"
      />
      <span
        style="color: crimson; display: block; padding: 4px 0"
        v-if="currentError('pizza_name')"
        >{{ currentError("pizza_name").message }}
      </span>
    </label>
    <div
      class="content__constructor"
      :style="[{ transform: `scale(${scale})` }, { transition: `.3s` }]"
    >
      <div
        :class="`pizza pizza--foundation--${weight}-${sauceType}`"
        @drop.stop="onDropFill"
      >
        <div
          class="pizza__wrapper"
          @dragstart.prevent
          @dragover.prevent
          @dragenter.prevent
        >
          <div
            v-for="{ id, image, quantity = 0 } of selectIngredients"
            :key="id"
          >
            <div
              v-for="(step, index) of quantity"
              :key="index"
              :class="[
                'pizza__filling',
                `pizza__filling--${replacePath(image)}`,
                `pizza__filling--${ingredientLayer[step]}`,
              ]"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div class="content__result">
      <p>
        Итого:
        {{ totalPrice }}
        ₽
      </p>
      <button
        @click.prevent.self="build({ ...item, name, totalPrice })"
        type="button"
        class="button"
        :disabled="errors.length > 0 || name.length === 0"
      >
        Готовьте!
      </button>
    </div>
  </div>
</template>

<script>
import { DataTransferType } from "@/common/constants";
import { replacePath } from "@/modules/utils";
import { CrudCollection } from "@/common/heplers";
import { mapGetters } from "vuex";
import { calculatePizza } from "@/common/utils";

const doughMap = {
  1: "small",
  2: "big",
};

const sauceMap = {
  1: "tomato",
  2: "creamy",
};

const scaleMap = {
  1: 0.8,
  2: 0.9,
  3: 1,
};

export default {
  name: "ResultBuilder",
  props: {
    item: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      name: "",
      ingredientLayer: ["", "second", "third"],
      errors: [],
    };
  },
  computed: {
    ...mapGetters("Builder", [
      "selectDough",
      "selectSauce",
      "selectSize",
      "selectIngredients",
    ]),
    weight() {
      return doughMap[this.selectDough?.id];
    },
    sauceType() {
      return sauceMap[this.selectSauce?.id];
    },
    scale() {
      return scaleMap[this.selectSize?.multiplier] || 0;
    },
    currentError: function () {
      return function (id) {
        return CrudCollection.getElement(this.errors, (item) =>
          item.id.match(id)
        );
      };
    },
    totalPrice() {
      return this.calculatePizza(
        this.selectDough,
        this.selectSauce,
        this.selectSize,
        this.selectIngredients
      );
    },
  },
  mounted() {
    this.name = this.item.name || "";
  },
  methods: {
    replacePath,
    calculatePizza,
    onDropFill({ dataTransfer }) {
      const data = JSON.parse(dataTransfer.getData(DataTransferType.PAYLOAD));

      const {
        payload: { quantity },
      } = data;

      if (quantity <= 1) {
        this.$emit("add", data);
      } else {
        this.$emit("update", data);
      }
    },
    build(payload) {
      this.name = "";
      this.$emit("build", payload);
    },
  },
};
</script>
