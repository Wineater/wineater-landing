<template>
  <Header :show-links="true" />
  <div class="main-page">
    <StartBanner />
    <AlgorithmInfo :visible="algorithmInfoVisible" />
    <ScienceBehind :visible="scienceBehindVisible" />
<!--    <StatisticBanner :visible="statisticBannerVisible" />-->
<!--    <AboutBanner :visible="aboutBannerVisible" />-->
<!--    <BookDemoBanner :visible="bookDemoBannerVisible" />-->
<!--    <HowItWorks :visible="howItWorksVisible" />-->
<!--    <Footer :visible="footerVisible" />-->
  </div>
</template>

<script setup>
import StartBanner from "~/components/LandingComponents/StartBanner.vue";
import AlgorithmInfo from "~/components/LandingComponents/AlgorithmInfo.vue";
import ScienceBehind from "~/components/LandingComponents/ScienceBehind.vue";
import StatisticBanner from "~/components/LandingComponents/StatisticBanner.vue";
import AboutBanner from "~/components/LandingComponents/AboutBanner.vue";
import HowItWorks from "~/components/LandingComponents/HowItWorks.vue";
import Footer from "~/components/LandingComponents/Footer.vue";
import BookDemoBanner from "~/components/LandingComponents/BookDemoBanner.vue";
import { ref, onMounted, onUnmounted } from 'vue';

const algorithmInfoVisible = ref(false);
const scienceBehindVisible = ref(false);
const statisticBannerVisible = ref(false);
const aboutBannerVisible = ref(false);
const bookDemoBannerVisible = ref(false);
const howItWorksVisible = ref(false);
const footerVisible = ref(false);

const isElementInViewport = (element, isVisible) => {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const elementCenterY = (rect.top + rect.bottom) / 2;
  return  elementCenterY >= windowHeight / 3 && elementCenterY <= (windowHeight * 2) / 3;
};

const updateVisibility = () => {
  const algorithmInfo = document.querySelector('.algorithm-info');
  const scienceBehind = document.querySelector('.science-behind');
  const statisticBanner = document.querySelector('.statistic-banner');
  const aboutBanner = document.querySelector('.about-banner');
  const bookDemoBanner = document.querySelector('.book-demo-banner');
  const howItWorks = document.querySelector('.how-it-works');
  const footer = document.querySelector('.footer');

  if (algorithmInfo) algorithmInfoVisible.value = algorithmInfoVisible.value ? true : isElementInViewport(algorithmInfo);
  if (scienceBehind) scienceBehindVisible.value = scienceBehindVisible.value ? true : isElementInViewport(scienceBehind);
  if (statisticBanner) statisticBannerVisible.value = statisticBannerVisible.value ? true : isElementInViewport(statisticBanner);
  if (aboutBanner) aboutBannerVisible.value = aboutBannerVisible.value ? true : isElementInViewport(aboutBanner);
  if (bookDemoBanner) bookDemoBannerVisible.value = bookDemoBannerVisible.value ? true : isElementInViewport(bookDemoBanner);
  if (howItWorks) howItWorksVisible.value = howItWorksVisible.value ? true : isElementInViewport(howItWorks);
  if (footer) footerVisible.value = footerVisible.value ? true : isElementInViewport(footer);
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
  max-width: 1920px;
  padding: 0 80px;
  margin: 0 auto;
}

@media only screen and (max-width: 768px) {
  .main-page {
    padding: 0 40px;
  }
}
@media only screen and (max-width: 600px) {
  .main-page {
    padding: 0 0px 0 16px;
  }
}

</style>