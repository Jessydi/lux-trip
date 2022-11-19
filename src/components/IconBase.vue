<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :class="className"
    viewBox="0 0 448 512"
    :aria-labelledby="iconName"
    role="presentation"
    @click="$emit('click')"
  >
    <title :id="iconName" lang="en">{{ iconName }} icon</title>
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>
<script>
export default {
  props: {
    className: { type: String, default: "" },
    iconName: { type: String, default: "box" },
    width: {
      type: [Number, String],
      default: 18,
    },
    height: { type: [Number, String], default: 18 },
    iconColor: { type: String, default: "currentColor" },
  },
  emits: ["click"],
};
</script>
<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
}
</style>
