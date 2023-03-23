<template>
  <div class="luxury-packages">
    <img
      src="@/assets/backgrounds/beach-bg.jpg"
      alt="beach"
      class="luxury-packages__bg"
    />
    <div class="container">
      <h2>
        <span>Luxury Packages</span>
        <ButtonTransparent>view all</ButtonTransparent>
      </h2>
      <SliderComponent :splide-object="splideObject">
        <SplideSlide v-for="(card, index) in packageCards" :key="index"
          ><PackageCard :card-object="card"></PackageCard>
        </SplideSlide>
      </SliderComponent>
    </div>
  </div>
</template>
<script>
import SliderComponent from "@/components/SliderComponent.vue";
import PackageCard from "@/components/PackageCard.vue";
import ButtonTransparent from "@/components/ButtonTransparent.vue";
import { SplideSlide } from "@splidejs/vue-splide";

export default {
  components: {
    SliderComponent,
    SplideSlide,
    PackageCard,
    ButtonTransparent,
  },
  data() {
    return {
      splideObject: {
        destroy: true,
        gap: "30px",
        perPage: 3,
        perMove: 1,
        breakpoints: {
          900: {
            destroy: false,
            perPage: 2,
            gap: "20px",
          },
          600: {
            perPage: 1,
            gap: "16px",
          },
        },
      },
      packageCards: [
        {
          imgSrc: "package-cover-1.jpg",
          name: "New destinations for 2022",
          placesNumber: 47,
        },
        {
          imgSrc: "package-cover-2.jpg",
          name: "Best Winter Destinations",
          placesNumber: 34,
        },
        {
          imgSrc: "package-cover-3.jpg",
          name: "The world's most extraordinary places",
          placesNumber: 29,
        },
        {
          imgSrc: "package-cover-4.jpg",
          name: "Your health is matter",
          placesNumber: 29,
        },
        {
          imgSrc: "package-cover-5.jpg",
          name: "Experiences Away From Crowd",
          placesNumber: 168,
        },
      ],
    };
  },
};
</script>
<style lang="scss">
.luxury-packages {
  position: relative;
  .container {
    position: relative;
  }
  &::before {
    content: "";
    width: 100%;
    height: 120%;
    position: absolute;
    top: 50%;
    z-index: -1;
    translate: 0 -50%;
    background: linear-gradient(
      180deg,
      var(--bg-main) 0%,
      #c9c8d8 20%,
      #d4d8c6 40%,
      var(--bg-main) 65%,
      #91c8bb 80%,
      transparent 100%
    );
  }
  &::after {
    z-index: -1;
    content: "";
    width: 100%;
    aspect-ratio: 160/107;
    position: absolute;
    top: 80%;
    background: linear-gradient(180deg, transparent 0%, var(--bg-main) 100%);
  }
  h2 {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding-bottom: 20px;
    gap: 30px;
    span {
      text-align: left;
    }
  }
  &__bg {
    position: absolute;
    width: 100%;
    top: 80%;
    z-index: -2;
  }
  .btn-transparent {
    width: 140px;
  }
}
@media (min-width: 900px) {
  .luxury-packages {
    &__bg {
      max-height: 1000px;
      object-fit: cover;
    }
    &::after {
      max-height: 1000px;
    }
    .container {
      display: grid;
      gap: 30px;
      grid-template-columns: 1fr 1fr 1fr;
      padding-bottom: 120px;
    }
    h2 {
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      margin-top: 100px;
    }
    .splide {
      display: contents;
      &__slide:nth-child(3n + 1) {
        translate: 0 120px;
      }
      &__slide:nth-child(3n) {
        translate: 0 -30px;
      }
      &__arrows {
        display: none;
      }
      .splide__track {
        display: contents;
        .splide__list {
          display: contents;
        }
      }
    }
  }
}
</style>
