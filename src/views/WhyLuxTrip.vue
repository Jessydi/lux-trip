<template>
  <div class="why-lux-trip">
    <div class="open-screen">
      <div class="container">
        <h1 class="open-screen__title">
          <span class="open-screen__title-small"> why</span>
          <span class="open-screen__title-extra-big">luxtrips</span>
        </h1>
        <div class="open-screen__background">
          <picture>
            <source
              type="image/avif"
              srcset="@/assets/backgrounds/why-lt-bg.avif" />
            <img
              class="open-screen__img open-screen__img-1"
              src="@/assets/backgrounds/why-lt-bg.webp"
              alt="mountains" />
          </picture>
        </div>
      </div>
    </div>
    <main>
      <div class="wrapper">
        <WhyLuxTripBenefits></WhyLuxTripBenefits>
        <WhyLuxTripStatistics></WhyLuxTripStatistics>
        <WhyLuxTripExclusive></WhyLuxTripExclusive>
        <WhyLuxTripBooking></WhyLuxTripBooking>
        <WhyLuxTripContact></WhyLuxTripContact>
        <SubscribeComponent></SubscribeComponent>
      </div>
    </main>
  </div>
</template>

<script>
import SubscribeComponent from "@/components/Subscribe.vue";
import WhyLuxTripBenefits from "@/components/whyLTPage/WhyLuxTripBenefits.vue";
import WhyLuxTripStatistics from "@/components/whyLTPage/WhyLuxTripStatistics.vue";
import WhyLuxTripExclusive from "@/components/whyLTPage/WhyLuxTripExclusive.vue";
import WhyLuxTripBooking from "@/components/whyLTPage/WhyLuxTripBooking.vue";
import WhyLuxTripContact from "@/components/whyLTPage/WhyLuxTripContact.vue";

export default {
  name: "HomeView",
  components: {
    SubscribeComponent,
    WhyLuxTripBenefits,
    WhyLuxTripStatistics,
    WhyLuxTripExclusive,
    WhyLuxTripBooking,
    WhyLuxTripContact,
  },
};
</script>
<style lang="scss">
.why-lux-trip {
  p {
    font-size: 16px;
    line-height: 24px;
    font-family: var(--manrope);
  }
  h3 {
    color: var(--black-main);
    font-size: 30px;
    line-height: 32px;
    font-weight: normal;
  }
  main {
    background: linear-gradient(
      rgba(226, 211, 206, 0),
      rgba(226, 211, 206, 0),
      var(--bg-main) 400px
    );
  }
  .open-screen {
    position: relative;
    z-index: 0;
    pointer-events: none;
    user-select: none;
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 50px;
      margin-bottom: 60px;
    }
    &__title {
      color: var(--home-title);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-transform: uppercase;
      font-weight: normal;
      span {
        width: min-content;
        text-align: center;
        font-size: clamp(50px, 20vw, 200px);
        line-height: 0.65;
        z-index: 0;
      }
    }
    &__img {
      position: absolute;
      z-index: -1;
      object-fit: cover;
      object-position: top;
      left: 0;
      &-1 {
        top: clamp(30px, 12vw, 180px);
        min-height: 500px;
        z-index: 1;
        width: 100%;
      }
    }
  }
  .why-lux-trip-booking {
    margin-bottom: 120px;
  }
  .why-lux-trip-contact {
    margin-bottom: 360px;
  }
}
@media (min-width: 768px) {
  .why-lux-trip {
    p {
      line-height: 28px;
    }
    h3 {
      font-size: 40px;
      line-height: 40px;
    }
    main {
      background: linear-gradient(
        rgba(226, 211, 206, 0),
        rgba(226, 211, 206, 0),
        var(--bg-main) 900px
      );
      margin-top: -125px;
      .wrapper {
        padding-top: 40px;
      }
    }
    .open-screen {
      .container {
        padding-top: 20px;
        margin-bottom: 50px;
      }

      &__img {
        &-1 {
          top: 60px;
        }
      }
    }
    .why-lux-trip-booking {
      margin-bottom: 240px;
    }
    .why-lux-trip-contact {
      margin-bottom: 480px;
    }
  }
}
@media (min-width: 1440px) {
  .why-lux-trip {
    .open-screen {
      &__img {
        &-1 {
          top: 0px;
        }
      }
    }
  }
}
</style>
