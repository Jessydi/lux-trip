<template>
  <Splide :options="splideOptions" aria-label="" :has-track="false">
    <SplideTrack>
      <slot></slot>
    </SplideTrack>

    <div class="splide__arrows">
      <button class="splide__arrow splide__arrow--prev">
        <IArrow></IArrow>
      </button>
      <button class="splide__arrow splide__arrow--next">
        <IArrow></IArrow>
      </button>
    </div>
  </Splide>
</template>
<script>
import { Splide, SplideTrack } from "@splidejs/vue-splide";
import IArrow from "./icons/IArrow.vue";

import "@splidejs/vue-splide/css";

export default {
  components: {
    Splide,
    SplideTrack,
    IArrow,
  },
  props: {
    splideObject: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      splideOptions: this.splideObject,
    };
  },
};
</script>
<style lang="scss">
.splide {
  &__slide {
    max-width: 100%;
    img {
      max-width: 100%;
    }
  }
  &__track {
    overflow: visible;
  }
  &__arrow {
    width: 75px;
    height: 75px;
    background-color: var(--gray);
    border-radius: 0px;
    transition: all 0.2s;
    opacity: initial;
    &--prev {
      left: -40px;
      rotate: 45deg;
      svg {
        rotate: -45deg;
      }
    }
    &--next {
      right: -40px;
      rotate: -45deg;
      svg {
        rotate: 45deg;
      }
    }
    &:disabled {
      visibility: hidden;
      opacity: 0;
      pointer-events: none;
    }
    svg {
      width: 28px;
      height: auto;
      transition: all 0.2s;
    }
  }
  &:not(.is-overflow) {
    .splide__pagination {
      display: flex;
    }
  }
  &__pagination {
    gap: 6px;
    flex-wrap: nowrap;
    bottom: -18px;
    translate: 0 100%;

    li {
      display: flex;
      align-items: center;
      flex: 0 1 40px;
      button {
        width: 100%;
        height: 2px;
        background-color: white;

        &.is-active {
          background-color: var(--gray);
        }
      }
    }
    &__page {
      margin: 0;
      border-radius: 0px;
      &.is-active {
        transform: scale(1);
      }
    }
  }
}
@media (min-width: 768px) {
  .splide {
    &:not(.is-overflow) {
      .splide__pagination {
        display: none;
      }
    }
    &__pagination {
      display: none;
    }
  }
}
</style>
