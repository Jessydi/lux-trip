<template>
  <div class="subscribe">
    <div class="container">
      <CrownDecoration
        singleCrown
        :border-radius="10"></CrownDecoration>
      <div class="subscribe__content">
        <div class="container">
          <div class="subscribe__title">
            Get weekly inspiration and expert advice
          </div>
          <p class="subscribe__text">Sign up for our Weekly Newsletter</p>
          <div class="subscribe__form">
            <Input
              class="subscribe__email"
              type="email"
              blured
              placeholder="Email address"></Input>
            <ButtonWhite @click.prevent="subscribe">
              <CrownDecoration></CrownDecoration>
              <span>Subscribe</span>
            </ButtonWhite>
            <ErrorMessage
              :error="error"
              :errorMessage="errorMessage"></ErrorMessage>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ButtonWhite from "@/components/ButtonWhite.vue";
import Input from "@/components/Input.vue";
import CrownDecoration from "@/components/CrownDecoration.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";

export default {
  name: "SubscribeComponent",
  components: {
    ButtonWhite,
    Input,
    ErrorMessage,
    CrownDecoration,
  },
  data() {
    return {
      error: false,
      errorMessage: null,
      contactForm: {
        email: null,
      },
    };
  },
  methods: {
    validateContactForm() {
      this.error = false;

      if (!this.contactForm.phone) {
        this.error = true;
        this.errorMessage = "Please, enter your email";
        setTimeout(() => {
          this.error = false;
          console.log(this.error);
        }, 5000);
      }
    },
    subscribe() {
      this.validateContactForm();
      if (!this.error) {
        console.log("subscribed");
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
  &__content {
    overflow: hidden;
    border-radius: 10px;
    background: url(@/assets/backgrounds/subscribe-bg.jpg) center/cover
      no-repeat;
    position: relative;
    .container {
      max-width: 750px;
      padding: 74px 16px 90px;
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
      flex: 1 1 auto;
      margin-right: -50px;
      padding-right: 50px;
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
        flex: 1 0 330px;
      }
    }
  }
}
</style>
