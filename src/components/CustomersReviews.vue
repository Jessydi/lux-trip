<template>
  <div class="customers-reviews">
    <div class="container">
      <div class="customers-reviews__title">
        <IDoubleRhombus></IDoubleRhombus>
        <h2>
          Customers<br />
          reviews
        </h2>
      </div>
      <SliderComponent :splide-object="splideObject">
        <SplideSlide
          v-for="(review, index) in customersReviews"
          :key="index"
          ><CustomerReview :reviewObject="review"></CustomerReview>
        </SplideSlide>
      </SliderComponent>
    </div>

    <picture>
      <source
        type="image/avif"
        srcset="@/assets/backgrounds/customers-reviews-bg.avif" />
      <img
        class="customers-reviews__bg"
        src="@/assets/backgrounds/customers-reviews-bg.webp"
        alt="girl in pool"
        loading="lazy" />
    </picture>
  </div>
</template>
<script>
import IDoubleRhombus from "@/components/icons/IDoubleRhombus.vue";

import CustomerReview from "@/components/CustomerReview.vue";
import SliderComponent from "@/components/SliderComponent.vue";
import { SplideSlide } from "@splidejs/vue-splide";

export default {
  components: {
    IDoubleRhombus,
    CustomerReview,
    SliderComponent,
    SplideSlide,
  },
  data() {
    return {
      customersReviews: [
        {
          photo: "customer-photo-1.jpg",
          review:
            "“Well organized trip, All arranged well by Arooz. Special thanks to Aijaz Bhai for the service and support given to us, all explained well and take us to all places as per our wish. It was a wonderful experience .... Thank you team”",
          name: "Eduard Hand",
          company: "Müller-Egerer",
        },
        {
          photo: "customer-photo-2.jpg",
          review:
            "“We want to visit Manali from long time. Abhishek from ideal tour give us the best quote for Manali tour. He was very supportive and approachable at any time. He made our trip hassle-free. Thanks for your great help Abhishek...Ideal Tour..!!!”",
          name: "Marie Kähler",
          company: "Lekkerland",
        },
        {
          photo: "customer-photo-1.jpg",
          review:
            "“Well organized trip, All arranged well by Arooz. Special thanks to Aijaz Bhai for the service and support given to us, all explained well and take us to all places as per our wish. It was a wonderful experience .... Thank you team”",
          name: "Eduard Hand",
          company: "Müller-Egerer",
        },
        {
          photo: "customer-photo-2.jpg",
          review:
            "“We want to visit Manali from long time. Abhishek from ideal tour give us the best quote for Manali tour. He was very supportive and approachable at any time. He made our trip hassle-free. Thanks for your great help Abhishek...Ideal Tour..!!!”",
          name: "Marie Kähler",
          company: "Lekkerland",
        },
        {
          photo: "customer-photo-1.jpg",
          review:
            "“Well organized trip, All arranged well by Arooz. Special thanks to Aijaz Bhai for the service and support given to us, all explained well and take us to all places as per our wish. It was a wonderful experience .... Thank you team”",
          name: "Eduard Hand",
          company: "Müller-Egerer",
        },
        {
          photo: "customer-photo-2.jpg",
          review:
            "“We want to visit Manali from long time. Abhishek from ideal tour give us the best quote for Manali tour. He was very supportive and approachable at any time. He made our trip hassle-free. Thanks for your great help Abhishek...Ideal Tour..!!!”",
          name: "Marie Kähler",
          company: "Lekkerland",
        },
        {
          photo: "customer-photo-1.jpg",
          review:
            "“Well organized trip, All arranged well by Arooz. Special thanks to Aijaz Bhai for the service and support given to us, all explained well and take us to all places as per our wish. It was a wonderful experience .... Thank you team”",
          name: "Eduard Hand",
          company: "Müller-Egerer",
        },
        {
          photo: "customer-photo-2.jpg",
          review:
            "“We want to visit Manali from long time. Abhishek from ideal tour give us the best quote for Manali tour. He was very supportive and approachable at any time. He made our trip hassle-free. Thanks for your great help Abhishek...Ideal Tour..!!!”",
          name: "Marie Kähler",
          company: "Lekkerland",
        },
      ],
      splideObject: {
        type: "loop",
        drag: "free",
        gap: "94px",
        perPage: 2,
        perMove: 1,
        breakpoints: {
          1200: {
            gap: "30px",
          },
          768: {
            perPage: 1,
          },
        },
      },
    };
  },
};
</script>
<style scoped lang="scss">
.customers-reviews {
  position: relative;
  .splide {
    :deep(.splide__arrows) {
      display: none;
    }
  }
  &__title {
    position: relative;
    z-index: 1;
    margin-bottom: 60px;
    h2 {
      position: relative;
      z-index: 1;
    }
    svg {
      position: absolute;
      left: 50%;
      top: 50%;
      translate: -50% -50%;
    }
  }
  &__bg {
    position: absolute;
    z-index: -1;
    left: 50%;
    bottom: -500px;
    translate: -50%;
    min-width: 1100px;
    width: 100%;
  }
  .crown-decoration {
    &::after,
    &::before {
      height: 100%;
    }
  }
}

@media (min-width: 768px) {
  .customers-reviews {
    .splide {
      position: relative;
      margin-right: -290px;
      :deep(.splide__arrows) {
        display: block;
      }
      &::after {
        content: "";
        position: absolute;
        left: calc(100vw - (100vw - 1080px) / 2 - 400px);
        top: 50%;
        translate: 0 -50%;
        height: calc(100% - 16px);
        width: 800px;
        background: radial-gradient(
          ellipse closest-side,
          var(--bg-main),
          transparent
        );
        pointer-events: none;
      }
      :deep(.splide__arrow--next) {
        right: 250px;
      }
    }
    &__title {
      margin-bottom: 100px;
      svg {
        width: 112px;
        height: auto;
      }
    }
    &__bg {
      bottom: -700px;
      min-width: 1400px;
    }
  }
}
</style>
