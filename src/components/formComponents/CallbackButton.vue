<template>
  <div class="callback-btn__wrapper">
    <button
      class="callback-btn"
      @click="openModal">
      {{ buttonText }}
    </button>
    <button
      class="callback-btn callback-btn-wide-screen"
      v-bind="$attrs"
      @click="openModal">
      <ICrown></ICrown>
      {{ buttonTextWideScreen }}
      <ICrown></ICrown>
    </button>
    <CallbackModal
      @close="closeModal"
      :modal="modal"></CallbackModal>
  </div>
</template>
<script>
import ICrown from "@/components/icons/ICrown.vue";
import CallbackModal from "@/components/modals/CallbackModal.vue";
export default {
  data() {
    return {
      buttonText: "Call Me",
      buttonTextWideScreen: "Call Me Back",
      modal: false,
    };
  },
  components: {
    ICrown,
    CallbackModal,
  },
  methods: {
    openModal() {
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
    },
  },
};
</script>
<style lang="scss">
.callback-btn {
  border: 1px solid #fff;
  color: var(--black-main);
  border-radius: 61px;
  padding: 10px 12px;
  transition: 0.3s ease;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: 1px;
  white-space: nowrap;
  &:hover,
  &:focus {
    background-color: rgb(141 38 38 / 10%);
  }
  &:active {
    background-color: rgb(141 38 38 / 10%);
    border-color: #000;
    &::after,
    &::before {
      transition: 0.3s ease;
      border-color: #000 transparent #000 #000;
    }
  }
  &-wide-screen {
    display: none;
    position: relative;
    border: 0;
    padding: 11px 25px;
    &::before,
    &::after {
      content: "";
      position: absolute;
      border: 1px solid #fff;
      border-right: 1px solid transparent;
      border-radius: 61px 0 0 61px;
      width: calc(50% - 17px);
      height: 100%;
      top: 0;
      transition: 0.5s ease;
    }
    &::before {
      left: 0;
    }
    &::after {
      right: 0;
      rotate: 180deg;
    }
    .crown {
      position: absolute;
      left: 50%;
      translate: -50% 0;
      &-part {
        transition: 0.8s ease;
      }
      &:first-of-type {
        top: -8px;
      }
      &:last-of-type {
        rotate: 180deg;
        bottom: -8px;
      }
    }
    &:hover,
    &:focus {
      .crown-part {
        fill: #000;
      }
    }
  }
}
@media (min-width: 768px) {
  .callback-btn {
    display: none;

    &-wide-screen {
      display: block;
    }
  }
}
</style>
