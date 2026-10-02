<template>
  <SolutionPage segment="online-stores" seo-key="onlineStores">
    <SolutionHero segment="online-stores" base="solutions.onlineStores" photo="online-stores" primary="trial" :params="{ buy }" />
    <!-- Live demo: same widget and demo store as before, now on the page that sells it -->
    <section aria-labelledby="demo-title" id="ai-sommelier" class="demo-wrap">
      <WidgetHome :visible="true" @get-started="openSignup" />
    </section>
    <ProofChips />
    <RoiCalculator />
    <StepsBlock base="solutions.onlineStores.how" :count="3" />
    <FeatureShowcase />
    <HowItThinks />
    <FeatureCards id="promote" base="solutions.onlineStores.promote" :count="3" />
    <EarlyAccess />
    <CaseStudy segment="online-stores" :item="null" />
    <PriceCard segment="shops" />
    <SegmentFaq segment="online" />
    <SolutionCta segment="online-stores" base="solutions.onlineStores" primary="trial" />
  </SolutionPage>
</template>

<script setup>
import SolutionPage from '~/components/Solutions/SolutionPage.vue'
import SolutionHero from '~/components/Solutions/SolutionHero.vue'
import WidgetHome from '~/components/LandingComponents/WidgetHome.vue'
import ProofChips from '~/components/Solutions/ProofChips.vue'
import RoiCalculator from '~/components/Solutions/RoiCalculator.vue'
import StepsBlock from '~/components/Solutions/StepsBlock.vue'
import FeatureShowcase from '~/components/LandingComponents/FeatureShowcase.vue'
import HowItThinks from '~/components/Solutions/HowItThinks.vue'
import FeatureCards from '~/components/Solutions/FeatureCards.vue'
import EarlyAccess from '~/components/Solutions/EarlyAccess.vue'
import CaseStudy from '~/components/Solutions/CaseStudy.vue'
import PriceCard from '~/components/Solutions/PriceCard.vue'
import SegmentFaq from '~/components/Solutions/SegmentFaq.vue'
import SolutionCta from '~/components/Solutions/SolutionCta.vue'
import { pilotProof } from '~/data/proof'

const { openSignup } = useSignup()
const { locale } = useI18n()
const buy = computed(() => pilotProof.buyClick[locale.value === 'fr' ? 'fr' : 'en'])
</script>

<style scoped lang="scss">
.demo-wrap { max-width: var(--container); margin: 0 auto; }
</style>
