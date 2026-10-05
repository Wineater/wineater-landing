<template>
  <footer class="footer">
    <div class="footer__cta">
      <div class="footer__cta-inner" v-reveal:stagger>
        <h2 class="footer__cta-title">{{ $t('Footer.closing') }}</h2>
        <p class="footer__cta-trial">{{ selfServe ? $t('Footer.trialSelfServe') : $t('Footer.trial') }}</p>
        <div class="footer__btns">
          <button v-if="isHome" type="button" class="footer__btn footer__btn--primary" @click="onPrimaryClick">
            {{ $t('cta.primary') }}
          </button>
          <a v-else-if="selfServe" :href="signupUrl('footer')" class="footer__btn footer__btn--primary" @click="trackPrimary">
            {{ $t('cta.primary') }}
          </a>
          <NuxtLink v-else :to="`${homePath}#get-started`" class="footer__btn footer__btn--primary" @click="trackPrimary">
            {{ $t('cta.primary') }}
          </NuxtLink>
          <a class="footer__btn footer__btn--secondary" :href="demoUrl" target="_blank" rel="noopener" @click="onDemoClick">{{ $t('cta.demo') }}</a>
        </div>
      </div>
    </div>

    <div class="footer__main">
      <div class="footer__grid" v-reveal:stagger>
        <div class="footer__brand">
          <div class="footer__logo" role="img" aria-label="Wineater"></div>
          <p class="footer__tagline">{{ $t('Footer.text') }}</p>
        </div>

        <nav class="footer__col" :aria-label="$t('Footer.navLabel')">
          <h3 class="footer__col-title">{{ $t('Footer.colProduct') }}</h3>
          <NuxtLink class="footer__link" :to="`${homePath}#ai-sommelier`">{{ $t('Header.TryMe') }}</NuxtLink>
          <NuxtLink class="footer__link" :to="`${homePath}#how-it-works`">{{ $t('Header.HowItWorks') }}</NuxtLink>
          <NuxtLink class="footer__link" :to="`${homePath}#get-started`">{{ $t('Header.GetStarted') }}</NuxtLink>
        </nav>

        <div class="footer__col">
          <h3 class="footer__col-title">{{ $t('Footer.colResources') }}</h3>
          <NuxtLink class="footer__link" :to="localePath('/blog')">{{ $t('Footer.blog') }}</NuxtLink>
          <NuxtLink class="footer__link" :to="localePath('/faq')">{{ $t('Footer.faq') }}</NuxtLink>
        </div>

        <div class="footer__col">
          <h3 class="footer__col-title">{{ $t('Footer.colLegal') }}</h3>
          <NuxtLink class="footer__link" :to="localePath('/privacy')">{{ $t('Footer.privacy') }}</NuxtLink>
          <NuxtLink class="footer__link" :to="localePath('/terms')">{{ $t('Footer.terms') }}</NuxtLink>
          <NuxtLink class="footer__link" :to="localePath('/legal')">{{ $t('Footer.legal') }}</NuxtLink>
          <button type="button" class="footer__link footer__link-btn" @click="openCookieSettings">{{ $t('Footer.cookies') }}</button>
        </div>

        <div class="footer__col" role="group" :aria-label="$t('Footer.contactLabel')">
          <h3 class="footer__col-title">{{ $t('Footer.contactLabel') }}</h3>
          <a class="footer__link" href="mailto:hi@wineater.com">hi@wineater.com</a>
          <a class="footer__link" href="tel:+33781014033">+33 7 81 01 40 33</a>
          <a class="footer__link" href="https://linkedin.com/company/wineater" target="_blank" rel="noopener" @click="onLinkedinClick">LinkedIn</a>
        </div>
      </div>
      <p class="footer__copy">&copy; {{ year }} Wineater</p>
    </div>
  </footer>
</template>

<script setup>
const route = useRoute();
const localePath = useLocalePath();
const { t } = useI18n();

const emit = defineEmits(['getStarted']);
const { enabled: selfServe, signupUrl } = useSelfServe();

const year = new Date().getFullYear();
const demoUrl = 'https://share-eu1.hsforms.com/1kziM_bz_TDqsB5emVJbReA2ehswf';

