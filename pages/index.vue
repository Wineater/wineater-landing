<template>
  <Header :show-links="true" @get-started="showSignup = true"/>

  <Transition name="fade">
    <SignupForm v-if="showSignup" @close="showSignup = false"/>
  </Transition>

  <main class="main-page" role="main">

    <!-- 1. Hero — "Turn wine indecision into wine sales" -->
    <section aria-labelledby="hero-title">
      <StartBanner @get-started="showSignup = true"/>
    </section>

    <!-- 2. Client logos — social proof above the fold -->
    <section>
      <ClientLogos/>
    </section>

    <!-- 3. Problem — make them feel understood -->
    <section id="problem">
      <ProblemBanner @scroll-to-demo="scrollToDemo"/>
    </section>

    <!-- 4. Demo — "see it for yourself" -->
    <section aria-labelledby="demo-title" id="ai-sommelier">
      <WidgetHome :visible="widgetHomeVisible"/>
    </section>

    <!-- 5. For whom — 3 segments with sales copy and ROI -->
    <section aria-labelledby="forwho-title" id="for-whom">
      <ForWhom :visible="forWhomVisible"/>
    </section>

    <!-- 6. Stats — proof it works -->
    <section aria-labelledby="stats-title" id="statistics">
      <StatisticBanner :visible="statisticBannerVisible"/>
    </section>

    <!-- 7. How it works — the algorithm explained -->
    <section aria-labelledby="how-it-works-title" id="how-it-works">
      <HowItWorks :visible="howItWorksVisible"/>
    </section>

    <!-- 8. How to start — remove the "sounds complicated" objection -->
    <section id="get-started">
      <HowToStart @get-started="showSignup = true"/>
    </section>

    <!-- 9. Partners -->
    <section aria-labelledby="partners-title" id="partners">
      <Partners :visible="partnersVisible"/>
    </section>

  </main>

  <Footer @get-started="showSignup = true"/>
</template>

<script setup>
import Header from "~/components/LandingComponents/Header.vue";
import StartBanner from "~/components/LandingComponents/StartBanner.vue";
import ClientLogos from "~/components/LandingComponents/ClientLogos.vue";
import SignupForm from "~/components/LandingComponents/SignupForm.vue";
import ProblemBanner from "~/components/LandingComponents/ProblemBanner.vue";
import WidgetHome from "~/components/LandingComponents/WidgetHome.vue";
import StatisticBanner from "~/components/LandingComponents/StatisticBanner.vue";
import HowItWorks from "~/components/LandingComponents/HowItWorks.vue";
import HowToStart from "~/components/LandingComponents/HowToStart.vue";
import Footer from "~/components/LandingComponents/Footer.vue";
import ForWhom from "~/components/LandingComponents/ForWhom.vue";
import Partners from "~/components/LandingComponents/Partners.vue";
import { ref, onMounted, onUnmounted } from 'vue';

const showSignup = ref(false);
const widgetHomeVisible = ref(false);
const statisticBannerVisible = ref(false);
const forWhomVisible = ref(false);
const howItWorksVisible = ref(false);
const partnersVisible = ref(false);

const scrollToDemo = () => {
  const el = document.querySelector('#ai-sommelier');
  if (el) window.scrollTo({ top: el.offsetTop - 120, behavior: 'smooth' });
};

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
