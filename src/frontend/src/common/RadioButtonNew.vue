<template>
  <label>
    <input
      :class="[{ 'visually-hidden': hidden }]"
      type="radio"
      :name="entity.name"
      :value="entity.value"
      :checked="entity.selected"
      @click="$emit('setValue', { id: entity.id, value: entity.value })"
    />
    <slot>
      <span>{{ entity.title }}</span>
    </slot>
  </label>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    entity: {
      type: Object,
      required: true,
    },
    hidden: Boolean,
  },
};
</script>
