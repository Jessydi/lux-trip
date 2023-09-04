<template>
  <div class="book-supercar-page">
    <main>
      <div class="wrapper">
        <h2>Book Private Jet</h2>
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
            label="Model of jet"
            placeholder="Surprise me"
            v-model="formObject.values.jet"
            :errorMessage="formObject.errors.jet"
            @focus="formObject.errors.jet = null"
            @click="formObject.errors.jet = null"
            :options="[
              'jet 1',
              'jet 2',
              'jet 3',
              'jet 4',
              'jet 5',
              'jet 6',
              'jet 7',
              'jet 8',
              'jet 9',
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
        img: "book-category-6",
        description: [
          "Our fully personalized private charters and jets will anticipate your every wish. To fit your unique travel needs, we guarantee the highest level of safety and comfort on the flight.",
          "Discrete services provided by the dedicated flight crew, bespoke interior design and most advanced fleet are the signature qualities of the Lux Trip flying experience. With the possibility of urgent takeoffs and multi-stop journeys no destination will stay out of your reach!",
        ],
        included: {
          IClock: "Dedicated 24/7 Travel Advisor",
          IGlobe: "Global coverage ",
          IPlane: "Wide selection of aircrafts",
          ICook: "Onboard exclusive services (e.g. chef, hairdresser, etc.)",
          ICase: "Accidental damage protection",
          IFamily: "Travel insurance",
          ITickets: "Package deals",
        },
        subtitle: "Highest level of safety and comfort on the flight",
      },
      formSchema: {
        location: v8n().not.null().string().not.empty().minLength(1),
        jet: v8n(),
        bookingDates: v8n().not.null(),
      },
      formObject: {
        values: {
          location: null,
          jet: null,
          bookingDates: null,
        },
        errors: {
          location: null,
          jet: null,
          bookingDates: null,
        },
      },
    };
  },
};
</script>
<style lang="scss"></style>
