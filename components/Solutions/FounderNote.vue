<template>
  <!-- Placeholder until the owner supplies the text, the photo and the LinkedIn link.
       Visible only outside production (runtimeConfig.public.showPlaceholders). -->
  <section v-if="show" class="sol-section" aria-labelledby="founder-title">
    <div class="founder" v-reveal>
      <p class="founder__tag">{{ $t('founder.placeholderTag') }}</p>
      <h2 id="founder-title" class="sol-h3">{{ $t('founder.title') }}</h2>
      <p class="sol-text">{{ $t('founder.placeholder') }}</p>
    </div>
  </section>
</template>

<script setup>
import { founderNote } from '~/data/founder'

const config = useRuntimeConfig()
// Real content goes live only when the owner marks it approved in data/founder.ts.
const show = computed(() => !founderNote.approved && config.public.showPlaceholders)
</script>

<style scoped lang="scss">
.founder { display: grid; gap: 8px; padding: 28px 32px; border: 2px dashed var(--ink-3); border-radius: 16px; }
.founder__tag { margin: 0; font-size: 1.3rem; letter-spacing: 0.04em; text-transform: uppercase; color: var(--ink-3); }
</style>
