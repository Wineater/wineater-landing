<template>
  <SolutionPage segment="distributors" seo-key="distributors">
    <SolutionHero segment="distributors" base="solutions.distributors" photo="distributors-hero" primary="sales" :trial-note="false" />
    <section id="problem" class="sol-section" aria-labelledby="problem-title">
      <h2 id="problem-title" class="sol-h2" v-reveal>{{ $t('solutions.distributors.problem.title') }}</h2>
      <p class="sol-lead" v-reveal>{{ $t('solutions.distributors.problem.lead') }}</p>
      <p class="sol-note problem__note">
        {{ $t('solutions.distributors.problem.note') }}
      </p>
    </section>
    <FeatureCards id="modules" base="solutions.distributors.modules" :count="4" :cols="2" />
    <StepsBlock id="proposal-flow" base="solutions.distributors.flow" :count="4" />
    <PhotoBand name="distributors-tasting" />
    <FeatureCards id="insights" base="solutions.distributors.insights" :count="2" :cols="2" tint />
    <HowItThinks />
    <PriceCard segment="distributors" />
    <SegmentFaq segment="distributors" />
    <SolutionCta segment="distributors" base="solutions.distributors" primary="sales" />
  </SolutionPage>
</template>

<script setup>
import SolutionPage from '~/components/Solutions/SolutionPage.vue'
import SolutionHero from '~/components/Solutions/SolutionHero.vue'
import FeatureCards from '~/components/Solutions/FeatureCards.vue'
import StepsBlock from '~/components/Solutions/StepsBlock.vue'
import PhotoBand from '~/components/Solutions/PhotoBand.vue'
import HowItThinks from '~/components/Solutions/HowItThinks.vue'
import PriceCard from '~/components/Solutions/PriceCard.vue'
import SegmentFaq from '~/components/Solutions/SegmentFaq.vue'
import SolutionCta from '~/components/Solutions/SolutionCta.vue'
</script>

<style scoped lang="scss">
.problem__note { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; max-width: 80ch; }
</style>
