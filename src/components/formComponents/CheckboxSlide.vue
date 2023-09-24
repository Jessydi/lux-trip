<template>
  <label class="checkbox-slide">
    <span class="checkbox-slide__label">{{ label }}</span>
    <div class="checkbox-slide__container">
      <input
        type="checkbox"
        name="checkbox"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)" />
      <div class="checkbox-slide__true">
        <span>{{ trueText }}</span>
      </div>
      <div class="checkbox-slide__false">
        <span>{{ falseText }}</span>
      </div>
    </div>
  </label>
</template>
<script>
export default {
  name: "checkboxComponent",
  props: {
    label: {
      type: String,
      require: true,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
    trueText: {
      type: String,
      default: "Yes",
    },
    falseText: {
      type: String,
      default: "No",
    },
  },
  emits: ["update:modelValue"],
};
</script>
<style scoped lang="scss">
.checkbox-slide {
  display: grid;
  grid-template-rows: auto 55px;
  gap: 15px;
  max-width: fit-content;
  &__label {
    padding: 0 20px;
    font-family: var(--manrope);
    font-size: 18px;
    line-height: 24px;
    color: var(--grey);
    font-weight: 400;
  }
  &__container {
    width: 210px;
    display: grid;
    grid-template-columns: 50% 50%;
    position: relative;
  }
  &__true,
  &__false {
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    user-select: none;
    position: relative;
    z-index: 1;
    span {
      font-family: var(--manrope);
      font-size: 18px;
      font-weight: 500;
    }
  }
  &__true {
    color: var(--black-main);
  }
  &__false {
    color: var(--grey);
  }
}
input[type="checkbox"] {
  appearance: none;
  background-color: #fff;
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  border-radius: 74px;
  border: 2px solid var(--bg-main);
  border-radius: 74px;
  transition: 0.2s;

  cursor: pointer;
  &::before {
    content: "";
    position: absolute;
    top: 2px;
    bottom: 2px;
    translate: 2px 0px;
    border-radius: 74px;
    width: 50%;
    transition: all 0.2s;
    background-color: var(--bg-main);
  }

  &:checked {
    &::before {
      translate: calc(100% - 2px) 0;
    }
    & ~ .checkbox-slide__false {
      color: var(--black-main);
    }
    & ~ .checkbox-slide__true {
      color: var(--grey);
    }
  }

  &:disabled {
    cursor: initial;
    border-color: var(--disabled);
    & ~ .checkbox-slide__false,
    & ~ .checkbox-slide__true {
      span {
        color: #dedede;
      }
    }
    &::before {
      background-color: var(--disabled);
    }

    &:hover {
      outline: none;
      background-color: #fff;
      & ~ .checkbox-slide__false {
        span {
          font-weight: 500;
        }
      }
      &:checked {
        & ~ .checkbox-slide__true {
          span {
            font-weight: 500;
          }
        }
      }
    }
    &:active {
      &::before {
        background-color: var(--disabled);
      }
    }
  }

  &:focus-visible {
    border-color: var(--grey);
    background-color: #f5f0ef;
    border-color: var(--grey);
    outline: none;
  }
}

@media (pointer: fine) {
  input[type="checkbox"] {
    &:hover {
      background-color: #f5f0ef;
      & ~ .checkbox-slide__false {
        span {
          font-weight: 600;
        }
      }
      &:checked {
        & ~ .checkbox-slide__true {
          span {
            font-weight: 600;
          }
        }
      }
    }
  }
}
@media (min-width: 768px) {
  .checkbox-slide {
    display: grid;
    grid-template-rows: auto 55px;
    gap: 20px;
    &__label {
      padding: 0 30px;
    }
  }
}
</style>
