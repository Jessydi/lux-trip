<template>
  <div class="contact-buttons">
    <ButtonTransparent @click.prevent="openCallbackModal"
      >call me back</ButtonTransparent
    >
    <ButtonTransparent @click.prevent="openEmailbackModal"
      >email me back
    </ButtonTransparent>
    <CallbackModal
      @close="closeCallbackModal"
      :modal="callbackModal"></CallbackModal>

    <EmailbackModal
      @close="closeEmailbackModal"
      :modal="emailbackModal"></EmailbackModal>
  </div>
</template>
<script>
import ButtonTransparent from "@/components/formComponents/ButtonTransparent.vue";
import CallbackModal from "@/components/modals/CallbackModal.vue";
import EmailbackModal from "@/components/modals/EmailbackModal.vue";

export default {
  components: {
    ButtonTransparent,
    CallbackModal,
    EmailbackModal,
  },
  data() {
    return {
      emailbackModal: false,
      callbackModal: false,
    };
  },
  methods: {
    openEmailbackModal() {
      this.emailbackModal = true;
    },
    closeEmailbackModal() {
      this.emailbackModal = false;
    },
    openCallbackModal() {
      this.callbackModal = true;
    },
    closeCallbackModal() {
      this.callbackModal = false;
    },
  },
};
</script>
<style lang="scss">
.contact-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  a {
    flex: 1 1 150px;
  }
  &::before {
    content: "or";
    text-transform: uppercase;
    text-align: center;
    display: block;
    flex: 1 1 100%;
    font-size: 16px;
    line-height: 18px;
    color: var(--black-main);
  }
}
</style>
