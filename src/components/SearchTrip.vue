<template>
  <div class="search-trip">
    <div class="container">
      <div class="search-trip__title">
        <CrownDecoration></CrownDecoration>
        <span>find your journey</span>
      </div>
      <form action="" class="search-trip__form">
        <label class="search-trip__input" for="search-trip__destination">
          <IRhombus class="rhombus-icon"></IRhombus>
          <span>Luxury Tours</span>

          <SelectComponent
            class="select-component"
            id="search-trip__destination"
            v-model="filterObject.travelCategory"
            placeholder="Where are you going?"
            :options="[
              'Romantic Winter Destinations',
              'Best Summer Destinations',
              'Best Winter Destinations',
            ]"
          ></SelectComponent>
        </label>
        <label class="search-trip__input" for="search-trip__travel-type">
          <ISun></ISun>
          <span>Travel type</span>

          <SelectComponent
            class="select-component"
            id="search-trip__travel-type"
            v-model="filterObject.travelType"
            placeholder="Choose trip type"
            :options="['Adventure', 'Romantic']"
          ></SelectComponent>
        </label>
        <label class="search-trip__input" for="search-trip__date">
          <ICalendar></ICalendar>
          <span>When</span>
          <input
            type="text"
            id="search-trip__date"
            v-model="filterObject.dateValue"
            autocomplete="off"
            placeholder="Select Date"
            :size="dateInputLength"
          />
          <button
            class="clear-date"
            @click.prevent="filterObject.dateValue = null"
          ></button>
        </label>
        <label class="search-trip__input" for="search-trip__travellers">
          <IPerson></IPerson>
          <span>Travellers</span>
          <SelectComponent
            class="select-component"
            id="search-trip__travellers"
            v-model="filterObject.travellers"
            placeholder="Any amount"
            :options="[1, 2, 3]"
          ></SelectComponent>
        </label>
        <!-- <ButtonBlack @click.prevent="searchTrip()">
          <ISearch></ISearch>
          <span>find</span>
        </ButtonBlack> -->
        <ButtonBlack @click.prevent="luxTripStore.addTrips()">
          <ISearch></ISearch>
          <span>find</span>
        </ButtonBlack>
      </form>
    </div>
  </div>
</template>
<script>
import IPerson from "./icons/IPerson.vue";
import ICalendar from "./icons/ICalendar.vue";
import ISun from "./icons/ISun.vue";
import IRhombus from "./icons/IRhombus.vue";
import ISearch from "./icons/ISearch.vue";

import SelectComponent from "./Select.vue";
import ButtonBlack from "@/components/ButtonBlack.vue";
import CrownDecoration from "@/components/CrownDecoration.vue";

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";

import { useLuxTripStore } from "@/store/index";
import { mapStores } from "pinia";

export default {
  components: {
    CrownDecoration,
    IPerson,
    ICalendar,
    ISun,
    IRhombus,
    ISearch,
    SelectComponent,
    ButtonBlack,
  },
  data() {
    return {
      filterObject: {
        travelCategory: null,
        travelType: null,
        travellers: null,
        dateValue: null,
      },
    };
  },
  mounted() {
    flatpickr("#search-trip__date", {
      minDate: new Date(),
      mode: "range",
      defaultDate: null,
      dateFormat: "j M Y ",
    });
  },
  methods: {
    searchTrip() {
      this.filterObject.dateValue = null;
      const isAllFiltersEmpty = Object.values(this.filterObject).every(
        (val) => val === null
      );
      if (isAllFiltersEmpty) {
        if (this.luxTripStore.isStoreFiltersEmpty) {
          return;
        }
        this.luxTripStore.getTrips();
        this.luxTripStore.filterParams = this.filterObject;
        return;
      }
      this.luxTripStore.filterParams = this.filterObject;
      this.luxTripStore.getTrips(this.luxTripStore.queryForActiveFilters);
    },
  },
  computed: {
    dateInputLength: function () {
      if (this.filterObject.dateValue) {
        return this.filterObject.dateValue.length;
      }
      return "10";
    },
    ...mapStores(useLuxTripStore),
  },
  watch: {
    "filterObject.dateValue": {
      handler(newDate) {
        if (newDate && newDate.includes("to")) {
          this.filterObject.dateValue = newDate.replace("to", "-");
        }
      },
    },
  },
};
</script>

<style lang="scss">
.search-trip {
  &__title {
    background-color: #fff;
    border-radius: 67px;
    padding: 13px 15px;
    font-size: 26px;
    line-height: 28px;
    text-transform: uppercase;
    color: var(--gray);
    max-width: min(calc(100% - 32px), 330px);
    text-align: center;
    position: relative;
    margin: 0 auto;
    top: 25px;
    span {
      position: relative;
      z-index: 1;
    }
  }
  &__form {
    box-shadow: 0px 18px 38px rgba(0, 0, 0, 0.11);
    background-color: #fff;
    position: relative;
    border-radius: 10px;
    padding: 42px 16px 32px;
    display: flex;
    flex-wrap: wrap;
    row-gap: 20px;
    column-gap: 30px;
  }
  &__input {
    display: grid;
    grid-template-columns: 24px 1fr;
    grid-template-areas:
      "icon desc"
      ".    input";
    width: auto;
    flex: 10 1 auto;
    position: relative;
    span {
      font-family: var(--manrope);
      font-size: 18px;
      line-height: 25px;
      font-weight: 300;
      grid-area: desc;
    }
    svg {
      justify-self: center;
      grid-area: icon;
      align-self: center;
    }
    .select-component {
      grid-area: input;
      font-weight: 500;
      font-size: 18px;
      line-height: 25px;
      font-family: var(--manrope);
    }
    input {
      border: none;
      font-weight: 500;
      font-size: 18px;
      line-height: 25px;
      grid-area: input;

      &:focus {
        outline: 0;
      }
      &::placeholder {
        font-weight: 500;
        font-size: 18px;
        line-height: 25px;
      }
    }
    .rhombus-icon {
      height: 17px;
      width: auto;

      stroke-width: 120px;
      polygon {
        stroke: var(--gray);
      }
    }
    .clear-date {
      position: absolute;
      cursor: pointer;
      height: 20px;
      width: 20px;
      right: 0;
      bottom: 3px;
      &::after,
      &::before {
        content: "";
        position: absolute;
        height: 15px;
        width: 2px;
        left: 50%;
        top: 50%;
        transform-origin: center;
        translate: -50% -50%;
        background-color: var(--gray);
      }
      &::after {
        rotate: -45deg;
      }
      &::before {
        rotate: 45deg;
      }
    }
  }
  .flatpickr-input {
    max-width: 240px;
  }
  .btn {
    height: 70px;
    flex: 1 1 100%;
  }
}
@media (min-width: 1000px) {
  .search-trip {
    &__form {
      align-items: center;
    }
    &__input {
      height: fit-content;
    }
    .btn {
      flex: 1 0;
    }
  }
}
</style>
