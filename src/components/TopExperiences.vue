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
            <template v-if="topTripsLoaded">
              <SplideSlide
                v-for="(card, index) in category.cards"
                :key="index"
                ><TripCard :card-object="card"></TripCard>
              </SplideSlide>
            </template>
            <template v-if="topTripsLoaded === null">
              <SplideSlide
                v-for="n in 12"
                :key="n">
                <TripCardLoading />
              </SplideSlide>
            </template>
          </SliderComponent>
          <template v-if="topTripsLoaded === false">
            <h2>There is no trips for this continent yet(</h2>
            <h2>Try our worlds best trip!</h2>
          </template>
        </TabComponent>
      </TabsWrapper>
    </div>
  </div>
</template>
<script>
import SliderComponent from "@/components/SliderComponent.vue";
import TripCard from "@/components/TripCard.vue";
import TripCardLoading from "@/components/TripCardLoading";
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
    TripCardLoading,
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
      topTripsLoaded: null,
    };
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
        this.topTripsLoaded = true;
      } else {
        this.topTripsLoaded = false;
      }
    }
  },

  methods: {
    async tabChanged(tabTitle) {
      let q;
      const continentTripsObject = this.luxTripStore.topTrips.find(
        (category) => category.place == tabTitle
      );

      if (continentTripsObject.cards.length == 0) {
        this.topTripsLoaded = null;
        const topContinentTrips = this.luxTripStore.topTrips
          .find((category) => category.place == "World")
          .cards.sort(
            (a, b) =>
              b.averageRatingObject.overallAverageRating -
              a.averageRatingObject.overallAverageRating
          )
          .filter((trip) => trip.continent === tabTitle);
        if (
          topContinentTrips.length < 12 &&
          continentTripsObject.cards.length < 12
        ) {
          const loadedTripsId = topContinentTrips.map((trip) => trip.id);
          if (loadedTripsId.length) {
            q = query(
              collection(db, "trips"),
              orderBy("id"),
              orderBy("averageRatingObject.overallAverageRating", "desc"),
              where("continent", "==", tabTitle),
              where("id", "not-in", loadedTripsId),
              limit(12 - loadedTripsId.length)
            );
          } else {
            q = query(
              collection(db, "trips"),
              orderBy("averageRatingObject.overallAverageRating", "desc"),
              where("continent", "==", tabTitle),
              limit(12)
            );
          }
          try {
            const tripsArray = (await this.luxTripStore.getTrips(q)).docsArray;
            continentTripsObject.cards.push(...tripsArray);
            continentTripsObject.cards.push(...topContinentTrips);

            if (continentTripsObject.cards.length) {
              continentTripsObject.cards.sort(
                (a, b) =>
                  b.averageRatingObject.overallAverageRating -
                  a.averageRatingObject.overallAverageRating
              );
              this.topTripsLoaded = true;
            } else {
              this.topTripsLoaded = false;
            }
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        this.topTripsLoaded = true;
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
