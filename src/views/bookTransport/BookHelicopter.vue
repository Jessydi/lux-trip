<template>
  <div class="book-supercar-page">
    <main>
      <div class="wrapper">
        <h2>Book Private Helicopter</h2>
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
            label="Model of helicopter"
            placeholder="Surprise me"
            v-model="formObject.values.helicopter"
            :errorMessage="formObject.errors.helicopter"
            @focus="formObject.errors.helicopter = null"
            @click="formObject.errors.helicopter = null"
            :options="[
              'helicopter 1',
              'helicopter 2',
              'helicopter 3',
              'helicopter 4',
              'helicopter 5',
              'helicopter 6',
              'helicopter 7',
              'helicopter 8',
              'helicopter 9',
            ]"></Select>
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
import DateInput from "@/components/formComponents/DateInput.vue";

import ICalendar from "@/components/icons/ICalendar.vue";
import IRhombus from "@/components/icons/IRhombus.vue";

export default {
  components: {
    BookTransport,
    Subscribe,
    Input,
    Select,
    DateInput,
    ICalendar,
    IRhombus,
  },
  data() {
    return {
      bookTransport: {
        img: "book-category-5",
        description: [
          "Opting for a helicopter is the best solution not to waste precious minutes on the road when planes cannot land close enough to your final destination.",
          "Lux Trip private aviation services offer helicopter rent and charter for VIP transfers, remote and exclusive location trips, public and private events, islands and yachts landing, professional visits, remote ski resorts and extreme sport activities, and sightseeing.",
        ],
        included: {
          IClock: "Dedicated 24/7 Travel Advisor",
          IGlobe: "Global coverage ",
          IHelicopter: "Wide selection of aircrafts",
          ICase: "Accidental damage protection",
          IHelicopterCard: "VIP helicopter management ",
          IFamily: "Travel insurance",
          ITickets: "Package deals",
        },
        subtitle:
          "When planes cannot land close enough to your final destination",
      },
      formSchema: {
        location: v8n().not.null().string().not.empty().minLength(1),
        helicopter: v8n(),
        bookingDates: v8n().not.null(),
      },
      formObject: {
        values: {
          location: null,
          helicopter: null,
          bookingDates: null,
        },
        errors: {
          location: null,
          helicopter: null,
          bookingDates: null,
        },
      },
    };
  },
};
</script>
<style lang="scss"></style>
