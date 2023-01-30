<template>
  <div class="search-trip">
    <div class="search-trip__title crown-decoration">
      <ICrown></ICrown>
      <span>find your journey</span>
      <ICrown></ICrown>
    </div>
    <form action="" class="search-trip__form">
      <label class="search-trip__input" for="search-trip__destination">
        <IRhombus class="rhombus-icon"></IRhombus>
        <span>Destination</span>
        <input
          id="search-trip__destination"
          type="text"
          placeholder="Where are you going?"
        />
      </label>
      <label class="search-trip__input" for="search-trip__travel-type">
        <ISun></ISun>
        <span>Travel type</span>
        <input
          id="search-trip__destination"
          type="text"
          placeholder="Adventure Travel"
          size="16"
        />
      </label>
      <label class="search-trip__input" for="search-trip__date">
        <ICalendar></ICalendar>
        <span>When</span>
        <input
          type="text"
          id="datepicker"
          v-model="dateValue"
          autocomplete="off"
          placeholder="Select Date"
          :size="dateInputLength"
        />
      </label>
      <label class="search-trip__input" for="search-trip__travellers">
        <IPerson></IPerson>
        <span>Travellers</span>
        <input
          id="search-trip__destination"
          type="text"
          placeholder="2 Persons"
          size="10"
        />
      </label>

      <button class="btn btn-black">
        <ISearch></ISearch>
        <span>find</span>
      </button>
    </form>
    <SelectComponent :options="['shit', 'fuck', 'luck']"></SelectComponent>
  </div>
</template>
<script>
import ICrown from "./icons/ICrown.vue";
import IPerson from "./icons/IPerson.vue";
import ICalendar from "./icons/ICalendar.vue";
import ISun from "./icons/ISun.vue";
import IRhombus from "./icons/IRhombus.vue";
import ISearch from "./icons/ISearch.vue";

import SelectComponent from "./Select.vue";

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
export default {
  components: {
    ICrown,
    IPerson,
    ICalendar,
    ISun,
    IRhombus,
    ISearch,
    SelectComponent,
  },
  data() {
    return {
      dateValue: null,
    };
  },
  mounted() {
    flatpickr("#datepicker", {
      minDate: new Date(),
      mode: "range",
      dateFormat: "j M Y",
    });
  },
  computed: {
    dateInputLength: function () {
      if (this.dateValue) {
        console.log(this.dateValue);
        return this.dateValue.length;
      }
      return "10";
    },
  },
  watch: {
    dateValue(newDate) {
      if (newDate.includes("to")) {
        console.log(newDate);
        this.dateValue = newDate.replace("to", "-");
      }
    },
  },
};
</script>

<style lang="scss">
.search-trip {
  //
  height: 1000px;
  //
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
    span {
      position: relative;
      z-index: 1;
    }
  }
  &__form {
    background-color: #fff;
    position: relative;
    top: -25px;
    border-radius: 10px;
    padding: 42px 16px 32px;
    display: flex;
    flex-wrap: wrap;
    row-gap: 20px;
    column-gap: 30px;
  }
  &__input {
    display: grid;
    grid-template-columns: 24px min-content;
    grid-template-areas:
      "icon desc"
      ".    input";
    width: auto;
    flex: 10 1 auto;

    span {
      font-family: "Manrope", Arial, Helvetica, sans-serif;
      font-size: 18px;
      line-height: 25px;
      font-weight: 300;
      grid-area: desc;
    }
    svg {
      // grid-row: span 2;
      justify-self: center;
      grid-area: icon;
      align-self: center;
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
    &__title {
      span {
      }
    }
    &__form {
      align-items: center;
    }
    &__input {
      height: fit-content;
      span {
      }
      input {
      }
    }
    .btn {
      flex: 1 0 auto;
    }
  }
}
</style>
