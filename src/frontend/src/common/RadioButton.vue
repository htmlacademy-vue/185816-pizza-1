<template>
  <label>
    <input
      :class="[{ 'visually-hidden': hidden }]"
      type="radio"
      :name="name"
      :value="value"
      :checked="checked"
      @click="$emit('setValue', { id, price: value })"
    />
    <slot>
      <span>{{ title }}</span>
    </slot>
  </label>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
