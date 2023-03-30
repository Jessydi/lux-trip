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
          <span>Destination</span>

          <SelectComponent
            class="select-component"
            id="search-trip__destination"
            :placeholder="'Where are you going?'"
            :options="['shit', 'fuck', 'luck']"
          ></SelectComponent>
        </label>
        <label class="search-trip__input" for="search-trip__travel-type">
          <ISun></ISun>
          <span>Travel type</span>

          <SelectComponent
            class="select-component"
            id="search-trip__travel-type"
            :placeholder="'Adventure Travel'"
            :options="[
              'shit shitshitshitshit shit hitshitshit shit',
              'fuck',
              'luck',
            ]"
          ></SelectComponent>
        </label>
        <label class="search-trip__input" for="search-trip__date">
          <ICalendar></ICalendar>
          <span>When</span>
          <input
            type="text"
            id="search-trip__date"
            v-model="dateValue"
            autocomplete="off"
            placeholder="Select Date"
            :size="dateInputLength"
          />
        </label>
        <label class="search-trip__input" for="search-trip__travellers">
          <IPerson></IPerson>
          <span>Travellers</span>
          <SelectComponent
            class="select-component"
            id="search-trip__travellers"
            :placeholder="'2 Persons'"
            :options="['shit', 'fuck', 'luck']"
          ></SelectComponent>
        </label>
        <ButtonBlack>
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
      dateValue: null,
    };
  },
  mounted() {
    flatpickr("#search-trip__date", {
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
