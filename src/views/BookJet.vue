<template>
  <div class="book-supercar-page">
    <main>
      <div class="wrapper">
        <h2>Book Private Jet</h2>
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
        img: "book-category-6.jpg",
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
    };
  },
};
</script>
<style lang="scss"></style>
