<template>
  <div class="book-transport">
    <div class="container">
      <div class="book-transport__content">
        <picture>
          <source
            type="image/avif"
            :srcset="
              require(`@/assets/book-categories/${bookTransport.img}.avif`)
            " />
          <img
            :srcset="
              require(`@/assets/book-categories/${bookTransport.img}.webp`)
            "
            alt="transport image" />
        </picture>
        <h3>{{ bookTransport.subtitle }}</h3>
        <div class="book-transport__description">
          <p
            v-for="(p, index) in bookTransport.description"
            :key="index">
            {{ p }}
          </p>
        </div>
        <ul class="book-transport__included-list">
          <li
            v-for="(included, index) in Object.keys(bookTransport.included)"
            :key="index"
            class="book-transport__included">
            <component :is="morphs[included]" />
            <span>{{ bookTransport.included[included] }}</span>
          </li>
        </ul>
      </div>
      <form class="book-transport__form white">
        <template v-if="!formSent">
          <div class="book-transport__inputs">
            <slot></slot>
            <Input
              type="text"
              label="First name"
              placeholder="Write your first name"
              v-model="contactFormObject.values.name"
              name="firstName"
              id="firstNameInput"
              :errorMessage="contactFormObject.errors.name"
              @focus="contactFormObject.errors.name = null"></Input>
            <Input
              type="email"
              label="Email"
              name="email"
              placeholder="Write your email"
              v-model="contactFormObject.values.email"
              id="emailInput"
              :errorMessage="contactFormObject.errors.email"
              @focus="contactFormObject.errors.email = null"></Input>
            <Input
              type="textarea"
              label="Special requests"
              v-model="contactFormObject.values.specialRequest"
              id="textareaComment"></Input>
          </div>

          <ButtonBlack
            class="request-button"
            @click.prevent="validateBooking">
            <CrownDecoration></CrownDecoration>
            <span>Make A Request</span>
          </ButtonBlack>
          <ContactButtons></ContactButtons>
        </template>

        <template v-else>
          <div class="book-transport__form-sent">
            <h2>
              Thank you for order! <br />
              We will call you!
            </h2>

            <router-link
              :to="{
                name: 'home',
              }">
              <ButtonBlack>
                <CrownDecoration></CrownDecoration>
                <span>Home page</span>
              </ButtonBlack>
            </router-link>
          </div>
        </template>
      </form>
    </div>
  </div>
</template>
<script>
import v8n from "v8n";

import { nextTick } from "vue";

import { mapStores } from "pinia";
import { useLuxTripStore } from "../store/index";

import ButtonBlack from "@/components/formComponents/ButtonBlack.vue";
import CrownDecoration from "@/components/CrownDecoration.vue";
import Input from "@/components/formComponents/Input.vue";
import ContactButtons from "@/components/formComponents/ContactButtons.vue";

import IClock from "@/components/icons/IClock.vue";
import IMan from "@/components/icons/IMan.vue";
import ICar from "@/components/icons/ICar.vue";
import IHealth from "@/components/icons/IHealth.vue";
import ITickets from "@/components/icons/ITickets.vue";
import ICase from "@/components/icons/ICase.vue";
import IDestination from "@/components/icons/IDestination.vue";
import IWomen from "@/components/icons/IWomen.vue";
import IFamily from "@/components/icons/IFamily.vue";
import IBuildings from "@/components/icons/IBuildings.vue";
import IGuides from "@/components/icons/IGuides.vue";
import ISail from "@/components/icons/ISail.vue";
import IGlobe from "@/components/icons/IGlobe.vue";
import IHelicopter from "@/components/icons/IHelicopter.vue";
import IHelicopterCard from "@/components/icons/IHelicopterCard.vue";
import IPlane from "@/components/icons/IPlane.vue";
import ICook from "@/components/icons/ICook.vue";

