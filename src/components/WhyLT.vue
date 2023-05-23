<template>
  <div class="lt-benefits">
    <div class="container">
      <div class="lt-benefits__content">
        <h2><span>Why</span> <span>Lux Trips</span></h2>
        <p class="lt-benefits__text">
          As Travel Designer, we know the ins and outs of travel from who to
          work with, where to go, when to book, and which restaurant provides
          the most authentic cuisine.
        </p>
        <div class="lt-benefits__images">
          <ImageWithRhombus
            class="lt-benefits__img lt-benefits__img-1"
            imgSrc="why-lt/why-lt-img-1.jpg"
          ></ImageWithRhombus>
          <ImageWithRhombus
            class="lt-benefits__img lt-benefits__img-2"
            imgSrc="why-lt/why-lt-img-2.jpg"
          ></ImageWithRhombus>
          <ImageWithRhombus
            class="lt-benefits__img lt-benefits__img-3"
            imgSrc="why-lt/why-lt-img-3.jpg"
          ></ImageWithRhombus>
          <IRhombusBlur class="rhombus-center"></IRhombusBlur>
          <IRhombusBlur class="rhombus-small rhombus-small-1"></IRhombusBlur>
        </div>
        <p class="lt-benefits__text-forum-enlarged">
          Exclusive knowledge to provide the best of the best to clients
        </p>
        <div class="lt-benefits__subgrid">
          <p class="lt-benefits__text">
            Our area of expertise ranges from luxury resorts and villas/chalets
            holiday bookings, private yacht and jet charters, to exclusive tours
            and personalized journey planning.
          </p>
          <ImageWithRhombus
            class="lt-benefits__img lt-benefits__img-4"
            imgSrc="why-lt/why-lt-img-4.jpg"
          ></ImageWithRhombus>
          <p class="lt-benefits__text-forum">
            We craft and plan unique itineraries tailored to customers’
            interests and with strong attention to detail.
          </p>
          <ButtonTransparent>help me plan a trip</ButtonTransparent>
          <IRhombusBlur class="rhombus-small rhombus-small-2"></IRhombusBlur>
        </div>
      </div>
      <img
        class="lt-benefits__bg"
        src="@/assets/backgrounds/why-lt-bg.png"
        alt="background mountains"
      />
    </div>
  </div>
</template>
<script>
import IRhombusBlur from "./icons/IRhombusBlur.vue";
import ImageWithRhombus from "@/components/ImageWithRhombus.vue";
import ButtonTransparent from "@/components/ButtonTransparent.vue";

export default {
  components: {
    IRhombusBlur,
    ImageWithRhombus,
    ButtonTransparent,
  },
};
</script>
<style lang="scss">
.lt-benefits {
  position: relative;
  &__content {
    display: grid;
  }
  &__text {
    font-size: 16px;
    line-height: 29px;
    font-family: var(--manrope);
    max-width: max(400px, 80%);
    margin: 0 auto;
    &-forum {
      font-size: 26px;
      line-height: 26px;
      max-width: max(400px, 80%);
      margin: 0 auto;
      &-enlarged {
        margin-bottom: 40px;
        font-size: 40px;
        line-height: 40px;
        max-width: 260px;
        position: relative;
        left: 8%;
      }
    }
  }
  &__subgrid {
    display: grid;
    grid-template-columns: 20vw 1fr;
    row-gap: 30px;
    column-gap: 4vw;
    .img-with-rhombus {
      grid-row: 1/3;
      width: clamp(130px, 40vw, 200px);
      justify-self: end;
    }
    .btn-transparent {
      grid-column: 1/3;
      font-size: 24px;
      line-height: 27px;
      height: 61px;
    }
    :is(.lt-benefits__text .lt-benefits-forum) {
      max-width: 350px;
    }
  }
  h2 {
    text-align: center;
    margin-bottom: 23px;
    display: flex;
    flex-direction: column;
  }
  &__images {
    position: relative;
    padding: 60px 0 160px 0;
    display: grid;
    .rhombus {
      &-center {
        place-self: center;
        width: 72px;
      }
    }
    .lt-benefits__img {
      position: absolute;
      &-1 {
        width: 92px;
        top: 20px;
        left: 0;
      }
      &-2 {
        width: 100px;
        bottom: 0;
        right: 0;
      }
      &-3 {
        width: 76px;
        display: none;
      }
    }
  }
  .rhombus-small {
    position: absolute;
    &-1 {
      display: none;
    }
    &-2 {
      width: 39px;
      top: 70%;
      left: 17vw;
    }
  }
  &__bg {
    position: absolute;
    width: 100%;
    min-height: 1000px;
    object-fit: cover;
    left: 0;
    top: 0;
    z-index: -1;
  }
}
@media (min-width: 768px) {
  .lt-benefits {
    .container {
      max-width: 590px;
      padding: 0 20px;
    }
    &__text {
      max-width: initial;
      &-forum {
        font-size: 40px;
        line-height: 40px;
        max-width: initial;
        &-enlarged {
          left: initial;
        }
      }
    }
    &__subgrid {
      display: contents;
      .lt-benefits__text {
        &-forum {
          margin-right: -100px;
          align-self: end;
          margin-bottom: 30px;
        }
      }
      .img-with-rhombus {
        grid-row: 4/6;
        width: 100%;
        translate: -60px 0;
      }
      .btn-transparent {
        grid-column: initial;
      }
    }
    &__content {
      gap: 30px;
      display: grid;
      grid-template-columns: 260px 260px;
    }
    h2 {
      text-align: left;
    }

    &__images {
      grid-column: 1/3;
      padding-bottom: 170px;
      .rhombus {
        &-center {
          width: 112px;
        }
      }
      .lt-benefits__img {
        position: absolute;
        &-1 {
          width: 138px;
          top: 20px;
          left: initial;
          right: 100%;
        }
        &-2 {
          width: 150px;
          bottom: -20%;
          left: 110%;
          right: initial;
        }
        &-3 {
          width: 76px;
          top: 10%;
          right: 0;
          display: block;
        }
      }
    }
    .rhombus-small {
      position: absolute;
      &-1 {
        top: 27%;
        right: calc(100% + 120px);
        width: 29px;
        display: block;
      }
      &-2 {
        width: 62px;
      }
    }
    &__bg {
      top: -12vw;
    }
  }
}
</style>
