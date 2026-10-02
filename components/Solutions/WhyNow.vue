<template>
  <section id="why-now" class="sol-section whynow" aria-labelledby="whynow-title">
    <div class="whynow__box" v-reveal>
      <h2 id="whynow-title" class="whynow__line">{{ $t('whyNow.line') }}</h2>
      <p class="whynow__stat">
        <span class="whynow__value">{{ stat.value[lang] }}</span>
        <span class="whynow__text">{{ $t('whyNow.stat', { compare: stat.comparison[lang] }) }}</span>
      </p>
      <p class="whynow__source">
        {{ $t('whyNow.source') }}
        <a class="sol-link" :href="stat.source.url" target="_blank" rel="noopener" @click="onSource">{{ $t('whyNow.sourceName') }}<span class="sol-sr"> ({{ $t('Header.opensNewTab') }})</span></a>
        <time :datetime="stat.source.date">{{ $t('whyNow.sourceDate') }}</time>
      </p>
    </div>
  </section>
</template>

<script setup>
import { whyNowStat as stat } from '~/data/proof'

const { locale } = useI18n()
const lang = computed(() => (locale.value === 'fr' ? 'fr' : 'en'))
const onSource = () => track('outbound_link_click', { link_url: stat.source.url })
</script>

<style scoped lang="scss">
.whynow__box { display: grid; gap: 12px; padding: 32px 40px; border-radius: 20px; background: var(--brand-7); }
.whynow__line { margin: 0; max-width: 40ch; font-size: clamp(2.4rem, 3vw, 3.2rem); line-height: 1.2; color: var(--ink); }
.whynow__stat { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 16px; margin: 0; }
.whynow__value { font-family: 'PoppinsMedium', sans-serif; font-size: clamp(4.8rem, 6vw, 7.2rem); line-height: 1; color: var(--brand-1); }
.whynow__text { max-width: 52ch; font-size: 1.8rem; line-height: 1.45; color: var(--ink); }
.whynow__source { margin: 0; font-size: 1.4rem; line-height: 1.5; color: var(--ink-3); }

@media only screen and (max-width: 767px) { .whynow__box { padding: 24px 20px; } }
</style>
