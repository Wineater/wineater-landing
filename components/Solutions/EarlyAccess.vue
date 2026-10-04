<template>
  <section id="early-access" class="sol-section" aria-labelledby="early-title">
    <h2 id="early-title" class="sol-h2" v-reveal>{{ $t('earlyAccess.title') }}</h2>
    <p class="sol-lead" v-reveal>{{ $t('earlyAccess.lead') }}</p>
    <ul class="sol-grid" style="--cols: 2" v-reveal:stagger>
      <li v-for="f in features" :key="f.id" class="sol-card ea__card">
        <p class="ea__badges">
          <span class="sol-badge sol-badge--early">{{ $t(`earlyAccess.${f.id}.badge`) }}</span>
        </p>
        <h3 class="sol-h3">{{ $t(`earlyAccess.${f.id}.title`) }}</h3>
        <p class="sol-text">{{ $t(`earlyAccess.${f.id}.text`) }}</p>
        <ul class="ea__list">
          <li v-for="n in 2" :key="n">{{ $t(`earlyAccess.${f.id}.point${n}`) }}</li>
        </ul>
        <WaitlistForm :feature="f.feature" :title-id="`ea-${f.id}`" />
      </li>
    </ul>
    <p class="sol-note">{{ $t('earlyAccess.note', { price: formatUsd(addOn('aiCatalog').price, locale) }) }}</p>
  </section>
</template>

<script setup>
import WaitlistForm from '~/components/Solutions/WaitlistForm.vue'
import { addOn, formatUsd } from '~/data/pricing'

const { locale } = useI18n()

const features = [
  { id: 'aiCatalog', feature: 'ai-ready-catalog' },
  { id: 'shopify', feature: 'shopify-app' },
]
</script>

<style scoped lang="scss">
.ea__card { gap: 12px; }
.ea__badges { margin: 0; }

.ea__list {
  display: grid;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 1.5rem;
  line-height: 1.45;
  color: var(--ink-2);

  li { position: relative; padding-left: 24px; }
  li::before { content: ''; position: absolute; left: 4px; top: 0.55em; width: 8px; height: 8px; border-radius: 50%; background: var(--brand-1); }
}
</style>
