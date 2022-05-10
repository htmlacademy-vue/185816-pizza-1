<template>
  <label :class="`dough__input dough__input--${dough.image}`">
    <input
      type="radio"
      name="dought"
      :value="id"
      class="visually-hidden"
      checked
    />
    <b>{{ name }}</b>
    <span>{{ description }}</span>
  </label>
</template>

<script>
export default {
  name: "SelectorItem",
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
};
</script>
