<template>
  <div
    class="crown-decoration"
    :class="{ 'single-crown': singleCrown, 'no-crown': noCrown }"
  >
    <ICrown v-if="!noCrown" class="crown-1"></ICrown>
    <ICrown v-if="!(singleCrown || noCrown)" class="crown-2"></ICrown>
  </div>
</template>
<script>
import ICrown from "@/components/icons/ICrown.vue";

export default {
  components: {
    ICrown,
  },
  props: {
    singleCrown: {
      type: Boolean,
      require: false,
    },
    noCrown: {
      type: Boolean,
      require: false,
    },
    borderRadius: {
      type: Number,
      require: false,
      default: 100,
    },
  },
};
</script>
<style lang="scss">
.crown-decoration {
  border: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: calc(100% - 30px);
  height: 100%;
  --border-radius: v-bind(borderRadius + "px");
  &::before,
  &::after {
    content: "";
    position: absolute;
    border: 1px solid #fff;
    border-right: 1px solid transparent;
    border-radius: var(--border-radius) 0 0 var(--border-radius);
    width: calc(50% - 50px);
    height: calc(100% + 10px);
    bottom: 0;
    transition: 0.2s ease;
  }
  &::before {
    left: 0;
  }
  &::after {
    right: 0;
    rotate: 180deg;
  }
  .crown {
    position: absolute;
    left: 50%;
    translate: -50% 0;
    &-part {
      transition: 0.8s ease;
    }
    &-1 {
      height: 20px;
      width: auto;
      bottom: calc(100% + 6px);
    }
    &-2 {
      rotate: 180deg;
      height: 15px;
      width: auto;
      top: calc(100% + 3px);
    }
  }
  &.single-crown,
  &.no-corwn {
    border-bottom: 1px solid #fff;
    border-radius: var(--border-radius);

    margin-bottom: -1px;
    &::after,
    &::before {
      margin-bottom: -1px;
    }
  }
}
@media (min-width: 768px) {
  .crown-decoration {
    width: calc(100% - 50px);
    &::before,
    &::after {
      width: calc(50% - 60px);
    }
  }
}
</style>
