<template>
  <div
    class="error-message"
    :class="{ visible: error }">
    {{ errorMessage }}
  </div>
</template>
<script>
export default {
  props: {
    error: {
      type: Boolean,
      required: true,
      default: false,
    },
    errorMessage: {
      type: String,
      default: null,
    },
  },
};
</script>
<style lang="scss">
.error-message {
  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }
  position: absolute;
  top: calc(100% + 20px);
  left: 50%;
  translate: -50% 0;
  color: var(--error-red);
  font-size: 14px;
  line-height: 16px;
  visibility: hidden;
  opacity: 0;
  transition: all 1s;
  text-align: center;
  width: max-content;
  max-width: 100%;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    width: 110%;
    height: 110%;
    background-color: var(--bg-main);
    opacity: 0.5;
    filter: blur(4px);
    z-index: -1;
  }
  &.visible {
    opacity: 1;
    visibility: visible;
    animation: shake 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) 0.3s both;
    transform: translate3d(0, 0, 0);
  }
}
@media (min-width: 768px) {
  .error-message {
    top: calc(100% + 15px);

    font-size: 18px;
    line-height: 20px;
  }
}
</style>
