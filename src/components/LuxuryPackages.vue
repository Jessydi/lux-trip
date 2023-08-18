<template>
  <div class="luxury-packages">
    <img
      src="@/assets/backgrounds/beach-bg.jpg"
      alt="beach"
      class="luxury-packages__bg" />
    <div class="container">
      <h2>
        <span>Luxury Packages</span>
        <ButtonTransparent
          class="link"
          @click="searchTrips"
          >view all</ButtonTransparent
        >
      </h2>
      <SliderComponent :splide-object="splideObject">
        <SplideSlide
          v-for="(card, index) in packageCards"
          :key="index">
          <CollectionCard :card-object="card"></CollectionCard>
        </SplideSlide>
      </SliderComponent>
    </div>
  </div>
</template>
<script>
import SliderComponent from "@/components/SliderComponent.vue";
import CollectionCard from "@/components/CollectionCard.vue";
import ButtonTransparent from "@/components/formComponents/ButtonTransparent.vue";
import { SplideSlide } from "@splidejs/vue-splide";

import { useLuxTripStore } from "@/store/index";
import { mapStores } from "pinia";

import { db } from "@/firebase/firebaseInit";
import {
  collection,
  getCountFromServer,
  where,
  query,
} from "firebase/firestore";
export default {
  components: {
    SliderComponent,
    SplideSlide,
    CollectionCard,
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
          899: {
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
          name: "Best Summer Destinations",
          placesNumber: "10+",
        },
        {
          imgSrc: "package-cover-2.jpg",
          name: "Best Winter Destinations",
          placesNumber: "10+",
        },
        {
          imgSrc: "package-cover-3.jpg",
          name: "The world's most extraordinary places",
          placesNumber: "10+",
        },
        {
          imgSrc: "package-cover-4.jpg",
          name: "Your health is matter",
          placesNumber: "10+",
        },
        {
          imgSrc: "package-cover-5.jpg",
          name: "Experiences Away From Crowd",
          placesNumber: "10+",
        },
      ],
    };
  },
  async created() {
    const tripCollection = collection(db, "trips");

    for (let i = 0; i < this.packageCards.length; i++) {
      let countForCategory = await getCountFromServer(
        query(
          tripCollection,
          where("category", "==", this.packageCards[i].name)
        )
      );
      this.packageCards[i].placesNumber = countForCategory.data().count;
    }
  },
  methods: {
    searchTrips() {
      this.luxTripStore.clearFilter();
      this.$router.push({ name: "packages" });
    },
  },
  computed: {
    ...mapStores(useLuxTripStore),
  },
};
</script>
<style lang="scss">
.luxury-packages {
  position: relative;

  .container {
    position: relative;
  }

  .btn-transparent {
    width: 140px;
  }

  &__bg {
    position: absolute;
    width: 100%;
    top: 80%;
    z-index: -2;
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
}

@media (min-width: 900px) {
  .luxury-packages {
    .container {
      display: grid;
      gap: 30px;
      grid-template-columns: 1fr 1fr 1fr;
      padding-bottom: 120px;
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

    &__bg {
      max-height: 1000px;
      object-fit: cover;
    }

    &::after {
      max-height: 1000px;
    }

    h2 {
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      margin-top: 100px;
    }
  }
}
</style>
