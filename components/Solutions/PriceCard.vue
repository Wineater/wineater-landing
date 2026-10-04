<template>
  <section :id="`${segment}-price`" class="sol-section" :aria-labelledby="`${segment}-price-title`">
    <h2 :id="`${segment}-price-title`" class="sol-h2" v-reveal>{{ $t('solutionPage.priceTitle') }}</h2>

    <ul v-if="segment === 'shops'" class="sol-grid" style="--cols: 2" v-reveal:stagger>
      <li v-for="p in shopPlans" :key="p.id" class="sol-card" :class="{ 'sol-card--tint': !p.contact }">
        <h3 class="sol-h3">{{ $t(`pricing.plans.${p.id}.name`) }}</h3>
        <p class="pc__price">{{ planPrice(p) }}</p>
        <p v-if="p.perBuyClick" class="sol-text">{{ $t('pricing.perClick', { price: usd(p.perBuyClick) }) }}</p>
        <p class="sol-text">{{ $t(`pricing.plans.${p.id}.catalog`, params(p)) }}</p>
      </li>
    </ul>

    <div v-else-if="segment === 'restaurants'" class="sol-card sol-card--tint pc__one" v-reveal>
      <p class="pc__line">{{ $t('solutionPage.restaurantsPrice', priceParams) }}</p>
    </div>

    <div v-else-if="segment === 'distributors'" class="sol-card sol-card--tint pc__one" v-reveal>
      <p class="pc__line">{{ $t('solutionPage.distributorsPrice', { price: usd(plan('distributors').price) }) }}</p>
    </div>

    <div v-else class="sol-card sol-card--tint pc__one" v-reveal>
      <p class="pc__line">{{ $t(`solutionPage.${segment}Price`) }}</p>
    </div>

    <p class="sol-actions pc__more">
      <NuxtLink class="sol-link" :to="localePath({ path: '/pricing', hash: `#${pricingHash}` })" @click="onClick">{{ $t('solutionPage.seePricing') }}</NuxtLink>
      <span v-if="segment !== 'distributors'" class="sol-note pc__trial">{{ $t('Footer.trial') }}</span>
    </p>
  </section>
</template>

<script setup>
import { shopPlans as shopPlanList, plan, formatUsd, formatInt } from '~/data/pricing'

const props = defineProps({ segment: { type: String, required: true } }) // shops | restaurants | retail | distributors
const { locale, t } = useI18n()
const localePath = useLocalePath()

const shopPlans = shopPlanList
const usd = (n) => formatUsd(n, locale.value)
const planPrice = (p) => (p.price === null ? t('solutionPage.talkToSales') : t('pricing.perMonth', { price: usd(p.price) }))
const params = (p) => ({
  max: p.maxWines ? formatInt(p.maxWines, locale.value) : '',
  min: p.minWines ? formatInt(p.minWines, locale.value) : '',
})
const priceParams = computed(() => ({
  standard: usd(plan('restaurant').price),
  standardMax: formatInt(plan('restaurant').maxWines, locale.value),
  plus: usd(plan('restaurantPlus').price),
}))
// The pricing page has tabs for shops, restaurants and distributors; offline retail is in the "more" block.
const pricingHash = computed(() => (props.segment === 'retail' ? 'pricing-more' : props.segment))
const onClick = () => track('cta_click', { cta_label: t('solutionPage.seePricing'), location: `${props.segment}_price` })
</script>

<style scoped lang="scss">
.pc__price { margin: 0; font-family: 'PoppinsMedium', sans-serif; font-size: 2.4rem; line-height: 1.2; color: var(--ink); }
.pc__line { margin: 0; font-family: 'PoppinsMedium', sans-serif; font-size: 2.2rem; line-height: 1.35; color: var(--ink); text-wrap: balance; }
.pc__more { margin: 20px 0 0; }
.pc__trial { margin: 0; }
</style>
