<template>
  <div class="book-supercar-page">
    <main>
      <div class="wrapper">
        <h2>Book Hotels</h2>
        <BookTransport :bookTransport="bookTransport"></BookTransport>
        <Subscribe></Subscribe>
      </div>
    </main>
  </div>
</template>
<script>
import BookTransport from "@/components/BookTransport.vue";
import Subscribe from "@/components/Subscribe.vue";

export default {
  components: { BookTransport, Subscribe },
  data() {
    return {
      bookTransport: {
        img: "book-category-2.jpg",
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
    };
  },
};
</script>
<style lang="scss"></style>
