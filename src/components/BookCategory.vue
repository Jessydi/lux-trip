<template>
  <div class="book-category">
    <div class="book-category__img-block">
      <img
        class="book-category__img"
        :src="require(`@/assets/book-categories/${bookCategory.src}`)"
        alt="category image" />
      <div class="book-category__img-content">
        <router-link
          :to="{ name: bookCategory.routeSrc }"
          class="book-category__name link"
          >{{ bookCategory.name }}</router-link
        >
        <IRhombus class="rhombus"></IRhombus>
        <IRhombusBlur class="rhombus-blur"></IRhombusBlur>
      </div>
    </div>
    <div
      v-if="fullContent"
      class="book-category__text-block">
      <p class="book-category__description">
        {{ bookCategory.description }}
      </p>
      <router-link
        :to="{ name: bookCategory.routeSrc }"
        class="book-category__name">
        <ButtonBlack>
          <CrownDecoration></CrownDecoration>
          <span>Make A Request</span>
        </ButtonBlack>
      </router-link>
    </div>
  </div>
</template>
<script>
import IRhombus from "@/components/icons/IRhombus.vue";
import IRhombusBlur from "@/components/icons/IRhombusBlur.vue";
import ButtonBlack from "@/components/formComponents/ButtonBlack.vue";
import CrownDecoration from "@/components/CrownDecoration.vue";
export default {
  components: {
    IRhombus,
    IRhombusBlur,
    ButtonBlack,
    CrownDecoration,
  },
  props: {
    bookCategory: {
      type: Object,
      required: true,
      validator(value) {
        return Object.hasOwn(value, "src") && Object.hasOwn(value, "name");
      },
    },
    fullContent: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style scoped lang="scss">
.book-category {
  position: relative;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
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
    & :deep(path) {
      stroke: var(--grey);
      stroke-width: 5;
    }
  }
  .rhombus-blur {
    width: 67px;
    & :deep(svg) {
      stroke: transparent;
      stroke-width: 0;
    }
  }
  &__img-block {
    position: relative;
  }
  &__img-content {
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
    border-radius: 10px;
    overflow: hidden;
  }
  &__name {
    text-transform: uppercase;
    font-size: 44px;
    line-height: 43px;
    color: #fff;
    text-align: center;
    z-index: 2;
  }
  &__text-block {
    padding: 25px 25px 35px 25px;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    justify-content: space-between;
  }

  &__description {
    margin-bottom: 35px;
  }
}
@media (min-width: 768px) {
  .book-category {
    &__text-block {
      padding: 30px 30px 50px 30px;
    }

    &__description {
      margin-bottom: 50px;
    }
  }
}
</style>
