<template>
  <div class="tab" v-show="title === selectedTitle">
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
  },
};
</script>
<style lang="scss"></style>
