<template>
  <div class="book-supercar-page">
    <main>
      <div class="wrapper">
        <h2>Book Yachts/Boats</h2>
        <BookTransport
          :bookTransport="bookTransport"
          :formObject="formObject.values"
          :formSchema="formSchema"
          @validated="(errors) => (formObject.errors = errors)">
          <Input
            type="text"
            label="Location"
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
            id="adults"
            label="Guests"
            placeholder="Adults"
            v-model="formObject.values.adults"
            :errorMessage="formObject.errors.adults"
            @focus="formObject.errors.adults = null"
            @click="formObject.errors.adults = null"
            :options="['1', '2', '3', '4', '5', '6', '7', '8', '9']"
            withIcon>
            <IAdult></IAdult
          ></Select>
          <Select
            class="select-component"
            id="kids"
            placeholder="Kids (0-10 y.o)"
            v-model="formObject.values.kids"
            :errorMessage="formObject.errors.kids"
            @focus="formObject.errors.kids = null"
            @click="formObject.errors.kids = null"
            :options="['1', '2', '3', '4', '5', '6', '7', '8', '9']"
            withIcon>
            <IChild></IChild>
          </Select>
          <Select
            class="select-component"
            id="Meters"
            label="Meters"
            placeholder="Meters"
            v-model="formObject.values.meters"
            :errorMessage="formObject.errors.meters"
            @focus="formObject.errors.meters = null"
            @click="formObject.errors.meters = null"
            :options="['5-10', '10-20', '20-30']"></Select>
          <Select
            class="select-component"
            id="book-trip-car"
            label="Model of boat"
            placeholder="Surprise me"
            v-model="formObject.values.boat"
            :errorMessage="formObject.errors.boat"
            @focus="formObject.errors.boat = null"
            @click="formObject.errors.boat = null"
            :options="[
              'boat 1',
              'boat 2',
              'boat 3',
              'boat 4',
              'boat 5',
              'boat 6',
              'boat 7',
              'boat 8',
              'boat 9',
            ]"></Select>
          <CheckboxSlide
            v-model="formObject.values.skipper"
            label="Skipper" />
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

import IChild from "@/components/icons/IChild.vue";
import IAdult from "@/components/icons/IAdult.vue";
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
    IChild,
    IAdult,
  },
  data() {
    return {
      bookTransport: {
        img: "book-category-4",
        description: [
          "Lux Trips offers unparalleled yacht and boat charter experiences thanks to our network of the leading players in yachting activities. Our experts will select the best option for your sea adventure to create your dream getaway.",
          "For instance, a private luxury yacht to visit the Balearic islands, an explorer for a cruise of the endless Mediterranean sea, or a sailing boat for a romantic weekend or family holiday on Lago di Garda. Onboard entertainment (e.g. jetski, karaoke, etc.) and highly qualified personnel are at your service. ",
        ],
        included: {
          IClock: "Dedicated 24/7 Travel Advisor",
          IDestination: "Personalized itinerary",
          IWomen: "Exclusive services (e.g. chef, nanny, etc.)",
          IGuides: "Local guides",
          ISail: "Aquatic entertainment (e.g. jetski, etc.)",
          ICase: "Accidental damage protection",
          IFamily: "Travel insurance",
          ITickets: "Package deals",
        },
        subtitle:
          "Our experts will select the best option for your sea adventure",
      },
      formSchema: {
        location: v8n().not.null().string().not.empty().minLength(1),
        boat: v8n(),
        adults: v8n().not.null().not.empty(),
        meters: v8n().not.null().not.empty(),
        kids: v8n(),
        skipper: v8n(),
        bookingDates: v8n().not.null(),
      },
      formObject: {
        values: {
          location: null,
          boat: null,
          kids: null,
          adults: null,
          meters: null,
          skipper: false,
          bookingDates: null,
        },
        errors: {
          location: null,
          boat: null,
          kids: null,
          meters: null,
          adults: null,
          skipper: null,
          bookingDates: null,
        },
      },
    };
  },
};
</script>
<style lang="scss"></style>
