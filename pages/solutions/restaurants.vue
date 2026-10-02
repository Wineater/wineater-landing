<template>
  <SolutionPage segment="restaurants" seo-key="restaurants">
    <SolutionHero segment="restaurants" base="solutions.restaurants" photo="restaurants-hero" primary="demo" />
    <TwoChannels />
    <StepsBlock base="solutions.restaurants.how" :count="3" />
    <HowItThinks />
    <FeatureCards id="chains" base="solutions.restaurants.chains" :count="3" />
    <section id="restaurants-proof" class="sol-section proof" aria-labelledby="restaurants-proof-title">
      <div class="proof__grid" v-reveal>
        <div>
          <h2 id="restaurants-proof-title" class="sol-h2">{{ $t('solutions.restaurants.proof.title') }}</h2>
          <p class="sol-lead">{{ $t('solutions.restaurants.proof.text') }}</p>
        </div>
        <Photo name="restaurants-table" :alt="$t('photos.restaurants-table')" />
      </div>
    </section>
    <CaseStudy segment="restaurants" :item="null" />
    <PriceCard segment="restaurants" />
    <SegmentFaq segment="restaurants" />
    <SolutionCta segment="restaurants" base="solutions.restaurants" primary="demo" />
  </SolutionPage>
</template>

<script setup>
import SolutionPage from '~/components/Solutions/SolutionPage.vue'
import SolutionHero from '~/components/Solutions/SolutionHero.vue'
import TwoChannels from '~/components/Solutions/TwoChannels.vue'
import StepsBlock from '~/components/Solutions/StepsBlock.vue'
import HowItThinks from '~/components/Solutions/HowItThinks.vue'
import FeatureCards from '~/components/Solutions/FeatureCards.vue'
import Photo from '~/components/Solutions/Photo.vue'
import CaseStudy from '~/components/Solutions/CaseStudy.vue'
import PriceCard from '~/components/Solutions/PriceCard.vue'
import SegmentFaq from '~/components/Solutions/SegmentFaq.vue'
import SolutionCta from '~/components/Solutions/SolutionCta.vue'
</script>

<style scoped lang="scss">
.proof__grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 40px; align-items: center; }
@media only screen and (max-width: 1023px) { .proof__grid { grid-template-columns: 1fr; gap: 24px; } }
</style>
