<template>
  <header>
    <router-link :to="{ name: 'home' }">
      <ILogo width="12"></ILogo>
    </router-link>
    <TheNavigation></TheNavigation>
    <CallbackButton></CallbackButton>
  </header>
</template>
<script>
import TheNavigation from "@/components/Navigation.vue";
import ILogo from "@/components/icons/ILogo.vue";
import CallbackButton from "@/components/CallbackButton.vue";
export default {
  name: "TheHeader",
  components: {
    TheNavigation,
    ILogo,
    CallbackButton,
  },
};
</script>
<style scoped lang="scss"></style>
