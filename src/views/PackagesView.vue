<template>
  <div class="packages">
    <main>
      <div class="wrapper">
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
<style lang="scss">
.packages {
  .wrapper {
    overflow: hidden;
    isolation: isolate;
    & > div {
      margin-bottom: 80px;
    }
  }
}
@media (min-width: 768px) {
  .packages {
    .wrapper {
      & > div {
        margin-bottom: 120px;
      }
    }
  }
}
</style>
