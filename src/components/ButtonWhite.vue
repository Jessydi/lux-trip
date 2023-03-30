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
  span {
    position: relative;
    z-index: 1;
  }
  &:active {
    opacity: 1;
  }
}
</style>
