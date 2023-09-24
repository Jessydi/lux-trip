<template>
  <label class="checkbox">
    <input
      type="checkbox"
      name="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)" />
    <span>{{ label }}</span>
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
    },
  },
  emits: ["update:modelValue"],
};
</script>
<style scoped lang="scss">
.checkbox {
  display: grid;
  grid-template-columns: 40px auto;
  gap: 12px;
  max-width: fit-content;

  span {
    font-family: var(--manrope);
    font-size: 18px;
    line-height: 24px;
    font-weight: 400;
    color: var(--grey);
    align-self: center;
  }
}
input[type="checkbox"] {
  appearance: none;
  background-color: #fff;
  margin: 0;
  color: var(--bg-main);
  width: 40px;
  height: 40px;
  border: 2px solid var(--bg-main);
  border-radius: 10px;
  display: grid;
  place-content: center;
  transition: all 0.2s;
  cursor: pointer;
  & + span {
    cursor: pointer;
  }
  &:disabled {
    cursor: initial;
    & + span {
      cursor: initial;
    }
    &::before {
      background-color: var(--disabled);
    }
    &:hover {
      outline: none;
      background-color: #fff;
      & + span {
        font-weight: 400;
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
    outline: none;
  }
  &:active {
    &::before {
      background-color: var(--grey);
    }
  }

  &::before {
    content: "";
    width: 22px;
    height: 22px;
    transform: scale(0);
    transition: all 0.2s;

    background-color: var(--bg-main);
    border-radius: 5px;
  }

  &:checked::before {
    transform: scale(1);
  }
}

@media (pointer: fine) {
  input[type="checkbox"] {
    &:hover {
      outline: 1px solid var(--bg-main);
      background-color: #f5f0ef;
      & + span {
        font-weight: 500;
      }
    }
  }
}
</style>
