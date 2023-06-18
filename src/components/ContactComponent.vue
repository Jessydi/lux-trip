<template>
  <div class="contact-block">
    <div class="container">
      <div class="contact-block__content">
        <div class="contact-block__title">
          <h2>Contact</h2>
        </div>
        <form
          @submit="sendContactRequest"
          class="contact-block__form">
          <Input
            class="contact-block__name"
            type="text"
            blured
            placeholder="Name"
            v-model="contactForm.name"></Input>
          <Input
            class="contact-block__phone"
            type="tel"
            blured
            placeholder="Phone"
            v-model="contactForm.phone"></Input>

          <ButtonBlack @click.prevent="sendContactRequest">
            <CrownDecoration></CrownDecoration>
            <span>Start a trip request</span>
          </ButtonBlack>

          <ErrorMessage
            :error="error"
            :errorMessage="errorMessage"></ErrorMessage>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Input from "@/components/Input.vue";
import ButtonBlack from "@/components/ButtonBlack.vue";
import CrownDecoration from "@/components/CrownDecoration.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";

export default {
  components: {
    Input,
    ButtonBlack,
    ErrorMessage,
    CrownDecoration,
  },
  data() {
    return {
      error: false,
      errorMessage: null,
      contactForm: {
        name: null,
        phone: null,
      },
    };
  },
  methods: {
    validateContactForm() {
      this.error = false;

      if (!this.contactForm.name) {
        this.error = true;
        this.errorMessage = "Please, enter your name";
        setTimeout(() => {
          this.error = false;
        }, 5000);
        return;
      }
      if (!this.contactForm.phone) {
        this.error = true;
        this.errorMessage =
          "Please, enter your phone, it must be in international format";
        setTimeout(() => {
          this.error = false;
        }, 5000);
        return;
      }
      const phoneRegExp = new RegExp(/^\+[0-9()-]+$/);
      if (!phoneRegExp.test(this.contactForm.phone)) {
        this.error = true;
        this.errorMessage =
          "Your phone must be in international format, and not contain improper characters";
        setTimeout(() => {
          this.error = false;
        }, 5000);
        return;
      }
    },
    sendContactRequest() {
      this.validateContactForm();
      if (!this.error) {
        console.log("Contact request sent");
      }
    },
  },
};
</script>
<style lang="scss">
.contact-block {
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
  .input {
    margin-bottom: 14px;
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
