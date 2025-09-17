<template>
  <div
    style="
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.3);
      position: fixed;
      display: flex;
      justify-content: center;
      align-items: start;
      padding-top: 120px;
    "
  >
    <transition
      name="popup-pulse"
      appear
      enter-active-class="animate__animated animate__bounceIn"
      leave-active-class="animate__animated animate__bounceOut"
    >
      <div
        class="popup"
        style="position: relative; transform: none; top: auto; left: auto"
        v-if="open"
      >
        <a href="/" class="close" @click.prevent.stop="close">
          <span class="visually-hidden">Закрыть попап</span>
        </a>
        <div class="popup__title">
          <h2 class="title">Спасибо за заказ</h2>
        </div>
        <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
        <div class="popup__button">
          <a href="/" class="button" @click.prevent.stop="close">
            Отлично, я жду!
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "SuccessView",
  data: () => ({
    open: true,
  }),
  methods: {
    close() {
      this.open = !this.open;
      setTimeout(() => this.$router.push("/"), 700);
    },
  },
};
</script>
