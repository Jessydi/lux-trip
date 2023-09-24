<template>
  <div class="date-input-component">
    <label
      :for="id"
      v-if="id && label"
      >{{ label }}</label
    >
    <div class="date-input-wrapper">
      <slot></slot>
      <input
        class="date-input"
        :class="{ blur: blured, error: errorMessage, icon: withIcon }"
        type="text"
        :id="id"
        autocomplete="off"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
        @click="$emit('inputClick')"
        @focus="$emit('focus')" />
      <div
        v-if="errorMessage"
        class="date-input-error">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>
<script>
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
export default {
  name: "InputComponent",
  inheritAttrs: false,
  props: {
    blured: {
      type: Boolean,
      required: false,
    },
    withIcon: {
      type: Boolean,
      required: false,
    },

    placeholder: {
      type: String,
      required: false,
    },
    modelValue: {
      type: String,
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
    minDate: {
      type: [Date, String],
    },
    maxDate: {
      type: [Date, String],
    },
    mode: {
      type: String,
    },
  },
  emits: ["update:modelValue", "inputClick", "focus"],
  async mounted() {
    const dateObject = {
      defaultDate: null,
      dateFormat: "j M Y ",
      disableMobile: "true",
    };
    if (this.minDate) {
      dateObject.minDate = this.minDate;
    }
    if (this.maxDate) {
      dateObject.maxDate = this.maxDate;
    }
    if (this.mode) {
      dateObject.mode = this.mode;
    }
    this.datePicker = flatpickr(`#${this.id}`, dateObject);
  },
  beforeUnmount() {
    this.datePicker.destroy();
  },
};
</script>
<style scoped lang="scss">
label {
  margin-bottom: 10px;
  display: block;
  padding: 0 20px;
  font-family: var(--manrope);
  font-size: 18px;
  line-height: 24px;
  color: var(--grey);
}

.date-input {
  --border-color: var(--bg-main);

  background-color: transparent;
  color: var(--black-main);
  padding: 10px 30px;
  height: 55px;
  border: 2px solid var(--border-color);
  border-radius: 74px;
  font-family: var(--manrope);
  font-size: 16px;
  line-height: 28px;
  width: 100%;
  transition: box-shadow 0.3s;
  &-wrapper {
    position: relative;
    :deep(svg) {
      position: absolute;
      left: 25px;
      top: 28px;
      translate: 0 -50%;
      pointer-events: none;
      z-index: 1;
    }
  }
  &-component {
    &:hover input {
      box-shadow: 0px 0px 0 1px var(--border-color);
    }
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
  &::placeholder {
    color: var(--black-main);
  }
  &.blur {
    backdrop-filter: blur(10px);
    border-color: #fff;
    background-color: rgba(255, 255, 255, 0.15);
  }
  &.error {
    --border-color: var(--error-red);
  }
  &.icon {
    padding: 10px 30px 10px 50px;
  }
  &:focus,
  &:focus-visible {
    outline: none;
  }
  &:focus-visible {
    --border-color: var(--grey);
  }
}
@media (min-width: 768px) {
  label {
    padding: 0 30px;
    margin-bottom: 15px;
  }
}
</style>
