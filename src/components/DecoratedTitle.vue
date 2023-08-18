<template>
  <div class="decorated-title">
    <CrownDecoration></CrownDecoration>
    <span><slot></slot></span>
  </div>
</template>
<script>
import CrownDecoration from "@/components/CrownDecoration.vue";

export default {
  components: {
    CrownDecoration,
  },
};
</script>
<style lang="scss">
.decorated-title {
  padding: 0 20px;
  background-color: #fff;
  border-radius: 67px;
  font-size: 30px;
  line-height: 32px;
  color: var(--black-main);
  height: 60px;
  min-width: 250px;
  max-width: min(calc(100% - 32px), 330px);
  position: absolute;
  top: 0;
  left: 50%;
  translate: -50% -50%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    position: relative;
    z-index: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
@media (min-width: 768px) {
  .decorated-title {
    padding: 0 30px;
    font-size: 40px;
    line-height: 44px;
    height: 94px;
    min-width: 400px;
  }
}
</style>
