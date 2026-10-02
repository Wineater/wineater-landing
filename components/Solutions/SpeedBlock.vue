<template>
  <section id="speed" class="sol-section" aria-labelledby="speed-title">
    <h2 id="speed-title" class="sol-h2" v-reveal>{{ $t('features.speedTitle') }}</h2>
    <p class="sol-lead" v-reveal>{{ $t('features.speedText') }}</p>
    <ul class="chart" :aria-label="$t('features.speedChart')" v-reveal>
      <li v-for="r in speedRuns" :key="r.n" class="chart__row" :style="{ '--w': r.s / speedMax }">
        <span class="chart__label">{{ $t('features.speedRow', { n: fmtN(r.n) }) }}</span>
        <span class="chart__track">
          <span class="chart__bar" aria-hidden="true"></span>
          <span class="chart__val">{{ $t('features.speedUnit', { n: fmtS(r.s) }) }}</span>
        </span>
      </li>
    </ul>
    <p class="sol-note">{{ $t('features.speedNote', { max: fmtN(answerTime.testedUpTo) }) }}</p>
  </section>
</template>

<script setup>
import { answerTime } from '~/data/proof'

const speedRuns = answerTime.runs
const speedMax = answerTime.scaleMax

const { locale } = useI18n()
const fmtN = (v) => new Intl.NumberFormat(locale.value).format(v)
const fmtS = (v) => new Intl.NumberFormat(locale.value, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(v)
</script>

<style scoped lang="scss">
.chart { display: grid; gap: 10px; max-width: 820px; margin: 0; padding: 0; list-style: none; }
.chart__row { display: grid; grid-template-columns: 110px minmax(0, 1fr); align-items: center; gap: 16px; font-size: 1.5rem; color: var(--ink-2); }
.chart__track { position: relative; display: flex; align-items: center; height: 36px; border-radius: 8px; background: var(--brand-7); }
.chart__bar { position: absolute; inset: 0 auto 0 0; width: calc(var(--w) * 100%); border-radius: 8px; background: var(--brand-1); }
.chart__val { position: relative; padding-left: 12px; font-family: 'PoppinsMedium', sans-serif; color: #fff; }

@media only screen and (max-width: 767px) { .chart__row { grid-template-columns: 78px minmax(0, 1fr); gap: 10px; } }
</style>
