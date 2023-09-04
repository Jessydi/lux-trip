<template>
  <div class="book-hotels-page">
    <main>
      <div class="wrapper">
        <h2>Book Hotels</h2>
        <BookTransport
          :bookTransport="bookTransport"
          :formObject="formObject.values"
          :formSchema="formSchema"
          @validated="(errors) => (formObject.errors = errors)">
          <Input
            type="text"
            name="country"
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
            id="rooms"
            label="Number of rooms
"
            placeholder="Number of rooms"
            v-model="formObject.values.rooms"
            :errorMessage="formObject.errors.rooms"
            @focus="formObject.errors.rooms = null"
            @click="formObject.errors.rooms = null"
            :options="['1', '2', '3', '4', '5', '6', '7', '8', '9']"></Select>
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
    DateInput,
    IChild,
    IAdult,
    ICalendar,
    IRhombus,
  },
  data() {
    return {
      bookTransport: {
        img: "book-category-2",
        description: [
          "Modern villas that offer breathtaking panoramic sea views with endless deep blue waves or traditionally charming chalets with a warm jacuzzi outside, set on top of a snowy mountain, looking out to a lush countryside, are ready to welcome you at the destination of your choice.",
          "No location is outside of our reach! Whether you prefer the finest luxury destinations like St. Moritz, Zermatt, Ibiza and Mykonos or wish to explore exotic spots of South Africa, Thailand or Australia, Lux Trips will tailor your accommodation with personalized services to ensure an exceptional stay for each member of your group.",
        ],
        included: {
          IClock: "Dedicated 24/7 Travel Advisor",
          IDestination: "Personalized itinerary",
          IWomen: "Exclusive services (e.g. chef, nanny, etc.)",
          ICase: "Accidental damage protection",
          IFamily: "Travel insurance",
          ITickets: "Package deals",
        },
        subtitle:
          "Our handpicked prestigious villas and chalets meet the highest standard of quality and design to satisfy your every wish. ",
      },
      formSchema: {
        location: v8n().not.null().string().not.empty().minLength(1),
        adults: v8n().not.null().not.empty(),
        kids: v8n(),
        rooms: v8n().not.null().not.empty(),
        bookingDates: v8n().not.null(),
      },
      formObject: {
        values: {
          location: null,
          kids: null,
          adults: null,
          bookingDates: null,
          rooms: null,
        },
        errors: {
          location: null,
          kids: null,
          adults: null,
          bookingDates: null,
          rooms: null,
        },
      },
    };
  },
};
</script>
<style lang="scss"></style>
