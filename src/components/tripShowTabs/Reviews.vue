<template>
  <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent
      @click="scrollToCommentForm"
      class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        :title="`${reviewsAmount} reviews`"></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"></RatingComponent>
    </div>
    <div class="reviews__comments">
      <div
        class="comment"
        v-for="(reviews, index) in reviewsWithCommentArray"
        :key="index">
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled></RatingComponent>
        </div>
      </div>
    </div>
    <Transition
      name="slide-up"
      mode="out-in">
      <div
        ref="commentForm"
        class="reviews__post-review"
        v-if="!reviewSent">
        <h3>Post a Review</h3>
        <form
          @submit="addComment"
          class="post-review-form">
          <div class="comment-form">
            <Input
              v-model="commentForm.userName"
              type="text"
              placeholder="Name"></Input>
            <Input
              v-model="commentForm.userEmail"
              type="email"
              placeholder="Email"></Input>
            <Input
              v-model="commentForm.comment"
              type="textarea"
              placeholder="Comment"></Input>
          </div>
          <div class="rating-form">
            <RatingComponent
              :rating="ratingForm.comfort"
              @select-grade="(n) => (ratingForm.comfort = n)"
              title="Comfort"></RatingComponent>
            <RatingComponent
              :rating="ratingForm.hospitality"
              @select-grade="(n) => (ratingForm.hospitality = n)"
              title="Hospitality"></RatingComponent>
            <RatingComponent
              :rating="ratingForm.hygiene"
              @select-grade="(n) => (ratingForm.hygiene = n)"
              title="Hygiene"></RatingComponent>
            <RatingComponent
              :rating="ratingForm.reception"
              @select-grade="(n) => (ratingForm.reception = n)"
              title="Reception"></RatingComponent>
          </div>

          <ButtonBlack @click.prevent="addComment">
            <CrownDecoration></CrownDecoration>
            <span>Post review</span></ButtonBlack
          >
          <ErrorMessage
            :error="error"
            :errorMessage="errorMessage"></ErrorMessage>
        </form>
      </div>
      <div
        v-else
        class="reviews__thanks-block">
        <h2>Your review is sent</h2>
        <h2>Thank you for your time</h2>
      </div>
    </Transition>
  </div>
</template>
<script>
import RatingComponent from "@/components/formComponents/RatingComponent.vue";
import ButtonTransparent from "@/components/formComponents/ButtonTransparent.vue";
import ButtonBlack from "@/components/formComponents/ButtonBlack.vue";
import CrownDecoration from "@/components/CrownDecoration.vue";
import Input from "@/components/formComponents/Input.vue";
import ErrorMessage from "@/components/formComponents/ErrorMessage.vue";

export default {
  name: "ReviewTab",
  data() {
    return {
      errorMessage: null,
      error: false,
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
    };
  },
  components: {
    RatingComponent,
    ButtonBlack,
    ButtonTransparent,
    CrownDecoration,
    Input,
    ErrorMessage,
  },
  methods: {
    isValidDate(date) {
      return (
        date &&
        Object.prototype.toString.call(date) === "[object Date]" &&
        !isNaN(date)
      );
    },
    formattedDate(date) {
      if ("seconds" in date) {
        date = new Date(date.seconds * 1000);
      }

      if (this.isValidDate(date)) {
        const options = {
          month: "short",
          day: "2-digit",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        };

        return date.toLocaleString("en-US", options);
      }
    },
    scrollToCommentForm() {
      this.$refs.commentForm.scrollIntoView({ behavior: "smooth" });
    },
    addComment() {
      this.validateComent();
      if (!this.error) {
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

        this.$emit("addComment", newComment);
      }
    },
    validateComent() {
      this.error = false;
      if (Object.values(this.ratingForm).some((el) => el === null)) {
        this.errorMessage = "Please, rate all services.";
        this.error = true;
        setTimeout(() => {
          this.error = false;
          console.log(this.error);
        }, 5000);
      } else if (!this.commentForm.userName) {
        this.errorMessage = "Please, write your name.";
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 5000);
      }
    },
  },
  props: {
    averageRating: { type: [Object, Array, Number], require: true },
    reviewsWithCommentArray: {
      type: [Object, Array, Number],
      require: true,
    },
    reviewsAmount: { type: Number, require: true },
    reviewSent: { type: Boolean, require: true },
  },
  emits: ["addComment"],
};
</script>
<style lang="scss">
.reviews {
  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: all 0.5s ease-out;
  }

  .slide-up-enter-from {
    opacity: 0;
    transform: translateY(100px);
  }

  .slide-up-leave-to {
    opacity: 0;
    // height: 200px;
    transform: translateY(-100px);
  }
  &__thanks-block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 250px;
  }
  .rating {
    display: flex;
    flex-direction: column;
    &__title,
    &__value {
      font-family: var(--manrope);
      color: var(--grey);
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
      fill: var(--grey);
    }
    svg {
      path {
        stroke: var(--grey);
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
        fill: var(--grey);
      }
      svg {
        height: 30px;
        path {
          stroke: var(--grey);
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
        .input-component:not(:last-child) {
          margin-bottom: 20px;
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
@media (min-width: 768px) {
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
@media (min-width: 1200px) {
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
</style>
