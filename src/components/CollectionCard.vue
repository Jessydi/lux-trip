<template>
  <div class="collection-card">
    <img
      class="collection-card__image"
      :src="require(`@/assets/collections-cards/${cardObject.imgSrc}`)"
      alt="package card image" />
    <div class="collection-card__content">
      <div class="collection-card__title">
        <span
          class="link"
          tabindex="0"
          @keydown.space.prevent="searchTrips"
          @keydown.enter="searchTrips"
          @click="searchTrips"
          >{{ cardObject.name }}</span
        >
      </div>
      <span
        @click="searchTrips"
        class="collection-card__link link">
        <span class="collection-card__places">
          <span class="collection-card__number"
            >{{ cardObject.placesNumber }}
          </span>
          <span>places</span>
          <IArrow class="arrow"></IArrow>
        </span>
        <IRhombus class="rhombus"></IRhombus>
        <IRhombusBlur class="rhombus-blur"></IRhombusBlur>
      </span>
    </div>
  </div>
</template>
<script>
import IRhombusBlur from "@/components/icons/IRhombusBlur.vue";
import IRhombus from "@/components/icons/IRhombus.vue";
import IArrow from "@/components/icons/IArrow.vue";

import { useLuxTripStore } from "@/store/index";
import { mapStores } from "pinia";
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
  methods: {
    async searchTrips() {
      await this.luxTripStore.changeFilter(this.categoryFilter);
      this.$router.push({ name: "packages" });
    },
  },
  computed: {
    categoryFilter() {
      return {
        travelCategory: this.cardObject.name,
        travelType: null,
        travellers: null,
        dateValue: null,
      };
    },
    ...mapStores(useLuxTripStore),
  },
};
</script>
<style scoped lang="scss">
.collection-card {
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
    gap: 20px;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    padding: 35px;
    color: white;
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
    margin: auto 0;

    a {
      color: #fff;
      -webkit-line-clamp: 3;
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
    }
  }
  &__places {
    color: white;
    font-size: 21px;
    line-height: 21px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    .arrow {
      margin-top: 8px;
    }
  }
  .link {
    color: #fff;
  }
  &__link {
    position: relative;
    width: 55%;
    &:hover {
      opacity: initial;
      .collection-card__places {
        opacity: 0.7;
        transition: 0.2s;
      }
    }
    &__number {
      font-size: 35px;
      line-height: 35px;
    }
    .rhombus,
    .rhombus-blur {
      z-index: -1;
      &:deep(path) {
        stroke: var(--grey);
      }
    }
    .rhombus {
      width: 100%;
      height: auto;
      & :deep(path) {
        stroke-width: 3;
      }
    }
    .rhombus-blur {
      width: calc(100% - 14px);
      position: absolute;
      top: 50%;
      left: 50%;
      translate: -50% -50%;
      height: auto;
      & :deep(.blur) {
        backdrop-filter: blur(10px);
      }
      & :deep(path) {
        fill: none;
        stroke: transparent;
      }
    }
  }
}
</style>
