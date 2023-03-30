<template>
  <input
    :type="type"
    class="input"
    :class="{ blur: blured }"
    :placeholder="placeholder"
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
  },
};
</script>
<style lang="scss">
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
