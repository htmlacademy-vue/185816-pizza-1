<template>
  <div class="user">
    <img
      :src="item.avatar"
      :alt="item.name"
      width="72"
      height="72"
      @error="errorAvatar"
    />
    <div class="user__name">
      <span>{{ item.name }}</span>
      <p
        style="
          font-size: 14px;
          font-weight: normal;
          margin-top: 6px;
          margin-bottom: 0;
        "
      >
        Контактный телефон: <b>{{ item.phone }}</b>
      </p>
      <p style="font-size: 14px; font-weight: normal; margin-top: 0px">
        Email: <b>{{ item.email }}</b>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    errorAvatar(e) {
      console.log(e);
    },
  },
};
</script>
