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
      name="popup-login"
      appear
      enter-active-class="animate__animated animate__bounceIn"
      leave-active-class="animate__animated animate__bounceOut"
    >
      <div
        class="sign-form"
        style="position: relative; transform: none; top: auto; left: auto"
        v-if="open"
      >
        <a href="#" class="close close--white" @click.prevent.stop="close">
          <span class="visually-hidden">Закрыть форму авторизации</span>
        </a>
        <div class="sign-form__title">
          <h1 class="title title--small">Авторизуйтесь на сайте</h1>
        </div>
        <form @submit.prevent.stop="singIn">
          <div class="sign-form__input">
            <label class="input">
              <span>E-mail</span>
              <input
                v-model="email"
                v-validate="['required', 'email']"
                type="email"
                name="email"
                placeholder="example@mail.ru"
                required
                :style="{
                  borderColor: currenError('email') ? 'crimson' : 'gray',
                }"
              />
              <span
                style="color: crimson; display: block; padding: 4px 0"
                v-if="currenError('email')"
                >{{ currenError("email").message }}
              </span>
            </label>
          </div>

          <div class="sign-form__input">
            <label class="input">
              <span>Пароль</span>
              <input
                v-validate="['required']"
                v-model="password"
                type="password"
                name="pass"
                required
                :style="{
                  borderColor: currenError('pass') ? 'crimson' : 'gray',
                }"
              />
              <span
                style="color: crimson; display: block; padding: 4px 0"
                v-if="currenError('pass')"
                >{{ currenError("pass").message }}
              </span>
            </label>
          </div>
          <button type="submit" class="button" :disabled="isDisabled">
            Авторизоваться
          </button>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { CrudCollection } from "@/common/heplers";

export default {
  name: "Login",
  data() {
    return {
      password: "",
      email: "",
      errors: [],
      open: true,
    };
  },
  computed: {
    isDisabled() {
      return (
        this.errors > 0 || this.email.length === 0 || this.password.length === 0
      );
    },
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
        this.errors = [...this.errors, { id: "email", message: error.message }];
      }
    },
    clear() {
      this.errors = [];
      this.password = "";
    },
    currenError(id) {
      return CrudCollection.getElement(this.errors, (item) =>
        item.id.match(id)
      );
    },
    close() {
      this.open = !this.open;

      setTimeout(() => this.$router.push("/"), 700);
    },
  },
};
</script>
