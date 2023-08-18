<template>
  <div
    class="select"
    :class="{ opened: isOptionVisible, error: errorMessage }">
    <div class="select__wrapper">
      <label
        class="select__label"
        v-if="id && label"
        :for="id"
        >{{ label }}</label
      >
      <select
        class="select-native"
        aria-labelledby="select"
        :value="modelValue"
        :id="id && label ? id : ''"
        @change="
          $emit('update:modelValue', $event.target.value),
            (optionChecked = $event.target.value)
        "
        @focus="$emit('focus')">
        <!-- should be string -->
        <option value="">
          {{ placeholder }}
        </option>
        <option
          v-for="(option, index) in options"
          :value="option"
          :key="index">
          {{ option }}
        </option>
      </select>
      <div
        class="select-custom"
        hoverNext
        :aria-hidden="!isOptionVisible"
        tabindex="-1"
        @focusout="closeSelectCustom"
        @keydown.down.prevent="hoverNext"
        @keydown.up.prevent="hoverPrev"
        @keydown.enter="select"
        @keydown.space.prevent="select"
        @keydown.esc="closeSelectCustom">
        <div
          class="select-custom__trigger"
          :class="{ icon: withIcon }"
          @click="toggleSelectCustom">
          <slot></slot>

          {{ optionChecked ? optionChecked : placeholder }}
          <ISelectArrow class="select-custom__arrow"></ISelectArrow>
        </div>
        <div
          class="select-custom__options"
          v-show="isOptionVisible">
          <div class="select-custom__options-content scrollable">
            <div
              data-value=""
              class="select-custom__option"
              @click="select"
              @mouseover="optionHoveredIndex = -1"
              :class="{ hovered: optionHoveredIndex == -1 }">
              {{ placeholder }}
            </div>
            <div
              v-for="(option, index) in options"
              :key="index"
              :data-value="option"
              class="select-custom__option"
              @click="select"
              @mouseover="optionHoveredIndex = index"
              :class="{ hovered: optionHoveredIndex == index }">
              {{ option }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="errorMessage"
      class="select-error">
      {{ errorMessage }}
    </div>
  </div>
</template>
<script>
import ISelectArrow from "@/components/icons/ISelectArrow.vue";

export default {
  name: "SelectComponent",
  components: {
    ISelectArrow,
  },
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
    id: {
      type: String,
    },
    label: {
      type: String,
    },
    errorMessage: {
      type: String,
    },
    withIcon: {
      type: Boolean,
      required: false,
    },
  },
  emits: ["update:modelValue", "focus"],
  data() {
    return {
      optionChecked: this.modelValue ? this.modelValue : null,
      optionHoveredIndex: -1,
      isOptionVisible: false,
    };
  },
  methods: {
    toggleSelectCustom() {
      this.isOptionVisible = !this.isOptionVisible;
      this.optionHoveredIndex = this.options.indexOf(this.optionChecked, 0);
    },
    closeSelectCustom() {
      if (this.isOptionVisible) {
        this.isOptionVisible = false;
        this.optionHoveredIndex = this.options.indexOf(this.optionChecked, 0);
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
  watch: {
    modelValue() {
      for (let option of this.options) {
        if (option == this.modelValue) {
          this.optionChecked = this.modelValue;
        }
      }
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
  --left-right-padding: 20px;
  --top-padding: 60px;
  --bottom-padding: 20px;
  --top-offset: 20px;
  --border-width: 2px;
  --border-radius: 27px;
  --max-height: 300px;
  --border-color: var(--bg-main);
  --border-color-opened: var(--grey);
  position: relative;

  &-custom {
    pointer-events: none;

    &__trigger {
      position: relative;
      background-color: #fff;
      width: auto;
      white-space: nowrap;
      cursor: pointer;
      height: 55px;
      width: 100%;
      border-radius: var(--border-radius);
      border: var(--border-width) solid var(--border-color);
      transition: box-shadow 0.3s;
      &:focus {
        --border-color: var(--grey);
      }
      &:hover {
        box-shadow: 0px 0px 0 1px var(--border-color);
      }
      :deep(svg:not(.select-custom__arrow)) {
        position: absolute;
        left: 25px;
        top: 50%;
        translate: 0 -50%;
        pointer-events: none;
      }
      &.icon {
        padding-right: 30px;
        padding-left: 50px;
      }
    }
    &__options {
      position: absolute;
      top: 0px;
      padding: var(--top-padding) var(--left-right-padding)
        var(--bottom-padding) var(--left-right-padding);
      border: var(--border-width) solid var(--border-color-opened);
      border-top: 0;
      left: 0;
      width: 100%;
      background-color: #fff;
      z-index: 1;
      border-radius: var(--border-radius);
      overflow: hidden;
      max-height: var(--max-height);
      &-content {
        overflow: auto;
        max-height: calc(
          var(--max-height) - var(--top-padding) - var(--bottom-padding)
        );
      }
    }
    &__option {
      position: relative;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      font-family: var(--manrope);
      padding: 3px;
      &.hovered,
      &:hover {
        background-color: var(--bg-main);
        cursor: default;
      }
      &:first-of-type {
        margin-top: 20px;
      }
      &:not(:last-of-type) {
        margin-bottom: 4px;
      }
    }
    &__arrow {
      position: absolute;
      top: 25px;
      right: 20px;
      translate: 0 -50%;
      transition: rotate 0.2s;
    }
  }
  &-native {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    position: absolute;
    border-color: transparent;
    width: 100%;
    align-self: center;
  }
  &-native:focus-visible,
  &-native:focus,
  .select-custom:focus,
  .select-custom:focus-visible {
    outline: none;
  }
  &-native:focus-visible + .select-custom .select-custom__trigger {
    --border-color: var(--grey);
  }
  &.plain &-native:focus-visible {
    opacity: 0;
  }
  &.plain &-native:focus-visible + .select-custom .select-custom__trigger {
    background-color: rgba(226, 211, 206, 0.5);
  }
  &-native,
  &-custom__trigger {
    background-color: #fff;
    padding: 16px 45px 16px 23px;
    font-weight: 400;
    font-size: 16px;
    line-height: 1;
    font-family: var(--manrope);
  }
  &__label {
    grid-column: 1/2;
    grid-row: -1/-2;
    margin-bottom: 10px;
    padding: 0 20px;
    font-family: var(--manrope);
    font-size: 18px;
    line-height: 24px;
    white-space: nowrap;
    color: var(--grey);
  }
  &__wrapper {
    display: grid;
    position: relative;
  }
  &-error {
    position: absolute;
    width: 100%;
    padding: 0 20px;
    white-space: nowrap;
    overflow: hidden;
    color: var(--error-red);
    font-family: var(--manrope);
    font-size: 12px;
    line-height: 1;
    top: calc(100% + 3px);
  }
  &.error {
    & .select-custom .select-custom__trigger {
      --border-color: var(--error-red);
    }
    &.plain .select-custom .select-custom__trigger {
      background-color: rgba(233, 85, 85, 0.5);
    }
  }

  &.plain {
    --border-radius: 5px;
    --top-padding: 40px;
    --left-right-padding: 5px;
    --bottom-padding: 5px;
    &.opened {
      .select-custom__options {
        box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.3);
      }
    }
    .select {
      &-native,
      &-custom__trigger {
        font-weight: 500;
        font-size: 18px;
        line-height: 25px;
        padding: 0;
        height: auto;
      }
      &-custom {
        &__trigger {
          border: 0;
          &:hover {
            box-shadow: none;
          }
        }
        &__options {
          top: -5px;
          left: -5px;
          width: calc(100% + 10px);
          border: 0;
        }
        &__option {
          &:first-of-type {
            margin-top: 10px;
          }
        }
        &__arrow {
          display: none;
        }
      }
    }
  }
  &.opened {
    .select {
      &-custom {
        &::-webkit-scrollbar-track {
          margin: var(--top-padding) 0 25px 0;
        }
        &__trigger {
          z-index: 10;
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
          transition: box-shadow 0s;
          border-color: var(--border-color-opened);
          border-bottom: 0;

          &:hover {
            box-shadow: none;
          }
        }
        &__options {
          z-index: 9;

          &::after {
            content: "";
            position: absolute;
            max-width: 100%;
            height: 1px;
            top: var(--top-padding);
            left: var(--left-right-padding);
            right: var(--left-right-padding);
            z-index: 2;
            background-color: var(--bg-main);
          }
        }
        &__arrow {
          rotate: 180deg;
        }
      }
    }
  }
}
@media (min-width: 768px) {
  .select {
    &__label {
      padding: 0 30px;
      margin-bottom: 15px;
    }
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
