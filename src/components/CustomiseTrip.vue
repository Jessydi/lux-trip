<template>
  <div class="customise-trip">
    <div class="container">
      <h2>Customise your trip with us</h2>
      <div class="steps">
        <div class="step">
          <div class="step__number">
            <span>1</span><IRhombus class="step__rhombus"></IRhombus>
          </div>
          <div class="step__text">
            <h3 class="step__title">Describe your dream trip</h3>
            <div class="step__description">
              Let us know what your perfect vacation is. Destinations,
              preferences, and personal interests.
            </div>
          </div>
        </div>
        <div class="step">
          <div class="step__number">
            <span>2</span><IRhombus class="step__rhombus"></IRhombus>
          </div>
          <div class="step__text">
            <h3 class="step__title">Get matched</h3>
            <div class="step__description">
              Our team will create perfect travel itinerary for you, based on
              your personalized needs and wishes.
            </div>
          </div>
        </div>
        <div class="step">
          <div class="step__number">
            <span>3</span><IRhombus class="step__rhombus"></IRhombus>
          </div>
          <div class="step__text">
            <h3 class="step__title">Book your vacation</h3>
            <div class="step__description">
              Confirm your trip only when you are completely satisfied with the
              proposed travel plan.
            </div>
          </div>
        </div>
      </div>
      <ButtonBlack>
        <CrownDecoration></CrownDecoration>
        <span>Start a trip request</span>
      </ButtonBlack>
      <div class="customise-trip__free">
        <span>It’s Free! - no credit card required</span>
      </div>
    </div>
    <div class="customise-trip__bg">
      <img
        class="clouds clouds-1"
        src="@/assets/backgrounds/clouds.png"
        alt="clouds" />
      <img
        class="clouds clouds-2"
        src="@/assets/backgrounds/clouds.png"
        alt="clouds" />
      <img
        class="clouds clouds-3"
        src="@/assets/backgrounds/clouds.png"
        alt="clouds" />
      <img
        class="clouds clouds-4"
        src="@/assets/backgrounds/clouds.png"
        alt="clouds" />
      <img
        class="customise-bg"
        src="@/assets/backgrounds/customise-bg.png"
        alt="customise-bgX" />
    </div>
  </div>
</template>
<script>
import ButtonBlack from "@/components/formComponents/ButtonBlack.vue";
import IRhombus from "@/components/icons/IRhombus.vue";
import CrownDecoration from "@/components/CrownDecoration.vue";

export default {
  components: {
    ButtonBlack,
    IRhombus,
    CrownDecoration,
  },
};
</script>
<style scoped lang="scss">
.customise-trip {
  position: relative;
  &__free {
    font-size: 16px;
    line-height: 29px;
    color: var(--black-main);
    font-family: var(--manrope);
    text-align: center;
  }
  h2 {
    margin-bottom: 45px;
  }
  .btn-black {
    width: 100%;
    margin-bottom: 20px;
  }
  .container {
    max-width: 540px;
  }
  .steps {
    margin-bottom: 78px;
  }
  .step {
    display: grid;
    grid-template-columns: auto 1fr;
    overflow: hidden;
    margin-bottom: -3px;
    gap: 13px;
    &:not(:last-child) {
      .step__number::after {
        content: "";
        position: absolute;
        height: 1000px;
        width: 1px;
        translate: -50% -4px;
        left: 50%;
        top: 100%;
        background-color: #fff;
      }
      padding-bottom: 65px;
    }
    &__number {
      font-size: 51px;
      line-height: 51px;
      position: relative;
      height: fit-content;
      span {
        position: absolute;
        translate: -50% -50%;
        left: 50%;
        top: 50%;
      }
    }
    &__rhombus {
      width: 80px;
      height: auto;
      stroke-width: 4;
    }

    &__title {
      font-size: 36px;
      line-height: 36px;
      margin-bottom: 15px;
      font-weight: normal;
    }

    &__description {
      font-family: var(--manrope);
      font-size: 16px;
      line-height: 28px;
    }
  }
  &__bg {
    .clouds {
      position: absolute;
      z-index: -1;
      &-1 {
        rotate: 6deg;
        opacity: 0.67;
        bottom: 85%;
        left: 0;
      }
      &-2 {
        width: 1100px;
        opacity: 0.75;
        rotate: 16.5deg;
        left: 65%;
        top: -10%;
      }
      &-3 {
        width: 720px;
        rotate: -3deg;
        opacity: 0.85;
        right: 68%;
        top: 35%;
        transform: matrix(-1, 0.05, 0.05, 1, 0, 0);
      }
      &-4 {
        width: 720px;
        rotate: 8deg;
        opacity: 0.9;
        left: 76%;
        top: 40%;
        transform: matrix(-0.96, -0.28, -0.28, 0.96, 0, 0);
      }
    }
    .customise-bg {
      position: absolute;
      z-index: -1;
      left: 50%;
      top: 400px;
      translate: -50%;
      min-width: 1000px;
      width: 100%;
    }
  }
}
@media (min-width: 768px) {
  .customise-trip {
    h2 {
      margin-bottom: 70px;
    }
    .step {
      gap: 77px;
      &:not(:last-child) {
        padding-bottom: 43px;
      }
      &__number {
        font-size: 73px;
        line-height: 80px;
      }
      &__rhombus {
        width: 116px;
      }
    }
    &__bg {
      .customise-bg {
        left: 50%;
        top: initial;
        bottom: -35%;
        min-width: 1200px;
        width: 100%;
      }
    }
  }
}
</style>
