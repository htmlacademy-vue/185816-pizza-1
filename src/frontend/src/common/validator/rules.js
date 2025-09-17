import { emailRegex, urlRegex } from "@/common/constants";

export default {
  isNotEmpty: {
    rule: (value) => !!value?.trim(),
    message: "Поле не заполнено",
  },
  required: {
    rule: (value) => !!value?.trim(),
    message: "Поле обязательно для заполнения",
  },
  email: {
    rule: (value) =>
      value ? emailRegex.test(String(value).toLowerCase()) : true,
    message: "Электроная почта имеет неверный формат",
  },
  url: {
    rule: (value) => (value ? urlRegex.test(value) : true),
    message: "Ссылка имеет неверный формат",
  },
};
