<template>
  <div class="trip-page">
    <main>
      <div
        class="container"
        v-if="tripInfo">
        <h2>Romantic Winter Destinations</h2>
        <div class="big-card">
          <img
            class="big-card__img"
            :src="tripInfo.fullTripInfo.bigImgSrc"
            alt="Machu Picchu" />
          <div class="big-card__content">
            <div class="big-card__bottom">
              <div class="big-card__destination">
                <div class="big-card__country">
                  <IPin></IPin> {{ tripInfo.fullTripInfo.country }}
                </div>
                <div class="big-card__place">
                  {{ tripInfo.fullTripInfo.destination }}
                </div>
              </div>
              <div class="big-card__price">
                from
                <span class="big-card__price-value"
                  >€ {{ tripInfo.fullTripInfo.price }}</span
                >
              </div>
            </div>
            <RatingComponent
              :rating="tripInfo.averageRatingObject.overallAverageRating"
              disabled></RatingComponent>
          </div>
          <router-link
            class="contact__link"
            :to="{ name: 'package-booking-page', id: 'aasdasd' }">
            <ButtonWhite>
              <CrownDecoration></CrownDecoration>
              <span>Book now</span>
            </ButtonWhite>
          </router-link>
        </div>
        <TabsWrapper>
          <template>
            <TabComponent title="Information">
              <InformationTab
                :fullTripInfo="tripInfo.fullTripInfo"></InformationTab
            ></TabComponent>
            <TabComponent
              vShow
              title="Luxury Tour Plan"
              ><TourPlanTab
                :name="tripInfo.fullTripInfo.name"
                :tourPlanObject="tripInfo.fullTripInfo.tourPlan"></TourPlanTab>
            </TabComponent>
            <TabComponent
              vShow
              title="Travel Tips"
              ><TravelTipsTab />
            </TabComponent>
            <TabComponent
              vShow
              title="Gallery">
              <GalleryTab
                :galleryObject="tripInfo.fullTripInfo.gallery"
                :name="tripInfo.fullTripInfo.name"></GalleryTab>
            </TabComponent>
            <TabComponent
              vShow
              title="Reviews">
              <ReviewsTab
                @addComment="addComment"
                :averageRating="tripInfo.averageRatingObject"
                :reviewsWithCommentArray="reviewsWithComment"
                :reviewsAmount="tripInfo.reviewsAmount"
                :reviewSent="this.reviewSent"></ReviewsTab>
            </TabComponent>
            <TabComponent title="Cancellation policy">
              <CancellationPolicyTab />
            </TabComponent>
          </template>
        </TabsWrapper>
      </div>
    </main>
  </div>
</template>
<script>
// потім треба додати стан завантаження
import InformationTab from "@/components/tripShowTabs/Information.vue";

import RatingComponent from "@/components/formComponents/RatingComponent.vue";
import ButtonWhite from "@/components/formComponents/ButtonWhite.vue";

import CrownDecoration from "@/components/CrownDecoration.vue";
import TabsWrapper from "@/components/TabsWrapper.vue";
import TabComponent from "@/components/TabComponent.vue";

import { defineAsyncComponent } from "vue";

import { mapStores } from "pinia";
import { useLuxTripStore } from "../store/index";
import { db } from "@/firebase/firebaseInit";
import { doc, runTransaction } from "firebase/firestore";

import IPin from "@/components/icons/IPin.vue";

