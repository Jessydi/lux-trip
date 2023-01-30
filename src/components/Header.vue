<template>
  <header class="header">
    <img class="header__bg" :src="headerBg" />
    <div class="header__content">
      <CallbackButton class="header__callback"></CallbackButton>
      <router-link class="header__logo" :to="{ name: 'home' }">
        <ILogo></ILogo>
      </router-link>
      <TheNavigation></TheNavigation>
    </div>
  </header>
</template>
<script>
import TheNavigation from "@/components/Navigation.vue";
import ILogo from "@/components/icons/ILogo.vue";
import CallbackButton from "@/components/CallbackButton.vue";
export default {
  name: "TheHeader",
  data() {
    return {
      headerImageSrc: "sky",
    };
  },
  components: {
    TheNavigation,
    ILogo,
    CallbackButton,
  },
  computed: {
    headerBg() {
      return require(`@/assets/backgrounds/${this.headerImageSrc}.jpg`);
    },
  },
};
</script>
<style lang="scss">
.header {
  position: relative;
  display: flex;
  justify-content: center;
  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    overflow: visible;
    max-width: 1440px;
    width: 100%;
  }

  :not(.navigation, .header__bg) {
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

    &__callback {
      order: 6;
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