import { shallowRef } from "vue";
export default {
  data() {
    return {
      morphs: {
        IDestination: shallowRef(IDestination),
        IClock: shallowRef(IClock),
        IWomen: shallowRef(IWomen),
        IFamily: shallowRef(IFamily),
        IMan: shallowRef(IMan),
        ICar: shallowRef(ICar),
        IHealth: shallowRef(IHealth),
        ITickets: shallowRef(ITickets),
        ICase: shallowRef(ICase),
        IBuildings: shallowRef(IBuildings),
        IGuides: shallowRef(IGuides),
        ISail: shallowRef(ISail),
        IGlobe: shallowRef(IGlobe),
        IHelicopter: shallowRef(IHelicopter),
        IHelicopterCard: shallowRef(IHelicopterCard),
        IPlane: shallowRef(IPlane),
        ICook: shallowRef(ICook),
      },
      contactFormSchema: {
        email: v8n().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        name: v8n().not.null().string().not.empty().minLength(1),
      },
      contactFormObject: {
        values: {
          name: null,
          email: null,
          specialRequest: null,
        },
        errors: {
          name: null,
          email: null,
          specialRequest: null,
        },
      },
      formSent: false,
    };
  },
  components: {
    ButtonBlack,
    Input,
    CrownDecoration,
    ContactButtons,
  },
  props: {
    bookTransport: {
      type: Object,
      require: true,
    },
    formSchema: {
      type: Object,
      require: true,
    },
    formObject: {
      type: Object,
      require: true,
    },
  },
  computed: {
    ...mapStores(useLuxTripStore),
  },
  methods: {
    sendRequest() {
      this.formSent = true;
    },
    async validateBooking() {
      const schema = v8n().schema({
        ...this.formSchema,
        ...this.contactFormSchema,
      });
      const transportErrorObject = {};
      let validationPassed = true;
      try {
        schema.check({ ...this.formObject, ...this.contactFormObject.values });
      } catch (error) {
        validationPassed = false;
        error.cause.forEach((e) => {
          let errorMessage = "";
          console.log(e);
          switch (e.rule.name) {
            case "null":
              errorMessage = "This field is required";
              break;
            case "empty":
              errorMessage = "This field is required";
              break;
            case "minLength":
              errorMessage = `Min ${e.rule.args[0]} symbol`;
              break;
            case "pattern":
              switch (e.target) {
                case "email":
                  errorMessage = "Please, check email format";
                  break;
                default:
                  errorMessage = "Invalid format";
                  break;
              }
              break;
            default:
              errorMessage = "Invalid value";
              break;
          }
          if (Object.hasOwn(this.contactFormObject.values, e.target)) {
            this.contactFormObject.errors[e.target] = errorMessage;
          } else {
            transportErrorObject[e.target] = errorMessage;
          }
          this.$emit("validated", transportErrorObject);
        });
      }
      await nextTick();
      this.luxTripStore.scrollToError();
      if (validationPassed) {
        this.sendRequest();
      }
    },
  },
  emits: ["validated"],
};
</script>
<style scoped lang="scss">
.book-transport {
  .container {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
  &__content {
    img {
      width: 100%;
      border-radius: 10px;
      margin-bottom: 20px;
    }
    h3 {
      font-size: 30px;
      line-height: 32px;
      margin-bottom: 20px;
      font-weight: 400;
      color: var(--black-main);
    }
  }

  &__description {
    margin-bottom: 20px;
    p {
      line-height: 24px;
      &:not(:last-of-type) {
        margin-bottom: 20px;
      }
    }
  }

  &__included {
    display: flex;
    flex-direction: column;
    align-items: center;
    svg {
      height: 50px;
      margin-bottom: 10px;
    }
    &-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 35px;
      justify-items: center;
      text-align: center;
    }
  }
  &__inputs {
    margin-bottom: 55px;
    & > :not(:last-child) {
      margin-bottom: 15px;
    }
  }
  &__form {
    padding: 30px 20px;

    &-sent {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      h2 {
        margin-bottom: 40px;
      }
    }
    .request-button {
      margin-bottom: 30px;
    }
  }
}
@media (min-width: 768px) {
  .book-transport {
    .container {
      flex-direction: row;
      gap: 30px;
    }
    &__content {
      flex: 1 1 50%;

      img {
        margin-bottom: 30px;
      }
      h3 {
        font-size: 40px;
        line-height: 40px;
      }
    }

    &__description {
      p {
        line-height: 28px;
      }
    }

    &__included {
      flex-direction: row;
      align-items: center;
      gap: 40px;
      svg {
        height: auto;
        width: 50px;
        margin-bottom: 0;
      }
      &-list {
        grid-template-columns: 1fr;
        gap: 30px;
        justify-items: left;
        text-align: left;
      }
    }
    &__form {
      padding: 30px 50px 50px;
      height: fit-content;
      flex: 0 1 50%;
      min-width: 410px;
    }
  }
}
</style>
