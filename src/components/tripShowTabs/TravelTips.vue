<template>
  <div class="travel-tips">
    <h3>Travel Tips</h3>
    <div class="tips-list">
      <div class="tip">
        <h4 class="tip__title">Buy a small backpack/suitcase</h4>
        <p class="tip__text">
          By purchasing a small backpack (I like something around 35/40 liters),
          you will be forced you to pack light and avoid carrying too much
          stuff. Humans have a natural tendency to want to fill space so if you
          pack light but have lots of extra room in your bag, you’ll end up
          going “well, I guess I can take more” and then regret it.
        </p>
      </div>
      <div class="tip">
        <h4 class="tip__title">But take extra socks</h4>
        <p class="tip__text">
          You’ll lose a bunch to laundry gremlins, wear and tear, and hiking so
          packing extra will come in handy. I only take a few more than I need.
          Nothing beats a fresh pair of socks!
        </p>
      </div>
      <div class="tip">
        <h4 class="tip__title">
          Take an extra bank card and credit card with you
        </h4>
        <p class="tip__text">
          Disasters happen. It’s always good to have a backup in case you get
          robbed or lose a card. You don’t want to be stuck somewhere new
          without access to your funds. I once had a card duplicated and a
          freeze put on it. I couldn’t use it for the rest of my trip. I was
          very happy I had an extra and not like my friend, who didn’t and was
          forced to borrow money from me all the time!
        </p>
      </div>
      <div class="tip">
        <h4 class="tip__title">Travel by yourself at least once</h4>
        <p class="tip__text">
          Traveling alone may seem daunting and boring, but it can be an
          incredibly rewarding experience for you. One of the advantages of solo
          travel is the opportunity to get to know yourself, understand your
          dreams and desires. You will also have complete freedom in planning
          your itinerary and setting your own pace. It can also be an
          opportunity for new friendships and cultural exchange, especially if
          you travel solo with locals. The end result is an unforgettable
          experience that will help you grow and see the world from a new
          perspective.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.travel-tips {
  .tips-list {
    .tip {
      &:not(:last-child) {
        border-bottom: 1px solid var(--bg-main);
        padding-bottom: 20px;
        margin-bottom: 20px;
      }
      &__title {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
