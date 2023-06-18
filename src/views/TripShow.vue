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
          <ButtonWhite>
            <CrownDecoration></CrownDecoration>
            <span>Book now</span>
          </ButtonWhite>
        </div>
        <TabsWrapper>
          <template>
            <TabComponent title="Information">
              <div class="information">
                <div class="information__text">
                  <h3>{{ tripInfo.fullTripInfo.name }}</h3>
                  <p>{{ tripInfo.fullTripInfo.description }}</p>
                  <div class="information__main">
                    <div class="information__column">
                      <div class="information__name">Destination</div>
                      <div class="information__value">
                        {{ tripInfo.fullTripInfo.destination }}
                      </div>
                    </div>
                    <div class="information__column">
                      <div class="information__name">Departure</div>
                      <div class="information__value">
                        {{ tripInfo.fullTripInfo.departure }}
                      </div>
                    </div>
                    <div class="information__column">
                      <div class="information__name">Departure Time</div>
                      <div class="information__value">
                        {{ tripInfo.fullTripInfo.departureTime }}
                      </div>
                    </div>
                    <div class="information__column">
                      <div class="information__name">Return Time</div>
                      <div class="information__value">
                        {{ tripInfo.fullTripInfo.returnTime }}
                      </div>
                    </div>
                    <div class="information__column">
                      <div class="information__name">Dress Code</div>
                      <div class="information__value">
                        {{ tripInfo.fullTripInfo.dressCode }}
                      </div>
                    </div>
                  </div>
                  <div class="information__included">
                    <div class="information__included-title">included</div>
                    <ul
                      class="included-list"
                      v-if="tripInfo.fullTripInfo.included">
                      <li
                        v-for="(included, index) in tripInfo.fullTripInfo
                          .included"
                        :key="index">
                        <IIncluded></IIncluded>{{ included }}
                      </li>
                    </ul>
                  </div>
                  <div class="information__not-included">
                    <div class="information__not-included-title">
                      not included
                    </div>
                    <ul
                      class="not-included-list"
                      v-if="tripInfo.fullTripInfo.notIncluded">
                      <li
                        v-for="(notIncluded, index) in tripInfo.fullTripInfo
                          .notIncluded"
                        :key="index">
                        <INotIncluded></INotIncluded>{{ notIncluded }}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="information__card">
                  <img
                    class="information__card-img"
                    :src="tripInfo.fullTripInfo.smallImgSrc"
                    alt="Machu Picchu" />
                  <ButtonWhite>
                    <CrownDecoration></CrownDecoration>
                    <span>Book now</span>
                  </ButtonWhite>
                </div>
              </div>
            </TabComponent>
            <TabComponent title="Luxury Tour Plan"
              ><div class="tour-plan">
                <h3>Luxury Tour Plan</h3>
                <div
                  class="days"
                  ref="tourPlan">
                  <div
                    v-for="(day, index) in tripInfo.fullTripInfo.tourPlan"
                    :key="index"
                    class="day">
                    <div class="day__number">
                      <span>{{ index + 1 }}</span
                      ><IRhombus class="day__rhombus"></IRhombus>
                    </div>
                    <div class="day__content">
                      <h3 class="day__title">{{ day.dayPlanTitle }}</h3>
                      <div class="day__description">
                        {{ day.dayPlan }}
                        <ul class="included-list">
                          <li
                            v-for="(included, index) in day.included"
                            :key="index">
                            <IIncluded></IIncluded>{{ included }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <ButtonBlack
                  class="button-pdf"
                  @click="generatePdf">
                  <CrownDecoration></CrownDecoration>
                  <span>download pdf</span></ButtonBlack
                >
              </div>
            </TabComponent>
            <TabComponent title="Travel Tips"
              ><div class="travel-tips">
                <h3>Travel Tips</h3>
                <div class="tips-list">
                  <div class="tip">
                    <h4 class="tip__title">Buy a small backpack/suitcase</h4>
                    <p class="tip__text">
                      By purchasing a small backpack (I like something around
                      35/40 liters), you will be forced you to pack light and
                      avoid carrying too much stuff. Humans have a natural
                      tendency to want to fill space so if you pack light but
                      have lots of extra room in your bag, you’ll end up going
                      “well, I guess I can take more” and then regret it.
                    </p>
                  </div>
                  <div class="tip">
                    <h4 class="tip__title">But take extra socks</h4>
                    <p class="tip__text">
                      You’ll lose a bunch to laundry gremlins, wear and tear,
                      and hiking so packing extra will come in handy. I only
                      take a few more than I need. Nothing beats a fresh pair of
                      socks!
                    </p>
                  </div>
                  <div class="tip">
                    <h4 class="tip__title">
                      Take an extra bank card and credit card with you
                    </h4>
                    <p class="tip__text">
                      Disasters happen. It’s always good to have a backup in
                      case you get robbed or lose a card. You don’t want to be
                      stuck somewhere new without access to your funds. I once
                      had a card duplicated and a freeze put on it. I couldn’t
                      use it for the rest of my trip. I was very happy I had an
                      extra and not like my friend, who didn’t and was forced to
                      borrow money from me all the time!
                    </p>
                  </div>
                  <div class="tip">
                    <h4 class="tip__title">Travel by yourself at least once</h4>
                    <p class="tip__text">
                      Traveling alone may seem daunting and boring, but it can
                      be an incredibly rewarding experience for you. One of the
                      advantages of solo travel is the opportunity to get to
                      know yourself, understand your dreams and desires. You
                      will also have complete freedom in planning your itinerary
                      and setting your own pace. It can also be an opportunity
                      for new friendships and cultural exchange, especially if
                      you travel solo with locals. The end result is an
                      unforgettable experience that will help you grow and see
                      the world from a new perspective.
                    </p>
                  </div>
                </div>
              </div>
            </TabComponent>
            <TabComponent title="Gallery"
              ><div class="gallery">
                <h3>Gallery</h3>
                <div class="photos">
                  <img
                    class="photo-top"
                    :src="tripInfo.fullTripInfo.gallery.topImg"
                    :alt="tripInfo.fullTripInfo.name" />
                  <div
                    class="photos__masonry"
                    v-if="tripInfo.fullTripInfo.gallery.masonryImages">
                    <div class="column">
                      <img
                        v-for="(
                          img, index
                        ) in tripInfo.fullTripInfo.gallery.masonryImages.slice(
                          0,
                          this.halfMasonryLength
                        )"
                        :key="index"
                        :src="img"
                        :alt="tripInfo.fullTripInfo.name" />
                    </div>
                    <div class="column">
                      <img
                        v-for="(
                          img, index
                        ) in tripInfo.fullTripInfo.gallery.masonryImages.slice(
                          this.halfMasonryLength
                        )"
                        :key="index"
                        :src="img"
                        :alt="tripInfo.fullTripInfo.name" />
                    </div>
                  </div>
                  <div
                    class="photos__rest"
                    v-if="tripInfo.fullTripInfo.gallery.restImages">
                    <img
                      v-for="(img, index) in tripInfo.fullTripInfo.gallery
                        .restImages"
                      :key="index"
                      :src="img"
                      :alt="tripInfo.fullTripInfo.name" />
                  </div>
                  <img
                    class="photo-bottom"
                    :src="tripInfo.fullTripInfo.gallery.bottomImg"
                    :alt="tripInfo.fullTripInfo.name" />
                </div>
              </div>
            </TabComponent>
            <TabComponent title="Reviews">
              <ReviewsTab
                @addComment="addComment"
                :averageRating="tripInfo.averageRatingObject"
                :reviewsWithCommentArray="reviewsWithComment"
                :reviewsAmount="tripInfo.reviewsAmount"
                :reviewSent="this.reviewSent"
                ></ReviewsTab>
            </TabComponent>
            <TabComponent title="Cancellation policy">
              <div class="cancellation-policy">
                <h3>Cancellation policy</h3>
                <h4>
                  You can cancel your purchase of a subscription service and
                  request a refund within 14 days from the initial transaction
                  date.
                </h4>
                <p>
                  The refund may be reduced pro-rata to reflect the use you have
                  had of the service. This may show as two transactions in your
                  account transaction history: a refund to your wallet of the
                  full amount originally paid and then a debit of a charge for
                  the period of the service you received.
                </p>
                <p>
                  If you take advantage of a free trial when you sign up to a
                  service, the 14-day cancellation period will commence on the
                  day we accept your order of the free trial and the duration of
                  the free trial will be included in the 14-day period. For
                  example, you sign up for a free trial which lasts 7 days and
                  your wallet is debited for the subscription at the end of the
                  trial, you will have 7 days after your wallet was debited to
                  cancel.
                </p>
                <p>
                  Note: When you purchase a subscription service such as
                  PlayStation®Plus, you agree to a rolling subscription with
                  periodic billing (e.g. annual billing). You can stop making
                  payments at any time by turning off [Auto-renewal] (click here
                  for more information) but, beyond the initial 14-day
                  cancellation period, you will not receive a refund for
                  payments already made. When you turn off [Auto-renewal], your
                  subscription will continue until the next payment is due, at
                  which point it will end.
                </p>
                <h4>Further Information</h4>
                <p>
                  We recommend that you take care when you top up your wallet or
                  make a purchase on PlayStation™Store. A number of account
                  features are available so you can keep track of your account
                  activity.
                </p>
                <p>
                  To control the purchases made from the PlayStation™Store, via
                  your account and console ensure you (i) use our password and
                  passcode tools to control unauthorised log-in to and purchases
                  via your account and (ii) if you have children, set up a
                  separate account for each child and use our parental controls
                  to limit their expenditure or prevent them shopping at all.
                </p>
              </div>
            </TabComponent>
          </template>
        </TabsWrapper>
      </div>
    </main>
  </div>
