<template>
  <div class="rating">
    <span
      v-if="selectedGrade"
      class="rating__value"
      >{{ selectedGrade }}</span
    >
    <span
      v-if="title"
      class="rating__title"
      >{{ title }}</span
    >
    <div
      class="rating__rhombuses"
      @mouseleave="hoveredGrade = null">
      <div
        v-for="i in 5"
        @mouseover="hoverRating(i)"
        @click="selectGrade(i)"
        :key="i"
        class="rating__rhombus"
        :class="{
          pointer: !disabled,
        }">
        <IRhombus
          :class="{
            filled: i <= hoveredGrade || i <= Math.round(selectedGrade),
            translucent: hoveredGrade && i > hoveredGrade,
          }">
        </IRhombus>
      </div>
    </div>
  </div>
</template>
<script>
import IRhombus from "@/components/icons/IRhombus.vue";

export default {
  components: {
    IRhombus,
  },
  props: {
    rating: {
      type: [Number, String],
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["selectGrade"],
  data() {
    return {
      hoveredGrade: null,
      selectedGrade: +this.rating,
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
        this.$emit("selectGrade", this.selectedGrade);
      }
    },
  },
  watch: {
    rating(newRating) {
      this.selectedGrade = newRating;
    },
  },
};
</script>
<style scoped lang="scss">
.rating {
  text-align: center;
  min-width: 18px;
  &__rhombus {
    &.pointer {
      position: relative;
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: calc(100% + 10px);
        height: calc(100% + 2px);
        translate: -50% -50%;
      }
      cursor: pointer;
    }
    svg {
      color: white;
      height: 16px;
      width: auto;
      stroke-width: 20;
      transition: 0.2s;
      &.filled {
        fill: white;
      }
      &.translucent {
        opacity: 0.5;
      }
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
    &__rhombus {
      svg {
        height: 18px;
      }
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
