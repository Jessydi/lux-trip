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
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: var(--forum);
}
.disable-scroll {
  overflow: hidden;
}
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  & > div {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
  }
  .scrollable {
    scrollbar-color: var(--scrollbar-foreground) var(--scrollbar-background);
    &::-webkit-scrollbar-thumb {
      background-color: var(--scrollbar-foreground);
      // border-left: 4px solid white;
      // border-right: 4px solid white;
    }
    &::-webkit-scrollbar {
      // width: 10px;
      width: 2px;
      height: 12px;
    }
    &::-webkit-scrollbar-track {
      margin: 20px 0 0px 0;
      // border-left: 4px solid white;
      // border-right: 4px solid white;
      background-color: var(--scrollbar-background);
    }
    &.horizontal {
      &::-webkit-scrollbar-thumb,
      &::-webkit-scrollbar-track {
        border-top: 4px solid var(--scrollbar-background);
        border-bottom: 4px solid var(--scrollbar-background);
        border-left: none;
        border-right: none;
      }
      &::-webkit-scrollbar-track {
        border: 4px solid var(--scrollbar-background) none 4px solid
          var(--scrollbar-background) none;
      }
    }
  }
}

.container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
  width: 100%;
}
h2 {
  font-size: 40px;
  line-height: 44px;
  font-weight: 400;
  text-align: center;
  color: var(--black-main);
}
ul,
ol {
  li {
    list-style: none;
  }
}
a,
.link {
  text-decoration: none;
  color: #000;
  transition: 0.2s;
  display: inline-block;
  cursor: pointer;
}
.link {
  &:hover {
    opacity: 0.7;
  }
}
img {
  display: block;
}
*:disabled {
  border-color: var(--disabled) !important;
}
button {
  border: 0;
  background-color: transparent;
  text-transform: uppercase;
  cursor: pointer;
}
form {
  border-radius: 10px;
  &.white {
    background-color: #fff;
  }
}
p {
  font-size: 16px;
  line-height: 24px;
  font-family: var(--manrope);
  color: var(--black-main);
}
.btn {
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
  width: 100%;
  position: relative;
  white-space: nowrap;
  min-width: 200px;
  &:hover,
  &:focus,
  &:focus-visible {
    outline: none;
  }
}
input,
textarea {
  display: block;
  font-family: var(--manrope);
  color: var(--black-main);
  &::placeholder {
    color: var(--black-main);
  }
}

.input-date {
  &:focus,
  &:focus-visible {
    outline: none;
    border: 0;
  }
  &:focus-visible {
    background-color: rgba(226, 211, 206, 0.5);
  }
}

main {
  background: linear-gradient(transparent, var(--bg-main) 100px),
    no-repeat top -10px left 0px url(https://firebasestorage.googleapis.com/v0/b/firetrip-b1efe.appspot.com/o/backgrounds%2Fclouds-main-color-1.avif?alt=media&token=4a889dd6-90d8-4c95-bec7-3c9703b9a518),
    no-repeat top -10px right -150px
      url(https://firebasestorage.googleapis.com/v0/b/firetrip-b1efe.appspot.com/o/backgrounds%2Fclouds-main-color-2.avif?alt=media&token=cdc1af7b-45e1-4502-bcb8-f83c62665414);

  position: relative;
  flex: 1 1 auto;
  .wrapper {
    overflow: hidden;
    isolation: isolate;
    & > div {
      margin-bottom: 80px;
    }
    & > div:last-child {
      margin-bottom: 0px;
    }
    & > h2 {
      margin: 20px auto 30px auto;
      max-width: 1140px;
      padding: 0 15px;
    }
  }
}
:root {
  // fonts
  --manrope: "Manrope", Arial, Helvetica, sans-serif;
  --forum: "Forum";
  // colors
  --bg-main: #e2d3ce;
  --black-main: #0c0b10;
  --black-secondary: #1d1a1a;
  --home-title: #fcfcfc;
  --grey: #79655e;
  --blue: #0b2034;
  --error-red: #e95555;
  --disabled: #f0f0f0;
  --scrollbar-foreground: var(--grey);
  --scrollbar-background: var(--bg-main);
}

@media (min-width: 768px) {
  main {
    background: linear-gradient(
        rgba(226, 211, 206, 0),
        rgba(226, 211, 206, 0.71) 200px,
        var(--bg-main) 300px
      ),
      no-repeat top 73px left 0px
        url(https://firebasestorage.googleapis.com/v0/b/firetrip-b1efe.appspot.com/o/backgrounds%2Fclouds-main-color-1.avif?alt=media&token=4a889dd6-90d8-4c95-bec7-3c9703b9a518),
      no-repeat top -5px right 0px url(https://firebasestorage.googleapis.com/v0/b/firetrip-b1efe.appspot.com/o/backgrounds%2Fclouds-main-color-2.avif?alt=media&token=cdc1af7b-45e1-4502-bcb8-f83c62665414);

    position: relative;
    .wrapper {
      & > div {
        margin-bottom: 120px;
      }
      & > h2 {
        margin-top: 30px;
        margin-bottom: 50px;
      }
    }
  }

  h2 {
    font-size: 60px;
    line-height: 58px;
  }
  p {
    font-size: 18px;
    line-height: 36px;
  }
  .container {
    padding: 0 20px;
  }
}
</style>
