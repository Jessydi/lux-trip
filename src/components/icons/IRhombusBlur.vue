<template>
  <div class="rhombus-blur">
    <svg
      class="blur"
      width="264"
      height="510"
      fill="none"
      viewBox="0 0 264 510"
      stroke-width="0"
      preserveAspectRatio="none meet"
      xmlns="http://www.w3.org/2000/svg">
      <path
        stroke="white"
        d="M 132 5 L 259 255 L 132 505 L 5 255  Z"></path>
    </svg>
    <svg
      width="264"
      height="510"
      fill="none"
      viewBox="0 0 264 510"
      stroke-width="4"
      preserveAspectRatio="none meet"
      xmlns="http://www.w3.org/2000/svg">
      <path
        stroke="white"
        d="M 132 5 L 259 255 L 132 505 L 5 255  Z" />
    </svg>
  </div>
</template>
<style scoped>
.rhombus-blur {
  position: relative;
  z-index: 1;
}
svg {
  height: auto;
  width: 100%;
  display: block;
}
.blur {
  position: absolute;
  z-index: -1;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  backdrop-filter: blur(2px);
  clip-path: polygon(50% 1%, 99% 50%, 50% 99%, 1% 50%);
}
</style>
