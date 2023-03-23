<template>
  <div class="rating">
    <span class="rating__value">{{ selectedGrade }}</span>
    <div class="rating__rhombuses" @mouseleave="hoveredGrade = null">
      <IRhombus
        v-for="i in 5"
        @mouseover="hoverRating(i)"
        @click="selectGrade(i)"
        :class="{ filled: i <= hoveredGrade || i <= selectedGrade }"
        :key="i"
      ></IRhombus>
    </div>
  </div>
</template>
<script>
import IRhombus from "./icons/IRhombus.vue";

export default {
  components: {
    IRhombus,
  },
  props: {
    rating: {
      type: Number,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hoveredGrade: null,
      selectedGrade: this.rating,
    };
  },
  methods: {
    hoverRating(hoveredGrade) {
      if (!this.disabled) {
        this.hoveredGrade = hoveredGrade;
      }
    },
    selectGrade(selectedGrade) {
      if (!this.disabled) {
        this.selectedGrade = selectedGrade;
      }
    },
  },
};
</script>
<style lang="scss">
.rating {
  text-align: center;
  min-width: 18px;
  svg {
    color: white;
    height: 16px;
    width: auto;
    stroke-width: 50;
    &.filled {
      fill: white;
    }
  }
  &__value {
    font-size: 12px;
    line-height: 16px;
  }
  &__rhombuses {
    display: flex;
    flex-direction: column-reverse;
    gap: 2px;
    align-items: center;
    margin-top: 5px;
  }
}
@media (min-width: 768px) {
  .rating {
    svg {
      height: 18px;
    }
    &__value {
      font-size: 14px;
      line-height: 18px;
    }
    &__rhombuses {
      display: flex;
      flex-direction: column-reverse;
      gap: 2px;
      align-items: center;
      margin-top: 5px;
    }
  }
}
</style>
