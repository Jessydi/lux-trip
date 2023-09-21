<template>
  <dialog
    @click="onDialogClick"
    @close="$emit('close')"
    ref="modal"
    class="modal"
    :class="{ hide: hiding }"
    autofocus
    v-bind="$attrs"
    @cancel.prevent="$emit('close')">
    <div class="modal-content">
      <div
        class="modal__title"
        v-if="modalTitle">
        <CrownDecoration></CrownDecoration>
        <span>{{ modalTitle }}</span>
      </div>
      <slot></slot>
      <button
        class="modal-close"
        @click.prevent="$emit('close')"></button>
    </div>
  </dialog>
</template>
<script>
import { nextTick } from "vue";

import CrownDecoration from "@/components/CrownDecoration.vue";

import { useLuxTripStore } from "@/store/index";
import { mapStores } from "pinia";

export default {
  data() {
    return {
      hiding: false,
    };
  },
  components: {
    CrownDecoration,
  },
  props: {
    modal: {
      type: Boolean,
      default: false,
    },
    modalTitle: {
      type: String,
    },
  },
  emits: ["close"],
  computed: {
    ...mapStores(useLuxTripStore),
  },
  methods: {
    onDialogClick(event) {
      if (event.target === this.$refs.modal) {
        this.$emit("close");
      }
    },
  },
  watch: {
    modal: {
      async handler(modalState, oldModalState) {
        if (modalState) {
          await nextTick();
          this.$refs.modal.showModal();
          this.luxTripStore.toggleModal();
        } else if (oldModalState) {
          this.hiding = true;
          this.$refs?.modal?.addEventListener(
            "animationend",
            () => {
              this.hiding = false;
              this.$refs?.modal?.close();
              this.luxTripStore.toggleModal();
            },
            { once: true }
          );
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="scss">
.modal {
  left: 50%;
  top: 50%;
  translate: -50% calc(-50% - 54px);
  max-width: 885px;
  border: none;
  width: calc(100% - 40px);
  background-color: transparent;
  padding-top: 54px;
  form {
    max-width: 350px;
    margin: 0 auto;
  }
  &[open] {
    animation: show 0.6s ease normal;
  }
  @keyframes show {
    from {
      opacity: 0;
      transform: translateY(-20%);
    }
    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }
  &.hide {
    animation: hide 0.6s ease normal;
  }
  @keyframes hide {
    to {
      opacity: 0;
      transform: translateY(-20%);
    }
  }
  &-close {
    position: absolute;
    cursor: pointer;
    height: 35px;
    width: 35px;
    right: 15px;
    top: 15px;
    &::after,
    &::before {
      content: "";
      position: absolute;
      height: 15px;
      width: 2px;
      left: 50%;
      top: 50%;
      transform-origin: center;
      translate: -50% -50%;
      background-color: var(--grey);
      transition: 0.2s;
    }
    &::after {
      rotate: -45deg;
    }
    &::before {
      rotate: 45deg;
    }
    &:hover {
      &::after,
      &::before {
        background-color: var(--black-main);
      }
    }
  }
  &__title {
    background-color: #fff;
    border-radius: 67px;
    padding: 13px 15px;
    font-size: 26px;
    line-height: 28px;
    white-space: nowrap;
    color: var(--black-main);
    max-width: min(calc(100% - 32px), 330px);
    text-align: center;
    position: absolute;
    margin: 0 auto;
    top: 0px;
    translate: -50% -50%;
    left: 50%;
    z-index: 1;
    span {
      position: relative;
      z-index: 1;
      overflow: hidden;
      display: block;
    }
  }
  &-content {
    position: relative;
    padding: 60px 20px;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
  }
  &::backdrop {
    background-color: rgba(29, 29, 27, 0);
  }
  &[open]::backdrop {
    animation: backdrop-fade 0.6s ease forwards;
  }
  &.hide::backdrop {
    animation: backdrop-fade 1.2s ease backwards;
    animation-direction: reverse;
  }
  @keyframes backdrop-fade {
    from {
      background: transparent;
    }
    to {
      background-color: rgba(29, 29, 27, 0.4);
    }
  }
}
@media (min-width: 768px) {
  .modal {
    translate: -50% calc(-50% - 70px);
    padding-top: 70px;
    &-content {
      padding: 80px 40px;
    }
    &__title {
      font-size: 60px;
      line-height: 58px;
      max-width: 535px;
      width: 100%;
    }
    &::backdrop {
      background-color: rgba(29, 29, 27, 0.4);
    }
  }
}
</style>
