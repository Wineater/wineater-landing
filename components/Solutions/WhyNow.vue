<template>
  <section id="why-now" class="sol-section whynow" aria-labelledby="whynow-title">
    <div class="whynow__box" v-reveal>
      <h2 id="whynow-title" class="whynow__line">{{ $t('whyNow.line') }}</h2>
      <p class="whynow__stat">
        <strong class="whynow__num">{{ stat.value[lang] }}</strong>
        {{ $t('whyNow.stat', { compare: stat.comparison[lang] }) }}
      </p>
      <p class="whynow__source">
        {{ $t('whyNow.source') }}
        <a class="sol-link" :href="stat.source.url" target="_blank" rel="noopener" @click="onSource">{{ $t('whyNow.sourceName') }}<span class="sol-sr"> ({{ $t('Header.opensNewTab') }})</span></a><time :datetime="stat.source.date">{{ $t('whyNow.sourceDate') }}</time>
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
// Headline left, the statistic as one readable sentence right. The number is inline emphasis, not a hero metric.
.whynow__box {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
  gap: 20px 64px;
  align-items: start;
  align-content: start;
  padding: 48px 56px;
  border-radius: 24px;
  background: var(--brand-7);
}

.whynow__line {
  grid-row: 1 / span 2;
  margin: 0;
  max-width: 20ch;
  font-size: clamp(2.8rem, 3.2vw, 3.6rem);
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: var(--ink);
}

.whynow__stat {
  grid-column: 2;
  margin: 0;
  font-size: clamp(2rem, 2.2vw, 2.4rem);
  line-height: 1.45;
  color: var(--ink);
  text-wrap: pretty;
}

.whynow__num { font-family: 'PoppinsMedium', sans-serif; font-weight: 500; color: var(--brand-1); white-space: nowrap; }

.whynow__source {
  grid-column: 2;
  grid-row: 2;
  margin: 0;
  text-wrap: pretty;
  font-size: 1.4rem;
  line-height: 1.5;
  color: var(--ink-3);
}

@media only screen and (max-width: 899px) {
  .whynow__box { grid-template-columns: 1fr; gap: 16px; padding: 28px 20px; border-radius: 20px; }
  .whynow__line { grid-row: auto; max-width: none; }
  .whynow__stat, .whynow__source { grid-column: 1; grid-row: auto; }
}
</style>
