<template>
  <div class="trip-card-loading">
    <div class="trip-card-loading__image"></div>

    <div class="trip-card-loading__content">
      <div class="trip-card-loading__description">
        <div class="block country"></div>
        <div class="block name"></div>
        <div class="trip-card-loading__price">
          <div class="block from"></div>
          <div class="block price"></div>
        </div>
      </div>
      <div class="rating block"></div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
.trip-card-loading {
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  display: flex;
  transition: all 0.1s ease-in;
  .block {
    // background-color: hsla(15, 26%, 85%, 0.6);
    border-radius: 5px;
    animation: skeleton-loading 1.2s linear infinite alternate;
    @keyframes skeleton-loading {
      0% {
        background-color: hsla(15, 26%, 85%, 0.8);
      }
      100% {
        background-color: hsla(15, 26%, 100%, 0.2);
      }
    }
    &.country {
      height: 15px;
      max-width: 30%;
    }
    &.name {
      height: 32px;
    }
    &.from {
      height: 12px;
      max-width: 20%;
    }
    &.price {
      height: 21px;
      max-width: 40%;
    }
    &.rating {
      width: 18px;
      align-self: stretch;
    }
  }
  &:hover {
    scale: 1.03;
    .trip-card-loading__image {
      scale: 1.07;
    }
  }
  &__description,
  &__price {
    flex: 1 1 auto;
    gap: 6px;
    display: flex;
    flex-direction: column;
  }
  &__price {
    margin-top: 30px;
  }
  &__image {
    width: 100%;
    object-fit: cover;
    transition: 0.3s;
    aspect-ratio: 350/571;
    background: linear-gradient(rgb(11, 32, 52, 0.15) 0%, var(--blue) 100%);
    animation: gradient 1.2s ease infinite alternate;
    background-size: 100% 150%;
    @keyframes gradient {
      0% {
        background-position: 0% 10%;
      }
      100% {
        background-position: 0% 90%;
      }
    }
    &-link {
      width: 100%;
      &:hover {
        opacity: 1;
      }
    }
  }

  &__content {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 30px;
    color: white;
    gap: 10px;
  }

  &__location {
    display: flex;
    align-items: center;
    gap: 5px;
    span {
      font-family: var(--manrope);
      font-weight: 500;
      font-size: 11px;
      line-height: 15px;
    }
  }
}
@media (min-width: 768px) {
  .trip-card-loading {
    &__content {
      padding: 35px;
    }

    &__name {
      margin-bottom: 30px;
    }

    .block {
      &.country {
        height: 16px;
        max-width: 30%;
      }
      &.name {
        height: 36px;
      }
      &.from {
        height: 13px;
        max-width: 20%;
      }
      &.price {
        height: 24px;
        max-width: 40%;
      }
    }
  }
}
</style>
