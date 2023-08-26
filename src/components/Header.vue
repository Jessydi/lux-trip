<template>
  <header
    class="header"
    :class="{ 'why-lux-trip': $route.name == 'why-lux-trip' }">
    <picture class="header__bg-picture">
      <source
        class="header__bg"
        type="image/avif"
        srcset="https://firebasestorage.googleapis.com/v0/b/firetrip-b1efe.appspot.com/o/backgrounds%2Fsky.avif?alt=media&token=ecb32129-5db9-4b62-af3e-b43a3fec1862" />
      <img
        class="header__bg"
        src="@/assets/backgrounds/sky.webp"
        alt="sky" />
    </picture>
    <div class="header__content">
      <CallbackButton
        @click="luxTripStore.closeMobileMenu"
        class="header__callback"></CallbackButton>
      <router-link
        @click="luxTripStore.closeMobileMenu"
        class="header__logo link"
        :to="{ name: 'home' }">
        <ILogo></ILogo>
      </router-link>
      <TheNavigation></TheNavigation>
    </div>
  </header>
</template>
<script>
import TheNavigation from "@/components/Navigation.vue";
import CallbackButton from "@/components/formComponents/CallbackButton.vue";

import { useLuxTripStore } from "@/store/index";
import { mapStores } from "pinia";

import ILogo from "@/components/icons/ILogo.vue";
export default {
  name: "TheHeader",
  components: {
    TheNavigation,
    ILogo,
    CallbackButton,
  },

  computed: {
    ...mapStores(useLuxTripStore),
  },
};
</script>
<style scoped lang="scss">
.header {
  position: relative;
  display: flex;
  justify-content: center;
  &.why-lux-trip {
    &::before {
      content: "";
      background-color: #d1dce6;
      position: absolute;
      height: 1500px;
      width: 100%;
      top: 0;
      left: 0;
      z-index: -1;
    }
    .header__bg {
      display: none;
    }
  }
  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    overflow: visible;
    max-width: 1440px;
    width: 100%;
  }

  :not(.navigation, .header__bg, .header__bg-picture) {
    z-index: 10;
  }
  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -1;
    object-fit: cover;
    object-position: top;
    min-height: 650px;
    max-height: 1000px;
  }
  &__logo {
    position: absolute;
    top: 50%;
    translate: -50% -50%;
    left: 50%;
    svg {
      width: 75px;
    }
  }
}
@media (min-width: 768px) {
  .header {
    &__content {
      gap: 20px;
      padding: 25px 45px 0px 45px;
    }
    &__logo {
      position: static;
      translate: none;
      svg {
        width: 121px;
      }
    }
    &__callback {
      order: 1;
    }
  }
}
</style>
