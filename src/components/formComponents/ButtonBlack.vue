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
  span {
    position: relative;
  }
  &:hover,
  &:focus,
  &:focus-visible {
    opacity: initial;
    box-shadow: 0 0 8px 2px var(--black-main);
  }
  &:active {
    opacity: 1;
    box-shadow: 0 0 5px 1px var(--black-main);
  }
  .crown-decoration {
    &::before,
    &::after {
      border: 1px solid var(--black-main);
      border-right: 1px solid transparent;
    }
    .crown {
      path {
        fill: var(--black-main);
      }
    }
    &.single-crown {
      border-bottom: 1px solid var(--black-main);
    }
  }
}
</style>
