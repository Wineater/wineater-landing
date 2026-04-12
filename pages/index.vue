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

    <!-- 3. Problem — make them feel understood -->
    <section id="problem">
      <ProblemBanner @scroll-to-demo="scrollToDemo"/>
    </section>

    <!-- 4. For whom — 3 segments with sales copy and ROI -->
    <section aria-labelledby="forwho-title" id="for-whom">
      <ForWhom :visible="forWhomVisible"/>
    </section>

    <!-- 5. Stats — proof it works -->
    <section aria-labelledby="stats-title" id="statistics">
      <StatisticBanner :visible="statisticBannerVisible"/>
    </section>

    <!-- 6. Demo — "see it for yourself" -->
    <section aria-labelledby="demo-title" id="ai-sommelier">
      <WidgetHome :visible="widgetHomeVisible"/>
    </section>

    <!-- 7. How it works — the algorithm explained -->
    <section aria-labelledby="how-it-works-title" id="how-it-works">
      <HowItWorks :visible="howItWorksVisible"/>
    </section>

    <!-- 8. How to start — remove the "sounds complicated" objection -->
    <section id="get-started">
      <HowToStart @get-started="showSignup = true"/>
    </section>

    <!-- 9. Press — Featured in -->
    <section aria-labelledby="press-title" id="press">
      <Press :visible="pressVisible"/>
    </section>

    <!-- 10. Partners -->
    <section aria-labelledby="partners-title" id="partners">
      <Partners :visible="partnersVisible"/>
    </section>

  </main>

  <Footer @get-started="showSignup = true"/>
</template>

<script setup>
import Header from "~/components/LandingComponents/Header.vue";
import StartBanner from "~/components/LandingComponents/StartBanner.vue";
import SignupForm from "~/components/LandingComponents/SignupForm.vue";
import ProblemBanner from "~/components/LandingComponents/ProblemBanner.vue";
import WidgetHome from "~/components/LandingComponents/WidgetHome.vue";
import StatisticBanner from "~/components/LandingComponents/StatisticBanner.vue";
import HowItWorks from "~/components/LandingComponents/HowItWorks.vue";
import HowToStart from "~/components/LandingComponents/HowToStart.vue";
import Footer from "~/components/LandingComponents/Footer.vue";
import ForWhom from "~/components/LandingComponents/ForWhom.vue";
import Partners from "~/components/LandingComponents/Partners.vue";
import Press from "~/components/LandingComponents/Press.vue";
import { ref, onMounted, onUnmounted } from 'vue';

const showSignup = ref(false);
const widgetHomeVisible = ref(false);
const statisticBannerVisible = ref(false);
const forWhomVisible = ref(false);
const howItWorksVisible = ref(false);
const pressVisible = ref(false);
const partnersVisible = ref(false);

const scrollToDemo = () => {
  const el = document.querySelector('#ai-sommelier');
  if (el) window.scrollTo({ top: el.offsetTop - 120, behavior: 'smooth' });
};

let observer = null;

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.classList.contains('widget-home')) widgetHomeVisible.value = true;
      else if (el.classList.contains('statistic-banner')) statisticBannerVisible.value = true;
      else if (el.classList.contains('for-whom')) forWhomVisible.value = true;
      else if (el.classList.contains('how-it-works')) howItWorksVisible.value = true;
      else if (el.classList.contains('press')) pressVisible.value = true;
      else if (el.classList.contains('partners')) partnersVisible.value = true;
      observer.unobserve(el);
    });
  }, { threshold: 0.05 });

  ['.widget-home', '.statistic-banner', '.for-whom', '.how-it-works', '.press', '.partners'].forEach((sel) => {
    const el = document.querySelector(sel);
    if (el) observer.observe(el);
  });
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style lang="scss">
.main-page {
  max-width: 1280px;
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
