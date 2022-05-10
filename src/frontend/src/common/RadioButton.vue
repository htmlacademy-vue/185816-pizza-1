<template>
  <label :class="className">
    <input
      :class="[{ 'visually-hidden': hidden }]"
      type="radio"
      :name="name"
      :value="value"
      :checked="checked"
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
    className: {
      type: Array,
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
