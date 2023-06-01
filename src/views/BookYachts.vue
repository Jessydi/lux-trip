<template>
  <div class="book-supercar-page">
    <main>
      <div class="wrapper">
        <h2>Book Yachts/Boats</h2>
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
        img: "book-category-4.jpg",
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
    };
  },
};
</script>
<style lang="scss"></style>
