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

    <!-- 3. Problem + for whom (merged; #problem anchor lives inside ForWhom) -->
    <div id="for-whom">
      <ForWhom :visible="forWhomVisible" @get-started="showSignup = true"/>
    </div>

    <!-- 7. How it works + how to start (id get-started lives inside) -->
    <section aria-labelledby="how-it-works-title" id="how-it-works">
      <HowItWorks :visible="howItWorksVisible" @get-started="showSignup = true"/>
    </section>

    <FaqTeaser />

    <!-- 9. Press and partners: one logo strip -->
    <section id="press" aria-label="Press and partners">
      <Press />
    </section>

  </main>

  <Footer @get-started="showSignup = true"/>
</template>

<script setup>
import Header from "~/components/LandingComponents/Header.vue";
import StartBanner from "~/components/LandingComponents/StartBanner.vue";
import SignupForm from "~/components/LandingComponents/SignupForm.vue";
import WidgetHome from "~/components/LandingComponents/WidgetHome.vue";
import HowItWorks from "~/components/LandingComponents/HowItWorks.vue";
import Footer from "~/components/LandingComponents/Footer.vue";
import ForWhom from "~/components/LandingComponents/ForWhom.vue";
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
      observer.unobserve(el);
    });
  }, { threshold: 0.05 });

  ['.widget-home', '.for-whom', '.how-it-works'].forEach((sel) => {
    const el = document.querySelector(sel);
    if (el) observer.observe(el);
  });
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style lang="scss">
// ONE container for every section: --container wide, --gutter at the sides.
// Section components pad themselves with var(--section-y) so the rhythm is uniform.
.main-page {
  width: 100%;
  max-width: calc(var(--container) + var(--gutter) * 2);
  margin: 0 auto;
  padding: 0 var(--gutter);

  [id] { scroll-margin-top: 100px; }
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
