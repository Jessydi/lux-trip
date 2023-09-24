<template>
  <div class="contact">
    <main>
      <div class="wrapper">
        <h2>Don't miss a chance to talk with us</h2>
        <div class="container">
          <div class="contact__item">
            <div class="contact__name">Phone</div>
            <a
              :href="`tel:${contactData.phone}`"
              class="contact__value contact__phone link"
              >{{ contactData.formatedPhone }}</a
            >

            <ButtonBlack @click.prevent="openCallbackModal">
              <span>Call Me Back</span>
            </ButtonBlack>
            <CallbackModal
              @close="closeCallbackModal"
              :modal="callbackModal"></CallbackModal>
          </div>
          <div class="contact__item">
            <div class="contact__name">Address</div>
            <span class="contact__value">
              Via Peri 17, 6900 Lugano, Switzerland</span
            >
            <div class="contact__name">Email</div>

            <a
              :href="`mailto:${contactData.email}`"
              class="contact__value contact__email link"
              >{{ contactData.email }}</a
            >
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import ButtonBlack from "@/components/formComponents/ButtonBlack.vue";
import CallbackModal from "@/components/modals/CallbackModal.vue";

export default {
  name: "ContactView",
  data() {
    return {
      contactData: {
        phone: "+410782058388",
        formatedPhone: "+41 (078) 205 83 88",
        email: "zavrazhnyj.00@gmail.com",
        address: "Via Peri 17, 6900 Lugano, Switzerland",
      },
      emailbackModal: false,
      callbackModal: false,
    };
  },

  methods: {
    openCallbackModal() {
      this.callbackModal = true;
    },
    closeCallbackModal() {
      this.callbackModal = false;
    },
  },
  components: { ButtonBlack, CallbackModal },
};
</script>
<style scoped lang="scss">
.contact {
  .container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__item {
    padding: 20px 26px;
    border: 1px solid white;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    text-align: center;
    backdrop-filter: blur(20px);
  }
  &__link {
    width: 100%;
    margin-top: 45px;
    position: relative;

    &:before {
      content: "or";
      font-size: 16px;
      line-height: 18px;
      color: var(--black-main);
      text-transform: uppercase;
      text-align: center;
      position: absolute;
      left: 50%;
      top: -30px;
      translate: -50% 0;
    }
  }
  &__name {
    font-family: var(--manrope);
    font-size: 16px;
    line-height: 28px;
    margin-bottom: 5px;
  }

  &__value {
    font-size: 30px;
    line-height: 32px;
    display: block;
    color: var(--black-main);
    &:not(:last-child) {
      margin-bottom: 20px;
    }
    &.contact__phone {
      white-space: nowrap;
    }

    &.contact__email {
      font-size: 24px;
      line-height: 24px;
    }
  }
}
@media (min-width: 768px) {
  .contact {
    .container {
      display: flex;
      flex-direction: row;
      gap: 30px;
    }
    &__item {
      padding: 25px 30px;
      flex: 1 1 200px;
    }
    &__value {
      font-size: 40px;
      line-height: 44px;
    }
  }
}
</style>
