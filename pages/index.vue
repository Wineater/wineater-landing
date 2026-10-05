<template>
  <Header :show-links="true"/>

  <main class="main-page" role="main">

    <!-- 1. Hero: one message for everyone, no tabs -->
    <section aria-labelledby="hero-title">
      <StartBanner />
    </section>

    <!-- 2. Why now: one line and the one external statistic, with its source -->
    <WhyNow />

    <!-- 3. Demo: the product right after the hero -->
    <section aria-labelledby="demo-title" id="ai-sommelier">
      <WidgetHome :visible="widgetHomeVisible" @get-started="openSignup('demo')"/>
    </section>

    <!-- 3b. Trust ribbon right after the demo: clients, press, supporters -->
    <ClientLogos />

    <!-- 4. Four ways to use it -->
    <SolutionCards />

    <!-- 5. How the algorithm thinks (shared with every Solutions page) -->
    <HowItThinks />

    <!-- 7. Founder note (placeholder until the owner supplies the text) -->
    <FounderNote />

    <!-- 8. How to start (id get-started lives inside) -->
    <section aria-labelledby="how-it-works-title" id="how-it-works">
      <HowItWorks :visible="howItWorksVisible"/>
    </section>

    <FaqTeaser />

  </main>

  <Footer/>
</template>

<script setup>
import Header from "~/components/LandingComponents/Header.vue";
import StartBanner from "~/components/LandingComponents/StartBanner.vue";
import WidgetHome from "~/components/LandingComponents/WidgetHome.vue";
import HowItWorks from "~/components/LandingComponents/HowItWorks.vue";
import Footer from "~/components/LandingComponents/Footer.vue";
import ClientLogos from "~/components/LandingComponents/ClientLogos.vue";
import WhyNow from "~/components/Solutions/WhyNow.vue";
import SolutionCards from "~/components/Solutions/SolutionCards.vue";
import HowItThinks from "~/components/Solutions/HowItThinks.vue";
import FounderNote from "~/components/Solutions/FounderNote.vue";
import { CURRENCY, pricedPlans } from '~/data/pricing';
import FaqTeaser from "~/components/FaqTeaser.vue";
import { ref, onMounted, onUnmounted } from 'vue';

const { t } = useI18n();
const { openSignup } = useSignup();
const publicPrices = pricedPlans.map(p => p.price);

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
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: CURRENCY,
      lowPrice: String(Math.min(...publicPrices)),
      highPrice: String(Math.max(...publicPrices)),
      offerCount: publicPrices.length,
      description: '1-month free trial',
    },
  },
]);

const widgetHomeVisible = ref(false);
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
      else if (el.classList.contains('how-it-works')) howItWorksVisible.value = true;
      observer.unobserve(el);
    });
  }, { threshold: 0.05 });

  ['.widget-home', '.how-it-works'].forEach((sel) => {
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
  // Spacing owner: each block pads its own top with --section-y; the last block
  // hands the gap to the closing band (Footer) via this bottom padding.
  padding: 0 var(--gutter) calc(var(--section-y) - 12px); // minus the FAQ link's 44px touch box

  // Anchors land with the heading ~100px below the viewport top (fixed header),
  // net of the padding-top the target already carries.
  :where([id]) { scroll-margin-top: calc(100px - var(--section-y)); }
}


</style>
