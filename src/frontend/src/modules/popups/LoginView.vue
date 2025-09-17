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
    <div class="popup">
      <div class="sign-form">
        <a
          href="#"
          class="close close--white"
          style="position: relative; transform: none; top: auto; left: auto"
          @click.prevent="$router.push('/')"
        >
          <span class="visually-hidden">Закрыть форму авторизации</span>
        </a>
        <div class="sign-form__title">
          <h1 class="title title--small">Авторизуйтесь на сайте</h1>
        </div>
        <form action="test.html" method="post">
          <div class="sign-form__input">
            <label class="input">
              <span>E-mail</span>
              <input type="email" name="email" placeholder="example@mail.ru" />
            </label>
          </div>

          <div class="sign-form__input">
            <label class="input">
              <span>Пароль</span>
              <input type="password" name="pass" placeholder="***********" />
            </label>
          </div>
          <button type="submit" class="button">Авторизоваться</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style scoped></style>
