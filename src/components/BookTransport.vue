<template>
  <div class="book-transport">
    <div class="container">
      <div class="book-transport__content">
        <img
          :src="require(`@/assets/book-categories/${bookTransport.img}`)"
          alt="transport image"
        />
        <h3>{{ bookTransport.subtitle }}</h3>
        <div class="book-transport__description">
          <p v-for="(p, index) in bookTransport.description" :key="index">
            {{ p }}
          </p>
        </div>
        <ul class="book-transport__included-list">
          <li
            v-for="(included, index) in Object.keys(bookTransport.included)"
            :key="index"
            class="book-transport__included"
          >
            <component :is="morphs[included]" />
            <span>{{ bookTransport.included[included] }}</span>
          </li>
        </ul>
      </div>
      <div class="book-transport__form">
        <div class="book-transport__inputs">
          <slot></slot>
          <Input type="text" label="Name" id="nameInput"></Input>
          <Input type="text" label="Email" id="emailInput"></Input>
          <Input
            type="textarea"
            label="Special requests"
            id="textareaComment"
          ></Input>
        </div>
        <ButtonBlack class="request-button">
          <CrownDecoration></CrownDecoration>
          <span>Make A Request</span>
        </ButtonBlack>
        <div class="callback-buttons">
          <ButtonTransparent>call me back</ButtonTransparent>
          <ButtonTransparent>email me back </ButtonTransparent>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ButtonBlack from "@/components/ButtonBlack.vue";
import CrownDecoration from "@/components/CrownDecoration.vue";
import ButtonTransparent from "@/components/ButtonTransparent.vue";
import Input from "@/components/Input.vue";

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

export default {
  data() {
    return {
      morphs: {
        IDestination,
        IWomen,
        IFamily,
        IClock,
        IMan,
        ICar,
        IHealth,
        ITickets,
        ICase,
        IBuildings,
        IGuides,
        ISail,
        IGlobe,
        IHelicopter,
        IHelicopterCard,
        IPlane,
        ICook,
      },
    };
  },
  components: {
    ButtonBlack,
    ButtonTransparent,
    Input,
    CrownDecoration,
  },
  props: {
    bookTransport: {
      type: Object,
      require: true,
    },
  },
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
    & > :not(:last-child label) {
      margin-bottom: 15px;
    }
  }
  &__form {
    background-color: #fff;
    border-radius: 10px;
    padding: 30px 20px;
    .callback-buttons {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      .btn {
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
      margin-bottom: 20px;
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
      .callback-buttons {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        .btn {
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
      .request-button {
        margin-bottom: 30px;
      }
    }
  }
}
</style>
