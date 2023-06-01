<template>
  <div class="packages-loader">
    <div class="container">
      <div class="packages-list">
        <TripCard
          v-for="(tripCard, index) in luxTripStore.trips"
          :cardObject="tripCard"
          :key="index"
        >
        </TripCard>
      </div>
      <div v-show="luxTripStore.canLoadMore" class="packages-loader__load-more">
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
import TripCard from "@/components/TripCard";
import ButtonWhite from "@/components/ButtonWhite.vue";
import CrownDecoration from "@/components/CrownDecoration.vue";
export default {
  components: {
    TripCard,
    ButtonWhite,
    CrownDecoration,
  },
  data() {
    return {
      cardsOnOnePage: 12,
      page: 1,
    };
  },

  computed: {
    ...mapStores(useLuxTripStore),
    cardsArray() {
      return this.luxTripStore.slice(0, this.cardsOnOnePage * this.page);
    },
  },
  created() {
    this.luxTripStore.getTrips();
  },
  methods: {
    loadMore() {
      // додати перевірку на наявність в сторі
      this.page += 1;
      this.luxTripStore.getTrips(this.luxTripStore.queryForActiveFilters);
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
          left: 0;
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
