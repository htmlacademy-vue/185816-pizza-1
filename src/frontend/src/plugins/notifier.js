export default class Notifier {
  #store;

  constructor(store) {
    this.#store = store;
  }

  info(text) {
    this.#store.dispatch("createNotification", {
      text,
      type: "INFO",
    });
  }

  success(text) {
    this.#store.dispatch("createNotification", {
      text,
      type: "SUCCESS",
    });
  }

  error(text) {
    this.#store.dispatch("createNotification", {
      text,
      type: "ERROR",
    });
  }

  warning(text) {
    this.#store.dispatch("createNotification", {
      text,
      type: "WARNING",
    });
  }
}
