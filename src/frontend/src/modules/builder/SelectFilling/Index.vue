<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>
    <ul class="ingredients__list">
      <li
        class="ingredients__item"
        v-for="{ id, image, name, quantity, ...other } of normalizeIngredients"
        :key="id"
        :draggable="quantity < Limit.COUNT_MAX"
        @dragstart.self="
          onDragFill($event, { id, image, name, quantity: quantity, ...other })
        "
        @dragover.prevent
        @dragenter.prevent
        aria-dropeffect="move"
      >
        <span :class="`filling filling--${image}`">
          {{ name }}
        </span>
        <IngredientItem
          :quantity="quantity"
          @update="
            (quantity) => updateItem({ id, image, name, quantity, ...other })
          "
        />
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
import IngredientItem from "@/modules/builder/SelectFilling/components/IngredientItem.vue";
import { Limit } from "@/common/enums/builder";

export default {
  name: "SelectFilling",
  components: { IngredientItem },
  props: {
    items: {
      type: Array,
      required: true,
    },
    selectItems: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    normalizeIngredients() {
      return this.items.map(({ image, ...item }) => ({
        ...item,
        image: replacePath(image),
        quantity: this.getQuantity(item.id),
      }));
    },
    Limit: () => Limit,
  },
  methods: {
    onDragFill({ dataTransfer }, { quantity, ...other }) {
      dataTransfer.effectAllowed = DataTransferAllowEffect.MOVE;
      dataTransfer.dropEffect = DataTransferDropEffect.MOVE;
      dataTransfer.setData(
        DataTransferType.PAYLOAD,
        JSON.stringify({ quantity: quantity + 1, ...other })
      );
    },
    updateItem(payload) {
      this.$emit("setItem", payload);
    },
    getQuantity(id) {
      const index = this.selectItems.findIndex((item) => item.id === id);

      if (~index) {
        return this.selectItems[index].quantity;
      }

      return 0;
    },
  },
};
</script>
