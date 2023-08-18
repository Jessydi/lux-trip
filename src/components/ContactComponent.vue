<template>
  <div class="contact-block">
    <div class="container">
      <div class="contact-block__content">
        <template v-if="!contactSent">
          <div class="contact-block__title">
            <h2>Contact</h2>
          </div>
          <form
            @submit="sendContactRequest"
            class="contact-block__form">
            <Input
              class="contact-block__name"
              type="text"
              id="nameInput"
              blured
              placeholder="Name"
              v-model="contactForm.values.name"
              :errorMessage="contactForm.errors.name"
              @focus="contactForm.errors.name = null"></Input>
            <Input
              class="contact-block__phone"
              id="phoneInput"
              type="tel"
              blured
              placeholder="Phone"
              v-model="contactForm.values.phone"
              :errorMessage="contactForm.errors.phone"
              @focus="contactForm.errors.phone = null"></Input>

            <ButtonBlack @click.prevent="sendContactRequest">
              <CrownDecoration></CrownDecoration>
              <span>Call me back</span>
            </ButtonBlack>
          </form>
        </template>
        <h2
          class="contact-block-sent"
          v-else>
          Contact form sent!
        </h2>
      </div>
    </div>
  </div>
</template>
<script>
import v8n from "v8n";

import Input from "@/components/formComponents/Input.vue";
import ButtonBlack from "@/components/formComponents/ButtonBlack.vue";
import CrownDecoration from "@/components/CrownDecoration.vue";

export default {
  components: {
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
                case "email":
                  errorMessage = "please, check email format";
                  break;
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
      }
    },
    sendContactRequest() {
      this.validateContactForm();
      if (!(this.contactForm.errors.name || this.contactForm.errors.phone)) {
        this.contactSent = true;

        console.log("Contact request sent");
      }
    },
  },
};
</script>
<style lang="scss">
.contact-block {
  &-sent {
    text-transform: uppercase;
  }
  &__title {
    margin-bottom: 50px;
  }

  &__content {
    padding: 52px 16px 67px;
    backdrop-filter: blur(4.5px);
    background: rgba(226, 211, 206, 0.2);
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #fff;
  }
  &__form {
    max-width: 350px;
    margin: 0 auto;
    position: relative;
  }
  .input-component {
    margin-bottom: 20px;
  }
  .input {
    &::placeholder {
      text-align: center;
    }
  }
  .btn {
    margin-top: 36px;
  }
  .container {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: calc(100% - 42px);
      height: calc(100% + 12px);
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid #fff;
      top: 50%;
      left: 50%;
      translate: -50% -50%;
    }
  }
}
@media (min-width: 768px) {
  .contact-block {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      background: linear-gradient(
        180deg,
        transparent,
        rgba(226, 211, 206, 0.71) 60px,
        var(--bg-main) 200px
      );
    }
    &__title {
      margin-bottom: 32px;
    }

    &__content {
      padding: 76px 16px 126px;
    }
    .btn {
      margin-top: 53px;
    }
  }
}
</style>