const homePath = computed(() => localePath('/'));
const isHome = computed(() => route.path.replace(/\/$/, '') === homePath.value.replace(/\/$/, ''));

const trackPrimary = () => {
  track('cta_click', { cta_label: t('cta.primary'), location: 'footer' });
};

const onPrimaryClick = () => {
  trackPrimary();
  emit('getStarted', 'footer');
};

const onDemoClick = () => {
  track('demo_click', { location: 'footer' });
  track('outbound_link_click', { link_url: demoUrl });
};

const onLinkedinClick = () => {
  track('outbound_link_click', { link_url: 'https://linkedin.com/company/wineater' });
};

const openCookieSettings = () => {
  if (typeof useConsent === 'function') useConsent().reopen();
};
</script>

<style scoped lang="scss">
.footer {
  width: 100%;
}

.footer__cta {
  background: var(--brand-1);
  color: #fff;
}

.footer__cta-inner {
  max-width: calc(var(--container) + 2 * var(--gutter));
  margin: 0 auto;
  padding: 72px var(--gutter);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

.footer__cta-title {
  margin: 0;
  max-width: 20ch;
  font-size: clamp(3.2rem, 4.4vw, 5.2rem);
  line-height: 1.1;
  color: #fff;
}

.footer__cta-trial {
  margin: 0;
  font-size: clamp(1.8rem, 2vw, 2.4rem);
  font-family: 'PoppinsMedium', sans-serif;
  line-height: 1.5;
  color: #fff;
}

.footer__btns {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
}

.footer__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 56px;
  padding: 0 32px;
  border-radius: 999px;
  border: 2px solid #fff;
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 1.6rem;
  line-height: 1.2;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:focus-visible { outline: 3px solid #fff; outline-offset: 3px; }

  &--primary {
    background: #fff;
    color: var(--brand-1);
    &:hover { background: var(--brand-7); }
  }

  &--secondary {
    background: transparent;
    color: #fff;
    &:hover { background: rgba(255, 255, 255, 0.14); }
  }
}

.footer__main {
  background: var(--brand-7);
  color: var(--ink);
}

.footer__grid {
  max-width: calc(var(--container) + 2 * var(--gutter));
  margin: 0 auto;
  padding: 56px var(--gutter) 32px;
  display: grid;
  grid-template-columns: 1.6fr repeat(4, 1fr);
  gap: 32px;
}

.footer__brand {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer__logo {
  width: 160px;
  height: 32px;
  background-image: url('https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/logo.svg');
  background-size: contain;
  background-repeat: no-repeat;
}

.footer__tagline {
  margin: 0;
  max-width: 28ch;
  font-size: 1.6rem;
  line-height: 1.5;
  color: var(--ink-2);
}

.footer__col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.footer__col-title {
  margin: 0 0 4px;
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 1.6rem;
  line-height: 1.3;
  color: var(--ink);
}

.footer__link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-size: 1.6rem;
  line-height: 1.3;
  color: var(--ink-2);
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 2px;
  transition: color 0.15s ease, text-decoration-color 0.15s ease, text-underline-offset 0.15s ease;
  border-radius: 8px;

  &:hover { color: var(--link); text-decoration-color: currentColor; text-underline-offset: 4px; }
  &:focus-visible { outline: 3px solid var(--brand-1); outline-offset: 2px; }
}

.footer__link-btn {
  padding: 0;
  background: none;
  border: 0;
  cursor: pointer;
  font-family: 'PoppinsRegular', sans-serif;
  text-align: left;
}

.footer__copy {
  max-width: calc(var(--container) + 2 * var(--gutter));
  margin: 0 auto;
  padding: 16px var(--gutter) 24px;
  font-size: 1.4rem;
  color: var(--ink-3);
  border-top: 1px solid var(--brand-5);
}

@media only screen and (max-width: 1023px) {
  .footer__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .footer__brand { grid-column: 1 / -1; }
}

@media only screen and (max-width: 767px) {
  .footer__cta-inner { padding-top: 48px; padding-bottom: 48px; }
  .footer__cta-title { font-size: 3.2rem; }
  .footer__cta-trial { font-size: 1.6rem; }
  .footer__btns { width: 100%; flex-direction: column; }
  .footer__btn { width: 100%; }
  .footer__grid { padding-top: 40px; }
}
</style>
