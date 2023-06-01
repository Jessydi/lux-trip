<template>
  <div class="contact">
    <div class="container">
      <div class="contact__content">
        <div class="contact__title">
          <IDoubleRhombus></IDoubleRhombus>
          <h2>Contact</h2>
        </div>
        <form class="contact__form">
          <InputComponent
            class="contact__name"
            type="text"
            blured
            placeholder="Name"
          ></InputComponent>
          <InputComponent
            class="contact__phone"
            type="tel"
            blured
            placeholder="Phone"
          ></InputComponent>
          <ButtonBlack>
            <CrownDecoration></CrownDecoration>
            <span>Start a trip request</span>
          </ButtonBlack>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import InputComponent from "@/components/Input.vue";
import ButtonBlack from "@/components/ButtonBlack.vue";
import CrownDecoration from "@/components/CrownDecoration.vue";

import IDoubleRhombus from "./icons/IDoubleRhombus.vue";

export default {
  components: {
    InputComponent,
    ButtonBlack,
    CrownDecoration,
    IDoubleRhombus,
  },
};
</script>
<style lang="scss">
.contact {
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
  .contact {
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
