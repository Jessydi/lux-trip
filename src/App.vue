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
}
:root {
  --bg-main: #e2d3ce;
  --black-main: #0c0b10;
  --home-title: #fcfcfc;
}
</style>