</template>
<script>
// потім треба додати стан завантаження
import RatingComponent from "@/components/RatingComponent.vue";
import ButtonWhite from "@/components/ButtonWhite.vue";
import ButtonBlack from "@/components/ButtonBlack.vue";
import CrownDecoration from "@/components/CrownDecoration.vue";
import TabsWrapper from "@/components/TabsWrapper.vue";
import TabComponent from "@/components/TabComponent.vue";

import { defineAsyncComponent } from "vue";

import { mapStores } from "pinia";
import { useLuxTripStore } from "../store/index";
import { db } from "@/firebase/firebaseInit";
import { doc, runTransaction } from "firebase/firestore";

import IPin from "@/components/icons/IPin.vue";
import IIncluded from "@/components/icons/IIncluded.vue";
import INotIncluded from "@/components/icons/INotIncluded.vue";
import IRhombus from "@/components/icons/IRhombus.vue";
import jsPDF from "jspdf";
export default {
  components: {
    RatingComponent,
    ButtonWhite,
    ButtonBlack,
    CrownDecoration,
    IPin,
    TabsWrapper,
    TabComponent,
    IIncluded,
    INotIncluded,
    IRhombus,
    ReviewsTab: defineAsyncComponent(() =>
      import(
        /* webpackPrefetch: true */ "@/components/tripShowTabs/Reviews.vue"
      )
    ),
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
      // commentForm: {
      //   userName: "Alexandro",
      //   userEmail: null,
      //   comment: "comment from vsCode",
      // },
      // ratingForm: {
      //   comfort: 5,
      //   hospitality: 5,
      //   hygiene: 5,
      //   reception: 5,
      // },
      tripInfo: null,
      reviewSent:false,
    };
  },
  created() {
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
    generatePdf() {
      // need to refactor later
      var pdf = new jsPDF("p", "pt", "A4"),
        sizes = [30, 20],
        fonts = [
          ["Helvetica", ""],
          ["Times", "Italic"],
        ],
        font,
        size,
        lines,
        verticalOffset = 40,
        margin = 20;

      this.tripInfo.fullTripInfo.tourPlan.forEach((day, index) => {
        font = fonts[0];
        size = sizes[0];

        lines = pdf
          .setFont(font[0], font[1])
          .setFontSize(size)
          .splitTextToSize(String(index + 1) + ". " + day.dayPlanTitle, 500);
        if (verticalOffset + lines.length * size > 820) {
          pdf.addPage();
          verticalOffset = 40;
        }
        pdf.text(20, verticalOffset, lines);
        verticalOffset += lines.length * size + margin;

        font = fonts[1];
        size = sizes[1];
        lines = pdf
          .setFont(font[0], font[1])
          .setFontSize(size)
          .splitTextToSize(day.dayPlan, 500);
        if (verticalOffset + lines.length * size > 820) {
          pdf.addPage();

          verticalOffset = 40;
        }
        pdf.text(20, verticalOffset, lines);
        verticalOffset += lines.length * size + margin;

        if (day.included.length > 0) {
          day.included.forEach((includedItem) => {
            lines = pdf
              .setFont(font[0], font[1])
              .setFontSize(size)
              .splitTextToSize("+" + " " + includedItem, 500);

            if (verticalOffset + lines.length * size > 820) {
              pdf.addPage();
              verticalOffset = 40;
            }
            pdf.text(20, verticalOffset, lines);
            verticalOffset += lines.length * size + margin;
          });
        }
        verticalOffset += margin;
      });

      pdf.save(this.tripInfo.fullTripInfo.name.replace(" ", "") + "Plan");
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
        this.reviewSent= true
      });
    },
  },
  computed: {
    ...mapStores(useLuxTripStore),
    halfMasonryLength() {
      return Math.floor(
        this.tripInfo.fullTripInfo.gallery.masonryImages.length / 2
      );
    },
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
    .information {
      h3 {
        text-align: left;
      }
      p {
        margin-bottom: 20px;
      }

      &__text {
        margin-bottom: 60px;
      }

      &__main {
        display: grid;
        grid-template-columns: minmax(140px, 1fr) 1fr;
        column-gap: 20px;
        margin-bottom: 40px;
      }

      &__column {
        display: contents;
      }

      &__name {
        font-family: var(--manrope);
        font-weight: 600;
        font-size: 18px;
        line-height: 18px;
      }

      &__value {
        font-family: var(--manrope);
        font-size: 18px;
        margin-bottom: 16px;
        line-height: 18px;
      }
      &__not-included {
        &-title {
          font-size: 18px;
          line-height: 18px;
          font-weight: 600;
          font-family: var(--manrope);
          margin-bottom: 16px;
        }
      }
      &__included {
        margin-bottom: 40px;
        &-title {
          font-size: 18px;
          line-height: 18px;
          font-weight: 600;
          font-family: var(--manrope);
          margin-bottom: 16px;
        }
      }
      &__card {
        position: relative;
        height: max-content;
        &-img {
          border-radius: 10px;
          width: 100%;
          /* max-width: 500px; */
          margin: 0 auto;
        }
        .btn-white {
          position: absolute;
          left: 50%;
          bottom: 70px;
          translate: -50% 0;
          width: 255px;
          max-width: calc(100% - 20px);
        }
      }
    }
    .tour-plan {
      .days {
        margin-bottom: 60px;
      }
      .day {
        display: grid;
        grid-template-columns: auto 1fr;
        overflow: hidden;
        margin-bottom: -3px;
        &:not(:last-child) {
          .day__number::after {
            content: "";
            position: absolute;
            height: 1000px;
            width: 1px;
            translate: -50% -4px;
            left: 50%;
            top: 100%;
            background-color: var(--gray);
          }
          padding-bottom: 40px;
        }
        &__content {
          margin-left: 30px;
        }
        &__number {
          font-size: 24px;
          line-height: 24px;
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
          width: 38px;
          height: auto;
          stroke-width: 4;
          path {
            stroke: var(--gray);
          }
        }
        &__title {
          font-size: 30px;
          line-height: 32px;
          margin-bottom: 15px;
          font-weight: normal;
        }

        &__description {
          font-family: var(--manrope);
          font-size: 16px;
          line-height: 24px;
          .included-list {
            margin-top: 15px;
          }
        }
      }
    }
    .travel-tips {
      .tips-list {
        .tip {
          &:not(:last-child) {
            border-bottom: 1px solid var(--bg-main);
            padding-bottom: 20px;
            margin-bottom: 20px;
          }
          &__title {
            margin-bottom: 20px;
          }
        }
      }
    }
    .gallery {
      .photos {
        display: grid;
        grid-template-columns: auto;
        gap: 10px;
        img {
          width: 100%;
          border-radius: 10px;
        }
        &__masonry {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        &__masonry,
        &__rest {
          img {
            width: 100%;
          }
          img:not(:last-child) {
            margin-bottom: 10px;
          }
        }
      }
    }
    .cancellation-policy {
      h4 {
        margin-bottom: 20px;
        &:not(:first-of-type) {
          margin-top: 40px;
        }
      }
      p:not(:last-child) {
        margin-bottom: 20px;
      }
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
      .information {
        display: flex;
        p {
          margin-bottom: 30px;
        }
        &__text {
          margin-bottom: 0px;
          order: 1;
          flex: 0 1 450px;
        }
        &__card {
          margin-right: clamp(25px, 8.3vw, 120px);
          flex: 0 1 350px;
        }
      }
      .tour-plan {
        .button-pdf {
          max-width: 255px;
          margin: 0 auto;
        }
        .days {
          margin-bottom: 80px;
        }
        .day {
          &__content {
            display: flex;
          }
          &__number {
            font-size: 41px;
            line-height: 41px;
          }
          &__title {
            font-size: 40px;
            line-height: 40px;
            margin: 30px 15px 0 0;
            flex: 0 0 250px;
          }
          &__rhombus {
            width: 66px;
          }
          &__description {
            font-size: 18px;
            line-height: 36px;
          }
        }
      }
      .gallery {
        .photos {
          gap: 25px;
          &__masonry {
            display: flex;
            flex-direction: row;
            gap: 25px;
            .column {
              display: flex;
              flex-direction: column;
              flex: 1 1 50%;
            }
            img {
              flex-grow: 1;
              object-fit: cover;
            }
            img:not(:last-child) {
              margin-bottom: 25px;
            }
          }
          &__rest {
            img:not(:last-child) {
              margin-bottom: 25px;
            }
          }
          .photo-top {
          }
          .photo-bottom {
          }
        }
      }
      .cancellation-policy {
        h4 {
          margin-bottom: 40px;
          &:not(:first-of-type) {
            margin-top: 60px;
          }
        }
        p:not(:last-child) {
          margin-bottom: 40px;
        }
      }
    }
  }
}
</style>
