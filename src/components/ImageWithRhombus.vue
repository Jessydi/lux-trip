<template>
  <div class="img-with-rhombus">
    <img :src="require(`@/assets/${imgSrc}`)" />
    <slot></slot>
    <IRhombusBlur class="rhombus"></IRhombusBlur>
  </div>
</template>
<script>
import IRhombusBlur from "./icons/IRhombusBlur.vue";

export default {
  components: {
    IRhombusBlur,
  },
  props: {
    imgSrc: {
      type: String,
      require: true,
    },
  },
};
</script>
<style scoped lang="scss">
.img-with-rhombus {
  position: relative;
  height: fit-content;
  box-shadow: 15px 20px 50px 5px rgba(121, 101, 94, 0.4);
  border-radius: 10px;
  img {
    width: 100%;
    border-radius: 10px;
    display: block;
  }
  .rhombus {
    position: absolute;
    width: calc(100% / 3);
    height: auto;
    top: 100%;
    left: 50%;
    translate: -50% -50%;
    stroke-width: 0;
  }
}
</style>
