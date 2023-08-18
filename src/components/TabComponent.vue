<template>
  <div
    class="tab"
    v-if="title === selectedTitle && !vShow">
    <slot></slot>
  </div>
  <div
    class="tab"
    v-show="title === selectedTitle && vShow">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "TabComponent",
  inject: ["selectedTitle"],
  props: {
    title: {
      type: String,
      require: true,
    },
    vShow: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss"></style>
