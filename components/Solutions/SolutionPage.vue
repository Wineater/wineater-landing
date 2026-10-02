<template>
  <div class="sol-page">
    <Header :show-links="true" />
    <main :id="mainId" class="sol-main" role="main">
      <slot />
    </main>
    <Footer :show-cta="showFooterCta" />
  </div>
</template>

<script setup>
import Header from '~/components/LandingComponents/Header.vue'
import Footer from '~/components/LandingComponents/Footer.vue'

// Template for every Solutions page and for Pricing: header, one main container with the shared
// rhythm (--section-y), footer. Head tags, hreflang canonical and analytics are handled here.
const props = defineProps({
  segment: { type: String, required: true }, // restaurants | online-stores | retail | distributors | pricing
  seoKey: { type: String, required: true }, // key in seoPages.*
  mainId: { type: String, default: 'main' },
  showFooterCta: { type: Boolean, default: false },
})

const { t, locale } = useI18n()
const localePath = useLocalePath()
const config = useRuntimeConfig()

useSeoMeta({
  title: () => t(`seoPages.${props.seoKey}.title`),
  description: () => t(`seoPages.${props.seoKey}.description`),
  ogTitle: () => t(`seoPages.${props.seoKey}.title`),
  ogDescription: () => t(`seoPages.${props.seoKey}.description`),
  twitterTitle: () => t(`seoPages.${props.seoKey}.title`),
  twitterDescription: () => t(`seoPages.${props.seoKey}.description`),
})

const base = 'https://wineater.com'
useSchemaOrg([
  {
    '@type': 'WebPage',
    name: () => t(`seoPages.${props.seoKey}.title`),
    description: () => t(`seoPages.${props.seoKey}.description`),
    inLanguage: () => locale.value,
    isPartOf: { '@id': `${base}/#site` },
  },
  {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Wineater', item: `${base}${localePath('/') === '/' ? '' : localePath('/')}` },
      { '@type': 'ListItem', position: 2, name: () => t(`seoPages.${props.seoKey}.title`) },
    ],
  },
])

onMounted(() => {
  if (props.segment === 'pricing') return // PricingTable fires pricing_view itself
  track('solution_view', { segment: props.segment })
})
</script>

<style scoped lang="scss">
.sol-page { min-height: 100vh; background: #fff; color: var(--ink-2); }
</style>
