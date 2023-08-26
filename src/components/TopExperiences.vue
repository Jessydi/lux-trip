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
      <TabsWrapper @selected="tabChanged">
        <TabComponent
          v-for="(category, index) in luxTripStore.topTrips"
          :key="index"
          :title="category.place"
          vShow>
          <SliderComponent :splide-object="splideObject">
            <SplideSlide
              v-for="(card, index) in category.cards"
              :key="index"
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

import { useLuxTripStore } from "@/store/index";
import { mapWritableState } from "pinia";
import { mapStores } from "pinia";
import { db } from "@/firebase/firebaseInit";
import { collection, query, where, orderBy, limit } from "firebase/firestore";

import IDoubleRhombus from "@/components/icons/IDoubleRhombus.vue";

import { SplideSlide } from "@splidejs/vue-splide";
export default {
  name: "TopExperiences",
  components: {
    SliderComponent,
    TripCard,
    SplideSlide,
    TabsWrapper,
    TabComponent,
    IDoubleRhombus,
  },
  async created() {
    if (!this.luxTripStore.worldsTopTripsLoaded) {
      const continentTripsObject = this.luxTripStore.topTrips.find(
        (category) => category.place == "World"
      );
      const tripResponse = await this.luxTripStore.getTrips();
      if (tripResponse) {
        const { docsArray, lastDocSnap } = tripResponse;
        this.luxTripStore.lastDocSnap = lastDocSnap;
        continentTripsObject.cards.push(...docsArray);
        this.luxTripStore.worldsTopTripsLoaded = true;
      }
    }
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
    };
  },

  methods: {
    async tabChanged(tabTitle) {
      // тут також можна перевіряти чи підвантажені worldTop, і серед них шукати підвантажені для кожного континенту, і довантажувати ті яких не вистачило
      debugger;
      if (tabTitle == "World") {
        return;
      }
      let q;
      const continentTripsObject = this.luxTripStore.topTrips.find(
        (category) => category.place == tabTitle
      );
      if (continentTripsObject.cards.length == 0) {
        const topContinentTrips = this.luxTripStore.topTrips
          .find((category) => category.place == "World")
          .cards.sort(
            (a, b) =>
              b.averageRatingObject.overallAverageRating -
              a.averageRatingObject.overallAverageRating
          )
          .filter((trip) => trip.continent === tabTitle);
        console.log(topContinentTrips.length);
        if (
          !(topContinentTrips.length >= 12) &&
          continentTripsObject.cards.length < 12
        ) {
          const loadedTripsId = topContinentTrips.map((trip) => trip.id);

          if (loadedTripsId.length) {
            console.log("there");
            q = query(
              collection(db, "trips"),
              orderBy("id"),
              orderBy("averageRatingObject.overallAverageRating", "desc"),
              where("continent", "==", tabTitle),
              where("id", "not-in", loadedTripsId),
              limit(12 - loadedTripsId.length)
            );
          } else {
            console.log("wow!");
            q = query(
              collection(db, "trips"),
              orderBy("averageRatingObject.overallAverageRating", "desc"),
              where("continent", "==", tabTitle),
              limit(12)
            );
          }
          const tripsArray = (await this.luxTripStore.getTrips(q)).docsArray;
          continentTripsObject.cards.push(...tripsArray);
          continentTripsObject.cards.push(...topContinentTrips);

          // console.log(continentTripsObject.cards);
          continentTripsObject.cards.sort(
            (a, b) =>
              b.averageRatingObject.overallAverageRating -
              a.averageRatingObject.overallAverageRating
          );
        }
      }
    },
  },
  computed: {
    ...mapStores(useLuxTripStore),
    ...mapWritableState(useLuxTripStore, ["worldsTopTripsLoaded"]),
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
