<template>
  <button class="btn btn-transparent">
    <span class="btn-transparent__text"><slot></slot></span>
  </button>
</template>
<script>
export default {};
</script>
<style lang="scss">
.btn-transparent {
  font-size: 16px;
  line-height: 18px;
  border: 1px solid var(--black-main);
  padding: 10px;
  height: 38px;
  position: relative;
  overflow: hidden;
  isolation: isolate;

  &:hover,
  &:focus ,&:focus-visible {
    opacity: initial;
    &::before {
      width: 100%;
      translate: 0px;
    }
    .btn-transparent__text {
      color: white;
    }
  }
  &__text {
    transition: color 0.6s ease-out;
    color: var(--black-main);
  }
  &::before {
    content: "";
    transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    position: absolute;
    top: 0;
    left: 0px;
    translate: -20px;
    width: 0%;
    height: 100%;
    background-color: var(--black-main);
    border-radius: 74px;
    z-index: -1;
  }
}
</style>
