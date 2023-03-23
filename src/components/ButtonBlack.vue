<template>
  <button class="btn btn-black">
    <slot></slot>
  </button>
</template>
<script>
export default {};
</script>
<style lang="scss">
.btn-black {
  background-color: var(--black-main);
  color: #fff;
  &:active {
    opacity: 1;
    box-shadow: 0 0 5px 1px var(--black-main);
  }
  &::before,
  &::after {
    border-color: var(--black-main);
  }
  .crown {
    path {
      fill: #000;
    }
  }
}
</style>
