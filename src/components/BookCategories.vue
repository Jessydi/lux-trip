<template>
  <div class="book-categories">
    <div class="container">
      <h2 v-if="title">Book With Us</h2>
      <div class="book-categories__list">
        <slot v-bind:bookCategories="bookCategories"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
  props: {
    title: {
      type: String,
    },
  },
};
</script>
<style lang="scss">
.book {
  &-categories {
    h2 {
      margin-bottom: 65px;
    }
    &__list {
      display: grid;
      grid-template-columns: 1fr;
      gap: 14px;
    }
  }
}
@media (min-width: 768px) {
  .book {
    &-categories {
      h2 {
        margin-bottom: 75px;
      }
      &__list {
        gap: 30px;
        grid-template-columns: 1fr 1fr;
      }
    }
  }
}
</style>
