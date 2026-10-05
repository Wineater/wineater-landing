<template>
  <section class="sol-section ptable" aria-labelledby="pricing-title">
    <h2 id="pricing-title" class="sol-sr">{{ $t('pricing.plansTitle') }}</h2>
    <div class="ptable__tabs" role="tablist" :aria-label="$t('pricing.switchLabel')" @keydown="onKey">
      <button
        v-for="s in segments"
        :id="`tab-${s}`"
        :key="s"
        type="button"
        role="tab"
        class="ptable__tab"
        :aria-selected="active === s ? 'true' : 'false'"
        :aria-controls="`panel-${s}`"
        :tabindex="active === s ? 0 : -1"
        @click="select(s)"
      >{{ $t(`pricing.tabs.${s}`) }}</button>
    </div>

    <div
      v-for="s in segments"
      :id="`panel-${s}`"
      :key="s"
      role="tabpanel"
      :aria-labelledby="`tab-${s}`"
      :hidden="active !== s"
    >
      <p class="sol-lead ptable__lead">{{ $t(`pricing.${s}.lead`) }}</p>
      <ul class="sol-grid" :style="{ '--cols': Math.max(2, plansBySegment[s].length) }">
        <li v-for="p in plansBySegment[s]" :key="p.id" class="sol-card ptable__plan" :class="{ 'sol-card--tint': !p.contact }">
          <h3 class="sol-h3">{{ $t(`pricing.plans.${p.id}.name`) }}</h3>
          <p class="ptable__price">
            <template v-if="p.price !== null">
              <span class="ptable__amount">{{ usd(p.price) }}</span><span class="ptable__per">{{ perSuffix(p) }}</span>
            </template>
            <span v-else class="ptable__amount ptable__amount--text">{{ $t(p.id === 'chain' ? 'pricing.onRequest' : 'solutionPage.talkToSales') }}</span>
          </p>
          <p v-if="p.perBuyClick" class="ptable__extra">{{ $t('pricing.perClick', { price: usd(p.perBuyClick) }) }}</p>
          <p class="ptable__catalog">{{ $t(`pricing.plans.${p.id}.catalog`, wineParams(p)) }}</p>
          <ul class="ptable__list">
            <li v-for="n in includedCount(p.id)" :key="n">{{ $t(`pricing.plans.${p.id}.inc${n}`) }}</li>
          </ul>
          <p v-if="p.id === 'store'" class="ptable__example">{{ $t('pricing.example', exampleParams) }}</p>
          <div class="ptable__cta">
            <Button v-if="p.contact || p.id === 'distributors'" bg-color="outline" :href="DEMO_URL" target="_blank" @btnClick="onSales(p.id)">{{ $t('solutionPage.talkToSales') }}<span class="sol-sr">({{ $t('Header.opensNewTab') }})</span></Button>
            <Button v-else :bg-color="p.id === 'store' || p.id === 'restaurantPlus' ? 'black' : 'outline'" @btnClick="onTrial(p.id)">{{ $t('solutionPage.startTrial') }}</Button>
          </div>
        </li>
      </ul>
    </div>

    <p class="ptable__all">{{ $t('pricing.allPlans') }}</p>
    <p class="sol-note">{{ $t('pricing.clickNote', { caveat }) }}</p>

    <h2 id="pricing-addons" class="sol-h2 ptable__more-title">{{ $t('pricing.addOnsTitle') }}</h2>
    <ul class="sol-grid" style="--cols: 2">
      <li v-for="a in addOns" :key="a.id" class="sol-card">
        <h3 class="sol-h3">{{ $t(`pricing.addOns.${a.id}.name`) }}</h3>
        <p v-if="a.earlyAccess"><span class="sol-badge sol-badge--early">{{ $t('solutionPage.earlyAccess') }}</span></p>
        <p class="ptable__price"><span class="ptable__amount">{{ usd(a.price) }}</span><span class="ptable__per">{{ $t('pricing.perMonthSuffix') }}</span></p>
        <p class="sol-text">{{ $t(`pricing.addOns.${a.id}.text`) }}</p>
        <p v-if="a.earlyAccess" class="sol-note">{{ $t(`pricing.addOns.${a.id}.status`) }}</p>
      </li>
    </ul>

    <h2 id="pricing-more" class="sol-h2 ptable__more-title">{{ $t('pricing.moreTitle') }}</h2>
    <ul class="sol-grid" style="--cols: 2">
      <li v-for="p in salesOnly" :key="p.id" class="sol-card">
        <h3 class="sol-h3">{{ $t(`pricing.plans.${p.id}.name`) }}</h3>
        <p class="sol-text">{{ $t(`pricing.plans.${p.id}.catalog`) }}</p>
        <div class="ptable__cta">
          <Button bg-color="outline" :href="DEMO_URL" target="_blank" @btnClick="onSales(p.id)">{{ $t('solutionPage.talkToSales') }}<span class="sol-sr">({{ $t('Header.opensNewTab') }})</span></Button>
          <NuxtLink class="sol-link" :to="localePath('/solutions/retail')">{{ $t('pricing.moreLink', { name: $t(`pricing.plans.${p.id}.name`) }) }}</NuxtLink>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
