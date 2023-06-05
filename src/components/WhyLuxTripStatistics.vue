<template>
  <div class="why-lux-trip-statistics">
    <div class="container">
      <div class="description">
        <h3 class="description__title">
          Creating a unique experience for each client
        </h3>
        <p class="description__text">
          Starting from suggesting destinations to visit in the current season,
          to the selection of the most exquisite locations for a special event
          or a family dinner.
        </p>
      </div>
      <div class="statistics">
        <div class="statistics__item">
          <span class="item__value">985</span
          ><span class="item__name">Luxury trips provided</span>
          <IRhombus></IRhombus>
        </div>
        <div class="statistics__item">
          <span class="item__value">{{ tripsAmount }}</span
          ><span class="item__name">Destinations</span>
          <IRhombus></IRhombus>
        </div>
        <div class="statistics__item">
          <span class="item__value">812</span
          ><span class="item__name">Happy Customers</span>
          <IRhombus></IRhombus>
        </div>
      </div>
    </div>
    <div class="why-lux-trip-statistics__bg">
      <img
        class="clouds clouds-1"
        src="@/assets/backgrounds/clouds.png"
        alt="clouds"
      />
      <img
        class="clouds clouds-2"
        src="@/assets/backgrounds/clouds.png"
        alt="clouds"
      />
      <img
        class="clouds clouds-3"
        src="@/assets/backgrounds/clouds.png"
        alt="clouds"
      />
    </div>
  </div>
</template>
<script>
import { db } from "@/firebase/firebaseInit";
import IRhombus from "./icons/IRhombus.vue";
import { collection, getCountFromServer } from "firebase/firestore";
export default {
  components: {
    IRhombus,
  },
  data() {
    return {
      tripsAmount: "20+",
    };
  },
  async created() {
    const tripCollection = collection(db, "trips");
    const tripsAmount = await getCountFromServer(tripCollection);
    this.tripsAmount = tripsAmount.data().count;
  },
};
</script>
<style scoped lang="scss">
.why-lux-trip-statistics {
  position: relative;
  .container {
    max-width: 760px;
  }
  .description {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    margin-bottom: 20px;
    &__title,
    &__text {
      max-width: 255px;
    }
  }
  .statistics {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    margin-left: -45px;
    margin-right: -45px;
    &__item {
      position: relative;
      width: 100%;
      max-width: 200px;
      height: auto;
      aspect-ratio: 132/255;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 20px;
      :deep(svg) {
        position: absolute;
        width: 100%;
        height: auto;
        inset: 0;
        margin: auto;
        stroke-width: 3px;
        polygon {
          stroke: var(--gray);
        }
      }
      &:nth-child(1) {
        grid-column: 1/2;
        grid-row: 2/3;
        translate: calc(50% - 17px) calc(-50% + 17px);
      }
      &:nth-child(2) {
        grid-column: 2/3;
        grid-row: 1/2;
      }
      &:nth-child(3) {
        grid-column: 3/4;
        grid-row: 2/3;
        translate: calc(-50% + 17px) calc(-50% + 17px);
      }
    }
    .item {
      &__value {
        font-size: 35px;
        line-height: 35px;
      }

      &__name {
        font-size: 17px;
        line-height: 17px;
      }
    }
  }
  &__bg {
    .clouds {
      position: absolute;
      z-index: -1;
      &-1 {
        top: 40%;
        left: 0;
        translate: -50%;
        width: 420px;
        height: 300px;
        opacity: 0.83;
        transform: matrix(-1, 0.05, 0.05, 1, 0, 0);
      }
      &-2 {
        top: 10%;
        right: 0;
        opacity: 0.75;
        rotate: 16.5deg;
        translate: 40%;
        width: 300px;
        height: 210px;
      }
      &-3 {
        top: 25%;
        right: 0;
        opacity: 0.9;
        transform: matrix(-0.96, -0.28, -0.28, 0.96, 0, 0);
        translate: 60%;
        width: 200px;
        height: 140px;
      }
    }
  }
}
@media (min-width: 768px) {
  .why-lux-trip-statistics {
    .description {
      flex-direction: row;
      gap: 30px;
      align-items: flex-start;
      justify-content: center;
      margin-bottom: 50px;
    }
    .statistics {
      display: flex;
      justify-content: space-between;
      margin: initial;
      &__item {
        &:nth-child(1) {
          translate: unset;
        }
        &:nth-child(3) {
          translate: unset;
        }
      }
      .item {
        &__value {
          font-size: 44px;
          line-height: 43px;
        }

        &__name {
          font-size: 21px;
          line-height: 21px;
        }
      }
    }
    &__bg {
      .clouds {
        position: absolute;
        z-index: -1;
        &-1 {
          top: 50%;
          translate: -30%;
          width: 720px;
          height: 518px;
        }
        &-2 {
          top: 10%;
          translate: 50%;
          width: 1080px;
          height: 780px;
        }
        &-3 {
          top: 25%;
          translate: 65%;
          width: 720px;
          height: 520px;
        }
      }
    }
  }
}
</style>
