<template>
  <label>
    <input
      v-bind="$attrs"
      :class="[{ 'visually-hidden': hidden }]"
      type="radio"
      :checked="checked"
      :value="value"
      v-model="proxyChecked"
    />
    <slot />
  </label>
</template>

<script>
export default {
  name: "RadioButton",
  model: {
    prop: "checked",
    event: "change",
  },
  props: {
    value: [String, Number],
    checked: [Boolean, String, Number],
    hidden: Boolean,
  },
  computed: {
    proxyChecked: {
      get() {
        return this.checked;
      },
      set(val) {
        this.$emit("change", val);
      },
    },
  },
};
</script>
