<template>
  <div class="home">
    <div class="open-screen">
      <div class="container">
        <h1 class="open-screen__title">
          <span class="open-screen__title-small"> the world’s most</span>
          <span class="open-screen__title-extra-big">extra ordinary </span>
          <span class="open-screen__title-big">Places </span>
        </h1>
        <div class="open-screen__background">
          <picture>
            <source
              type="image/avif"
              srcset="
                https://firebasestorage.googleapis.com/v0/b/firetrip-b1efe.appspot.com/o/backgrounds%2Fmountains-1.avif?alt=media&token=2006a480-bc7f-4d27-8ba0-4d3a6bf96534
              " />
            <img
              class="open-screen__img open-screen__img-1"
              src="@/assets/backgrounds/mountains-1.webp"
              alt="mountains" />
          </picture>
          <picture>
            <source
              type="image/avif"
              media="(min-width: 1400px)"
              srcset="
                https://firebasestorage.googleapis.com/v0/b/firetrip-b1efe.appspot.com/o/backgrounds%2Fmountains-2-big.avif?alt=media&token=1e0cb21e-ce13-46a2-844d-6368ece87716
              " />
            <source
              type="image/avif"
              srcset="
                https://firebasestorage.googleapis.com/v0/b/firetrip-b1efe.appspot.com/o/backgrounds%2Fmountains-2.avif?alt=media&token=2adcb7be-6610-4354-9ca9-571aeca9bea8
              " />
            <img
              class="open-screen__img open-screen__img-2"
              src="@/assets/backgrounds/mountains-2.webp"
              alt="mountains" />
          </picture>
          <picture>
            <source
              type="image/avif"
              srcset="
                https://firebasestorage.googleapis.com/v0/b/firetrip-b1efe.appspot.com/o/backgrounds%2Fmountains-3.avif?alt=media&token=a7713f0f-a2a6-4879-b6d7-b94a1f542538
              " />
            <img
              class="open-screen__img open-screen__img-3"
              src="@/assets/backgrounds/mountains-3.webp"
              alt="mountains" />
          </picture>
        </div>
        <div class="open-screen__rhombuses">
          <IRhombusBlur class="blured-rhombus blured-rhombus-1"></IRhombusBlur>
          <IRhombusBlur class="blured-rhombus blured-rhombus-2"></IRhombusBlur>
          <IRhombusBlur class="blured-rhombus blured-rhombus-3"></IRhombusBlur>
          <IRhombusBlur class="blured-rhombus blured-rhombus-4"></IRhombusBlur>
          <IRhombusBlur class="blured-rhombus blured-rhombus-5"></IRhombusBlur>
        </div>
      </div>
    </div>
    <main>
      <div class="wrapper">
        <SearchTrip></SearchTrip>
        <TopExperiences></TopExperiences>
        <LuxuryPackages></LuxuryPackages>
        <BookCategories
          title="Book with us"
          v-slot:default="slotProps">
          <BookCategory
            v-for="(bookCategory, index) in slotProps.bookCategories"
            :key="index"
            :bookCategory="bookCategory"></BookCategory>
        </BookCategories>
        <WhyLTComponent></WhyLTComponent>
        <CustomiseTrip></CustomiseTrip>
        <SubscribeComponent id="emailback"></SubscribeComponent>
        <CustomersReviews></CustomersReviews>
        <ContactComponent id="callback"></ContactComponent>
      </div>
    </main>
  </div>
</template>

<script>
import IRhombusBlur from "@/components/icons/IRhombusBlur.vue";
import SearchTrip from "@/components/SearchTrip.vue";

import { defineAsyncComponent } from "vue";

// import TopExperiences from "@/components/TopExperiences.vue";
import LuxuryPackages from "@/components/LuxuryPackages.vue";
// import BookCategories from "@/components/BookCategories.vue";
// import BookCategory from "@/components/BookCategory.vue";
// import WhyLTComponent from "@/components/WhyLTComponent.vue";
// import CustomiseTrip from "@/components/CustomiseTrip.vue";
// import SubscribeComponent from "@/components/Subscribe.vue";
import CustomersReviews from "@/components/CustomersReviews.vue";
// import ContactComponent from "@/components/ContactComponent.vue";

