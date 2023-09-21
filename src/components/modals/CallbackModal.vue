<template>
  <Modal
    class="callback-modal"
    @close="$emit('close')"
    modalTitle="Call me back"
    :modal="modal">
    <template v-if="!contactSent">
      <form
        method="dialog"
        @submit="sendContactRequest">
        <Input
          type="text"
          id="nameInputModal"
          name="firstName"
          placeholder="Name"
          centerPlaceholder
          v-model="contactForm.values.name"
          :errorMessage="contactForm.errors.name"
          @focus="contactForm.errors.name = null"></Input>
        <Input
          type="text"
          id="phoneInputModal"
          name="phone"
          autocomplete="tel"
          placeholder="Phone"
          centerPlaceholder
          v-model="contactForm.values.phone"
          :errorMessage="contactForm.errors.phone"
          @focus="contactForm.errors.phone = null"></Input>

        <ButtonBlack
          type="submit"
          @click.prevent="sendContactRequest">
          <CrownDecoration></CrownDecoration>
          <span>Call me back</span>
        </ButtonBlack>
      </form>
    </template>
    <h2
      class="callback-modal-sent"
      v-else>
      Contact form sent!
    </h2>
  </Modal>
</template>
<script>
import v8n from "v8n";

import Modal from "@/components/modals/ModalComponent.vue";
import Input from "@/components/formComponents/Input.vue";
import ButtonBlack from "@/components/formComponents/ButtonBlack.vue";
import CrownDecoration from "@/components/CrownDecoration.vue";
export default {
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
  components: {
    Modal,
    Input,
    ButtonBlack,
    CrownDecoration,
  },
  data() {
    return {
      error: false,
      errorMessage: null,
      contactSent: false,
      contactForm: {
        values: {
          name: null,
          phone: null,
        },
        errors: {
          name: null,
          phone: null,
        },
      },
    };
  },
  watch: {
    modal(modal) {
      if (modal) {
        this.contactSent = false;
      }
    },
  },
  methods: {
    validateContactForm() {
      const contactSchema = v8n().schema({
        name: v8n().not.null().string().not.empty(),
        phone: v8n()
          .not.null()
          .not.empty()
          .pattern(/^\+[0-9()-]+$/),
      });
      try {
        contactSchema.check(this.contactForm.values);
        return true;
      } catch (error) {
        error.cause.forEach((e) => {
          let errorMessage = "";
          switch (e.rule.name) {
            case "null":
              errorMessage = "this field is required";
              break;
            case "empty":
              errorMessage = "this field is required";
              break;
            case "pattern":
              switch (e.target) {
                case "phone":
                  errorMessage = "invalid phone number";
                  break;
              }
              break;
            default:
              errorMessage = "invalid value";
              break;
          }
          this.contactForm.errors[e.target] = errorMessage;
        });
        return false;
      }
    },
    sendContactRequest() {
      if (this.validateContactForm()) {
        this.contactSent = true;
        setTimeout(() => {
          this.$emit("close");
        }, 1000);
      }
    },
  },
};
</script>
<style lang="scss">
.callback-modal {
  form {
    display: grid;
    gap: 20px;
    .btn {
      margin-top: 50px;
    }
  }
}
</style>
