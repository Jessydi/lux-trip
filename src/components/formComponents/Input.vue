<template>
  <div class="input-component">
    <label
      :for="id"
      v-if="id && label"
      >{{ label }}</label
    >
    <div class="input-wrapper">
      <slot></slot>
      <textarea
        class="input"
        v-bind="$attrs"
        :id="id"
        :class="{ blur: blured, error: errorMessage, icon: withIcon }"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        v-if="type === 'textarea'"></textarea>

      <input
        v-else
        :type="type"
        class="input"
        v-bind="$attrs"
        :id="id"
        :class="{
          'center-placeholder': centerPlaceholder,
          blur: blured,
          error: errorMessage,
          icon: withIcon,
        }"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)" />
      <div
        v-if="errorMessage"
        class="input-error">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>
<script>
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
    type: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
    },
    centerPlaceholder: {
      type: Boolean,
      default: false,
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
  },
  emits: ["update:modelValue"],
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
textarea.input {
  height: auto;
  resize: none;
  padding: 20px 30px;
  border-radius: 20px;
}
.input {
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
    }
  }
  &-component {
    &:hover .input {
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
  &.center-placeholder {
    &::placeholder {
      text-align: center;
    }
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
