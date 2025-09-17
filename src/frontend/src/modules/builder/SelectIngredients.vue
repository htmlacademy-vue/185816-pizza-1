<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <slot name="select-sauce"></slot>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectIngredients",
};
</script>
