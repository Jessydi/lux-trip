<template>
  <div class="gallery">
    <h3>Gallery</h3>
    <div class="photos">
      <img
        class="photo-top"
        :src="galleryObject.topImg"
        :alt="name" />
      <div
        class="photos__masonry"
        v-if="galleryObject.masonryImages">
        <div class="column">
          <img
            v-for="(img, index) in galleryObject.masonryImages.slice(
              0,
              this.halfMasonryLength
            )"
            :key="index"
            :src="img"
            :alt="name" />
        </div>
        <div class="column">
          <img
            v-for="(img, index) in galleryObject.masonryImages.slice(
              this.halfMasonryLength
            )"
            :key="index"
            :src="img"
            :alt="name" />
        </div>
      </div>
      <div
        class="photos__rest"
        v-if="galleryObject.restImages">
        <img
          v-for="(img, index) in galleryObject.restImages"
          :key="index"
          :src="img"
          :alt="name" />
      </div>
      <img
        class="photo-bottom"
        :src="galleryObject.bottomImg"
        :alt="name" />
    </div>
  </div>
</template>
<script>
export default {
  name: "GalleryTab",
  props: {
    galleryObject: { type: Object, require: true },
    name: { type: String, require: true },
  },
  computed: {
    halfMasonryLength() {
      return Math.floor(this.galleryObject.masonryImages.length / 2);
    },
  },
};
</script>
<style scoped lang="scss">
.gallery {
  .photos {
    display: grid;
    grid-template-columns: auto;
    gap: 10px;
    img {
      width: 100%;
      border-radius: 10px;
    }
    &__masonry {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    &__masonry,
    &__rest {
      img {
        width: 100%;
      }
      img:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }
}
@media (min-width: 768px) {
  .gallery {
    .photos {
      gap: 25px;
      &__masonry {
        display: flex;
        flex-direction: row;
        gap: 25px;
        .column {
          display: flex;
          flex-direction: column;
          flex: 1 1 50%;
        }
        img {
          flex-grow: 1;
          object-fit: cover;
        }
        img:not(:last-child) {
          margin-bottom: 25px;
        }
      }
      &__rest {
        img:not(:last-child) {
          margin-bottom: 25px;
        }
      }
    }
  }
}
</style>
