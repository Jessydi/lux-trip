<template>
  <div class="customer-review">
    <CrownDecoration noCrown :border-radius="10"></CrownDecoration>
    <div class="customer-review__content">
      <CrownDecoration singleCrown :border-radius="10"></CrownDecoration>
      <div class="customer-review__photo">
        <img
          :src="require(`@/assets/customer-photographs/${reviewData.photo}`)"
          alt="blured photo"
          class="blured"
        />
        <img
          :src="require(`@/assets/customer-photographs/${reviewData.photo}`)"
          alt="customer photo"
        />
      </div>
      <div class="customer-review__review">{{ reviewData.review }}</div>
      <div class="customer-review__name">- {{ reviewData.name }}</div>
      <div class="customer-review__company">{{ reviewData.company }}</div>
    </div>
  </div>
</template>
<script>
import CrownDecoration from "@/components/CrownDecoration.vue";
export default {
  components: {
    CrownDecoration,
  },
  props: {
    reviewObject: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      reviewData: this.reviewObject,
    };
  },
};
</script>
<style lang="scss">
.customer-review {
  position: relative;
  padding: 8px;
  height: 100%;
  .crown-decoration {
    width: 100%;
  }
  &__content {
    height: 100%;
    position: relative;
    padding: 20px 60px;
    isolation: isolate;
    .crown-decoration {
      z-index: -1;
      backdrop-filter: blur(10px);
      background-color: rgba(226, 211, 206, 0.2);
    }
  }

  &__photo {
    margin-bottom: 34px;
    display: grid;
    img,
    .blured {
      border-radius: 50%;
      grid-column: 1 / 2;
      grid-row: 1 / 2;
      position: relative;
    }
    .blured {
      translate: 20% 20%;
      filter: blur(20px);
    }
  }

  &__review {
    margin-bottom: 29px;
    font-size: 18px;
    line-height: 30px;
    font-weight: 300;
    font-family: var(--manrope);
  }

  &__name,
  &__company {
    text-align: center;
    font-size: 14px;
    line-height: 13px;
    margin-bottom: 2px;
    font-family: var(--manrope);
  }

  &__name {
    font-weight: 500;
  }
}
@media (min-width: 768px) {
  .customer-review {
    padding: 8px;
    & > .crown-decoration {
      width: calc(100% - 40px);
    }
    &__content {
      position: relative;
      padding: 60px 70px 80px 90px;
    }

    &__photo {
    }

    &__review {
      font-size: 21px;
      line-height: 37px;
      margin-bottom: 88px;
    }
    &__name,
    &__company {
      text-align: left;
    }
    &__name {
      font-size: 20px;
      line-height: 18px;
      margin-bottom: 6px;
    }

    &__company {
      font-size: 17px;
      line-height: 16px;
    }
  }
}
</style>
