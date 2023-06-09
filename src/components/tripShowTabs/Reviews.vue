<template>
  <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent @click="scrollToCommentForm" class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        title="35 reviews"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"
      ></RatingComponent>
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled
          ></RatingComponent>
        </div>
      </div>
    </div>
    <div ref="commentForm" class="reviews__post-review">
      <h3>Post a Review</h3>
      <form class="post-review-form">
        <div class="comment-form">
          <Input
            v-model="commentForm.userName"
            type="text"
            placeholder="Name"
          ></Input>
          <Input
            v-model="commentForm.userEmail"
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            v-model="commentForm.comment"
            type="textarea"
            placeholder="Comment"
          ></Input>
        </div>
        <div class="rating-form">
          <RatingComponent
            :rating="ratingForm.comfort"
            @select-grade="(n) => (ratingForm.comfort = n)"
            title="Comfort"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hospitality"
            @select-grade="(n) => (ratingForm.hospitality = n)"
            title="Hospitality"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hygiene"
            @select-grade="(n) => (ratingForm.hygiene = n)"
            title="Hygiene"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.reception"
            @select-grade="(n) => (ratingForm.reception = n)"
            title="Reception"
          ></RatingComponent>
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
  <!-- <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent @click="scrollToCommentForm" class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        title="35 reviews"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"
      ></RatingComponent>
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled
          ></RatingComponent>
        </div>
      </div>
    </div>
    <div ref="commentForm" class="reviews__post-review">
      <h3>Post a Review</h3>
      <form class="post-review-form">
        <div class="comment-form">
          <Input
            v-model="commentForm.userName"
            type="text"
            placeholder="Name"
          ></Input>
          <Input
            v-model="commentForm.userEmail"
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            v-model="commentForm.comment"
            type="textarea"
            placeholder="Comment"
          ></Input>
        </div>
        <div class="rating-form">
          <RatingComponent
            :rating="ratingForm.comfort"
            @select-grade="(n) => (ratingForm.comfort = n)"
            title="Comfort"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hospitality"
            @select-grade="(n) => (ratingForm.hospitality = n)"
            title="Hospitality"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hygiene"
            @select-grade="(n) => (ratingForm.hygiene = n)"
            title="Hygiene"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.reception"
            @select-grade="(n) => (ratingForm.reception = n)"
            title="Reception"
          ></RatingComponent>
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
  <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent @click="scrollToCommentForm" class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        title="35 reviews"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"
      ></RatingComponent>
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled
          ></RatingComponent>
        </div>
      </div>
    </div>
    <div ref="commentForm" class="reviews__post-review">
      <h3>Post a Review</h3>
      <form class="post-review-form">
        <div class="comment-form">
          <Input
            v-model="commentForm.userName"
            type="text"
            placeholder="Name"
          ></Input>
          <Input
            v-model="commentForm.userEmail"
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            v-model="commentForm.comment"
            type="textarea"
            placeholder="Comment"
          ></Input>
        </div>
        <div class="rating-form">
          <RatingComponent
            :rating="ratingForm.comfort"
            @select-grade="(n) => (ratingForm.comfort = n)"
            title="Comfort"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hospitality"
            @select-grade="(n) => (ratingForm.hospitality = n)"
            title="Hospitality"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hygiene"
            @select-grade="(n) => (ratingForm.hygiene = n)"
            title="Hygiene"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.reception"
            @select-grade="(n) => (ratingForm.reception = n)"
            title="Reception"
          ></RatingComponent>
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
  <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent @click="scrollToCommentForm" class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        title="35 reviews"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"
      ></RatingComponent>
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled
          ></RatingComponent>
        </div>
      </div>
    </div>
    <div ref="commentForm" class="reviews__post-review">
      <h3>Post a Review</h3>
      <form class="post-review-form">
        <div class="comment-form">
          <Input
            v-model="commentForm.userName"
            type="text"
            placeholder="Name"
          ></Input>
          <Input
            v-model="commentForm.userEmail"
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            v-model="commentForm.comment"
            type="textarea"
            placeholder="Comment"
          ></Input>
        </div>
        <div class="rating-form">
          <RatingComponent
            :rating="ratingForm.comfort"
            @select-grade="(n) => (ratingForm.comfort = n)"
            title="Comfort"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hospitality"
            @select-grade="(n) => (ratingForm.hospitality = n)"
            title="Hospitality"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hygiene"
            @select-grade="(n) => (ratingForm.hygiene = n)"
            title="Hygiene"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.reception"
            @select-grade="(n) => (ratingForm.reception = n)"
            title="Reception"
          ></RatingComponent>
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
  <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent @click="scrollToCommentForm" class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        title="35 reviews"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"
      ></RatingComponent>
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled
          ></RatingComponent>
        </div>
      </div>
    </div>
    <div ref="commentForm" class="reviews__post-review">
      <h3>Post a Review</h3>
      <form class="post-review-form">
        <div class="comment-form">
          <Input
            v-model="commentForm.userName"
            type="text"
            placeholder="Name"
          ></Input>
          <Input
            v-model="commentForm.userEmail"
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            v-model="commentForm.comment"
            type="textarea"
            placeholder="Comment"
          ></Input>
        </div>
        <div class="rating-form">
          <RatingComponent
            :rating="ratingForm.comfort"
            @select-grade="(n) => (ratingForm.comfort = n)"
            title="Comfort"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hospitality"
            @select-grade="(n) => (ratingForm.hospitality = n)"
            title="Hospitality"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hygiene"
            @select-grade="(n) => (ratingForm.hygiene = n)"
            title="Hygiene"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.reception"
            @select-grade="(n) => (ratingForm.reception = n)"
            title="Reception"
          ></RatingComponent>
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
  <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent @click="scrollToCommentForm" class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        title="35 reviews"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"
      ></RatingComponent>
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled
          ></RatingComponent>
        </div>
      </div>
    </div>
    <div ref="commentForm" class="reviews__post-review">
      <h3>Post a Review</h3>
      <form class="post-review-form">
        <div class="comment-form">
          <Input
            v-model="commentForm.userName"
            type="text"
            placeholder="Name"
          ></Input>
          <Input
            v-model="commentForm.userEmail"
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            v-model="commentForm.comment"
            type="textarea"
            placeholder="Comment"
          ></Input>
        </div>
        <div class="rating-form">
          <RatingComponent
            :rating="ratingForm.comfort"
            @select-grade="(n) => (ratingForm.comfort = n)"
            title="Comfort"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hospitality"
            @select-grade="(n) => (ratingForm.hospitality = n)"
            title="Hospitality"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hygiene"
            @select-grade="(n) => (ratingForm.hygiene = n)"
            title="Hygiene"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.reception"
            @select-grade="(n) => (ratingForm.reception = n)"
            title="Reception"
          ></RatingComponent>
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
  <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent @click="scrollToCommentForm" class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        title="35 reviews"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"
      ></RatingComponent>
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled
          ></RatingComponent>
        </div>
      </div>
    </div>
    <div ref="commentForm" class="reviews__post-review">
      <h3>Post a Review</h3>
      <form class="post-review-form">
        <div class="comment-form">
          <Input
            v-model="commentForm.userName"
            type="text"
            placeholder="Name"
          ></Input>
          <Input
            v-model="commentForm.userEmail"
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            v-model="commentForm.comment"
            type="textarea"
            placeholder="Comment"
          ></Input>
        </div>
        <div class="rating-form">
          <RatingComponent
            :rating="ratingForm.comfort"
            @select-grade="(n) => (ratingForm.comfort = n)"
            title="Comfort"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hospitality"
            @select-grade="(n) => (ratingForm.hospitality = n)"
            title="Hospitality"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hygiene"
            @select-grade="(n) => (ratingForm.hygiene = n)"
            title="Hygiene"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.reception"
            @select-grade="(n) => (ratingForm.reception = n)"
            title="Reception"
          ></RatingComponent>
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
  <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent @click="scrollToCommentForm" class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        title="35 reviews"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"
      ></RatingComponent>
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled
          ></RatingComponent>
        </div>
      </div>
    </div>
    <div ref="commentForm" class="reviews__post-review">
      <h3>Post a Review</h3>
      <form class="post-review-form">
        <div class="comment-form">
          <Input
            v-model="commentForm.userName"
            type="text"
            placeholder="Name"
          ></Input>
          <Input
            v-model="commentForm.userEmail"
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            v-model="commentForm.comment"
            type="textarea"
            placeholder="Comment"
          ></Input>
        </div>
        <div class="rating-form">
          <RatingComponent
            :rating="ratingForm.comfort"
            @select-grade="(n) => (ratingForm.comfort = n)"
            title="Comfort"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hospitality"
            @select-grade="(n) => (ratingForm.hospitality = n)"
            title="Hospitality"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hygiene"
            @select-grade="(n) => (ratingForm.hygiene = n)"
            title="Hygiene"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.reception"
            @select-grade="(n) => (ratingForm.reception = n)"
            title="Reception"
          ></RatingComponent>
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
  <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent @click="scrollToCommentForm" class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        title="35 reviews"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"
      ></RatingComponent>
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled
          ></RatingComponent>
        </div>
      </div>
    </div>
    <div ref="commentForm" class="reviews__post-review">
      <h3>Post a Review</h3>
      <form class="post-review-form">
        <div class="comment-form">
          <Input
            v-model="commentForm.userName"
            type="text"
            placeholder="Name"
          ></Input>
          <Input
            v-model="commentForm.userEmail"
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            v-model="commentForm.comment"
            type="textarea"
            placeholder="Comment"
          ></Input>
        </div>
        <div class="rating-form">
          <RatingComponent
            :rating="ratingForm.comfort"
            @select-grade="(n) => (ratingForm.comfort = n)"
            title="Comfort"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hospitality"
            @select-grade="(n) => (ratingForm.hospitality = n)"
            title="Hospitality"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hygiene"
            @select-grade="(n) => (ratingForm.hygiene = n)"
            title="Hygiene"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.reception"
            @select-grade="(n) => (ratingForm.reception = n)"
            title="Reception"
          ></RatingComponent>
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
  <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent @click="scrollToCommentForm" class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        title="35 reviews"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"
      ></RatingComponent>
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled
          ></RatingComponent>
        </div>
      </div>
    </div>
    <div ref="commentForm" class="reviews__post-review">
      <h3>Post a Review</h3>
      <form class="post-review-form">
        <div class="comment-form">
          <Input
            v-model="commentForm.userName"
            type="text"
            placeholder="Name"
          ></Input>
          <Input
            v-model="commentForm.userEmail"
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            v-model="commentForm.comment"
            type="textarea"
            placeholder="Comment"
          ></Input>
        </div>
        <div class="rating-form">
          <RatingComponent
            :rating="ratingForm.comfort"
            @select-grade="(n) => (ratingForm.comfort = n)"
            title="Comfort"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hospitality"
            @select-grade="(n) => (ratingForm.hospitality = n)"
            title="Hospitality"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hygiene"
            @select-grade="(n) => (ratingForm.hygiene = n)"
            title="Hygiene"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.reception"
            @select-grade="(n) => (ratingForm.reception = n)"
            title="Reception"
          ></RatingComponent>
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
  <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent @click="scrollToCommentForm" class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        title="35 reviews"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"
      ></RatingComponent>
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled
          ></RatingComponent>
        </div>
      </div>
    </div>
    <div ref="commentForm" class="reviews__post-review">
      <h3>Post a Review</h3>
      <form class="post-review-form">
        <div class="comment-form">
          <Input
            v-model="commentForm.userName"
            type="text"
            placeholder="Name"
          ></Input>
          <Input
            v-model="commentForm.userEmail"
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            v-model="commentForm.comment"
            type="textarea"
            placeholder="Comment"
          ></Input>
        </div>
        <div class="rating-form">
          <RatingComponent
            :rating="ratingForm.comfort"
            @select-grade="(n) => (ratingForm.comfort = n)"
            title="Comfort"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hospitality"
            @select-grade="(n) => (ratingForm.hospitality = n)"
            title="Hospitality"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hygiene"
            @select-grade="(n) => (ratingForm.hygiene = n)"
            title="Hygiene"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.reception"
            @select-grade="(n) => (ratingForm.reception = n)"
            title="Reception"
          ></RatingComponent>
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
  <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent @click="scrollToCommentForm" class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        title="35 reviews"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"
      ></RatingComponent>
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled
          ></RatingComponent>
        </div>
      </div>
    </div>
    <div ref="commentForm" class="reviews__post-review">
      <h3>Post a Review</h3>
      <form class="post-review-form">
        <div class="comment-form">
          <Input
            v-model="commentForm.userName"
            type="text"
            placeholder="Name"
          ></Input>
          <Input
            v-model="commentForm.userEmail"
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            v-model="commentForm.comment"
            type="textarea"
            placeholder="Comment"
          ></Input>
        </div>
        <div class="rating-form">
          <RatingComponent
            :rating="ratingForm.comfort"
            @select-grade="(n) => (ratingForm.comfort = n)"
            title="Comfort"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hospitality"
            @select-grade="(n) => (ratingForm.hospitality = n)"
            title="Hospitality"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hygiene"
            @select-grade="(n) => (ratingForm.hygiene = n)"
            title="Hygiene"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.reception"
            @select-grade="(n) => (ratingForm.reception = n)"
            title="Reception"
          ></RatingComponent>
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
  <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent @click="scrollToCommentForm" class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        title="35 reviews"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"
      ></RatingComponent>
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled
          ></RatingComponent>
        </div>
      </div>
    </div>
    <div ref="commentForm" class="reviews__post-review">
      <h3>Post a Review</h3>
      <form class="post-review-form">
        <div class="comment-form">
          <Input
            v-model="commentForm.userName"
            type="text"
            placeholder="Name"
          ></Input>
          <Input
            v-model="commentForm.userEmail"
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            v-model="commentForm.comment"
            type="textarea"
            placeholder="Comment"
          ></Input>
        </div>
        <div class="rating-form">
          <RatingComponent
            :rating="ratingForm.comfort"
            @select-grade="(n) => (ratingForm.comfort = n)"
            title="Comfort"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hospitality"
            @select-grade="(n) => (ratingForm.hospitality = n)"
            title="Hospitality"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hygiene"
            @select-grade="(n) => (ratingForm.hygiene = n)"
            title="Hygiene"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.reception"
            @select-grade="(n) => (ratingForm.reception = n)"
            title="Reception"
          ></RatingComponent>
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
  <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent @click="scrollToCommentForm" class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        title="35 reviews"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"
      ></RatingComponent>
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled
          ></RatingComponent>
        </div>
      </div>
    </div>
    <div ref="commentForm" class="reviews__post-review">
      <h3>Post a Review</h3>
      <form class="post-review-form">
        <div class="comment-form">
          <Input
            v-model="commentForm.userName"
            type="text"
            placeholder="Name"
          ></Input>
          <Input
            v-model="commentForm.userEmail"
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            v-model="commentForm.comment"
            type="textarea"
            placeholder="Comment"
          ></Input>
        </div>
        <div class="rating-form">
          <RatingComponent
            :rating="ratingForm.comfort"
            @select-grade="(n) => (ratingForm.comfort = n)"
            title="Comfort"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hospitality"
            @select-grade="(n) => (ratingForm.hospitality = n)"
            title="Hospitality"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hygiene"
            @select-grade="(n) => (ratingForm.hygiene = n)"
            title="Hygiene"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.reception"
            @select-grade="(n) => (ratingForm.reception = n)"
            title="Reception"
          ></RatingComponent>
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
  <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent @click="scrollToCommentForm" class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        title="35 reviews"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"
      ></RatingComponent>
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled
          ></RatingComponent>
        </div>
      </div>
    </div>
    <div ref="commentForm" class="reviews__post-review">
      <h3>Post a Review</h3>
      <form class="post-review-form">
        <div class="comment-form">
          <Input
            v-model="commentForm.userName"
            type="text"
            placeholder="Name"
          ></Input>
          <Input
            v-model="commentForm.userEmail"
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            v-model="commentForm.comment"
            type="textarea"
            placeholder="Comment"
          ></Input>
        </div>
        <div class="rating-form">
          <RatingComponent
            :rating="ratingForm.comfort"
            @select-grade="(n) => (ratingForm.comfort = n)"
            title="Comfort"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hospitality"
            @select-grade="(n) => (ratingForm.hospitality = n)"
            title="Hospitality"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hygiene"
            @select-grade="(n) => (ratingForm.hygiene = n)"
            title="Hygiene"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.reception"
            @select-grade="(n) => (ratingForm.reception = n)"
            title="Reception"
          ></RatingComponent>
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
  <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent @click="scrollToCommentForm" class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        title="35 reviews"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"
      ></RatingComponent>
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled
          ></RatingComponent>
        </div>
      </div>
    </div>
    <div ref="commentForm" class="reviews__post-review">
      <h3>Post a Review</h3>
      <form class="post-review-form">
        <div class="comment-form">
          <Input
            v-model="commentForm.userName"
            type="text"
            placeholder="Name"
          ></Input>
          <Input
            v-model="commentForm.userEmail"
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            v-model="commentForm.comment"
            type="textarea"
            placeholder="Comment"
          ></Input>
        </div>
        <div class="rating-form">
          <RatingComponent
            :rating="ratingForm.comfort"
            @select-grade="(n) => (ratingForm.comfort = n)"
            title="Comfort"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hospitality"
            @select-grade="(n) => (ratingForm.hospitality = n)"
            title="Hospitality"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hygiene"
            @select-grade="(n) => (ratingForm.hygiene = n)"
            title="Hygiene"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.reception"
            @select-grade="(n) => (ratingForm.reception = n)"
            title="Reception"
          ></RatingComponent>
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
  <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent @click="scrollToCommentForm" class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        title="35 reviews"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"
      ></RatingComponent>
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled
          ></RatingComponent>
        </div>
      </div>
    </div>
    <div ref="commentForm" class="reviews__post-review">
      <h3>Post a Review</h3>
      <form class="post-review-form">
        <div class="comment-form">
          <Input
            v-model="commentForm.userName"
            type="text"
            placeholder="Name"
          ></Input>
          <Input
            v-model="commentForm.userEmail"
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            v-model="commentForm.comment"
            type="textarea"
            placeholder="Comment"
          ></Input>
        </div>
        <div class="rating-form">
          <RatingComponent
            :rating="ratingForm.comfort"
            @select-grade="(n) => (ratingForm.comfort = n)"
            title="Comfort"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hospitality"
            @select-grade="(n) => (ratingForm.hospitality = n)"
            title="Hospitality"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hygiene"
            @select-grade="(n) => (ratingForm.hygiene = n)"
            title="Hygiene"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.reception"
            @select-grade="(n) => (ratingForm.reception = n)"
            title="Reception"
          ></RatingComponent>
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
  <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent @click="scrollToCommentForm" class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        title="35 reviews"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"
      ></RatingComponent>
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled
          ></RatingComponent>
        </div>
      </div>
    </div>
    <div ref="commentForm" class="reviews__post-review">
      <h3>Post a Review</h3>
      <form class="post-review-form">
        <div class="comment-form">
          <Input
            v-model="commentForm.userName"
            type="text"
            placeholder="Name"
          ></Input>
          <Input
            v-model="commentForm.userEmail"
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            v-model="commentForm.comment"
            type="textarea"
            placeholder="Comment"
          ></Input>
        </div>
        <div class="rating-form">
          <RatingComponent
            :rating="ratingForm.comfort"
            @select-grade="(n) => (ratingForm.comfort = n)"
            title="Comfort"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hospitality"
            @select-grade="(n) => (ratingForm.hospitality = n)"
            title="Hospitality"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hygiene"
            @select-grade="(n) => (ratingForm.hygiene = n)"
            title="Hygiene"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.reception"
            @select-grade="(n) => (ratingForm.reception = n)"
            title="Reception"
          ></RatingComponent>
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
  <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent @click="scrollToCommentForm" class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        title="35 reviews"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"
      ></RatingComponent>
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled
          ></RatingComponent>
        </div>
      </div>
    </div>
    <div ref="commentForm" class="reviews__post-review">
      <h3>Post a Review</h3>
      <form class="post-review-form">
        <div class="comment-form">
          <Input
            v-model="commentForm.userName"
            type="text"
            placeholder="Name"
          ></Input>
          <Input
            v-model="commentForm.userEmail"
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            v-model="commentForm.comment"
            type="textarea"
            placeholder="Comment"
          ></Input>
        </div>
        <div class="rating-form">
          <RatingComponent
            :rating="ratingForm.comfort"
            @select-grade="(n) => (ratingForm.comfort = n)"
            title="Comfort"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hospitality"
            @select-grade="(n) => (ratingForm.hospitality = n)"
            title="Hospitality"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hygiene"
            @select-grade="(n) => (ratingForm.hygiene = n)"
            title="Hygiene"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.reception"
            @select-grade="(n) => (ratingForm.reception = n)"
            title="Reception"
          ></RatingComponent>
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
  <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent @click="scrollToCommentForm" class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        title="35 reviews"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"
      ></RatingComponent>
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled
          ></RatingComponent>
        </div>
      </div>
    </div>
    <div ref="commentForm" class="reviews__post-review">
      <h3>Post a Review</h3>
      <form class="post-review-form">
        <div class="comment-form">
          <Input
            v-model="commentForm.userName"
            type="text"
            placeholder="Name"
          ></Input>
          <Input
            v-model="commentForm.userEmail"
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            v-model="commentForm.comment"
            type="textarea"
            placeholder="Comment"
          ></Input>
        </div>
        <div class="rating-form">
          <RatingComponent
            :rating="ratingForm.comfort"
            @select-grade="(n) => (ratingForm.comfort = n)"
            title="Comfort"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hospitality"
            @select-grade="(n) => (ratingForm.hospitality = n)"
            title="Hospitality"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hygiene"
            @select-grade="(n) => (ratingForm.hygiene = n)"
            title="Hygiene"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.reception"
            @select-grade="(n) => (ratingForm.reception = n)"
            title="Reception"
          ></RatingComponent>
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
  <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent @click="scrollToCommentForm" class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        title="35 reviews"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"
      ></RatingComponent>
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled
          ></RatingComponent>
        </div>
      </div>
    </div>
    <div ref="commentForm" class="reviews__post-review">
      <h3>Post a Review</h3>
      <form class="post-review-form">
        <div class="comment-form">
          <Input
            v-model="commentForm.userName"
            type="text"
            placeholder="Name"
          ></Input>
          <Input
            v-model="commentForm.userEmail"
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            v-model="commentForm.comment"
            type="textarea"
            placeholder="Comment"
          ></Input>
        </div>
        <div class="rating-form">
          <RatingComponent
            :rating="ratingForm.comfort"
            @select-grade="(n) => (ratingForm.comfort = n)"
            title="Comfort"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hospitality"
            @select-grade="(n) => (ratingForm.hospitality = n)"
            title="Hospitality"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hygiene"
            @select-grade="(n) => (ratingForm.hygiene = n)"
            title="Hygiene"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.reception"
            @select-grade="(n) => (ratingForm.reception = n)"
            title="Reception"
          ></RatingComponent>
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
  <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent @click="scrollToCommentForm" class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        title="35 reviews"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"
      ></RatingComponent>
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled
          ></RatingComponent>
        </div>
      </div>
    </div>
    <div ref="commentForm" class="reviews__post-review">
      <h3>Post a Review</h3>
      <form class="post-review-form">
        <div class="comment-form">
          <Input
            v-model="commentForm.userName"
            type="text"
            placeholder="Name"
          ></Input>
          <Input
            v-model="commentForm.userEmail"
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            v-model="commentForm.comment"
            type="textarea"
            placeholder="Comment"
          ></Input>
        </div>
        <div class="rating-form">
          <RatingComponent
            :rating="ratingForm.comfort"
            @select-grade="(n) => (ratingForm.comfort = n)"
            title="Comfort"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hospitality"
            @select-grade="(n) => (ratingForm.hospitality = n)"
            title="Hospitality"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hygiene"
            @select-grade="(n) => (ratingForm.hygiene = n)"
            title="Hygiene"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.reception"
            @select-grade="(n) => (ratingForm.reception = n)"
            title="Reception"
          ></RatingComponent>
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
  <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent @click="scrollToCommentForm" class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        title="35 reviews"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"
      ></RatingComponent>
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled
          ></RatingComponent>
        </div>
      </div>
    </div>
    <div ref="commentForm" class="reviews__post-review">
      <h3>Post a Review</h3>
      <form class="post-review-form">
        <div class="comment-form">
          <Input
            v-model="commentForm.userName"
            type="text"
            placeholder="Name"
          ></Input>
          <Input
            v-model="commentForm.userEmail"
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            v-model="commentForm.comment"
            type="textarea"
            placeholder="Comment"
          ></Input>
        </div>
        <div class="rating-form">
          <RatingComponent
            :rating="ratingForm.comfort"
            @select-grade="(n) => (ratingForm.comfort = n)"
            title="Comfort"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hospitality"
            @select-grade="(n) => (ratingForm.hospitality = n)"
            title="Hospitality"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hygiene"
            @select-grade="(n) => (ratingForm.hygiene = n)"
            title="Hygiene"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.reception"
            @select-grade="(n) => (ratingForm.reception = n)"
            title="Reception"
          ></RatingComponent>
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
  <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent @click="scrollToCommentForm" class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        title="35 reviews"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"
      ></RatingComponent>
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled
          ></RatingComponent>
        </div>
      </div>
    </div>
    <div ref="commentForm" class="reviews__post-review">
      <h3>Post a Review</h3>
      <form class="post-review-form">
        <div class="comment-form">
          <Input
            v-model="commentForm.userName"
            type="text"
            placeholder="Name"
          ></Input>
          <Input
            v-model="commentForm.userEmail"
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            v-model="commentForm.comment"
            type="textarea"
            placeholder="Comment"
          ></Input>
        </div>
        <div class="rating-form">
          <RatingComponent
            :rating="ratingForm.comfort"
            @select-grade="(n) => (ratingForm.comfort = n)"
            title="Comfort"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hospitality"
            @select-grade="(n) => (ratingForm.hospitality = n)"
            title="Hospitality"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hygiene"
            @select-grade="(n) => (ratingForm.hygiene = n)"
            title="Hygiene"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.reception"
            @select-grade="(n) => (ratingForm.reception = n)"
            title="Reception"
          ></RatingComponent>
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
  <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent @click="scrollToCommentForm" class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        title="35 reviews"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"
      ></RatingComponent>
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled
          ></RatingComponent>
        </div>
      </div>
    </div>
    <div ref="commentForm" class="reviews__post-review">
      <h3>Post a Review</h3>
      <form class="post-review-form">
        <div class="comment-form">
          <Input
            v-model="commentForm.userName"
            type="text"
            placeholder="Name"
          ></Input>
          <Input
            v-model="commentForm.userEmail"
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            v-model="commentForm.comment"
            type="textarea"
            placeholder="Comment"
          ></Input>
        </div>
        <div class="rating-form">
          <RatingComponent
            :rating="ratingForm.comfort"
            @select-grade="(n) => (ratingForm.comfort = n)"
            title="Comfort"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hospitality"
            @select-grade="(n) => (ratingForm.hospitality = n)"
            title="Hospitality"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hygiene"
            @select-grade="(n) => (ratingForm.hygiene = n)"
            title="Hygiene"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.reception"
            @select-grade="(n) => (ratingForm.reception = n)"
            title="Reception"
          ></RatingComponent>
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
  <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent @click="scrollToCommentForm" class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        title="35 reviews"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"
      ></RatingComponent>
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled
          ></RatingComponent>
        </div>
      </div>
    </div>
    <div ref="commentForm" class="reviews__post-review">
      <h3>Post a Review</h3>
      <form class="post-review-form">
        <div class="comment-form">
          <Input
            v-model="commentForm.userName"
            type="text"
            placeholder="Name"
          ></Input>
          <Input
            v-model="commentForm.userEmail"
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            v-model="commentForm.comment"
            type="textarea"
            placeholder="Comment"
          ></Input>
        </div>
        <div class="rating-form">
          <RatingComponent
            :rating="ratingForm.comfort"
            @select-grade="(n) => (ratingForm.comfort = n)"
            title="Comfort"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hospitality"
            @select-grade="(n) => (ratingForm.hospitality = n)"
            title="Hospitality"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hygiene"
            @select-grade="(n) => (ratingForm.hygiene = n)"
            title="Hygiene"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.reception"
            @select-grade="(n) => (ratingForm.reception = n)"
            title="Reception"
          ></RatingComponent>
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
  <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent @click="scrollToCommentForm" class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        title="35 reviews"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"
      ></RatingComponent>
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled
          ></RatingComponent>
        </div>
      </div>
    </div>
    <div ref="commentForm" class="reviews__post-review">
      <h3>Post a Review</h3>
      <form class="post-review-form">
        <div class="comment-form">
          <Input
            v-model="commentForm.userName"
            type="text"
            placeholder="Name"
          ></Input>
          <Input
            v-model="commentForm.userEmail"
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            v-model="commentForm.comment"
            type="textarea"
            placeholder="Comment"
          ></Input>
        </div>
        <div class="rating-form">
          <RatingComponent
            :rating="ratingForm.comfort"
            @select-grade="(n) => (ratingForm.comfort = n)"
            title="Comfort"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hospitality"
            @select-grade="(n) => (ratingForm.hospitality = n)"
            title="Hospitality"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hygiene"
            @select-grade="(n) => (ratingForm.hygiene = n)"
            title="Hygiene"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.reception"
            @select-grade="(n) => (ratingForm.reception = n)"
            title="Reception"
          ></RatingComponent>
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
  <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent @click="scrollToCommentForm" class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        title="35 reviews"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"
      ></RatingComponent>
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled
          ></RatingComponent>
        </div>
      </div>
    </div>
    <div ref="commentForm" class="reviews__post-review">
      <h3>Post a Review</h3>
      <form class="post-review-form">
        <div class="comment-form">
          <Input
            v-model="commentForm.userName"
            type="text"
            placeholder="Name"
          ></Input>
          <Input
            v-model="commentForm.userEmail"
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            v-model="commentForm.comment"
            type="textarea"
            placeholder="Comment"
          ></Input>
        </div>
        <div class="rating-form">
          <RatingComponent
            :rating="ratingForm.comfort"
            @select-grade="(n) => (ratingForm.comfort = n)"
            title="Comfort"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hospitality"
            @select-grade="(n) => (ratingForm.hospitality = n)"
            title="Hospitality"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hygiene"
            @select-grade="(n) => (ratingForm.hygiene = n)"
            title="Hygiene"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.reception"
            @select-grade="(n) => (ratingForm.reception = n)"
            title="Reception"
          ></RatingComponent>
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
  <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent @click="scrollToCommentForm" class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        title="35 reviews"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"
      ></RatingComponent>
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled
          ></RatingComponent>
        </div>
      </div>
    </div>
    <div ref="commentForm" class="reviews__post-review">
      <h3>Post a Review</h3>
      <form class="post-review-form">
        <div class="comment-form">
          <Input
            v-model="commentForm.userName"
            type="text"
            placeholder="Name"
          ></Input>
          <Input
            v-model="commentForm.userEmail"
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            v-model="commentForm.comment"
            type="textarea"
            placeholder="Comment"
          ></Input>
        </div>
        <div class="rating-form">
          <RatingComponent
            :rating="ratingForm.comfort"
            @select-grade="(n) => (ratingForm.comfort = n)"
            title="Comfort"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hospitality"
            @select-grade="(n) => (ratingForm.hospitality = n)"
            title="Hospitality"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hygiene"
            @select-grade="(n) => (ratingForm.hygiene = n)"
            title="Hygiene"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.reception"
            @select-grade="(n) => (ratingForm.reception = n)"
            title="Reception"
          ></RatingComponent>
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
  <div class="reviews">
    <h3>Reviews Scores and Score Breakdown</h3>
    <ButtonTransparent @click="scrollToCommentForm" class="to-comment-form"
      >Post comment</ButtonTransparent
    >
    <div class="reviews__statistics">
      <RatingComponent
        class="rating__overall"
        :rating="averageRating.overallAverageRating"
        disabled
        title="35 reviews"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.comfortAverageRating"
        disabled
        title="Comfort"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hospitalityAverageRating"
        disabled
        title="Hospitality"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.hygieneAverageRating"
        disabled
        title="Hygiene"
      ></RatingComponent>
      <RatingComponent
        :rating="averageRating.receptionAverageRating"
        disabled
        title="Reception"
      ></RatingComponent>
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
          <RatingComponent
            :rating="reviews.rating.comfort"
            title="Comfort"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hospitality"
            title="Hospitality"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.hygiene"
            title="Hygiene"
            disabled
          ></RatingComponent>

          <RatingComponent
            :rating="reviews.rating.reception"
            title="Reception"
            disabled
          ></RatingComponent>
        </div>
      </div>
    </div>
    <div ref="commentForm" class="reviews__post-review">
      <h3>Post a Review</h3>
      <form class="post-review-form">
        <div class="comment-form">
          <Input
            v-model="commentForm.userName"
            type="text"
            placeholder="Name"
          ></Input>
          <Input
            v-model="commentForm.userEmail"
            type="email"
            placeholder="Email"
          ></Input>
          <Input
            v-model="commentForm.comment"
            type="textarea"
            placeholder="Comment"
          ></Input>
        </div>
        <div class="rating-form">
          <RatingComponent
            :rating="ratingForm.comfort"
            @select-grade="(n) => (ratingForm.comfort = n)"
            title="Comfort"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hospitality"
            @select-grade="(n) => (ratingForm.hospitality = n)"
            title="Hospitality"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.hygiene"
            @select-grade="(n) => (ratingForm.hygiene = n)"
            title="Hygiene"
          ></RatingComponent>
          <RatingComponent
            :rating="ratingForm.reception"
            @select-grade="(n) => (ratingForm.reception = n)"
            title="Reception"
          ></RatingComponent>
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
  </div> -->
</template>
<script>
import RatingComponent from "@/components/RatingComponent.vue";
import ButtonTransparent from "@/components/ButtonTransparent.vue";
import ButtonBlack from "@/components/ButtonBlack.vue";
import CrownDecoration from "@/components/CrownDecoration.vue";
import Input from "@/components/Input.vue";

export default {
  name: "ReviewTab",
  data() {
    return {
      errorMessage: null,
      isError: false,
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
      reviewsWithComment: this.reviewsWithCommentArray,
    };
  },
  components: {
    RatingComponent,
    ButtonBlack,
    ButtonTransparent,
    CrownDecoration,
    Input,
  },
  methods: {
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
    scrollToCommentForm() {
      console.log(this.$refs.commentForm);
      this.$refs.commentForm.scrollIntoView({ behavior: "smooth" });
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
  },
  props: {
    averageRating: { type: [Object, Array, Number], require: true },
    reviewsWithCommentArray: { type: [Object, Array, Number], require: true },
  },
};
</script>
<style lang="scss">
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
</style>
