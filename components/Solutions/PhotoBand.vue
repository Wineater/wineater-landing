<template>
  <figure class="sol-section band">
    <Photo :name="name" :alt="$t(`photos.${name}`)" sizes="(max-width: 1200px) 100vw, 1200px" />
  </figure>
</template>

<script setup>
import Photo from '~/components/Solutions/Photo.vue'

defineProps({ name: { type: String, required: true } })
</script>

<style scoped lang="scss">
.band { margin-bottom: 0; margin-left: auto; margin-right: auto; }
.band :deep(picture) { display: block; }
.band :deep(.sol-photo) { aspect-ratio: 21 / 9 !important; object-fit: cover; max-height: 420px; }

@media only screen and (max-width: 767px) {
  .band :deep(.sol-photo) { aspect-ratio: 4 / 3 !important; border-radius: 16px; }
}
</style>
