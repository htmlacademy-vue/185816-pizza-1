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
          quantity = 0,
          ...other
        } of normalizeIngredients"
        :key="id"
        :draggable="quantity < Limit.COUNT_MAX"
        @dragstart.self="
          onDragFill($event, {
            entity,
            payload: { id, image, name, quantity: quantity + 1, ...other },
          })
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
            (oldValue, newValue) =>
              changeItem(
                { id, image, name, quantity: newValue, ...other },
                oldValue,
                newValue
              )
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
import Module from "@/common/enums/module";
import { Builder } from "@/common/enums/entity";
import { mapGetters } from "vuex";

const entity = Builder.INGREDIENTS;
const module = Module.BUILDER;

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
    ...mapGetters(["getEntityByID"]),
    Limit: () => Limit,
    entity: () => Builder.INGREDIENTS,
    normalizeIngredients() {
      return this.items.map(({ image, ...item }) => {
        const newItem = this.getEntityByID({
          module,
          entity,
          id: item.id,
        });

        return {
          ...item,
          image: replacePath(image),
          quantity: newItem ? newItem.quantity : 0,
        };
      });
    },
  },
  methods: {
    onDragFill({ dataTransfer }, payload) {
      dataTransfer.effectAllowed = DataTransferAllowEffect.MOVE;
      dataTransfer.dropEffect = DataTransferDropEffect.MOVE;
      dataTransfer.setData(DataTransferType.PAYLOAD, JSON.stringify(payload));
    },
    changeItem(payload, oldValue, newValue) {
      if (oldValue === 0 && newValue === 1) {
        this.$emit("add", { entity, payload });
      }

      if (oldValue === 1 && newValue === 0) {
        this.$emit("delete", { entity, payload });
      }

      this.$emit("update", { entity, payload });
    },
  },
};
</script>
