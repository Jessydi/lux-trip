<template>
  <div class="why-lux-trip-benefits">
    <div class="container">
      <div class="benefits">
        <div class="benefit" v-for="(benefit, index) in benefits" :key="index">
          <ImageWithRhombus :imgSrc="benefit.benefitImgSrc">
            <IRhombusBlur v-if="index == 0" class="rhombus-left"></IRhombusBlur>
          </ImageWithRhombus>
          <h3 class="benefit__title">{{ benefit.benefitTitle }}</h3>
          <p class="benefit__description">
            {{ benefit.benefitDescription }}
          </p>
        </div>
      </div>
    </div>
    <div class="why-lux-trip-benefits__bg">
      <img
        class="clouds clouds-1"
        src="@/assets/backgrounds/clouds.png"
        alt="clouds"
      />
      <img
        class="clouds clouds-2"
        src="@/assets/backgrounds/clouds.png"
        alt="clouds"
      />
    </div>
  </div>
</template>
<script>
import ImageWithRhombus from "@/components/ImageWithRhombus.vue";
import IRhombusBlur from "@/components/icons/IRhombusBlur.vue";

export default {
  components: {
    ImageWithRhombus,
    IRhombusBlur,
  },
  data() {
    return {
      benefits: [
        {
          benefitImgSrc: "why-lt/why-lt-img-1.jpg",
          benefitTitle: "Bespoke experience of travelling",
          benefitDescription:
            "Being expert Luxury Travel Designers, Lux Trips offers bespoke experience of travelling. ",
        },
        {
          benefitImgSrc: "why-lt/why-lt-img-2.jpg",
          benefitTitle: "Collecting precious moments is our utmost goal.",
          benefitDescription:
            "Our exclusive network of trusted local partners allows us to carefully curate every detail. ",
        },
        {
          benefitImgSrc: "why-lt/why-lt-img-3.jpg",
          benefitTitle: "We personalize each trip",
          benefitDescription:
            "Thanks to our extensive knowledge and operation in the industry, we personalize each trip according to the needs and wishes of our clients.  ",
        },
      ],
    };
  },
};
</script>
<style scoped lang="scss">
.why-lux-trip-benefits {
  position: relative;
  .benefits {
    display: grid;
    grid-template-rows: 340px;
    grid-template-columns: clamp(80px, 24vw, 220px) 1fr clamp(80px, 24vw, 220px);
    justify-items: center;
    column-gap: 12px;
    .benefit {
      display: contents;

      .img-with-rhombus {
        align-self: center;
        height: fit-content;
        position: relative;
        width: 100%;
        max-width: 130px;
        min-width: 80px;
        .rhombus-left {
          position: absolute;
          left: 0;
          top: 50%;
          translate: -40% -50%;
          width: 18px;
        }
        img {
          height: 100%;
        }
      }
      &:nth-child(1) {
        .img-with-rhombus {
          grid-area: 1 / 1 / 1 / 2;
          justify-self: end;
        }
      }
      &:nth-child(2) {
        .img-with-rhombus {
          max-width: 150px;
          grid-area: 1 / 2 / 1 / 3;
        }
        .benefit__title {
          font-size: 40px;
          line-height: 40px;
          margin-top: 50px;
          margin-bottom: 30px;
          grid-row: 2 / 3;
        }
        .benefit__description {
          grid-row: 7 / 8;
          margin-bottom: 0px;
        }
      }
      &:nth-child(3) {
        .img-with-rhombus {
          grid-area: 1 / 3 / 1 /4;
          justify-self: start;
        }
      }

      &__title,
      &__description {
        grid-column: 1 / 4;
        text-align: center;
        max-width: 400px;
      }
      &__title {
        margin-bottom: 10px;
      }
      &__description {
        margin-bottom: 30px;
      }
    }
  }
  &__bg {
    .clouds {
      position: absolute;
      z-index: -1;
      &-1 {
        top: 50%;
        left: 0;
        opacity: 0.67;
        translate: -50%;
        rotate: 6.26deg;
        width: 300px;
      }
      &-2 {
        top: 60%;
        right: 0;
        opacity: 0.57;
        translate: 50%;
        width: 310px;
        height: 117px;
      }
    }
  }
}
@media (min-width: 768px) {
  .why-lux-trip-benefits {
    .benefits {
      display: flex;
      .benefit {
        display: flex;
        flex-direction: column;
        align-items: center;

        .img-with-rhombus {
          max-width: 145px;
          .rhombus-left {
            width: 30px;
          }
        }

        &:nth-child(2) {
          margin-top: 220px;
          .benefit__title {
            margin-bottom: 10px;
          }
        }

        &__title {
          margin-top: 50px;
        }
        &__description {
          margin-bottom: 0px;
        }
      }
    }
    &__bg {
      .clouds {
        &-1 {
          top: 80%;
          left: 0;
          opacity: 0.67;
          translate: -50%;
          rotate: 6.26deg;
          width: 640px;
        }
        &-2 {
          top: 70%;
          right: 0;
          opacity: 0.57;
          translate: 50%;
          width: 950px;
          height: 350px;
        }
      }
    }
  }
}
</style>
