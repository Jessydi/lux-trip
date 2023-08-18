<template>
  <div
    class="burger"
    v-if="mobile"
    @click="luxTripStore.toggleMobileMenu">
    <div class="burger__icon"></div>
  </div>
  <nav
    class="navigation"
    v-else>
    <ul class="navigation__list">
      <li class="navigation__item">
        <router-link class="link" :to="{ name: 'home' }">Home</router-link>
      </li>
      <li class="navigation__item">
        <router-link class="link" :to="{ name: 'packages' }">Luxury packages</router-link>
      </li>
      <li class="navigation__item">
        <router-link class="link" :to="{ name: 'booking' }">Book with us</router-link>
      </li>
      <li class="navigation__item">
        <router-link class="link" :to="{ name: 'why-lux-trip' }">Why Lux Trips</router-link>
      </li>
      <li class="navigation__item">
        <router-link class="link" :to="{ name: 'contact' }">Contact</router-link>
      </li>
    </ul>
  </nav>
  <Transition name="fade">
    <nav
      class="navigation navigation-mobile"
      v-show="luxTripStore.mobileNavigation">
      <div class="navigation__content">
        <ul class="navigation__list">
          <IRhombus class="rhombus"></IRhombus>
          <li class="navigation__item">
            <router-link class="link" 
              :to="{ name: 'home' }"
              @click="luxTripStore.closeMobileMenu"
              >Home</router-link
            >
          </li>
          <li class="navigation__item">
            <router-link class="link"
              :to="{ name: 'packages' }"
              @click="luxTripStore.closeMobileMenu"
              >Luxury packages</router-link
            >
          </li>
          <li class="navigation__item">
            <router-link class="link"
              :to="{ name: 'booking' }"
              @click="luxTripStore.closeMobileMenu"
              >Book with us</router-link
            >
          </li>
          <li class="navigation__item">
            <router-link class="link"
              :to="{ name: 'why-lux-trip' }"
              @click="luxTripStore.closeMobileMenu"
              >Why Lux Trips</router-link
            >
          </li>
          <li class="navigation__item">
            <router-link class="link"
              :to="{ name: 'contact' }"
              @click="luxTripStore.closeMobileMenu"
              >Contact</router-link
            >
          </li>
        </ul>
      </div>
    </nav>
  </Transition>
</template>
<script>
import { useLuxTripStore } from "@/store/index";
import { mapStores } from "pinia";

import IRhombus from "@/components/icons/IRhombus.vue";
export default {
  name: "TheNavigation",
  components: {
    IRhombus,
  },
  data() {
    return {
      mobile: false,
    };
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  methods: {
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth < 768) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.luxTripStore.closeMobileMenu();
      return;
    },
  },

  // схоже що він повинен бути в самому store, треба перевірити
  // watch: {
  //   "this.mobileNavigation"() {
  //     if (this.useLuxTripStore.mobileNavigation) {
  //       document.body.style.overflow = "hidden";
  //     } else {
  //       document.body.style.overflow = "auto";
  //     }
  //   },
  // },
  computed: {
    ...mapStores(useLuxTripStore),
  },
};
</script>
<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
  .navigation__list {
    transition: translate 0.5s ease;
  }
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  .navigation__list {
    translate: 0 -30px;
  }
}
.burger {
  width: 60px;
  height: 25px;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  &__icon {
    background-color: #fff;
    height: 1px;
    width: 100%;
    &::before,
    &::after {
      content: "";
      position: absolute;
      right: 0;
      background-color: #fff;
      height: 1px;
    }
    &::before {
      width: 46px;
      top: 0;
    }
    &::after {
      width: 100%;
      bottom: 0;
    }
  }
}
.navigation {
  &-mobile {
    display: flex;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: var(--bg-main);
    left: 0;
    bottom: 0;
    justify-content: center;
    &::before {
      content: "";
      position: absolute;
      top: 90px;
      left: 0;
      width: 100%;
      height: 30px;
      background: linear-gradient(180deg, var(--bg-main), transparent);
      z-index: 2;
      pointer-events: none;
    }
    .navigation {
      &__content {
        padding: 30px 15px 20px 15px;
        margin-top: 90px;
        overflow: auto;
        width: 100%;
        position: relative;
      }
      &__list {
        position: relative;
        height: fit-content;

        .rhombus {
          position: absolute;
          height: 115%;
          width: auto;
          top: 50%;
          left: 50%;
          translate: -50% -50%;
          z-index: -1;
        }
      }
      &__item {
        font-size: 24px;
        margin-bottom: 64px;
        color: #000;
        text-align: center;

        line-height: 27px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  &__item {
    text-transform: uppercase;
    font-size: 16px;
    letter-spacing: 1px;
    line-height: 18px;
  }
}
@media (min-width: 768px) {
  .navigation {
    &__list {
      display: flex;
      row-gap: 10px;
      column-gap: 40px;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
}
</style>