const ReviewsTab = defineAsyncComponent(() =>
  import(
    /* webpackPrefetch: true */
    /* webpackChunkName: " reviews" */ "@/components/tripShowTabs/Reviews.vue"
  )
);
const GalleryTab = defineAsyncComponent(() =>
  import(
    /* webpackPrefetch: true */
    /* webpackChunkName: "gallery" */ "@/components/tripShowTabs/Gallery.vue"
  )
);
const TourPlanTab = defineAsyncComponent(() =>
  import(
    /* webpackPrefetch: true */
    /* webpackChunkName: "tourPlan" */ "@/components/tripShowTabs/TourPlan.vue"
  )
);
const TravelTipsTab = defineAsyncComponent(() =>
  import(
    /* webpackPrefetch: true */
    /* webpackChunkName: "travelTips" */ "@/components/tripShowTabs/TravelTips.vue"
  )
);
const CancellationPolicyTab = defineAsyncComponent(() =>
  import(
    /* webpackPrefetch: true */
    /* webpackChunkName: "cancellationPolicy" */ "@/components/tripShowTabs/CancellationPolicy.vue"
  )
);
export default {
  components: {
    RatingComponent,
    ButtonWhite,
    CrownDecoration,
    IPin,
    TabsWrapper,
    TabComponent,
    ReviewsTab,
    GalleryTab,
    TourPlanTab,
    TravelTipsTab,
    CancellationPolicyTab,
    InformationTab,
  },
  data() {
    return {
      commentForm: {
        userName: null,
        userEmail: null,
        comment: null,
      },
      ratingForm: {
        comfort: null,
        hospitality: null,
        hygiene: null,
        reception: null,
      },

      tripInfo: null,
      reviewSent: false,
    };
  },
  async created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.getFullTripInfo();
      },
      { immediate: true }
    );
  },
  methods: {
    async getFullTripInfo() {
      this.tripInfo = null;
      //  this.error = null;
      // this.loading = true;
      await this.luxTripStore.getDetailsAboutTrip(this.$route.params.id);
      this.tripInfo = this.luxTripStore.trips.find(
        (trip) => trip.id === this.$route.params.id
      );
    },

    async addComment(newComment) {
      // this.tripInfo.fullTripInfo.reviews.push(newComment);
      console.log(newComment);
      const tripRef = doc(db, `trips`, this.$route.params.id);
      const tripDetailsRef = doc(
        db,
        `trips/${this.$route.params.id}/tripDetail`,
        this.$route.params.id
      );

      await runTransaction(db, async (transaction) => {
        const tripRefSnap = await transaction.get(tripRef);
        const tripDetailsRefSnap = await transaction.get(tripDetailsRef);
        if (!(tripRefSnap || tripDetailsRefSnap)) {
          throw "Document does not exist!";
        }
        let tripData = tripRefSnap.data();
        let tripDetailsData = tripDetailsRefSnap.data();
        const oldReviewsAmount = tripData.reviewsAmount;
        const newReviewsAmount = tripData.reviewsAmount + 1;

        let comfortAverageRating =
          (oldReviewsAmount *
            tripData.averageRatingObject.comfortAverageRating +
            newComment.rating.comfort) /
          newReviewsAmount;

        let hospitalityAverageRating =
          (oldReviewsAmount *
            tripData.averageRatingObject.hospitalityAverageRating +
            newComment.rating.hospitality) /
          newReviewsAmount;

        let hygieneAverageRating =
          (oldReviewsAmount *
            tripData.averageRatingObject.hygieneAverageRating +
            newComment.rating.hygiene) /
          newReviewsAmount;

        let receptionAverageRating =
          (oldReviewsAmount *
            tripData.averageRatingObject.receptionAverageRating +
            newComment.rating.reception) /
          newReviewsAmount;
        let overallAverageRating =
          (comfortAverageRating +
            hospitalityAverageRating +
            hygieneAverageRating +
            receptionAverageRating) /
          4;
        const newAverageRatingObject = {
          comfortAverageRating: comfortAverageRating.toFixed(2),
          hospitalityAverageRating: hospitalityAverageRating.toFixed(2),
          hygieneAverageRating: hygieneAverageRating.toFixed(2),
          receptionAverageRating: receptionAverageRating.toFixed(2),
          overallAverageRating: overallAverageRating.toFixed(2),
        };
        const newReviewArray = tripDetailsData.reviews;
        newReviewArray.push(newComment);

        transaction.update(tripRef, {
          averageRatingObject: newAverageRatingObject,
          reviewsAmount: newReviewsAmount,
        });
        transaction.update(tripDetailsRef, {
          reviews: newReviewArray,
        });
        return {
          averageRatingObject: newAverageRatingObject,
          reviewsAmount: newReviewsAmount,
          reviews: newReviewArray,
        };
      }).then((r) => {
        this.tripInfo.averageRatingObject = r.averageRatingObject;
        this.tripInfo.reviewsAmount = r.reviewsAmount;
        this.tripInfo.fullTripInfo.reviews = r.reviews;
        this.reviewSent = true;
      });
    },
  },
  computed: {
    ...mapStores(useLuxTripStore),
    reviewsWithComment() {
      console.log("updated");
      return this.tripInfo.fullTripInfo.reviews.filter(
        (review) => review.commentText
      );
    },
  },
};
</script>
<style lang="scss">
.trip-page {
  padding-top: 15px;

  h3 {
    font-size: 40px;
    line-height: 40px;
    font-weight: normal;
    color: var(--black-main);
    margin-bottom: 20px;
    text-align: center;
  }
  h4 {
    font-size: 30px;
    line-height: 32px;
    font-weight: normal;
    color: var(--black-main);
  }
  .included-list,
  .not-included-list {
    li {
      display: flex;
      align-items: center;
      font-size: 16px;
      line-height: 16px;
      margin-bottom: 16px;
      svg {
        margin-right: 15px;
        flex-shrink: 0;
      }
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
  .container > h2 {
    margin-bottom: 15px;
  }
  .big-card {
    position: relative;
    isolation: isolate;
    margin-bottom: 70px;
    display: flex;
    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      translate: -50% -50%;
      width: calc(100% - 20px);
      height: calc(100% + 10px);
      border: 1px solid #fff;
      border-radius: 10px;
      z-index: -1;
    }
    &__img {
      width: 100%;
      height: 560px;
      object-fit: cover;
      border-radius: 10px;
    }
    .btn-white {
      position: absolute;
      left: 50%;
      bottom: 0;
      translate: -50% 50%;
      width: 255px;
    }
    &__content {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: auto;
      padding: 80px 20px;
      color: white;
      display: flex;
      justify-content: space-between;
      border-radius: 10px;
      overflow: hidden;
      background: linear-gradient(180deg, transparent 0%, var(--blue) 100%);
    }

    &__bottom {
      display: flex;
      flex-direction: column;
      margin-right: 20px;
    }

    &__destination {
      display: flex;
      flex-direction: column;
      margin-bottom: 25px;
    }

    &__country {
      font-family: var(--manrope);
      font-size: 11px;
      line-height: 15px;
      font-weight: 500;
      margin-bottom: 5px;
    }

    &__place {
      font-size: 32px;
      line-height: 32px;
    }

    &__price {
      font-family: var(--manrope);
      font-size: 11px;
      line-height: 15px;
      font-weight: 500;
      text-transform: uppercase;
      display: flex;
      flex-direction: column;
      &-value {
        font-size: 21px;
        line-height: 21px;
      }
    }
    .crown-decoration::before,
    .crown-decoration::after {
      width: calc(50% - 40px);
    }
  }
  .tab {
    background-color: #fff;
    border-radius: 10px;
    & > div {
      padding: 25px 30px;
      padding: 25px clamp(20px, 8vw, 60px);
    }
  }
}
@media (max-width: 425px) {
  .trip-page {
    .information {
      &__main {
        display: grid;
        grid-template-columns: 1fr;
        column-gap: 20px;
      }
    }
  }
}
@media (min-width: 768px) {
  .trip-page {
    h3 {
      margin-bottom: 40px;
    }
    h4 {
      font-size: 40px;
      line-height: 40px;
    }
    .included-list,
    .not-included-list {
      li {
        font-size: 18px;
        line-height: 16px;
      }
    }
    .container > h2 {
      margin-bottom: 25px;
    }
    .big-card {
      &:before {
        width: calc(100% - 30px);
        height: calc(100% + 20px);
        border: 1px solid #fff;
        border-radius: 10px;
        z-index: -1;
      }
      .rating {
        margin-bottom: 25px;
        align-self: flex-start;
      }
      &__img {
      }
      &__content {
        padding: 80px 65px;
        color: white;
        flex-direction: column-reverse;
      }

      &__bottom {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
      }

      &__destination {
        margin: 0;
      }

      &__country {
        font-size: 18px;
        line-height: 25px;
      }

      &__place {
        font-size: 60px;
        line-height: 58px;
      }

      &__price {
        font-size: 12px;
        line-height: 16px;
        &-value {
          font-size: 24px;
          line-height: 24px;
        }
      }
    }
    .tab {
      & > div {
        padding: 75px clamp(60px, 7vw, 100px);
      }
    }
  }
}
</style>
