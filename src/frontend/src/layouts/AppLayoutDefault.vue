<template>
  <div>
    <ul
      style="
        position: fixed;
        top: 0;
        left: 50%;
        margin-left: -300px;
        z-index: 10000;
        list-style: none;
        padding-left: 0;
        width: 600px;
      "
    >
      <li
        v-for="(notice, index) of notifications"
        :key="index"
        style="
          padding: 8px 16px;
          margin-bottom: 8px;
          border: 1px solid;
          border-radius: 5px;
        "
        :style="{
          background: backgroundNotice(notice.type),
          color: colorNotice(notice.type),
          borderColor: borderColorNotice(notice.type),
        }"
      >
        <span>{{ notice.text }}</span>
      </li>
    </ul>
    <AppHeader />
    <slot />
  </div>
</template>

<script>
import AppHeader from "@/layouts/AppHeader";
import { mapState } from "vuex";
export default {
  name: "AppLayoutDefault",
  components: {
    AppHeader,
  },
  computed: {
    ...mapState(["notifications"]),
  },
  methods: {
    backgroundNotice(type) {
      switch (type) {
        case "INFO":
          return "#cff4fc";
        case "WARNING":
          return "#fff3cd";
        case "ERROR":
          return "#f8d7da";
        case "SUCCESS":
          return "#d1e7dd";
      }
    },
    colorNotice(type) {
      switch (type) {
        case "INFO":
          return "#055160";
        case "WARNING":
          return "#664d03";
        case "ERROR":
          return "#842029";
        case "SUCCESS":
          return "#0f5132";
      }
    },
    borderColorNotice(type) {
      switch (type) {
        case "INFO":
          return "#b6effb";
        case "WARNING":
          return "#ffecb5";
        case "ERROR":
          return "#f5c2c7";
        case "SUCCESS":
          return "#badbcc";
      }
    },
  },
};
</script>
