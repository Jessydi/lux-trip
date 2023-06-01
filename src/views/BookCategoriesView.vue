<template>
  <div class="book-categories-page">
    <main>
      <div class="wrapper">
        <h2>Book with us</h2>
        <BookCategories v-slot:default="slotProps">
          <BookCategory
            v-for="(bookCategory, index) in slotProps.bookCategories"
            :key="index"
            fullContent
            :bookCategory="bookCategory"
          ></BookCategory>
        </BookCategories>
        <SubscribeComponent></SubscribeComponent>
      </div>
    </main>
  </div>
</template>
<script>
import BookCategory from "@/components/BookCategory.vue";
import BookCategories from "@/components/BookCategories.vue";
import SubscribeComponent from "@/components/Subscribe.vue";

export default {
  components: {
    BookCategory,
    BookCategories,
    SubscribeComponent,
  },
};
</script>
<style lang="scss"></style>
