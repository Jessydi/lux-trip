<template>
  <div class="book-categories">
    <div class="container">
      <h2>Book With Us</h2>
      <ul class="book-categories__list">
        <li
          v-for="(bookCategory, index) in bookCategories"
          :key="index"
          class="book-category"
        >
          <img
            class="book-category__img"
            :src="require(`@/assets/book-categories/${bookCategory.src}`)"
            alt="category image"
          />
          <div class="book-category__content">
            <router-link :to="{ name: 'home' }" class="book-category__name">{{
              bookCategory.name
            }}</router-link>
            <IRhombus class="rhombus"></IRhombus>
            <IRhombusBlur class="rhombus-blur"></IRhombusBlur>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import IRhombus from "./icons/IRhombus.vue";
import IRhombusBlur from "./icons/IRhombusBlur.vue";

export default {
  components: {
    IRhombus,
    IRhombusBlur,
  },
  data() {
    return {
      bookCategories: [
        {
          name: "supercars",
          src: "book-category-1.jpg",
        },
        {
          name: "Hotels",
          src: "book-category-2.jpg",
        },
        {
          name: "Villas",
          src: "book-category-3.jpg",
        },
        {
          name: "Yachts",
          src: "book-category-4.jpg",
        },
        {
          name: "Private Helicopter",
          src: "book-category-5.jpg",
        },
        {
          name: "Private Jet",
          src: "book-category-6.jpg",
        },
      ],
    };
  },
};
</script>
<style lang="scss">
.book {
  &-categories {
    h2 {
      margin-bottom: 65px;
    }
    &__list {
      display: grid;
      grid-template-columns: 1fr;
      gap: 14px;
    }
  }
  &-category {
    position: relative;
    .rhombus,
    .rhombus-blur {
      position: absolute;
      top: 50%;
      left: 50%;
      translate: -50% -50%;
      height: auto;
      rotate: 90deg;
    }
    .rhombus {
      width: 75px;
      polygon {
        stroke: var(--gray);
        stroke-width: 5;
      }
    }
    .rhombus-blur {
      width: 67px;
    }
    &__content {
      position: absolute;
      inset: 0;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      overflow: hidden;
      border-radius: 10px;
    }
    &__name {
      text-transform: uppercase;
      font-size: 44px;
      line-height: 43px;
      color: #fff;
      text-align: center;
      z-index: 1;
    }
  }
}
@media (min-width: 768px) {
  .book {
    &-categories {
      h2 {
        margin-bottom: 75px;
      }
      &__list {
        gap: 30px;
        grid-template-columns: 1fr 1fr;
      }
    }
  }
}
</style>
