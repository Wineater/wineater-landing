<template>
  <picture>
    <source type="image/avif" :srcset="srcset('avif')" :sizes="sizes">
    <source type="image/webp" :srcset="srcset('webp')" :sizes="sizes">
    <img
      class="sol-photo"
      :src="`/photos/${name}-${fallbackWidth}.webp`"
      :width="meta.width"
      :height="meta.height"
      :alt="alt"
      :loading="priority ? 'eager' : 'lazy'"
      :fetchpriority="priority ? 'high' : undefined"
      decoding="async"
      :style="{ aspectRatio: `${meta.width} / ${meta.height}`, backgroundColor: meta.dominant }"
    >
  </picture>
</template>

<script setup>
import manifest from '~/public/photos/manifest.json'

const props = defineProps({
  name: { type: String, required: true },
  alt: { type: String, required: true },
  sizes: { type: String, default: '(max-width: 767px) 100vw, 50vw' },
  priority: { type: Boolean, default: false },
})

const meta = computed(() => manifest[props.name] || { width: 1600, height: 1067, widths: [800], dominant: '#F5F2FF' })
const fallbackWidth = computed(() => {
  const w = meta.value.widths
  return w.find(x => x >= 800) || w[w.length - 1]
})
const srcset = (ext) => meta.value.widths.map(w => `/photos/${props.name}-${w}.${ext} ${w}w`).join(', ')
</script>
