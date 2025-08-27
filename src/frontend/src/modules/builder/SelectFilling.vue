<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>
    <ul class="ingredients__list">
      <li
        class="ingredients__item"
        v-for="{ id, image, name, ...other } of normalizeIngredientPath"
        :key="id"
      >
        <span :class="`filling filling--${image}`">
          {{ name }}
        </span>

        <div class="counter counter--orange ingredients__counter">
          <button type="button" class="counter__button counter__button--minus">
            <span class="visually-hidden">Меньше</span>
          </button>
          <input type="text" name="counter" class="counter__input" :value="0" />
          <button
            type="button"
            class="counter__button counter__button--plus"
            @click="setItem({ id, image, name, ...other })"
          >
            <span class="visually-hidden">Больше</span>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  DataTransferType,
  DataTransferDropEffect,
  DataTransferAllowEffect,
} from "@/common/constants";
import { replacePath } from "@/modules/utils";

const Limit = {
  INGREDIENTS_MAX: 3,
  INGREDIENTS_MIN: 0,
  INGREDIENTS_STEP: 1,
};

export default {
  name: "SelectFilling",
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    normalizeIngredientPath() {
      return this.items.map(({ image, ...item }) => ({
        ...item,
        image: replacePath(image),
      }));
    },
  },
  methods: {
    switchMultiplier(count, sum = true) {
      if (
        count < Limit.INGREDIENTS_MAX &&
        count >= Limit.INGREDIENTS_MIN &&
        sum
      ) {
        return (count += Limit.INGREDIENTS_STEP);
      }

      if (
        count <= Limit.INGREDIENTS_MAX &&
        count > Limit.INGREDIENTS_MIN &&
        !sum
      ) {
        return (count -= Limit.INGREDIENTS_STEP);
      }

      return count;
    },
    isDisabled(count, sum = true) {
      return sum
        ? count >= Limit.INGREDIENTS_MAX
        : count <= Limit.INGREDIENTS_MIN;
    },
    onDragFill({ dataTransfer }, idx, items) {
      dataTransfer.effectAllowed = DataTransferAllowEffect.MOVE;
      dataTransfer.dropEffect = DataTransferDropEffect.MOVE;
      dataTransfer.setData(
        DataTransferType.PAYLOAD,
        JSON.stringify({
          idx,
          items,
          add: true,
        })
      );
    },
    setItem(item) {
      console.log("Add fill", item);
      this.$emit("setItem", {
        property: "ingredients",
        item,
      });
    },
  },
};
</script>
