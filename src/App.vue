<template>
  <div class="app">
    <TheHeader></TheHeader>
    <router-view />
    <TheFooter></TheFooter>
  </div>
</template>
<script>
import TheHeader from "@/components/Header";
import TheFooter from "@/components/Footer";
export default {
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Forum&family=Manrope:wght@200;300;400;500;600;700;800&display=swap");

*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Forum", Arial, Helvetica, sans-serif;
}
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1110px;
  margin: 0 auto;
  padding: 0 15px;
  width: 100%;
}
ul,
ol {
  li {
    list-style: none;
  }
}
a {
  text-decoration: none;
  color: #000;
  transition: 0.2s;
  &:hover {
    opacity: 0.7;
  }
}
button {
  border: 0;
  background-color: transparent;
  text-transform: uppercase;
  cursor: pointer;
  &.btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 55px;
    padding: 15px 23px;
    gap: 8px;
    font-size: 24px;
    line-height: 27px;
    border-radius: 74px;
    transition: all 0.2s ease-in;
    &:hover,
    &:focus {
      opacity: 0.8;
    }

    &-black {
      background-color: var(--black-main);
      color: #fff;
      &:active {
        opacity: 1;
        box-shadow: 0 0 5px 1px var(--black-main);
      }
      &::before,
      &::after {
        border-color: var(--black-main);
      }
      .crown {
        path {
          fill: #000;
        }
      }
    }
  }
}
input {
  font-family: "Manrope", Arial, Helvetica, sans-serif;
  color: var(--black-main);
  &::placeholder {
    color: var(--black-main);
  }
}
main {
  background: linear-gradient(
    rgba(226, 211, 206, 0),
    rgba(226, 211, 206, 0.71) 200px,
    var(--bg-main) 350px
  );

  position: relative;
}
:root {
  --bg-main: #e2d3ce;
  --black-main: #0c0b10;
  --home-title: #fcfcfc;
  --gray: #79655e;
}

.crown-decoration {
  position: relative;
  border: 0;
  padding: 11px 25px;
  &::before,
  &::after {
    content: "";
    position: absolute;
    border: 1px solid #fff;
    border-right: 1px solid transparent;
    border-radius: 100px 0 0 100px;
    width: calc(50% - 50px);
    height: calc(100% + 10px);
    bottom: 0;
    transition: 0.5s ease;
  }
  &::before {
    left: 15px;
  }
  &::after {
    right: 15px;
    rotate: 180deg;
  }
  .crown {
    position: absolute;
    left: 50%;
    translate: -50% 0;
    &-part {
      transition: 0.8s ease;
    }
    &:first-of-type {
      height: 20px;
      width: auto;
      bottom: calc(100% + 6px);
    }
    &:last-of-type {
      rotate: 180deg;
      height: 15px;
      width: auto;
      top: calc(100% + 3px);
    }
  }
}
@media (min-width: 768px) {
  .crown-decoration {
    &::before,
    &::after {
      width: calc(50% - 60px);
    }
    &::before {
      left: 25px;
    }
    &::after {
      right: 25px;
      rotate: 180deg;
    }
  }
}
</style>
