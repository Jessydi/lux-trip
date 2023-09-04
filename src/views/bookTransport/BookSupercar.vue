<template>
  <div class="book-supercar-page">
    <main>
      <div class="wrapper">
        <h2>Book Supercars</h2>
        <BookTransport
          :bookTransport="bookTransport"
          :formObject="formObject.values"
          :formSchema="formSchema"
          @validated="(errors) => (formObject.errors = errors)">
          <Input
            type="text"
            name="country"
            label="Location from"
            placeholder="Country, city"
            v-model="formObject.values.location"
            id="location"
            :errorMessage="formObject.errors.location"
            @focus="formObject.errors.location = null"
            withIcon
            ><IRhombus class="rhombus-icon"></IRhombus
          ></Input>
          <DateInput
            label="Dates"
            placeholder="Dates"
            v-model="formObject.values.bookingDates"
            :id="`bookingDates`"
            :errorMessage="formObject.errors.bookingDates"
            @input-click="formObject.errors.bookingDates = null"
            @focus="formObject.errors.bookingDates = null"
            :minDate="new Date()"
            mode="range"
            withIcon>
            <ICalendar></ICalendar>
          </DateInput>
          <Select
            class="select-component"
            id="book-trip-car"
            label="Model of supercar"
            placeholder="Surprise me"
            v-model="formObject.values.supercar"
            :errorMessage="formObject.errors.supercar"
            @focus="formObject.errors.supercar = null"
            @click="formObject.errors.supercar = null"
            :options="[
              'supercar 1',
              'supercar 2',
              'supercar 3',
              'supercar 4',
              'supercar 5',
              'supercar 6',
              'supercar 7',
              'supercar 8',
              'supercar 9',
            ]"></Select>
          <CheckboxSlide
            v-model="formObject.values.driver"
            label="Driver" />
        </BookTransport>
        <Subscribe></Subscribe>
      </div>
    </main>
  </div>
</template>
<script>
import v8n from "v8n";

import BookTransport from "@/components/BookTransport.vue";
import Subscribe from "@/components/Subscribe.vue";
import Input from "@/components/formComponents/Input.vue";
import Select from "@/components/formComponents/Select.vue";
import CheckboxSlide from "@/components/formComponents/CheckboxSlide.vue";
import DateInput from "@/components/formComponents/DateInput.vue";

import ICalendar from "@/components/icons/ICalendar.vue";
import IRhombus from "@/components/icons/IRhombus.vue";

export default {
  components: {
    BookTransport,
    Subscribe,
    Input,
    Select,
    CheckboxSlide,
    DateInput,
    ICalendar,
    IRhombus,
  },
  data() {
    return {
      bookTransport: {
        img: "book-category-1",
        description: [
          "All the latest top-of-the-range models described by elegance, class and technology are among our wide range of rentals and hiring.",
          "Do you wish to feel like a Formula 1 driver and test the famous circuit in Monza? Or do you prefer to sit back and relax while our driver brings you across the most picturesque Amalfi coast? All you have to do is choose the destination and we will arrange the rest!",
        ],
        included: {
          IClock: "Dedicated 24/7 Travel Advisor",
          IMan: "Professional drivers and driver-coaches",
          ICar: "Wide selection of cars",
          ICase: "Accidental damage protection",
          IHealth: "Dedicated health insurance",
          ITickets: "Package deals",
        },
        subtitle:
          "Lux Trips gives you access to the most prestigious cars on the market.",
      },
      formSchema: {
        location: v8n().not.null().string().not.empty().minLength(1),
        supercar: v8n(),
        driver: v8n(),
        bookingDates: v8n().not.null(),
      },
      formObject: {
        values: {
          location: null,
          supercar: null,
          driver: false,
          bookingDates: null,
        },
        errors: {
          location: null,
          supercar: null,
          driver: null,
          bookingDates: null,
        },
      },
    };
  },
};
</script>
<style lang="scss"></style>
