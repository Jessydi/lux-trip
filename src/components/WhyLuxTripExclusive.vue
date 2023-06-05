<template>
  <div class="why-lux-trip-exclusive">
    <div class="container">
      <div class="description">
        <h3 class="description__title">
          In Lux Trips we plan, organize and manage tailor-made itineraries for
          our clients.
        </h3>
        <p class="description__text">
          Offering exclusive tours, exceptional accommodations and personalized
          journey-planning.
        </p>
      </div>
      <div class="exclusive">
        <ImageWithRhombus imgSrc="why-lt/why-lt-img-4.jpg">
          <IRhombusBlur class="rhombus-right"></IRhombusBlur>
        </ImageWithRhombus>
        <div class="exclusive__text">
          <p>
            We provide our clients with access to exclusive events and
            experiences, such as glamping or fishing on private islands, private
            vineyard wine-tasting and tours, or cruising a sea with a flock of
            dolphins, to name just a few.
          </p>
          <p>
            Our location scouting for events and holidays encompasses diverse
            types of villas and chalets, luxury resorts and world-class hotels
            around the world.
          </p>
        </div>
        <router-link class="exclusive__link" :to="{ name: 'packages' }">
          <ButtonBlack>
            <CrownDecoration></CrownDecoration>
            <span>Luxury packages</span>
          </ButtonBlack>
        </router-link>
      </div>
    </div>
    <img
      src="@/assets/backgrounds/beach-bg.jpg"
      alt="beach"
      class="why-lux-trip-exclusive__bg"
    />
  </div>
</template>
<script>
import ImageWithRhombus from "@/components/ImageWithRhombus.vue";
import ButtonBlack from "@/components/ButtonBlack.vue";
import CrownDecoration from "@/components/CrownDecoration.vue";
import IRhombusBlur from "./icons/IRhombusBlur.vue";

export default {
  components: {
    ImageWithRhombus,
    ButtonBlack,
    CrownDecoration,
    IRhombusBlur,
  },
};
</script>
<style scoped lang="scss">
.why-lux-trip-exclusive {
  position: relative;

  .container {
    max-width: 665px;
  }
  .description {
    margin-bottom: 45px;
    text-align: center;
    &__title,
    &__text {
      margin: 0 auto;
    }
    &__title {
      max-width: 540px;
      margin-bottom: 25px;
    }

    &__text {
      max-width: 350px;
    }
  }
  .exclusive {
    display: grid;
    gap: 60px 20px;
    justify-items: center;
    &__text {
      grid-area: 1 / 2 / 2 / 3;
      max-width: 255px;
      p:not(:last-child) {
        margin-bottom: 25px;
      }
    }
    &__link {
      width: 100%;
      grid-area: 2 / 1 / 3 / 3;
    }
    .img-with-rhombus {
      position: relative;
      margin-left: -30px;
      margin-bottom: 30px;
      grid-area: 1 / 1 / 2 / 2;
      max-width: 255px;
      .rhombus-right {
        position: absolute;
        right: 0;
        top: 20%;
        translate: 40%;
        width: 42px;
      }
    }
  }
  &__bg {
    position: absolute;
    width: 100%;
    top: 90%;
    z-index: -3;
  }
  &::before {
    content: "";
    width: 100%;
    height: 120%;
    position: absolute;
    top: 60%;
    z-index: -2;
    translate: 0 -50%;
    background: linear-gradient(
      180deg,
      var(--bg-main) 0%,
      #c9c8d8 20%,
      #d4d8c6 40%,
      var(--bg-main) 65%,
      #91c8bb 80%,
      transparent 100%
    );
  }
  &::after {
    z-index: -2;
    content: "";
    width: 100%;
    aspect-ratio: 160/107;
    position: absolute;
    top: 90%;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(226, 211, 206, 0.3),
      var(--bg-main) 100%
    );
  }
}

@media (min-width: 768px) {
  .why-lux-trip-exclusive {
    .description {
      margin-bottom: 25px;

      &__title {
        margin-bottom: 35px;
      }
    }
    .exclusive {
      justify-items: center;
      justify-content: space-between;
      grid-template-columns: 255px 255px;
      &__link {
        grid-area: 2 / 2 / 3 / 3;
        align-self: start;
      }
      &__text {
        align-self: end;
      }
      .img-with-rhombus {
        margin: 0px;
        grid-area: 1 / 1 / 3 / 2;
        .rhombus-right {
          width: 62px;
        }
      }
    }
    &__bg {
      max-height: 1000px;
      object-fit: cover;
      top: 80%;
    }
    &::before {
      top: 50%;
    }
    &::after {
      max-height: 1000px;

      top: 80%;
    }
  }
}
</style>
