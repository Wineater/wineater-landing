<template>
  <SolutionPage segment="retail" seo-key="retail">
    <SolutionHero segment="retail" base="solutions.retail" photo="retail-hero" primary="demo" />
    <WhyNow />
    <StepsBlock base="solutions.retail.how" :count="3" />
    <HowItThinks />
    <FeatureCards id="manager" base="solutions.retail.manager" :count="3" />
    <PhotoBand name="retail-shelf" />
    <PilotResults />
    <CaseStudy segment="retail" :item="null" />
    <PriceCard segment="retail" />
    <SegmentFaq segment="retail" />
    <SolutionCta segment="retail" base="solutions.retail" primary="demo" />
  </SolutionPage>
</template>

<script setup>
import SolutionPage from '~/components/Solutions/SolutionPage.vue'
import SolutionHero from '~/components/Solutions/SolutionHero.vue'
import WhyNow from '~/components/Solutions/WhyNow.vue'
import StepsBlock from '~/components/Solutions/StepsBlock.vue'
import HowItThinks from '~/components/Solutions/HowItThinks.vue'
import FeatureCards from '~/components/Solutions/FeatureCards.vue'
import PhotoBand from '~/components/Solutions/PhotoBand.vue'
import PilotResults from '~/components/LandingComponents/PilotResults.vue'
import CaseStudy from '~/components/Solutions/CaseStudy.vue'
import PriceCard from '~/components/Solutions/PriceCard.vue'
import SegmentFaq from '~/components/Solutions/SegmentFaq.vue'
import SolutionCta from '~/components/Solutions/SolutionCta.vue'
</script>
