<template>
  <div class="trip-card">
    <!-- <img
      class="trip-card__image"
      :src="require(`@/assets/trip-cards/${cardData.imgSrc}`)"
      alt="trip card image"
    /> -->
    <img
      class="trip-card__image"
      :src="cardData.imgSrc"
      alt="trip card image"
    />
    <div class="trip-card__content">
      <div class="trip-card__description">
        <div class="trip-card__location">
          <IPin></IPin>
          <span>{{ cardData.location }}</span>
        </div>

        <router-link
          class="trip-card__name"
          :to="{ name: 'package-page', params: { id: cardData.name } }"
          @click="luxTripStore.getDetailsAboutTrip(cardData.id)"
        >
          {{ cardData.name }}
        </router-link>
        <div class="trip-card__price">
          <span>From</span>
          <div class="trip-card__price-value">€ {{ cardData.price }}</div>
        </div>
      </div>
      <ratingComponent :rating="cardData.rating" disabled></ratingComponent>
    </div>
  </div>
</template>
<script>
import IPin from "./icons/IPin.vue";
import ratingComponent from "./ratingComponent.vue";
import { useLuxTripStore } from "@/store/index";
import { mapStores } from "pinia";
export default {
  components: {
    IPin,
    ratingComponent,
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
  computed: {
    ...mapStores(useLuxTripStore),
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
  }

  &__content {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: flex-end;
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
