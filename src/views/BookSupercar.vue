<template>
  <div class="book-supercar-page">
    <main>
      <div class="wrapper">
        <h2>Book Supercars</h2>
        <BookTransport :bookTransport="bookTransport">
          <Input
            type="text"
            label="Location from"
            placeholder="Country, city"
            id="location"
          ></Input>
          <Select
            class="select-component"
            id="supercar-model"
            v-model="bookingFromObject.location.from"
            placeholder="Model of supercar"
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
            ]"
          ></Select>
        </BookTransport>
        <Subscribe></Subscribe>
      </div>
    </main>
  </div>
</template>
<script>
import BookTransport from "@/components/BookTransport.vue";
import Subscribe from "@/components/Subscribe.vue";
import Input from "@/components/Input.vue";
import Select from "@/components/Select.vue";

export default {
  components: { BookTransport, Subscribe, Input, Select },
  data() {
    return {
      bookTransport: {
        img: "book-category-1.jpg",
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
      bookingFromObject: {
        location: { from: null, to: null },
      },
    };
  },
};
</script>
<style lang="scss"></style>
