<template>
  <div class="select">
    <span class="select__label" id="jobLabel">Main job role</span>
    <div class="select__wrapper">
      <select class="select-native" aria-labelledby="jobLabel">
        <option
          v-for="option in options"
          :value="option"
          :key="options.indexOf(option)"
        >
          {{ option }}
        </option>
      </select>
      <div
        @click="toggleSelectCustom"
        class="select-custom"
        :aria-hidden="!isOptionVisible"
      >
        <div class="select-custom__trigger">Select role...</div>
        <div class="select-custom__options" v-show="isOptionVisible">
          <div
            v-for="option in options"
            :key="options.indexOf(option)"
            :data-value="option"
            class="select-custom__option"
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
  },
  data() {
    return {
      optionChecked: "",
      optionHoveredIndex: -1,
      isOptionVisible: false,
    };
  },
  methods: {
    toggleSelectCustom() {
      if (this.isOptionVisible) {
        console.log("");
      } else {
        console.log("");
      }
      this.isOptionVisible = !this.isOptionVisible;
    },
  },
};
</script>
<style scoped lang="scss">
.select-native,
.select-custom {
  position: relative;
  width: 22rem;
  height: 4rem;
}
.select-custom {
  position: absolute;
  top: 0;
  left: 0;
}
@media (hover: hover) {
  .select-custom {
    display: block;
  }
  .select-native:focus + .select-custom {
    display: none;
  }
}

/* Add the focus states too, They matter, always! */
.select-native:focus,
.select-custom .select-custom__trigger {
  outline: none;
  box-shadow: white 0 0 0 0.2rem, #ff821f 0 0 0 0.4rem;
}

//
// Rest of the styles to create the custom select.
// Just make sure the native and the custom have a similar "box" (the trigger).
//

.select {
  position: relative;
}

.select__label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.4rem;
}

.select__wrapper {
  position: relative;
}

.select-native,
.select-custom__trigger {
  font-size: 1.6rem;
  background-color: #fff;
  border: 1px solid #6f6f6f;
  border-radius: 0.4rem;
}

.select-native {
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 0.8rem;
  padding: 0rem 0.8rem;
}

.select-custom__trigger {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 0.8rem 0.8rem;
  cursor: pointer;
}

.select-custom__trigger::after {
  content: "▾";
  position: absolute;
  top: 0;
  line-height: 3.8rem;
  right: 0.8rem;
}

.select-custom__trigger:hover {
  border-color: #8c00ff;
}

.select-custom__options {
  position: absolute;
  top: calc(3.8rem + 0.8rem);
  left: 0;
  width: 100%;
  border: 1px solid #6f6f6f;
  border-radius: 0.4rem;
  background-color: #fff;
  box-shadow: 0 0 4px #e9e1f8;
  z-index: 1;
  padding: 0.8rem 0;
  display: none;
}

.select-custom .select-custom__options {
  display: block;
}

.select-custom__option {
  position: relative;
  padding: 0.8rem;
  padding-left: 2.5rem;
}

.select-custom__option.isHover,
.select-custom__option:hover {
  background-color: #865bd7; // contrast AA
  color: white;
  cursor: default;
}

.select-custom__option:not(:last-of-type)::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #d3d3d3;
}

.select-custom__option.isActive::before {
  content: "✓";
  position: absolute;
  left: 0.8rem;
}
</style>
