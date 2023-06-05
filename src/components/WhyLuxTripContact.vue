<template>
  <div class="why-lux-trip-contact">
    <div class="container">
      <p>
        As a Luxury Travel Designer, we make it our mission to transform
        clients’ interests and dreams into one-of-a-kind travel experience
        through the provision of premium quality services.
      </p>
      <h3>
        Importantly, in Lux Trips we get to know our clients personally, and
        hence, we get to have a relationship with each of them.
      </h3>
      <p>
        We construct long-lasting connections thanks to the unforgettable trips
        we design, as we believe that travel is all about feelings, and memories
        are the most precious gifts we want our customer to bring back with
        them.
      </p>
      <router-link class="why-lux-trip-contact__link" :to="{ name: 'contact' }">
        <ButtonBlack>
          <CrownDecoration></CrownDecoration>
          <span>Contact us</span>
        </ButtonBlack>
      </router-link>
    </div>
    <img
      src="@/assets/backgrounds/girl-bg-1.jpg"
      alt="girl"
      class="why-lux-trip-contact__bg"
    />
  </div>
</template>
<script>
import ButtonBlack from "@/components/ButtonBlack.vue";
import CrownDecoration from "@/components/CrownDecoration.vue";
export default {
  components: {
    ButtonBlack,
    CrownDecoration,
  },
  data() {
    return {};
  },
};
</script>
<style scoped lang="scss">
.why-lux-trip-contact {
  position: relative;
  .container {
    max-width: 540px;
  }
  &__link {
    width: 100%;
  }
  &__bg {
    position: absolute;
    width: 100%;
    top: 80%;
    object-fit: cover;
    min-height: 500px;
    z-index: -3;
  }

  &::before {
    content: "";
    width: 100%;
    height: 120%;
    position: absolute;
    top: 80%;
    z-index: -2;
    background: linear-gradient(
      180deg,
      var(--bg-main),
      rgba(226, 211, 206, 0.3),
      transparent 40%
    );
  }
  &::after {
    z-index: -2;
    content: "";
    width: 100%;
    min-height: 500px;
    aspect-ratio: 120/89;
    position: absolute;
    top: 80%;
    background: linear-gradient(
      transparent 80%,
      rgba(226, 211, 206, 0.3) 90%,
      var(--bg-main)
    );
  }
  h3 {
    margin-bottom: 25px;
  }
  p:not(:last-child) {
    margin-bottom: 25px;
  }
}
@media (min-width: 768px) {
  .why-lux-trip-contact {
    &__bg {
      min-height: 800px;
      max-height: 1000px;
      object-fit: cover;
      top: 10%;
    }
    &::before {
      top: 10%;
    }
    &::after {
      min-height: 800px;
      max-height: 1000px;
      top: 10%;
    }
    h3 {
      margin-bottom: 35px;
    }

    p:not(:last-child) {
      margin-bottom: 35px;
    }
  }
}
</style>
