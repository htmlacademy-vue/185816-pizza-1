<template>
  <div class="sign-form">
    <a
      href="#"
      class="close close--white"
      @click.prevent.stop="$router.push('/')"
    >
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </a>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form @submit.prevent.stop="singIn">
      <ul style="list-style: none; padding-left: 0">
        <li
          v-for="(error, idx) of errors"
          :key="idx"
          style="padding: 8px; color: crimson"
        >
          {{ error.message }}
        </li>
      </ul>
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            v-model="email"
            type="email"
            name="email"
            placeholder="example@mail.ru"
            required
          />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input v-model="password" type="password" name="pass" required />
        </label>
      </div>
      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      password: "",
      email: "",
      errors: [],
    };
  },
  methods: {
    ...mapActions("Auth", ["login"]),
    async singIn() {
      try {
        await this.login({ email: this.email, password: this.password });
        await this.$router.push({ path: "/" });
        this.clear();
      } catch ({ response }) {
        const {
          data: { error },
        } = response;
        // // Caching errors bad request, empty fields
        this.errors = [...this.errors, error];
      }
    },
    clear() {
      this.errors = [];
      this.password = "";
    },
  },
};
</script>