import Button from '~/components/Buttons/Button.vue'
import { plansBySegment, salesOnly, addOns, exampleInvoice, formatUsd, formatInt } from '~/data/pricing'
import { pilotProof } from '~/data/proof'
import { DEMO_URL } from '~/data/links'

const segments = ['shops', 'restaurants', 'distributors']
const { locale, t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const { openSignup } = useSignup()

const active = ref('shops')
const usd = (n) => formatUsd(n, locale.value)
const includedCount = (id) => ({ store: 5, storeLarge: 4, restaurant: 3, restaurantPlus: 3, chain: 3, distributors: 2 })[id] || 0
const perSuffix = (p) => t(p.perVenue ? 'pricing.perVenueMonth' : 'pricing.perMonthSuffix')
const wineParams = (p) => ({ max: p.maxWines ? formatInt(p.maxWines, locale.value) : '', min: p.minWines ? formatInt(p.minWines, locale.value) : '' })
const exampleParams = computed(() => ({
  clicks: formatInt(exampleInvoice.clicks, locale.value),
  base: usd(exampleInvoice.base),
  extra: usd(exampleInvoice.clickCost),
  total: usd(exampleInvoice.total),
}))
const caveat = computed(() => pilotProof.caveat[locale.value === 'fr' ? 'fr' : 'en'])

const select = (s, user = true) => {
  if (active.value === s) return
  active.value = s
  if (user) {
    track('pricing_toggle', { segment: s })
    try { history.replaceState(history.state, '', `${location.pathname}${location.search}#${s}`) } catch { /* ignore */ }
  }
}

const onKey = (e) => {
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
  e.preventDefault()
  const i = segments.indexOf(active.value)
  const next = segments[(i + (e.key === 'ArrowRight' ? 1 : segments.length - 1)) % segments.length]
  select(next)
  nextTick(() => document.getElementById(`tab-${next}`)?.focus())
}

onMounted(() => {
  const hash = (route.hash || '').replace('#', '')
  if (segments.includes(hash)) select(hash, false)
  track('pricing_view', {})
})

const onTrial = (id) => {
  track('cta_click', { cta_label: t('solutionPage.startTrial'), location: `pricing_${id}` })
  openSignup(`pricing_${id}`)
}
const onSales = (id) => {
  track('cta_click', { cta_label: t('solutionPage.talkToSales'), location: `pricing_${id}` })
  track('demo_click', { location: `pricing_${id}` })
  track('outbound_link_click', { link_url: DEMO_URL })
}
</script>

<style scoped lang="scss">
.ptable { padding-top: 0; }

.ptable__tabs {
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  margin-bottom: 24px;
  border-radius: 32px;
  background: var(--brand-7);
}

.ptable__tab {
  min-height: 48px;
  padding: 0 24px;
  border: 0;
  border-radius: 28px;
  background: transparent;
  color: var(--ink-2);
  font-size: 1.6rem;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;

  &[aria-selected='true'] { background: var(--brand-1); color: #fff; }
  &:focus-visible { outline: 3px solid var(--ink); outline-offset: 2px; }
}

.ptable__lead { margin-bottom: 24px; }
.ptable__plan { gap: 12px; }
.ptable__price { margin: 0; }
.ptable__amount { font-family: 'PoppinsMedium', sans-serif; font-size: 3.6rem; line-height: 1.1; color: var(--ink); &--text { font-size: 2.6rem; } }
.ptable__per { margin-left: 4px; font-size: 1.5rem; color: var(--ink-3); }
.ptable__extra { margin: -4px 0 0; font-family: 'PoppinsMedium', sans-serif; font-size: 1.7rem; color: var(--link); }
.ptable__catalog { margin: 0; font-size: 1.6rem; color: var(--ink); }

.ptable__list {
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 1.5rem;
  line-height: 1.45;
  color: var(--ink-2);

  li { position: relative; padding-left: 24px; }
  li::before { content: ''; position: absolute; left: 4px; top: 0.5em; width: 8px; height: 8px; border-radius: 50%; background: var(--brand-1); }
}

.ptable__example { margin: 0; padding: 12px 14px; border-radius: 10px; background: #fff; font-size: 1.4rem; line-height: 1.45; color: var(--ink); }
.ptable__cta { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 16px; margin-top: auto; padding-top: 8px; }
.ptable__all { margin: 24px 0 0; font-size: 1.7rem; color: var(--ink); font-family: 'PoppinsMedium', sans-serif; }
.ptable__more-title { margin-top: var(--section-y); }

@media only screen and (max-width: 767px) {
  .ptable__tabs { display: flex; }
  .ptable__tab { flex: 1; padding: 6px 8px; font-size: 1.4rem; line-height: 1.2; }
  .ptable__cta :deep(.button) { width: 100%; }
}
</style>
