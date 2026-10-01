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

    <!-- 2. Demo — the product on the second screen -->
    <section aria-labelledby="demo-title" id="ai-sommelier">
      <WidgetHome :visible="widgetHomeVisible"/>
    </section>

    <!-- 2b. Live clients -->
    <ClientLogos />
    <PilotResults @get-started="showSignup = true"/>

    <!-- 3. Problem — make them feel understood -->
    <section id="problem">
      <ProblemBanner @scroll-to-demo="scrollToDemo"/>
    </section>

    <!-- 4. For whom — 3 segments with sales copy and ROI -->
    <section aria-labelledby="forwho-title" id="for-whom">
      <ForWhom :visible="forWhomVisible" @get-started="showSignup = true"/>
    </section>

    <!-- 7. How it works — the algorithm explained -->
    <section aria-labelledby="how-it-works-title" id="how-it-works">
      <HowItWorks :visible="howItWorksVisible"/>
    </section>

    <!-- 8. How to start — remove the "sounds complicated" objection -->
    <section id="get-started">
      <HowToStart @get-started="showSignup = true"/>
    </section>

    <FaqTeaser />

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
import HowItWorks from "~/components/LandingComponents/HowItWorks.vue";
import HowToStart from "~/components/LandingComponents/HowToStart.vue";
import Footer from "~/components/LandingComponents/Footer.vue";
import ForWhom from "~/components/LandingComponents/ForWhom.vue";
import Partners from "~/components/LandingComponents/Partners.vue";
import Press from "~/components/LandingComponents/Press.vue";
import ClientLogos from "~/components/LandingComponents/ClientLogos.vue";
import PilotResults from "~/components/LandingComponents/PilotResults.vue";
import FaqTeaser from "~/components/FaqTeaser.vue";
import { ref, onMounted, onUnmounted } from 'vue';

const { t } = useI18n();

useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  ogTitle: () => t('seo.title'),
  ogDescription: () => t('seo.description'),
});

useSchemaOrg([
  {
    '@type': 'Organization',
    '@id': 'https://wineater.com/#org',
    name: 'Wineater',
    url: 'https://wineater.com',
    logo: 'https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/logo.svg',
    email: 'hi@wineater.com',
    telephone: '+33781014033',
    legalName: 'BACCHUSTECH OÜ',
    address: { '@type': 'PostalAddress', streetAddress: 'Tornimäe tn 5', addressLocality: 'Tallinn', addressCountry: 'EE' },
    sameAs: ['https://www.linkedin.com/company/wineater'],
  },
  {
    '@type': 'WebSite',
    '@id': 'https://wineater.com/#site',
    url: 'https://wineater.com',
    name: 'Wineater',
    publisher: { '@id': 'https://wineater.com/#org' },
    inLanguage: ['en', 'fr'],
  },
  {
    '@type': 'SoftwareApplication',
    name: 'Wineater AI Sommelier',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'AI sommelier that recommends wines from a merchant\'s own catalog, via widget, QR code or API.',
    url: 'https://wineater.com',
    publisher: { '@id': 'https://wineater.com/#org' },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR', description: '1-month free trial' },
  },
]);

const showSignup = ref(false);
const widgetHomeVisible = ref(false);
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
      else if (el.classList.contains('for-whom')) forWhomVisible.value = true;
      else if (el.classList.contains('how-it-works')) howItWorksVisible.value = true;
      else if (el.classList.contains('press')) pressVisible.value = true;
      else if (el.classList.contains('partners')) partnersVisible.value = true;
      observer.unobserve(el);
    });
  }, { threshold: 0.05 });

  ['.widget-home', '.for-whom', '.how-it-works', '.press', '.partners'].forEach((sel) => {
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
    padding: 0 16px;
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
