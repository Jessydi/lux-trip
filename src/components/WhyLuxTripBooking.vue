<template>
  <div class="why-lux-trip-booking">
    <div class="container">
      <h3>
        We customize your journey by selecting the most convenient travelling
        options, including private yachts, jets, charter flights and supercars.
      </h3>
    </div>
    <SliderComponent :splideObject="splideObject">
      <SplideSlide v-for="(bookCategory, index) in bookCategories" :key="index">
        <BookCategory :bookCategory="bookCategory"></BookCategory>
      </SplideSlide>
    </SliderComponent>
    <div class="container">
      <router-link class="why-lux-trip-booking__link" :to="{ name: 'booking' }">
        <ButtonBlack>
          <CrownDecoration></CrownDecoration>
          <span>Book now</span>
        </ButtonBlack>
      </router-link>
    </div>
  </div>
</template>
<script>
import ButtonBlack from "@/components/ButtonBlack.vue";
import BookCategory from "@/components/BookCategory.vue";
import SliderComponent from "@/components/SliderComponent.vue";
import { SplideSlide } from "@splidejs/vue-splide";
import CrownDecoration from "@/components/CrownDecoration.vue";
export default {
  components: {
    ButtonBlack,
    CrownDecoration,
    SliderComponent,
    SplideSlide,
    BookCategory,
  },
  data() {
    return {
      splideObject: {
        gap: "30px",
        perPage: 4,
        perMove: 1,
        type: "loop",
        breakpoints: {
          768: {
            perPage: 2,
            gap: "15px",
          },
        },
      },
      bookCategories: [
        {
          name: "Supercars",
          src: "book-category-1.jpg",
          routeSrc: "supercar-booking",
          description:
            "Experience the epitome of luxury and power with Super Car Booking. Indulge in the world's most prestigious supercars, tailored exclusively for the discerning tastes of the affluent.",
        },
        {
          name: "Hotels",
          src: "book-category-2.jpg",
          routeSrc: "hotels-booking",
          description:
            "Immerse yourself in opulence and sophistication at our exclusive hotels. Each establishment offers refined elegance, exceptional service, and lavish accommodations that redefine luxury hospitality.",
        },
        {
          name: "Villas",
          src: "book-category-3.jpg",
          routeSrc: "vilas-booking",
          description:
            "Escape to your private sanctuary amidst breathtaking landscapes. Our exquisite villas and chalets combine unmatched luxury, privacy, and stunning views for an extraordinary retreat tailored to your desires.",
        },
        {
          name: "Yachts",
          src: "book-category-4.jpg",
          routeSrc: "yachts-booking",
          description:
            "Sail away on a journey of splendor aboard our curated selection of luxury yachts and boats. Experience unparalleled luxury, personalized service, and breathtaking vistas as you navigate captivating coastlines.",
        },
        {
          name: "Private Helicopter",
          src: "book-category-5.jpg",
          routeSrc: "helicopter-booking",
          description:
            " Soar above in absolute luxury with our private helicopter services. Enjoy panoramic views and swift travel, whether for sightseeing or efficient transfers, ensuring an unrivaled VIP experience.",
        },
        {
          name: "Private Jet",
          src: "book-category-6.jpg",
          routeSrc: "jet-booking",
          description:
            " Unlock a world of travel possibilities with our private jet services. Experience comfort, privacy, and flexibility as you embark on extraordinary journeys with impeccable service and customized itineraries.",
        },
      ],
    };
  },
};
</script>
<style scoped lang="scss">
.why-lux-trip-booking {
  h3 {
    margin-bottom: 25px;
  }

  .container {
    max-width: 540px;
  }
  .splide {
    margin: 0 -230px 75px 15px;
  }
  :deep(.splide) {
    .splide__arrows,
    .splide__pagination {
      display: none;
    }
  }
  :deep(.book-category) {
    border-radius: 5px;
    .book-category__name {
      font-size: 23px;
      line-height: 22px;
    }
    .rhombus {
      width: 38px;
      &-blur {
        width: 35px;
      }
    }
  }
  &__link {
    width: 100%;
  }
}
@media (min-width: 768px) {
  .why-lux-trip-booking {
    h3 {
      margin-bottom: 35px;
    }
    .splide {
      margin: 0 -230px 85px -230px;
    }
    :deep(.book-category) {
      border-radius: 10px;
      .book-category__name {
        font-size: 44px;
        line-height: 43px;
      }
      .rhombus {
        width: 75px;
        &-blur {
          width: 67px;
        }
      }
    }
  }
}
</style>
