<template>
  <div class="select">
    <div class="select__wrapper">
      <select
        class="select-native"
        aria-labelledby="select"
        :value="modelValue"
        @input="
          $emit('update:modelValue', $event.target.value),
            (optionChecked = $event.target.value)
        "
      >
        <option value="">
          {{ placeholder }}
        </option>
        <option v-for="(option, index) in options" :value="option" :key="index">
          {{ option }}
        </option>
      </select>
      <div
        class="select-custom"
        hoverNext
        :aria-hidden="!isOptionVisible"
        tabindex="-1"
        @focusout="isOptionVisible = false"
        @keydown.down.prevent="hoverNext"
        @keydown.up.prevent="hoverPrev"
        @keydown.enter="select"
        @keydown.space.prevent="select"
        @keydown.esc="closeSelectCustom"
      >
        <div class="select-custom__trigger" @click="toggleSelectCustom">
          {{ optionChecked ? optionChecked : placeholder }}
        </div>
        <div class="select-custom__options" v-show="isOptionVisible">
          <div
            data-value=""
            class="select-custom__option"
            @click="select"
            @mouseover="optionHoveredIndex = -1"
            :class="{ hovered: optionHoveredIndex == -1 }"
          >
            {{ placeholder }}
          </div>
          <div
            v-for="(option, index) in options"
            :key="index"
            :data-value="option"
            class="select-custom__option"
            @click="select"
            @mouseover="optionHoveredIndex = index"
            :class="{ hovered: optionHoveredIndex == index }"
          >
            {{ option }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SelectComponent",
  props: {
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: "select option",
    },
    modelValue: {
      type: [String, Number],
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      optionChecked: null,
      optionHoveredIndex: -1,
      isOptionVisible: false,
    };
  },
  methods: {
    toggleSelectCustom() {
      this.isOptionVisible = !this.isOptionVisible;
    },
    closeSelectCustom() {
      if (this.isOptionVisible) {
        this.isOptionVisible = false;
      }
    },
    hoverNext() {
      if (this.optionHoveredIndex + 1 < this.options.length) {
        this.optionHoveredIndex = this.optionHoveredIndex + 1;
      }
    },
    hoverPrev() {
      if (this.optionHoveredIndex > -1) {
        this.optionHoveredIndex = this.optionHoveredIndex - 1;
      }
    },
    select() {
      if (
        this.optionHoveredIndex >= 0 &&
        this.optionHoveredIndex <= this.options.length &&
        this.isOptionVisible
      ) {
        this.optionChecked = this.options[this.optionHoveredIndex];
        this.closeSelectCustom();
      } else if (this.optionHoveredIndex == -1) {
        this.optionChecked = null;
        this.closeSelectCustom();
      }
      this.$emit("update:modelValue", this.optionChecked);
    },
  },
};
</script>
<style scoped lang="scss">
.select-native,
.select-custom {
  position: relative;
  grid-column: 1/2;
  grid-row: 1/2;
  max-height: 100%;
}

.select {
  position: relative;
  &-custom {
    pointer-events: none;
    &__trigger {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: #fff;
      width: auto;
      white-space: nowrap;
      cursor: pointer;
      &:hover {
        border-color: #8c00ff;
      }
    }
    &__options {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background-color: #fff;
      z-index: 1;
      border-radius: 5px;
    }
    &__option {
      position: relative;
      font-weight: 500;
      font-size: 18px;
      line-height: 25px;
      font-family: var(--manrope);
      padding: 5px;
      &.hovered,
      &:hover {
        background-color: var(--bg-main);
        cursor: default;
      }

      &:not(:last-of-type)::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        border-bottom: 1px solid #d3d3d3;
      }
    }
  }
  &-native:focus + .select-custom .select-custom__trigger {
    outline: none;
    box-shadow: var(--gray) 0 0 0 1px;
  }
  &__label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.4rem;
  }
  &__wrapper {
    display: grid;
    position: relative;
  }
  &-native,
  &-custom__trigger {
    background-color: #fff;
    border: none;
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    font-family: var(--manrope);
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  &-native {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding: 0rem 0.8rem;
    position: absolute;
    width: 100%;
  }
}
@media (hover: hover) {
  .select-custom {
    pointer-events: initial;
    &__options {
      display: block;
    }
  }
}
</style>
