<template>
  <div class="trip-card">
    <router-link
      class="trip-card__image-link"
      :to="{
        name: 'package-page',
        params: { id: cardData.id },
      }">
      <picture>
        <source
          type="image/avif"
          :srcset="cardData.imgSrcAvif" />
        <img
          class="trip-card__image"
          :src="cardData.imgSrcWebp"
          alt="trip card image"
          loading="lazy" />
      </picture>
    </router-link>

    <div class="trip-card__content">
      <div class="trip-card__description">
        <div class="trip-card__location">
          <IPin></IPin>
          <span>{{ cardData.location }}</span>
        </div>

        <router-link
          class="trip-card__name link"
          :to="{
            name: 'package-page',
            params: { id: cardData.id },
          }">
          {{ cardData.name }}
        </router-link>
        <div class="trip-card__price">
          <span>FROM</span>
          <div class="trip-card__price-value">€ {{ cardData.price }}</div>
        </div>
      </div>
      <RatingComponent
        :rating="cardData.averageRatingObject.overallAverageRating"
        disabled></RatingComponent>
    </div>
  </div>
</template>
<script>
import IPin from "@/components/icons/IPin.vue";
import RatingComponent from "@/components/formComponents/RatingComponent.vue";

export default {
  components: {
    IPin,
    RatingComponent,
  },
  props: {
    cardObject: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cardData: this.cardObject,
    };
  },
};
</script>
<style lang="scss">
.trip-card {
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  display: flex;
  transition: all 0.1s ease-in;
  &:hover {
    scale: 1.03;
    .trip-card__image {
      scale: 1.07;
    }
  }
  &__image {
    width: 100%;
    object-fit: cover;
    transition: 0.3s;
    aspect-ratio: 350/571;
    &-link {
      width: 100%;
      &:hover {
        opacity: 1;
      }
    }
  }

  &__content {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 30px;
    color: white;
    gap: 10px;
    background: linear-gradient(transparent 0, var(--blue) 100%);
  }

  &__location {
    display: flex;
    align-items: center;
    gap: 5px;
    span {
      font-family: var(--manrope);
      font-weight: 500;
      font-size: 11px;
      line-height: 15px;
    }
  }

  &__name {
    font-size: 32px;
    line-height: 32px;
    margin-bottom: 25px;
    color: white;
  }

  &__price {
    font-family: var(--manrope);
    font-weight: 500;
    font-size: 11px;
    line-height: 15px;
    &-value {
      font-family: var(--forum);
      font-weight: 400;
      font-size: 21px;
      line-height: 21px;
    }
  }
}
@media (min-width: 768px) {
  .trip-card {
    &__content {
      padding: 35px;
    }
    &__location {
      span {
        font-size: 12px;
        line-height: 16px;
      }
    }

    &__name {
      font-size: 36px;
      line-height: 36px;
      margin-bottom: 30px;
    }

    &__price {
      font-size: 12px;
      line-height: 16px;
      &-value {
        font-size: 24px;
        line-height: 24px;
      }
    }
  }
}
</style>
