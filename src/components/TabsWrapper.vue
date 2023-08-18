<template>
  <div class="tabs">
    <div class="tabs__header scrollable horizontal">
      <ul class="tabs__list">
        <li
          v-for="(title, index) in tabsTitles"
          :key="index"
          :class="{ active: selectedTitle == title }"
          @click="selectTab(title)"
          tabindex="0">
          {{ title }}
        </li>
      </ul>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import { computed } from "vue";

export default {
  data() {
    return {
      tabsTitles: this.$slots
        .default()[0]
        .children.map((category) => category.props.title),
      selectedTitle: this.$slots.default()[0].children[0].props.title,
    };
  },
  methods: {
    selectTab(title) {
      this.selectedTitle = title;
      this.$emit("selected", this.selectedTitle);
    },
  },
  provide() {
    return {
      selectedTitle: computed(() => this.selectedTitle || this.tabsTitles[0]),
    };
  },
  emits: ["selected"],
};
</script>
<style lang="scss">
// @media (hover: hover) {
//   .tabs {
//     &__header {
//     }
//   }
// }
.tabs {
  &__header {
    overflow-x: auto;
    padding: 1px 1px 5px 1px;
    margin-bottom: 10px;
  }
  &__list {
    display: flex;
    gap: 40px;
    margin-bottom: 20px;

    li {
      font-size: 24px;
      line-height: 24px;
      color: var(--grey);
      position: relative;
      cursor: pointer;
      transition: 0.3s;
      white-space: nowrap;
      &:first-child {
        margin-left: auto;
      }
      &:last-child {
        margin-right: auto;
      }
      &::after {
        content: url(@/components/icons/IRhombusesDecoration.svg);
        position: absolute;
        bottom: -20px;
        left: 50%;
        translate: -50%;
        opacity: 0;
        transition: 0.3s;
      }
      &.active {
        color: var(--black-main);
        cursor: auto;
        &::after {
          opacity: 1;
        }
      }
      &:focus {
        outline: none;
      }
      &:focus-visible {
        outline: 1px solid var(--grey);
      }
    }
  }
}
</style>