// const SearchTrip = defineAsyncComponent(() =>
//   import(
//
//     /* webpackChunkName: " SearchTrip" */ "@/components/SearchTrip.vue"
//   )
// );
const TopExperiences = defineAsyncComponent(() =>
  import(
    /* webpackChunkName: " TopExperiences" */ "@/components/TopExperiences.vue"
  )
);
const BookCategories = defineAsyncComponent(() =>
  import(
    /* webpackChunkName: " BookCategories" */ "@/components/BookCategories.vue"
  )
);
const BookCategory = defineAsyncComponent(() =>
  import(
    /* webpackChunkName: " BookCategory" */ "@/components/BookCategory.vue"
  )
);
// const LuxuryPackages = defineAsyncComponent(() =>
//   import(
//
//     /* webpackChunkName: " LuxuryPackages" */ "@/components/LuxuryPackages.vue"
//   )
// );
const WhyLTComponent = defineAsyncComponent(() =>
  import(
    /* webpackChunkName: " WhyLTComponent" */ "@/components/WhyLTComponent.vue"
  )
);
const CustomiseTrip = defineAsyncComponent(() =>
  import(
    /* webpackChunkName: " CustomiseTrip" */ "@/components/CustomiseTrip.vue"
  )
);
const SubscribeComponent = defineAsyncComponent(() =>
  import(
    /* webpackChunkName: " SubscribeComponent" */ "@/components/Subscribe.vue"
  )
);
// const CustomersReviews = defineAsyncComponent(() =>
//   import(
//
//     /* webpackChunkName: " CustomersReviews" */ "@/components/CustomersReviews.vue"
//   )
// );
const ContactComponent = defineAsyncComponent(() =>
  import(
    /* webpackChunkName: " ContactComponent" */ "@/components/ContactComponent.vue"
  )
);

export default {
  name: "HomeView",
  components: {
    IRhombusBlur,
    SearchTrip,
    TopExperiences,
    LuxuryPackages,
    BookCategories,
    BookCategory,
    WhyLTComponent,
    CustomiseTrip,
    SubscribeComponent,
    CustomersReviews,
    ContactComponent,
  },
};
</script>
<style scoped lang="scss">
.home {
  .open-screen {
    position: relative;
    z-index: 0;
    pointer-events: none;
    user-select: none;
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 50px;
      margin-bottom: 60px;
    }
    &__title {
      color: var(--home-title);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-transform: uppercase;
      font-weight: normal;
      span {
        width: min-content;
        text-align: center;
      }
      &-small {
        color: var(--black-main);
        font-size: clamp(17px, 3vw, 25px);
        line-height: 1;
        margin-bottom: 30px;
      }
      &-extra-big {
        font-size: clamp(50px, 20vw, 200px);
        line-height: 0.65;
        z-index: 0;
      }
      &-big {
        font-size: clamp(50px, 20vw, 140px);
        line-height: 1;
        z-index: 2;
      }
    }
    &__img {
      position: absolute;
      width: 100%;
      z-index: -1;
      object-fit: cover;
      object-position: top;
      max-height: 600px;
      left: 0;
      &-1 {
        top: clamp(130px, 35vw, 180px);
        min-height: 400px;
      }
      &-2 {
        top: clamp(200px, 45vw, 340px);
        min-height: 400px;
        z-index: 1;
      }
      &-3 {
        top: clamp(260px, 59vw, 410px);
        min-height: 250px;
        z-index: 3;
        width: 100%;
      }
    }
    &__rhombuses {
      width: 100%;
      max-width: 1200px;
      position: absolute;
      margin: 0 auto;
      height: 100%;
      & :deep(svg) {
        width: auto;
        height: 100%;
      }
      .blured-rhombus {
        position: absolute;
        z-index: 1;

        &-1 {
          top: 50%;
          left: 50%;
          translate: -50% 0%;
          height: clamp(90px, 19vw, 210px);
        }
        &-2 {
          top: 60%;
          left: 1%;
          height: clamp(33px, 4vw, 52px);
        }
        &-3 {
          top: 95%;
          left: 10%;
          translate: -50% 0;
          height: clamp(53px, 7vw, 83px);
        }
        &-4 {
          top: 65%;
          left: 90%;
          height: clamp(32px, 4vw, 50px);
        }
        &-5 {
          top: 80%;
          left: 87%;
          height: clamp(64px, 8vw, 100px);
        }
      }
    }
  }
  .wrapper {
    .customers-reviews {
      margin-bottom: 230px;
    }
  }
}
@media (min-width: 768px) {
  .home {
    .open-screen {
      .container {
        padding-top: 20px;
        margin-bottom: 50px;
      }
      &__title {
        &-small {
          margin-bottom: 64px;
        }
      }
      &__img {
        &-2 {
          min-height: 550px;
        }
        &-3 {
          top: clamp(430px, 50vw, 490px);
          min-height: 440px;
        }
      }
    }
    .wrapper {
      .customers-reviews {
        margin-bottom: 430px;
      }
    }
  }
}
</style>
