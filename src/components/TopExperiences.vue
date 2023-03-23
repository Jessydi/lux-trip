<template>
  <div class="top-experiences">
    <div class="container">
      <div class="top-experiences__title">
        <IDoubleRhombus></IDoubleRhombus>
        <h2>
          Top Rated <br />
          Experiences
        </h2>
      </div>
      <TabsWrapper>
        <TabComponent
          v-for="(category, index) in categories"
          :key="index"
          :title="category.place"
        >
          <SliderComponent :splide-object="splideObject">
            <SplideSlide v-for="(card, index) in category.cards" :key="index"
              ><TripCard :card-object="card"></TripCard>
            </SplideSlide>
          </SliderComponent>
        </TabComponent>
      </TabsWrapper>
    </div>
  </div>
</template>
<script>
import SliderComponent from "@/components/SliderComponent.vue";
import TripCard from "@/components/TripCard.vue";
import TabsWrapper from "@/components/TabsWrapper.vue";
import TabComponent from "@/components/TabComponent.vue";

import IDoubleRhombus from "./icons/IDoubleRhombus.vue";

import { SplideSlide } from "@splidejs/vue-splide";
export default {
  name: "HomeView",
  components: {
    SliderComponent,
    TripCard,
    SplideSlide,
    TabsWrapper,
    TabComponent,
    IDoubleRhombus,
  },
  data() {
    return {
      splideObject: {
        gap: "30px",
        perPage: 3,
        perMove: 1,
        breakpoints: {
          900: {
            perPage: 2,
            gap: "16px",
          },
          470: {
            perPage: 1,
            gap: "16px",
          },
        },
      },
      categories: [
        {
          place: "World",
          cards: [
            {
              imgSrc: "trip-card-img-2.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 2.1,
            },
            {
              imgSrc: "trip-card-img-1.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 3.0,
            },
            {
              imgSrc: "trip-card-img-3.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 1.4,
            },
            {
              imgSrc: "trip-card-img-5.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 3.8,
            },
            {
              imgSrc: "trip-card-img-4.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 4.4,
            },
          ],
        },
        {
          place: "Africa",
          cards: [
            {
              imgSrc: "trip-card-img-5.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 3.8,
            },
            {
              imgSrc: "trip-card-img-2.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 2.1,
            },
            {
              imgSrc: "trip-card-img-1.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 3.0,
            },
            {
              imgSrc: "trip-card-img-3.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 1.4,
            },
            {
              imgSrc: "trip-card-img-4.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 4.4,
            },
          ],
        },
        {
          place: "Asia",
          cards: [
            {
              imgSrc: "trip-card-img-1.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 3.0,
            },
            {
              imgSrc: "trip-card-img-2.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 2.1,
            },
            {
              imgSrc: "trip-card-img-3.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 1.4,
            },
            {
              imgSrc: "trip-card-img-4.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 4.4,
            },
            {
              imgSrc: "trip-card-img-5.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 3.8,
            },
          ],
        },
        {
          place: "Europe",
          cards: [
            {
              imgSrc: "trip-card-img-1.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 3.0,
            },
            {
              imgSrc: "trip-card-img-2.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 2.1,
            },
            {
              imgSrc: "trip-card-img-3.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 1.4,
            },
            {
              imgSrc: "trip-card-img-4.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 4.4,
            },
            {
              imgSrc: "trip-card-img-5.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 3.8,
            },
          ],
        },
        {
          place: "North America",
          cards: [
            {
              imgSrc: "trip-card-img-1.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 3.0,
            },
            {
              imgSrc: "trip-card-img-2.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 2.1,
            },
            {
              imgSrc: "trip-card-img-3.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 1.4,
            },
            {
              imgSrc: "trip-card-img-4.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 4.4,
            },
            {
              imgSrc: "trip-card-img-5.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 3.8,
            },
          ],
        },
        {
          place: "South America",
          cards: [
            {
              imgSrc: "trip-card-img-1.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 3.0,
            },
            {
              imgSrc: "trip-card-img-2.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 2.1,
            },
            {
              imgSrc: "trip-card-img-3.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 1.4,
            },
            {
              imgSrc: "trip-card-img-4.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 4.4,
            },
            {
              imgSrc: "trip-card-img-5.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 3.8,
            },
          ],
        },
        {
          place: "Antarctica",
          cards: [
            {
              imgSrc: "trip-card-img-1.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 3.0,
            },
            {
              imgSrc: "trip-card-img-2.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 2.1,
            },
            {
              imgSrc: "trip-card-img-3.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 1.4,
            },
            {
              imgSrc: "trip-card-img-4.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 4.4,
            },
            {
              imgSrc: "trip-card-img-5.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 3.8,
            },
          ],
        },
        {
          place: "Australia",
          cards: [
            {
              imgSrc: "trip-card-img-1.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 3.0,
            },
            {
              imgSrc: "trip-card-img-2.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 2.1,
            },
            {
              imgSrc: "trip-card-img-3.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 1.4,
            },
            {
              imgSrc: "trip-card-img-4.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 4.4,
            },
            {
              imgSrc: "trip-card-img-5.jpg",
              location: "Austria",
              name: "Winter Park Ski Holiday",
              price: 1490,
              rating: 3.8,
            },
          ],
        },
      ],
    };
  },
};
</script>
<style lang="scss">
.top-experiences {
  &__title {
    position: relative;
    z-index: 1;
    margin-bottom: 40px;
    h2 {
      position: relative;
      z-index: 1;
    }
    svg {
      position: absolute;
      left: 50%;
      top: 50%;
      translate: -50% -50%;
    }
  }
}
@media (min-width: 768px) {
  .top-experiences {
    &__title {
      margin-bottom: 60px;
      svg {
        width: 112px;
        height: auto;
      }
    }
  }
}
</style>
