<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>
    <ul class="ingredients__list">
      <li
        class="ingredients__item"
        v-for="{
          id,
          image,
          name,
          count = Limit.COUNT_MIN,
          ...other
        } of normalizeIngredientPath"
        :key="id"
        :draggable="count < Limit.COUNT_MAX"
        @dragstart.self="onDragFill($event, { id, image, name, ...other })"
        @dragover.prevent
        @dragenter.prevent
        aria-dropeffect="move"
      >
        <span :class="`filling filling--${image}`">
          {{ name }}
        </span>
        <IngredientItem
          @plus="setItem({ id, image, name, ...other })"
          @minus="deleteItem({ id, image, name, ...other })"
          :sync-count="count"
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
import { Limit } from "@/common/enums/builder";
import { replacePath } from "@/modules/utils";
import IngredientItem from "@/modules/builder/SelectFilling/components/IngredientItem.vue";

export default {
  name: "SelectFilling",
  components: { IngredientItem },
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
    Limit: () => Limit,
  },
  methods: {
    onDragFill({ dataTransfer }, item) {
      dataTransfer.effectAllowed = DataTransferAllowEffect.MOVE;
      dataTransfer.dropEffect = DataTransferDropEffect.MOVE;
      dataTransfer.setData(
        DataTransferType.PAYLOAD,
        JSON.stringify({
          item,
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
    deleteItem(item) {
      console.log("Remove fill", item);
      this.$emit("deleteItem", {
        property: "ingredients",
        item,
      });
    },
    test(id) {
      console.log(id);
    },
  },
};
</script>
