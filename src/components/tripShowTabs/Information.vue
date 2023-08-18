<template>
  <div class="information">
    <div class="information__text">
      <h3>{{ fullTripInfo.name }}</h3>
      <p>{{ fullTripInfo.description }}</p>
      <div class="information__main">
        <div class="information__column">
          <div class="information__name">Destination</div>
          <div class="information__value">
            {{ fullTripInfo.destination }}
          </div>
        </div>
        <div class="information__column">
          <div class="information__name">Departure</div>
          <div class="information__value">
            {{ fullTripInfo.departure }}
          </div>
        </div>
        <div class="information__column">
          <div class="information__name">Departure Time</div>
          <div class="information__value">
            {{ fullTripInfo.departureTime }}
          </div>
        </div>
        <div class="information__column">
          <div class="information__name">Return Time</div>
          <div class="information__value">
            {{ fullTripInfo.returnTime }}
          </div>
        </div>
        <div class="information__column">
          <div class="information__name">Dress Code</div>
          <div class="information__value">
            {{ fullTripInfo.dressCode }}
          </div>
        </div>
      </div>
      <div class="information__included">
        <div class="information__included-title">included</div>
        <ul
          class="included-list"
          v-if="fullTripInfo.included">
          <li
            v-for="(included, index) in fullTripInfo.included"
            :key="index">
            <IIncluded></IIncluded>{{ included }}
          </li>
        </ul>
      </div>
      <div class="information__not-included">
        <div class="information__not-included-title">not included</div>
        <ul
          class="not-included-list"
          v-if="fullTripInfo.notIncluded">
          <li
            v-for="(notIncluded, index) in fullTripInfo.notIncluded"
            :key="index">
            <INotIncluded></INotIncluded>{{ notIncluded }}
          </li>
        </ul>
      </div>
    </div>
    <div class="information__card">
      <img
        class="information__card-img"
        :src="fullTripInfo.smallImgSrc"
        alt="Machu Picchu" />
      <router-link
        class="contact__link"
        :to="{ name: 'package-booking-page', id: 'aasdasd' }">
        <ButtonWhite>
          <CrownDecoration></CrownDecoration>
          <span>Book now</span>
        </ButtonWhite>
      </router-link>
    </div>
  </div>
</template>
<script>
import ButtonWhite from "@/components/formComponents/ButtonWhite.vue";
import CrownDecoration from "@/components/CrownDecoration.vue";
import IIncluded from "@/components/icons/IIncluded.vue";
import INotIncluded from "@/components/icons/INotIncluded.vue";
export default {
  name: "InformationTab",
  components: {
    IIncluded,
    INotIncluded,
    ButtonWhite,
    CrownDecoration,
  },
  props: {
    fullTripInfo: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style scoped lang="scss">
.information {
  h3 {
    text-align: left;
  }
  p {
    margin-bottom: 20px;
  }

  &__text {
    margin-bottom: 60px;
  }

  &__main {
    display: grid;
    grid-template-columns: minmax(140px, 1fr) 1fr;
    column-gap: 20px;
    margin-bottom: 40px;
  }

  &__column {
    display: contents;
  }

  &__name {
    font-family: var(--manrope);
    font-weight: 600;
    font-size: 18px;
    line-height: 18px;
  }

  &__value {
    font-family: var(--manrope);
    font-size: 18px;
    margin-bottom: 16px;
    line-height: 18px;
  }
  &__not-included {
    &-title {
      font-size: 18px;
      line-height: 18px;
      font-weight: 600;
      font-family: var(--manrope);
      margin-bottom: 16px;
    }
  }
  &__included {
    margin-bottom: 40px;
    &-title {
      font-size: 18px;
      line-height: 18px;
      font-weight: 600;
      font-family: var(--manrope);
      margin-bottom: 16px;
    }
  }
  &__card {
    position: relative;
    height: max-content;
    &-img {
      border-radius: 10px;
      width: 100%;
      /* max-width: 500px; */
      margin: 0 auto;
    }
    .btn-white {
      position: absolute;
      left: 50%;
      bottom: 70px;
      translate: -50% 0;
      width: 255px;
      max-width: calc(100% - 20px);
    }
  }
}
@media (min-width: 768px) {
  .information {
    display: flex;
    p {
      margin-bottom: 30px;
    }
    &__text {
      margin-bottom: 0px;
      order: 1;
      flex: 0 1 450px;
    }
    &__card {
      margin-right: clamp(25px, 8.3vw, 120px);
      flex: 0 1 350px;
    }
  }
}
</style>
