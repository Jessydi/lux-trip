<template>
  <div class="book-supercar-page">
    <main>
      <div class="wrapper">
        <h2>Book Private Helicopter</h2>
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
        img: "book-category-5.jpg",
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
    };
  },
};
</script>
<style lang="scss"></style>
