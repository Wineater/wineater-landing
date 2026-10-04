<template>
  <SolutionPage segment="pricing" seo-key="pricing">
    <header class="phead">
      <h1 class="phead__title">{{ $t('pricing.hero.title') }}</h1>
      <p class="sol-lead">{{ $t('pricing.hero.lead') }}</p>
    </header>
    <PricingTable />
    <RoiCalculator />
    <SegmentFaq segment="pricing" />
    <SolutionCta segment="pricing" base="pricingCta" primary="trial" />
  </SolutionPage>
</template>

<script setup>
import SolutionPage from '~/components/Solutions/SolutionPage.vue'
import PricingTable from '~/components/Solutions/PricingTable.vue'
import RoiCalculator from '~/components/Solutions/RoiCalculator.vue'
import SegmentFaq from '~/components/Solutions/SegmentFaq.vue'
import SolutionCta from '~/components/Solutions/SolutionCta.vue'
import { pricingOffers } from '~/data/pricing'

const localePath = useLocalePath()
const url = `https://wineater.com${localePath('/pricing')}`

useSchemaOrg([
  {
    '@type': 'Product',
    name: 'Wineater AI Sommelier',
    description: 'AI sommelier that recommends wines from a merchant\'s own catalog, via widget, QR code or API.',
    brand: { '@type': 'Brand', name: 'Wineater' },
    offers: pricingOffers(url),
  },
])
</script>

<style scoped lang="scss">
.phead { max-width: var(--container); margin: 0 auto; padding: 128px 0 40px; }
.phead__title { margin: 0 0 16px; font-size: clamp(3.4rem, 4.6vw, 5.6rem); line-height: 1.08; letter-spacing: -0.015em; color: var(--ink); max-width: 18ch; }
@media only screen and (max-width: 767px) { .phead { padding: 96px 0 24px; } }
</style>
