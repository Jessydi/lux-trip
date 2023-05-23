<template>
  <div class="trip-page">
    <main>
      <div class="container">
        <h2>Romantic Winter Destinations</h2>
        <div class="big-card">
          <img
            class="big-card__img"
            :src="require(`@/assets/big-trip-images/${fullTripInfo.bigImgSrc}`)"
            alt="Machu Picchu"
          />
          <div class="big-card__content">
            <div class="big-card__bottom">
              <div class="big-card__destination">
                <div class="big-card__country">
                  <IPin></IPin> {{ fullTripInfo.country }}
                </div>
                <div class="big-card__place">
                  {{ fullTripInfo.destination }}
                </div>
              </div>
              <div class="big-card__price">
                from
                <span class="big-card__price-value"
                  >€ {{ fullTripInfo.price }}</span
                >
              </div>
            </div>
            <ratingComponent
              :rating="fullTripInfo.rating"
              disabled
            ></ratingComponent>
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
                  <h3>{{ fullTripInfo.name }}</h3>
                  <p>{{ fullTripInfo.description }}</p>
                  <div class="information__main">
                    <div class="information__column">
                      <div class="information__name">Destination</div>
                      <div class="information__value">
                        {{ fullTripInfo.destination }}
                      </div>
                    </div>
                    <div class="information__column">
                      <div class="information__name">Departure</div>
                      <div class="information__value">
                        {{ fullTripInfo.departure }}
                      </div>
                    </div>
                    <div class="information__column">
                      <div class="information__name">Departure Time</div>
                      <div class="information__value">
                        {{ fullTripInfo.departureTime }}
                      </div>
                    </div>
                    <div class="information__column">
                      <div class="information__name">Return Time</div>
                      <div class="information__value">
                        {{ fullTripInfo.returnTime }}
                      </div>
                    </div>
                    <div class="information__column">
                      <div class="information__name">Dress Code</div>
                      <div class="information__value">
                        {{ fullTripInfo.dressCode }}
                      </div>
                    </div>
                  </div>
                  <div class="information__included">
                    <div class="information__included-title">included</div>
                    <ul class="included-list" v-if="fullTripInfo.included">
                      <li
                        v-for="(included, index) in fullTripInfo.included"
                        :key="index"
                      >
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
                      v-if="fullTripInfo.notIncluded"
                    >
                      <li
                        v-for="(notIncluded, index) in fullTripInfo.notIncluded"
                        :key="index"
                      >
                        <INotIncluded></INotIncluded>{{ notIncluded }}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="information__card">
                  <img
                    class="information__card-img"
                    :src="
                      require(`@/assets/trip-cards/${fullTripInfo.smallImgSrc}`)
                    "
                    alt="Machu Picchu"
                  />
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
                <div class="days" ref="tourPlan">
                  <div
                    v-for="(day, index) in fullTripInfo.tourPlan"
                    :key="index"
                    class="day"
                  >
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
                            :key="index"
                          >
                            <IIncluded></IIncluded>{{ included }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <ButtonBlack class="button-pdf" @click="generatePdf">
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
                    :src="
                      require(`@/assets/gallery/${fullTripInfo.gallery.topImg}`)
                    "
                    :alt="fullTripInfo.name"
                  />
                  <div
                    class="photos__masonry"
                    v-if="fullTripInfo.gallery.masonryImages.length > 0"
                  >
                    <div class="column">
                      <img
                        v-for="(
                          img, index
                        ) in fullTripInfo.gallery.masonryImages.slice(
                          0,
                          this.halfMasonryLength
                        )"
                        :key="index"
                        :src="require(`@/assets/gallery/${img}`)"
                        :alt="fullTripInfo.name"
                      />
                    </div>
                    <div class="column">
                      <img
                        v-for="(
                          img, index
                        ) in fullTripInfo.gallery.masonryImages.slice(
                          this.halfMasonryLength
                        )"
                        :key="index"
                        :src="require(`@/assets/gallery/${img}`)"
                        :alt="fullTripInfo.name"
                      />
                    </div>
                  </div>
                  <div
                    class="photos__rest"
                    v-if="fullTripInfo.gallery.restImages.length > 0"
                  >
                    <img
                      v-for="(img, index) in fullTripInfo.gallery.restImages"
                      :key="index"
                      :src="require(`@/assets/gallery/${img}`)"
                      :alt="fullTripInfo.name"
                    />
                  </div>
                  <img
                    class="photo-bottom"
                    :src="
                      require(`@/assets/gallery/${fullTripInfo.gallery.bottomImg}`)
                    "
                    :alt="fullTripInfo.name"
                  />
                </div>
              </div>
            </TabComponent>
            <TabComponent title="Reviews">
              <div class="reviews">
                <h3>Reviews Scores and Score Breakdown</h3>
                <ButtonTransparent
                  @click="scrollToCommentForm"
                  class="to-comment-form"
                  >Post comment</ButtonTransparent
                >
                <div class="reviews__statistics">
                  <ratingComponent
                    class="rating__overall"
                    :rating="averageRating.overallAverageRating"
                    disabled
                    :title="'35 reviews'"
                  ></ratingComponent>
                  <ratingComponent
                    :rating="averageRating.comfortAverageRating"
                    disabled
                    :title="'Comfort'"
                  ></ratingComponent>
                  <ratingComponent
                    :rating="averageRating.hospitalityAverageRating"
                    disabled
                    :title="'Hospitality'"
                  ></ratingComponent>
                  <ratingComponent
                    :rating="averageRating.hygieneAverageRating"
                    disabled
                    :title="'Hygiene'"
                  ></ratingComponent>
                  <ratingComponent
                    :rating="averageRating.receptionAverageRating"
                    disabled
                    :title="'Reception'"
                  ></ratingComponent>
                </div>
                <div class="reviews__comments">
                  <div
                    class="comment"
                    v-for="(reviews, index) in reviewsWithComment"
                    :key="index"
                  >
                    <p class="comment__text">{{ reviews.commentText }}</p>
                    <div class="comment__info">
                      <div class="comment__user-name">
                        {{ reviews.userName }}
                      </div>
                      <div class="comment__date">
                        {{ formattedDate(reviews.date) }}
                      </div>
                    </div>
                    <div class="rating__services">
                      <ratingComponent
                        :rating="reviews.rating.comfort"
                        :title="'Comfort'"
                        disabled
                      ></ratingComponent>

                      <ratingComponent
                        :rating="reviews.rating.hospitality"
                        :title="'Hospitality'"
                        disabled
                      ></ratingComponent>

                      <ratingComponent
                        :rating="reviews.rating.hygiene"
                        :title="'Hygiene'"
                        disabled
                      ></ratingComponent>

                      <ratingComponent
                        :rating="reviews.rating.reception"
                        :title="'Reception'"
                        disabled
                      ></ratingComponent>
                    </div>
                  </div>
                </div>
                <div ref="commentForm" class="reviews__post-review">
                  <h3>Post a Review</h3>
                  <form class="post-review-form">
                    <div class="comment-form">
                      <Input
                        v-model="commentForm.userName"
                        :type="'text'"
                        :placeholder="'Name'"
                      ></Input>
                      <Input
                        v-model="commentForm.userEmail"
                        :type="'email'"
                        :placeholder="'Email'"
                      ></Input>
                      <Input
                        v-model="commentForm.comment"
                        :type="'textarea'"
                        :placeholder="'Comment'"
                      ></Input>
                    </div>
                    <div class="rating-form">
                      <ratingComponent
                        :rating="ratingForm.comfort"
                        @select-grade="(n) => (ratingForm.comfort = n)"
                        :title="'Comfort'"
                      ></ratingComponent>
                      <ratingComponent
                        :rating="ratingForm.hospitality"
                        @select-grade="(n) => (ratingForm.hospitality = n)"
                        :title="'Hospitality'"
                      ></ratingComponent>
                      <ratingComponent
                        :rating="ratingForm.hygiene"
                        @select-grade="(n) => (ratingForm.hygiene = n)"
                        :title="'Hygiene'"
                      ></ratingComponent>
                      <ratingComponent
                        :rating="ratingForm.reception"
                        @select-grade="(n) => (ratingForm.reception = n)"
                        :title="'Reception'"
                      ></ratingComponent>
                    </div>
                    <ButtonBlack @click.prevent="addComment">
                      <CrownDecoration></CrownDecoration>
                      <span>Post review</span></ButtonBlack
                    >
                    <div class="error-message" :class="{ visible: isError }">
                      {{ errorMessage }}
                    </div>
                  </form>
                </div>
              </div>
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
import ratingComponent from "@/components/ratingComponent.vue";
import ButtonWhite from "@/components/ButtonWhite.vue";
import ButtonBlack from "@/components/ButtonBlack.vue";
import ButtonTransparent from "@/components/ButtonTransparent.vue";
import TabsWrapper from "@/components/TabsWrapper.vue";
import TabComponent from "@/components/TabComponent.vue";
import CrownDecoration from "@/components/CrownDecoration.vue";
import Input from "@/components/Input.vue";

