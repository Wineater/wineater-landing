<template>
  <section id="roi" class="sol-section roi" aria-labelledby="roi-title">
    <h2 id="roi-title" class="sol-h2" v-reveal>{{ $t('roi.title') }}</h2>
    <p class="sol-lead" v-reveal>{{ $t('roi.lead') }}</p>
    <div class="roi__box" v-reveal>
      <form class="roi__form" @submit.prevent>
        <label class="roi__label" for="roi-visits">{{ $t('roi.visitsLabel') }}</label>
        <input
          id="roi-visits"
          v-model.number="visits"
          class="roi__input"
          type="number"
          inputmode="numeric"
          min="0"
          max="100000000"
          step="1000"
          @input="onUsed"
        >
        <p class="sol-note">{{ $t('roi.visitsHint') }}</p>
      </form>
      <dl class="roi__out" aria-live="polite">
        <div class="roi__row">
          <dt>{{ $t('roi.clicks') }}</dt>
          <dd>{{ $t('roi.clicksValue', { n: fmt(clicks) }) }}</dd>
        </div>
        <div class="roi__row">
          <dt>{{ $t('roi.cost') }}</dt>
          <dd>{{ usd(cost) }}<span class="roi__per">{{ $t('pricing.perMonthSuffix') }}</span></dd>
        </div>
      </dl>
    </div>
    <p class="sol-note roi__fine">{{ $t('roi.fine', { search: pct(roiRates.searchShare), click: pct(roiRates.buyClickRate), base: usd(plan('growth').price), perClick: usd(plan('growth').perBuyClick) }) }}</p>
    <p class="sol-note">{{ caveat }}</p>
  </section>
</template>

<script setup>
import { roiRates, estimateBuyClicks, growthMonthlyCost, plan, formatUsd, formatInt } from '~/data/pricing'
import { pilotProof } from '~/data/proof'

const { locale } = useI18n()
const visits = ref(20000)
const clicks = computed(() => estimateBuyClicks(visits.value))
const cost = computed(() => growthMonthlyCost(clicks.value))
const usd = (n) => formatUsd(n, locale.value)
const fmt = (n) => formatInt(n, locale.value)
const pct = (r) => `${Math.round(r * 100)}${locale.value === 'en' ? '%' : ' %'}`
const caveat = computed(() => pilotProof.caveat[locale.value === 'fr' ? 'fr' : 'en'])

let sent = false
const onUsed = () => {
  if (sent) return
  sent = true
  track('roi_calc_used', {})
}
</script>

<style scoped lang="scss">
.roi__box {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 24px;
  padding: 32px;
  border-radius: 20px;
  background: var(--brand-7);
}

.roi__form { display: flex; flex-direction: column; gap: 8px; }
.roi__label { font-size: 1.6rem; color: var(--ink); }

.roi__input {
  width: 100%;
  max-width: 280px;
  min-height: 56px;
  padding: 0 16px;
  border: 1.5px solid var(--ink-3);
  border-radius: 12px;
  background: #fff;
  color: var(--ink);
  font-size: 2rem;

  &:focus-visible { outline: 3px solid var(--ink); outline-offset: 2px; }
}

.roi__out { display: grid; gap: 12px; margin: 0; align-content: start; }
.roi__row { display: grid; gap: 2px; padding: 16px 20px; border-radius: 14px; background: #fff; }
.roi__row dt { font-size: 1.4rem; color: var(--ink-3); }
.roi__row dd { margin: 0; font-family: 'PoppinsMedium', sans-serif; font-size: 2.8rem; line-height: 1.2; color: var(--ink); }
.roi__per { font-size: 1.6rem; color: var(--ink-3); font-family: 'PoppinsRegular', sans-serif; }
.roi__fine { max-width: 80ch; }

@media only screen and (max-width: 767px) {
  .roi__box { grid-template-columns: 1fr; padding: 20px 16px; }
  .roi__input { max-width: none; }
}
</style>
