<template>
  <div class="packages">
    <main>
      <div class="wrapper">
        <h2>Luxury packages</h2>
        <SearchTrip></SearchTrip>
        <PackagesLoader></PackagesLoader>
        <SubscribeComponent></SubscribeComponent>
      </div>
    </main>
  </div>
</template>

<script>
import SearchTrip from "@/components/SearchTrip.vue";
import SubscribeComponent from "@/components/Subscribe.vue";
import PackagesLoader from "@/components/PackagesLoader.vue";

export default {
  name: "PackagesView",
  components: {
    SearchTrip,
    SubscribeComponent,
    PackagesLoader,
  },
};
</script>
<style lang="scss"></style>
