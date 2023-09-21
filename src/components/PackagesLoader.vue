<template>
  <div class="packages-loader">
    <div class="container">
      <div
        v-if="luxTripStore.tripsLoaded"
        class="packages-list">
        <TripCard
          v-for="(tripCard, index) in luxTripStore.trips"
          :cardObject="tripCard"
          :key="index">
        </TripCard>
      </div>
      <div
        v-if="luxTripStore.tripsLoaded === null"
        class="packages-list">
        <TripCardLoading
          v-for="n in 12"
          :key="n" />
      </div>
      <div
        v-if="luxTripStore.tripsLoaded === false"
        class="packages-list error">
        <h2>There is no trips for this filter. Please try another.</h2>
      </div>
      <div
        v-show="
          luxTripStore.canLoadMore &&
          luxTripStore.trips.length &&
          luxTripStore.tripsLoaded
        "
        class="packages-loader__load-more">
        <ButtonWhite @click="loadMore">
          <CrownDecoration></CrownDecoration>
          <span>Load more</span>
        </ButtonWhite>
      </div>
    </div>
  </div>
</template>
<script>
import { useLuxTripStore } from "@/store/index";
import { mapStores } from "pinia";
import { mapWritableState } from "pinia";
import TripCard from "@/components/TripCard";
import TripCardLoading from "@/components/TripCardLoading";
import ButtonWhite from "@/components/formComponents/ButtonWhite.vue";
import CrownDecoration from "@/components/CrownDecoration.vue";
export default {
  components: {
    TripCard,
    ButtonWhite,
    CrownDecoration,
    TripCardLoading,
  },
  data() {
    return {
      cards: null,
    };
  },

  computed: {
    ...mapStores(useLuxTripStore),
    ...mapWritableState(useLuxTripStore, ["page"]),
  },
  async created() {
    if (this.page == 0) {
      if (this.luxTripStore.isStoreFiltersEmpty) {
        await this.luxTripStore.getTripsPageWithoutFilter();
      } else {
        await this.luxTripStore.getTripsPageWithFilter(
          this.luxTripStore.queryForActiveFilters.q
        );
      }
    }
  },
  methods: {
    async loadMore() {
      if (this.luxTripStore.isStoreFiltersEmpty) {
        await this.luxTripStore.getTripsPageWithoutFilter();
      } else {
        await this.luxTripStore.getTripsPageWithFilter(
          this.luxTripStore.queryForActiveFilters.q
        );
      }
    },
  },
};
</script>
<style lang="scss">
.packages {
  &-list {
    display: grid;
    gap: 30px;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    margin-bottom: 50px;
    .trip-card {
      max-width: 540px;
    }
  }
  &-loader {
    &__load-more {
      margin-bottom: 120px;
    }
  }
}
@media (min-width: 768px) {
  .packages {
    &-list {
      margin-bottom: 0px;
    }
    &-loader {
      &__load-more {
        position: relative;
        &::before {
          content: "";
          position: absolute;
          width: 100vw;
          height: 600px;
          bottom: 0;
          left: 50%;
          translate: -50% 0;
          background: linear-gradient(transparent, var(--bg-main));
          pointer-events: none;
        }
        .btn-white {
          position: relative;
          bottom: 300px;
          max-width: 330px;
          margin: 0 auto;
        }
      }
    }
  }
}
</style>
