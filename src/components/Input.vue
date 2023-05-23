<template>
  <textarea
    class="input"
    :class="{ blur: blured }"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    v-if="type === 'textarea'"
  ></textarea>
  <input
    v-else
    :type="type"
    class="input"
    :class="{ blur: blured }"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
<script>
export default {
  name: "InputComponent",
  props: {
    blured: {
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
    modelValue: {
      type: String,
    },
  },
  emits: ["update:modelValue"],
};
</script>
<style lang="scss">
textarea.input {
  height: auto;
  resize: none;
  padding: 20px 30px;
  border-radius: 20px;
}
.input {
  background-color: transparent;
  color: var(--black-main);
  padding: 10px 30px;
  height: 55px;
  border: 2px solid var(--bg-main);
  border-radius: 74px;
  font-family: var(--manrope);
  font-size: 16px;
  line-height: 28px;
  width: 100%;

  &::placeholder {
    color: var(--black-main);
  }
  &.blur {
    backdrop-filter: blur(10px);
    border-color: #fff;
  }
}
</style>