import IPin from "@/components/icons/IPin.vue";
import IIncluded from "@/components/icons/IIncluded.vue";
import INotIncluded from "@/components/icons/INotIncluded.vue";
import IRhombus from "@/components/icons/IRhombus.vue";
import jsPDF from "jspdf";
export default {
  components: {
    ratingComponent,
    ButtonWhite,
    ButtonBlack,
    ButtonTransparent,
    CrownDecoration,
    Input,
    IPin,
    TabsWrapper,
    TabComponent,
    IIncluded,
    INotIncluded,
    IRhombus,
  },
  data() {
    return {
      errorMessage: null,
      isError: false,
      // commentForm: {
      //   userName: null,
      //   userEmail: null,
      //   comment: null,
      // },
      // ratingForm: {
      //   comfort: null,
      //   hospitality: null,
      //   hygiene: null,
      //   reception: null,
      // },
      commentForm: {
        userName: "Alexandro",
        userEmail: null,
        comment: "comment from vsCode",
      },
      ratingForm: {
        comfort: 5,
        hospitality: 5,
        hygiene: 5,
        reception: 5,
      },
      fullTripInfo: {
        name: "Machu Picchu",
        country: "Peru",
        rating: 5,
        description:
          "Machu Picchu is situated above a bow of the Urubamba River, which surrounds the site on three sides, where cliffs drop vertically for 450 meters (1,480 ft) to the river at their base. The area is subject to morning mists rising from the river.[49] The location of the city was a military secret, and its deep precipices and steep mountains provided natural defenses.",
        destination: "Machu Picchu",
        departure: "Lima",
        departureTime: "Flexible schedule",
        returnTime: "Flexible schedule",
        dressCode: "Comfortable outdoor clothing",
        bigImgSrc: "big-trip-img-1.jpg",
        smallImgSrc: "trip-card-img-1.jpg",
        price: 2300,
        included: [
          "5 Star Accommodation",
          "Airport Transfer",
          "Breakfast",
          "Personal Guide",
        ],
        notIncluded: ["Gallery Ticket", "Lunch"],
        tourPlan: [
          {
            dayPlanTitle: "Acclimatizing to Cusco's Charm and Culture",
            dayPlan:
              "Arrive in Cusco and transfer to your hotel. Spend the day acclimatizing to the altitude and exploring the city's charming streets and vibrant markets.",
            included: ["Airport transfer", "Hotel accommodation"],
          },
          {
            dayPlanTitle: "Discovering Inca Ruins in the Sacred Valley",
            dayPlan:
              "Embark on a full-day guided tour of the Sacred Valley, stopping at important Inca ruins and traditional Andean villages along the way.",
            included: [
              "Full-day guided tour of the Sacred Valley",
              "Entrance fees to Inca ruins",
              "Lunch",
            ],
          },
          {
            dayPlanTitle: "Exploring Machu Picchu with a Guide",
            dayPlan:
              "Take an early morning train to Aguas Calientes, the town at the base of Machu Picchu. Spend the day exploring the ancient Inca citadel with a knowledgeable guide.",
            included: [
              "Train tickets to Aguas Calientes",
              "Bus tickets to Machu Picchu",
              "Guided tour of Machu Picchu",
              "Entrance fee to Machu Picchu",
            ],
          },
          {
            dayPlanTitle: "Sunrise at Machu Picchu: Optional Second Visit",
            dayPlan:
              "Optional: wake up early for a second visit to Machu Picchu to watch the sunrise. Return to Cusco by train in the afternoon.",
            included: [
              "Train tickets from Aguas Calientes to Cusco (or airport)",
              "Airport transfer",
            ],
          },
        ],
        gallery: {
          topImg: "machu-gallery-1.jpg",
          restImages: [],
          masonryImages: [
            "machu-gallery-2.jpg",
            "machu-gallery-3.jpg",
            "machu-gallery-4.jpg",
            "machu-gallery-5.jpg",
          ],
          bottomImg: "machu-gallery-6.jpg",
        },
        reviews: [
          {
            commentText:
              "Well organized trip, All arranged well by Arooz. Special thanks to Aijaz Bhai for the service and support given to us, all explained well and take us to all places as per our wish. It was a wonderful experience .... Thank you team",
            rating: {
              comfort: "4",
              hospitality: "5",
              hygiene: "4",
              reception: "5",
            },
            userName: "Eduard Hand",
            userEmail: null,
            date: new Date(),
          },
          {
            commentText:
              "This trip was a mesmerizing escapade into the unknown. With each step, I found myself immersed in a tapestry of unfamiliar sights and unfamiliar cultures. It was a journey of self-exploration, where I discovered hidden strengths and embraced new perspectives. The encounters with locals, their stories, and their warmth left an indelible mark on my soul. The trip challenged me to step outside my comfort zone and embrace the unfamiliar, leading to moments of profound personal growth. It's an experience that will forever ignite my wanderlust and inspire me to continue exploring the wonders of our world.",
            rating: {
              comfort: "4",
              hospitality: "5",
              hygiene: "4",
              reception: "5",
            },
            userName: "Brandon Mango",
            userEmail: null,
            date: new Date(),
          },
          {
            commentText:
              "Wow, what an incredible trip! The sights, sounds, and sensations encountered along the way were truly transformative. From the awe-inspiring landscapes to the rich cultural experiences, every moment was a feast for the senses. The journey pushed boundaries, allowing for personal growth and self-discovery. It's a trip that will forever hold a special place in my heart, reminding me of the immense beauty and diversity our world has to offer. I feel grateful for the memories created and the connections forged during this extraordinary adventure.",
            rating: {
              comfort: "4",
              hospitality: "5",
              hygiene: "4",
              reception: "5",
            },
            userName: "Maren Westervelt",
            userEmail: null,
            date: new Date(),
          },
          {
            commentText: null,
            rating: {
              comfort: "4",
              hospitality: "5",
              hygiene: "4",
              reception: "5",
            },
            userName: "Alice Smith",
            userEmail: null,
            date: new Date("2023-05-16T14:30:00.000Z"),
          },
          {
            commentText: null,
            rating: {
              comfort: "3",
              hospitality: "4",
              hygiene: "3",
              reception: "4",
            },
            userName: "Ethan Johnson",
            userEmail: null,
            date: new Date("2023-05-16T14:30:00.000Z"),
          },
          {
            commentText: null,
            rating: {
              comfort: "5",
              hospitality: "5",
              hygiene: "4",
              reception: "4",
            },
            userName: "Sophia Davis",
            userEmail: null,
            date: new Date("2023-05-16T14:30:00.000Z"),
          },
          {
            commentText: null,
            rating: {
              comfort: "4",
              hospitality: "3",
              hygiene: "4",
              reception: "3",
            },
            userName: "Oliver Wilson",
            userEmail: null,
            date: new Date("2023-05-16T14:30:00.000Z"),
          },
          {
            commentText: null,
            rating: {
              comfort: "5",
              hospitality: "4",
              hygiene: "5",
              reception: "4",
            },
            userName: "Ava Thompson",
            userEmail: null,
            date: new Date("2023-05-16T14:30:00.000Z"),
          },
          {
            commentText: null,
            rating: {
              comfort: "3",
              hospitality: "3",
              hygiene: "4",
              reception: "3",
            },
            userName: "Noah Anderson",
            userEmail: null,
            date: new Date("2023-05-16T14:30:00.000Z"),
          },
          {
            commentText: null,
            rating: {
              comfort: "4",
              hospitality: "5",
              hygiene: "4",
              reception: "5",
            },
            userName: "Emma Brown",
            userEmail: null,
            date: new Date("2023-05-16T14:30:00.000Z"),
          },
          {
            commentText: null,
            rating: {
              comfort: "5",
              hospitality: "5",
              hygiene: "5",
              reception: "4",
            },
            userName: "Liam Taylor",
            userEmail: null,
            date: new Date("2023-05-16T14:30:00.000Z"),
          },
          {
            commentText: null,
            rating: {
              comfort: "5",
              hospitality: "5",
              hygiene: "5",
              reception: "4",
            },
            userName: "Liam Taylor",
            userEmail: null,
            date: new Date("2023-05-16T14:30:00.000Z"),
          },
          {
            commentText: null,
            rating: {
              comfort: "5",
              hospitality: "4",
              hygiene: "5",
              reception: "5",
            },
            userName: "Lucas Martinez",
            userEmail: null,
            date: new Date("2023-05-16T14:30:00.000Z"),
          },
        ],
      },
    };
  },
  methods: {
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

      this.fullTripInfo.tourPlan.forEach((day, index) => {
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

      pdf.save(this.fullTripInfo.name.replace(" ", "") + "Plan");
    },
    scrollToCommentForm() {
      console.log(this.$refs.commentForm);
      this.$refs.commentForm.scrollIntoView({ behavior: "smooth" });
    },
    formattedDate(date) {
      const options = {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };

      return date.toLocaleString("en-US", options);
    },
    validateComent() {
      if (Object.values(this.ratingForm).some((el) => el === null)) {
        this.errorMessage = "Please, rate all services.";
        this.isError = true;
        setTimeout(() => {
          this.isError = false;
          console.log(this.isError);
        }, 5000);
      } else if (!this.commentForm.userName) {
        this.errorMessage = "Please, write your name.";
        this.isError = true;
        setTimeout(() => {
          this.isError = false;
          console.log(this.isError);
        }, 5000);
      }
    },
    addComment() {
      this.validateComent();
      if (!this.isError) {
        let newComment = {
          commentText: this.commentForm.comment
            ? this.commentForm.comment
            : null,
          rating: {
            comfort: this.ratingForm.comfort,
            hospitality: this.ratingForm.hospitality,
            hygiene: this.ratingForm.hygiene,
            reception: this.ratingForm.reception,
          },
          userName: this.commentForm.userName,
          userEmail: this.commentForm.userEmail
            ? this.commentForm.userEmail
            : null,
          date: new Date(),
        };
        this.fullTripInfo.reviews.push(newComment);
        console.log(this.fullTripInfo.reviews);
        // for (var service in this.ratingForm) {
        //   if (Object.hasOwn(this.ratingForm, service)) {
        //     this.ratingForm[service] = null;
        //   }
        // }
      }
    },
  },
  computed: {
    halfMasonryLength() {
      return Math.floor(this.fullTripInfo.gallery.masonryImages.length / 2);
    },
    reviewsWithComment() {
      return this.fullTripInfo.reviews.filter((review) => review.commentText);
    },
    averageRating() {
      let comfortAverageRating =
        this.fullTripInfo.reviews.reduce(
          (accumulator, currentValue) =>
            accumulator + +currentValue.rating.comfort,
          0
        ) / this.fullTripInfo.reviews.length;
      let hospitalityAverageRating =
        this.fullTripInfo.reviews.reduce(
          (accumulator, currentValue) =>
            accumulator + +currentValue.rating.hospitality,
          0
        ) / this.fullTripInfo.reviews.length;
      let hygieneAverageRating =
        this.fullTripInfo.reviews.reduce(
          (accumulator, currentValue) =>
            accumulator + +currentValue.rating.hygiene,
          0
        ) / this.fullTripInfo.reviews.length;
      let receptionAverageRating =
        this.fullTripInfo.reviews.reduce(
          (accumulator, currentValue) =>
            accumulator + +currentValue.rating.reception,
          0
        ) / this.fullTripInfo.reviews.length;
      let overallAverageRating =
        (comfortAverageRating +
          hospitalityAverageRating +
          hygieneAverageRating +
          receptionAverageRating) /
        4;
      const averageRatingObject = {
        comfortAverageRating: comfortAverageRating.toFixed(2),
        hospitalityAverageRating: hospitalityAverageRating.toFixed(2),
        hygieneAverageRating: hygieneAverageRating.toFixed(2),
        receptionAverageRating: receptionAverageRating.toFixed(2),
        overallAverageRating: overallAverageRating.toFixed(2),
      };

      return averageRatingObject;
    },
  },
};
</script>
<style lang="scss">
.trip-page {
  padding-top: 15px;
  p {
    font-size: 16px;
    line-height: 24px;
    font-family: var(--manrope);
    color: var(--black-main);
  }
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
        margin-bottom: -2px;
        &:not(:last-child) {
          .day__number::after {
            content: "";
            position: absolute;
            height: 1000px;
            width: 1px;
            translate: -100% -2px;
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
          width: 37px;
          height: auto;
          stroke-width: 8;
          polygon {
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
    .reviews {
      .error-message {
        position: absolute;
        bottom: -50px;
        left: 50%;
        translate: -50% 0;
        color: var(--error-red);
        font-size: 18px;
        line-height: 20px;
        visibility: hidden;
        opacity: 0;
        transition: all 1s;

        &.visible {
          opacity: 1;
          visibility: visible;
          animation: shake 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) 0.3s both;
          transform: translate3d(0, 0, 0);
        }
      }

      @keyframes shake {
        10%,
        90% {
          transform: translate3d(-1px, 0, 0);
        }

        20%,
        80% {
          transform: translate3d(2px, 0, 0);
        }

        30%,
        50%,
        70% {
          transform: translate3d(-4px, 0, 0);
        }

        40%,
        60% {
          transform: translate3d(4px, 0, 0);
        }
      }
      .rating {
        display: flex;
        flex-direction: column;
        &__title,
        &__value {
          font-family: var(--manrope);
          color: var(--gray);
        }
        &__title {
          order: 3;
        }
        &__value {
          display: none;
        }
        &__rhombuses {
          margin: 0 0 15px 0;
        }
        svg.filled {
          fill: var(--gray);
        }
        svg {
          polygon {
            stroke: var(--gray);
          }
        }
      }
      .to-comment-form {
        margin-bottom: 40px;
      }
      &__statistics {
        display: flex;
        flex-wrap: wrap;
        gap: 30px;
        margin-bottom: 40px;
        .rating {
          flex: 1 1 calc(50% - 30px);
          svg.filled {
            fill: var(--gray);
          }
          svg {
            height: 30px;
            polygon {
              stroke: var(--gray);
            }
          }
          &__overall {
            flex-direction: row;
            align-items: center;
            justify-content: center;
            flex: 1 1 100%;
            gap: 24px;
            .rating {
              &__value,
              &__title {
                flex: 0 1 100px;
              }
              &__value {
                display: block;
                font-size: 55px;
                line-height: 75px;
              }
              &__rhombuses {
                margin: 0;
              }
            }
          }
        }
      }

      &__comments {
        margin-bottom: 60px;
        .comment {
          background-color: rgba(226, 211, 206, 0.2);
          margin: 0 -25px 20px -25px;
          padding: 28px 32px;
          border-radius: 10px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 25px;
          &:last-child {
            margin-bottom: 0px;
          }
          &__text,
          &__user-name,
          &__date {
            font-family: var(--manrope);
            color: var(--black-secondary);
          }
          &__text {
            line-height: 24px;
          }
          &__user-name {
            font-size: 16px;
            line-height: 15px;
            font-weight: 500;
            margin-bottom: 1px;
          }

          &__date {
            font-size: 14px;
            line-height: 13px;
            font-weight: 300;
          }
          &__info {
          }
          .rating {
            &__services {
              display: flex;
              justify-content: space-evenly;
            }
            svg {
              height: 17px;
            }
            &__title {
              font-weight: 500;
              font-size: 12px;
              line-height: 16px;
            }
          }
        }
      }

      &__post-review {
        .post-review-form {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          position: relative;
          .comment-form {
            .input:not(:last-child) {
              margin-bottom: 10px;
            }
          }
          .rating-form {
            display: grid;
            grid-template-columns: 1fr 1fr;
            justify-items: center;
            gap: 20px;
            margin-bottom: 20px;
          }
        }
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
    p {
      font-size: 18px;
      line-height: 36px;
    }
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
            width: 65px;
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
            .column {
              display: flex;
              flex-direction: column;
              flex: 1 1 50%;
              &:nth-child(1) {
                margin-right: 25px;
              }
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
      .reviews {
        .to-comment-form {
          max-width: 215px;
          margin: 0 auto 60px auto;
        }
        &__statistics {
          padding: 0 clamp(60px, 7vw, 100px);
          flex-wrap: nowrap;
          margin-bottom: 60px;

          .rating {
            flex: 1 1 auto;
            .rating {
              &__rhombuses {
                margin-bottom: 20px;
              }
            }
            &__overall {
              flex: 2 1 auto;
              flex-wrap: wrap;
              justify-content: flex-start;
              gap: 20px;
              .rating {
                &__title {
                  flex: 1 1 100%;
                  text-align: left;
                }
                &__value {
                  order: 2;
                  flex: initial;
                }
                &__rhombuses {
                  margin-bottom: 0px;
                }
              }
            }
          }
        }

        &__comments {
          .comment {
            grid-template-columns: 2fr 1fr;
            gap: 25px clamp(30px, 4vw, 50px);
            padding: 50px clamp(30px, 5vw, 60px) 30px clamp(30px, 5vw, 60px);
            margin: 0px 0px 20px 0;
            &__text {
              line-height: 30px;
            }
            &__info {
              order: 3;
            }
            &__user-name {
              font-size: 18px;
              line-height: 17px;
              margin-bottom: 6px;
            }
            .rating {
              &__services {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                justify-content: initial;
              }
            }
          }
        }

        &__post-review {
          .post-review-form {
            grid-template-columns: 2fr 1fr;
            gap: 80px 40px;
            button {
              grid-area: 2 / 1 / 3 / 3;
            }
            .comment-form {
              display: flex;
              flex-direction: column;
              .input:not(:last-child) {
                margin-bottom: 20px;
              }
              textarea {
                flex: 1 1 auto;
              }
            }
            .rating-form {
              margin-bottom: 00px;
            }
          }
        }
      }
    }
  }
}
@media (min-width: 1200px) {
  .trip-page {
    .tab {
      .reviews {
        &__comments {
          .comment {
            .rating {
              &__services {
                height: fit-content;
                grid-template-columns: 1fr 1fr 1fr 1fr;
              }
            }
          }
        }
      }
    }
  }
}
</style>
