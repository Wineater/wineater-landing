<template>
  <Header :show-links="true"/>
  <main class="main-page" role="main">
    <!-- Hero Section with H1 -->
    <section aria-labelledby="hero-title">
      <StartBanner/>
    </section>
    
    <!-- AI Sommelier Demo Section -->
    <section aria-labelledby="demo-title" id="ai-sommelier">
      <WidgetHome :visible="widgetHomeVisible"/>
    </section>
    
    <!-- Benefits Section -->
    <section aria-labelledby="benefits-title" id="for-whom">
      <ForWhom :visible="forWhomVisible"/>
    </section>
    
    <!-- Statistics Section -->
    <section aria-labelledby="stats-title" id="statistics">
      <StatisticBanner :visible="statisticBannerVisible"/>
    </section>
    
    <!-- How It Works Section -->
    <section aria-labelledby="how-it-works-title" id="how-it-works">
      <HowItWorks :visible="howItWorksVisible"/>
    </section>
    
    <!-- Partners Section -->
    <section aria-labelledby="partners-title" id="partners">
      <Partners :visible="partnersVisible"/>
    </section>
  </main>
  <Footer/>
</template>

<script setup>
import Header from "~/components/LandingComponents/Header.vue";
import StartBanner from "~/components/LandingComponents/StartBanner.vue";
import WidgetHome from "~/components/LandingComponents/WidgetHome.vue";
import StatisticBanner from "~/components/LandingComponents/StatisticBanner.vue";
import HowItWorks from "~/components/LandingComponents/HowItWorks.vue";
import Footer from "~/components/LandingComponents/Footer.vue";
import {ref, onMounted, onUnmounted} from 'vue';
import ForWhom from "~/components/LandingComponents/ForWhom.vue";
import Partners from "~/components/LandingComponents/Partners.vue";

const widgetHomeVisible = ref(false);
const statisticBannerVisible = ref(false);
const forWhomVisible = ref(false);
const howItWorksVisible = ref(false);
const partnersVisible = ref(false);

const isElementInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const elementCenterY = ((rect.top - (windowHeight / 2)) + rect.bottom) / 2;
  return elementCenterY >= windowHeight / 3 && elementCenterY <= (windowHeight * 2) / 3;
};

const updateVisibility = () => {
  const widgetHome = document.querySelector('.widget-home');
  const statisticBanner = document.querySelector('.statistic-banner');
  const forWhom = document.querySelector('.for-whom');
  const howItWorks = document.querySelector('.how-it-works');
  const partners = document.querySelector('.partners');
  if (widgetHome) widgetHomeVisible.value = widgetHomeVisible.value || isElementInViewport(widgetHome);
  if (statisticBanner) statisticBannerVisible.value = statisticBannerVisible.value || isElementInViewport(statisticBanner);
  if (forWhom) forWhomVisible.value = forWhomVisible.value || isElementInViewport(forWhom);
  if (howItWorks) howItWorksVisible.value = howItWorksVisible.value || isElementInViewport(howItWorks);
  if (partners) partnersVisible.value = partnersVisible.value || isElementInViewport(partners);
};

onMounted(() => {
  window.addEventListener('scroll', updateVisibility);
  updateVisibility();
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateVisibility);
});
</script>
<style lang="scss">
.main-page {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

@media only screen and (max-width: 1440px) {
  .main-page {
    padding: 0 40px;
  }
}

@media only screen and (max-width: 600px) {
  .main-page {
    padding: 0 0 0 16px;
  }
}
</style>
