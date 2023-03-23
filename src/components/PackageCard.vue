<template>
  <div class="package-card">
    <img
      class="package-card__image"
      :src="require(`@/assets/packages-covers/${cardObject.imgSrc}`)"
      alt="package card image"
    />
    <div class="package-card__content">
      <div class="package-card__title">{{ cardObject.name }}</div>
      <div class="package-card__link">
        <router-link :to="{ name: 'home' }">
          <span class="package-card__number"
            >{{ cardObject.placesNumber }}
          </span>
          <span>places</span>
          <IArrow class="arrow"></IArrow>
        </router-link>
        <IRhombus class="rhombus"></IRhombus>
        <IRhombusBlur class="rhombus-blur"></IRhombusBlur>
      </div>
    </div>
  </div>
</template>
<script>
import IRhombusBlur from "./icons/IRhombusBlur.vue";
import IRhombus from "./icons/IRhombus.vue";
import IArrow from "./icons/IArrow.vue";

export default {
  components: {
    IRhombusBlur,
    IRhombus,
    IArrow,
  },
  props: {
    cardObject: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss">
.package-card {
  position: relative;
  display: flex;
  transition: all 0.1s ease-in;
  width: 100%;
  max-width: 100%;
  &__image {
    width: 100%;
    object-fit: cover;
    transition: 0.3s;
    overflow: clip;
    border-radius: 10px;
  }

  &__content {
    position: absolute;
    bottom: 0;
    top: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 60px 35px 35px 35px;
    color: white;
    gap: 10px;
    transition: all 0.2s;
    isolation: isolate;

    &::before {
      content: "";
      transition: all 0.3s;
      z-index: -1;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 30%;
      border-radius: 10px 10px 0 0;
      background: linear-gradient(rgba(11, 32, 52, 0.8) 0, transparent 100%);
    }
    &:hover {
      &::before {
        height: 100%;
        background: linear-gradient(rgba(11, 32, 52, 0.8) 0, transparent 100%);
      }
    }
  }

  &__title {
    font-size: 36px;
    line-height: 36px;
    text-align: center;
  }

  &__link {
    align-self: center;
    position: relative;
    margin: auto 0;
    a {
      color: white;
      font-size: 21px;
      line-height: 21px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .arrow {
        margin-top: 8px;
      }
    }
    &__number {
      font-size: 35px;
      line-height: 35px;
    }
    .rhombus,
    .rhombus-blur {
      z-index: -1;
      position: absolute;
      top: 50%;
      left: 50%;
      translate: -50% -50%;
      height: auto;
      polygon {
        stroke: var(--gray);
      }
    }
    .rhombus {
      width: 135px;
      polygon {
        stroke-width: 5;
      }
    }
    .rhombus-blur {
      width: 121px;
      backdrop-filter: blur(10px);
      polygon {
        fill: none;
        stroke: transparent;
      }
    }
  }
}
</style>
