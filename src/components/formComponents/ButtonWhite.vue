<template>
  <button class="btn btn-white">
    <slot></slot>
  </button>
</template>
<script>
export default {};
</script>
<style lang="scss">
.btn-white {
  background-color: #fff;
  color: var(--white-main);
  &:hover,
  &:focus,
  &:focus-visible {
    opacity: initial;
    box-shadow: 0 0 8px 2px #fff;
  }
  span {
    position: relative;
  }
  &:active {
    opacity: 1;
    box-shadow: 0 0 5px 1px #fff;
  }
}
</style>
