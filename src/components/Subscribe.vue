<template>
  <div class="subscribe">
    <div class="container">
      <CrownDecoration
        singleCrown
        :border-radius="10"></CrownDecoration>
      <div class="subscribe-content">
        <picture>
          <source
            type="image/avif"
            srcset="@/assets/backgrounds/subscribe-bg.avif" />
          <img
            class="subscribe-content__bg"
            src="@/assets/backgrounds/subscribe-bg.webp"
            alt="island"
            loading="lazy" />
        </picture>
        <div class="container">
          <template v-if="!subscribed">
            <div class="subscribe__title">
              Get weekly inspiration and expert advice
            </div>
            <p class="subscribe__text">Sign up for our Weekly Newsletter</p>
            <div class="subscribe__form">
              <Input
                class="subscribe__email"
                type="email"
                blured
                name="email"
                placeholder="Email address"
                id="emailInput"
                v-model="email"
                :errorMessage="errorMessage"
                @focus="errorMessage = null"></Input>
              <ButtonWhite @click.prevent="subscribe">
                <CrownDecoration></CrownDecoration>
                <span>Subscribe</span>
              </ButtonWhite>
            </div>
          </template>
          <h2
            class="subscribed"
            v-else>
            you have successfully subscribed to our newsletter
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ButtonWhite from "@/components/formComponents/ButtonWhite.vue";
import Input from "@/components/formComponents/Input.vue";
import CrownDecoration from "@/components/CrownDecoration.vue";
import v8n from "v8n";

export default {
  name: "SubscribeComponent",
  components: {
    ButtonWhite,
    Input,
    CrownDecoration,
  },
  data() {
    return {
      errorMessage: null,
      email: null,
      subscribed: false,
    };
  },
  methods: {
    validateEmail() {
      if (
        !v8n()
          .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
          .test(this.email)
      ) {
        this.errorMessage = "Invalid email";
      }
    },
    subscribe() {
      this.validateEmail();
      if (!this.errorMessage) {
        this.subscribed = true;
      }
    },
  },
};
</script>
<style lang="scss">
.subscribe {
  .container {
    position: relative;
    & > .crown-decoration {
      width: calc(100% + 70px);
      height: calc(100% + 40px);
      &::before,
      &::after {
        height: 100%;
      }
      .crown-1 {
        bottom: calc(100% + -2px);
      }
      &::before,
      &::after {
        width: calc(50% - 40px);
      }
    }
  }

  &__email {
    margin-bottom: 34px;
  }
  &-content {
    overflow: hidden;
    border-radius: 10px;
    position: relative;
    &__bg {
      position: absolute;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    .container {
      max-width: 750px;
      padding: 74px 16px 90px;
      min-height: 565px;
    }
    .subscribed {
      color: #fff;
      line-height: 1.5;
      font-size: 69px;
      text-transform: uppercase;
    }
  }
  &__text,
  &__title {
    color: #fff;
    text-align: center;
  }
  &__title {
    font-size: 44px;
    line-height: 44px;
    max-width: 80%;
    margin: 10px auto 0;
  }

  &__text {
    font-size: 18px;
    line-height: 24px;
    font-family: var(--manrope);
    margin: 0px auto 80px;
    max-width: 70%;
  }
  &__form {
    position: relative;
  }
}
@media (min-width: 768px) {
  .subscribe {
    .container {
      & > .crown-decoration {
        width: calc(100% - 70px);
      }
    }
    &__email {
      margin-bottom: 0;
      // padding-right: 50px;
      text-overflow: ellipsis;
    }
    &__content {
      .container {
        padding: 94px 10px 134px;
      }
    }
    &__text,
    &__title {
      text-align: left;
    }
    &__title {
      font-size: 60px;
      line-height: 58px;
      max-width: 70%;
      margin: 0 0 20px;
    }

    &__text {
      font-size: 16px;
      line-height: 28px;
      margin: 0px 0px 60px;
    }
    &__form {
      display: flex;
      .btn {
        flex: 0 1 330px;
      }
      .input-component {
        flex: 1 1 400px;
        margin-right: -50px;
      }
    }
  }
}
</style>
