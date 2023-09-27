<template>
  <footer class="footer">
    <div class="footer__bg">
      <picture>
        <source
          type="image/avif"
          srcset="
            https://firebasestorage.googleapis.com/v0/b/firetrip-b1efe.appspot.com/o/backgrounds%2Fsky.avif?alt=media&token=ecb32129-5db9-4b62-af3e-b43a3fec1862
          " />
        <img
          class="footer__bg-img footer__bg-img-sky"
          src="@/assets/backgrounds/sky.webp"
          alt="sky" />
      </picture>
      <picture>
        <source
          type="image/avif"
          srcset="
            https://firebasestorage.googleapis.com/v0/b/firetrip-b1efe.appspot.com/o/backgrounds%2Fmountains-1.avif?alt=media&token=2006a480-bc7f-4d27-8ba0-4d3a6bf96534
          " />
        <img
          class="footer__bg-img footer__bg-img-mountains"
          src="@/assets/backgrounds/mountains-1.webp"
          alt="mountains" />
      </picture>
      <div class="footer__bg-gradient"></div>
    </div>
    <div class="container">
      <div class="footer__content">
        <router-link
          class="footer__logo link"
          :to="{ name: 'home' }">
          <ILogo></ILogo>
        </router-link>
        <div class="footer__callback">
          <CallbackButton></CallbackButton>
        </div>
        <router-link
          class="footer__link link"
          :to="{ name: 'packages' }"
          >Luxury packages</router-link
        >

        <router-link
          class="footer__link link"
          :to="{ name: 'booking' }"
          >Book with us</router-link
        >

        <router-link
          class="footer__link link"
          :to="{ name: 'why-lux-trip' }"
          >Why Lux Trips</router-link
        >

        <router-link
          class="footer__link link"
          :to="{ name: 'contact' }"
          >Contact</router-link
        >
      </div>
      <div class="footer__bottom">
        <div class="footer__credits">© 2023 Made by Olexandr Zavrazhnyj</div>
        <div class="footer__privacy">
          <a
            class="link"
            href="#"
            >Company Site</a
          >
          |
          <a
            class="link"
            href="#"
            >Privacy Policy</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import ILogo from "@/components/icons/ILogo.vue";
import CallbackButton from "@/components/formComponents/CallbackButton.vue";
export default {
  name: "TheFooter",
  components: {
    ILogo,
    CallbackButton,
  },
};
</script>
<style scoped lang="scss">
.footer {
  overflow: visible;
  position: relative;
  overflow: hidden;
  &__content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, auto);
    justify-items: center;
    align-items: center;
    row-gap: 40px;
    column-gap: clamp(30px, 13vw, 200px);
  }

  .container {
    padding: 55px 15px 28px 15px;
    display: flex;
    flex-direction: column;
    gap: 75px;
  }

  &__bg {
    &-img {
      position: absolute;
      z-index: -1;
      object-fit: none;
      width: 100%;
      object-position: top;
      bottom: 0;

      &-sky {
        min-height: 800px;
        object-fit: none;
        top: 0;
        bottom: initial;
      }

      &-mountains {
        height: 180px;
      }
    }

    &-gradient {
      background: linear-gradient(
        rgb(226, 211, 206) 0%,
        rgba(226, 211, 206, 0.71) 42.71%,
        transparent
      );
      position: absolute;
      height: 350px;
      width: 100%;
      top: 0;
      z-index: -1;
    }
  }

  &__logo {
    grid-column: 1/ 3;

    svg {
      width: 110px;
      height: auto;
    }
  }

  &__link {
    justify-self: end;
    font-size: 16px;
    line-height: 18px;
    text-transform: uppercase;
    color: var(--black-main);
  }

  &__link:nth-child(even) {
    justify-self: start;
  }

  &__callback {
    grid-column: 1/ 3;
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    text-align: center;
    gap: 8px;
    font-size: 12px;
    line-height: 16px;
    font-family: var(--manrope);

    a {
      color: #fff;
    }
  }
}

@media (min-width: 768px) {
  .footer {
    .container {
      padding: 150px 15px 34px 15px;
      gap: 106px;
    }

    &__content {
      grid-template-columns: 1fr 1fr auto 1fr 1fr;
      grid-template-rows: repeat(2, auto);
      row-gap: 80px;
      column-gap: clamp(20px, 2.6vw, 60px);
      grid-auto-flow: column;
    }

    &__link,
    &__link:nth-child(even) {
      justify-self: center;
    }

    &__bg {
      &-img {
        object-fit: cover;
      }
    }

    &__callback {
      grid-column: 3/ 4;
    }

    &__logo {
      grid-column: 1/ 6;

      svg {
        width: clamp(121px, 14vw, 215px);
      }
    }

    &__bottom {
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
</style>
