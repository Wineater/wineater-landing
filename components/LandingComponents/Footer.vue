<template>
  <footer class="footer">
    <div class="footer__content">
      <div class="footer__texts">
        <div class="footer__title color-brand-4 decorative-1">
          {{ $t('Footer.title') }}
        </div>
        <p class="footer__text h2 color-brand-4">
          {{ $t('Footer.closing') }}
          <span class="footer__text-arrow" aria-hidden="true"></span>
        </p>
        <div class="footer__trial color-brand-4">{{ $t('Footer.trial') }}</div>
        <div class="footer__btns">
          <button v-if="isHome" type="button" class="footer__cta-primary" @click="onPrimaryClick">
            <span class="p1">{{ $t('cta.primary') }}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <NuxtLink v-else :to="`${homePath}#get-started`" class="footer__cta-primary" @click="trackPrimary">
            <span class="p1">{{ $t('cta.primary') }}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </NuxtLink>
          <Button :href="demoUrl" target="_blank" @btnClick="onDemoClick">{{ $t('cta.demo') }}</Button>
        </div>
      </div>
      <div class="footer__info">
        <div class="footer__logo" role="img" aria-label="Wineater"></div>
        <div class="footer__links" role="group" :aria-label="$t('Footer.contactLabel')">
          <a class="footer__link p1 color-brand-4" href="mailto:hi@wineater.com">hi@wineater.com</a>
          <a class="footer__link p1 color-brand-4" href="tel:+33781014033">+33 7 81 01 40 33</a>
          <a class="footer__link p1 color-brand-4" href="https://linkedin.com/company/wineater" target="_blank" rel="noopener" @click="onLinkedinClick">Linkedin</a>
        </div>
      </div>
      <nav class="footer__legal" :aria-label="$t('Footer.navLabel')">
        <NuxtLink class="footer__link p1 color-brand-4" :to="localePath('/blog')">{{ $t('Footer.blog') }}</NuxtLink>
        <NuxtLink class="footer__link p1 color-brand-4" :to="localePath('/faq')">{{ $t('Footer.faq') }}</NuxtLink>
        <NuxtLink class="footer__link p1 color-brand-4" :to="localePath('/privacy')">{{ $t('Footer.privacy') }}</NuxtLink>
        <NuxtLink class="footer__link p1 color-brand-4" :to="localePath('/terms')">{{ $t('Footer.terms') }}</NuxtLink>
        <NuxtLink class="footer__link p1 color-brand-4" :to="localePath('/legal')">{{ $t('Footer.legal') }}</NuxtLink>
        <button type="button" class="footer__link footer__link-btn p1 color-brand-4" @click="openCookieSettings">{{ $t('Footer.cookies') }}</button>
      </nav>
    </div>
  </footer>
</template>

<script setup>
import Button from "~/components/Buttons/Button.vue";

const route = useRoute();
const localePath = useLocalePath();
const { t } = useI18n();

const emit = defineEmits(['getStarted']);

const demoUrl = 'https://share-eu1.hsforms.com/1kziM_bz_TDqsB5emVJbReA2ehswf';

const homePath = computed(() => localePath('/'));
const isHome = computed(() => route.path.replace(/\/$/, '') === homePath.value.replace(/\/$/, ''));

const trackPrimary = () => {
  track('cta_click', { cta_label: t('cta.primary'), location: 'footer' });
};

const onPrimaryClick = () => {
  trackPrimary();
  emit('getStarted');
};

const onDemoClick = () => {
  track('demo_click', { location: 'footer' });
  track('outbound_link_click', { url: demoUrl });
};

const onLinkedinClick = () => {
  track('outbound_link_click', { url: 'https://linkedin.com/company/wineater' });
};

const openCookieSettings = () => {
  if (typeof useConsent === 'function') useConsent().reopen();
};
</script>

<style scoped lang="scss">
.footer {
  width: 100%;
  background-color: #2FC0BF;
  background-size: 100% 100%;
  background-position: top center;
  background-image: url('https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/footer.webp');
  overflow: hidden;
}

.footer__content {
  max-width: 1920px;
  padding: 300px 80px 0 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin: 0 auto;
}

.footer__texts {
  display: flex;
  flex-direction: column;
  max-width: 900px;
  text-align: left;
}

.footer__text {
  margin-bottom: 0;
  padding-left: 161px;
  position: relative;
  margin-top: 22px;
  text-align: center;
}

.footer__text-arrow {
  position: absolute;
  left: 39px;
  top: 0;
  height: 137px;
  width: 109px;
  background-image: url('https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/footer-arrow.svg');
  background-size: contain;
  background-repeat: no-repeat;
}
.footer__btns {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.footer__trial {
  font-family: 'PoppinsRegular', sans-serif;
  font-size: 14px;
  opacity: 0.75;
  text-align: center;
}

.footer__cta-primary {
  padding: 20px 40px;
  border-radius: 72px;
  background: #fff;
  border: 0;
  text-decoration: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: opacity 0.2s, transform 0.2s;

  span {
    color: #7E27ED;
    font-family: 'PoppinsMedium', sans-serif;
  }

  svg {
    color: #7E27ED;
  }

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  &:focus-visible {
    outline: 3px solid #7E27ED;
    outline-offset: 3px;
  }
}
.footer__links{
  display: flex;
  gap: 8px;
}
.footer__link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 8px;
  text-decoration: none;

  &:hover { text-decoration: underline; }
  &:focus-visible {
    outline: 3px solid #fff;
    outline-offset: 2px;
    border-radius: 6px;
  }
}
.footer__link-btn {
  background: none;
  border: 0;
  cursor: pointer;
  font: inherit;
}
.footer__legal {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px 16px;
  width: 100%;
  padding-bottom: 32px;
}
.footer__info{
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
  margin-top: 150px;
}
.footer__logo{
  height: 44px;
  width: 220px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: left;
  background-image: url('https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/logo--white.svg');
}
@media only screen and (max-width: 1440px) {
  .footer{
    min-height: 722px;
  }
  .footer__content {
    padding-top: 220px;
  }
  .footer__texts {
    max-width: 668px;
  }
}
@media only screen and (max-width: 1024px) {
  .footer{
    min-height: 622px;
  }
  .footer__content {
    padding: 220px 40px 0 40px;
  }
  .footer__texts{
    max-width: 566px;
  }
  .footer__text-arrow {
    position: absolute;
    left: 96px;
    top: 0;
    height: 102px;
    width: 92px;
  }
}

@media only screen and (max-width: 768px) {
  .footer{
    min-height: 466px;
  }
  .footer__content {
    padding: 150px 24px 0 24px;
  }
  .footer__texts{
    max-width: 360px;
  }
  .footer__text{
    padding-left: 96px;
  }
  .footer__text-arrow {
    left: 35px;
    top: 0;
    height: 63px;
    width: 59px;
  }
  .footer__info{
    padding-bottom: 8px;
  }
  .footer__legal{
    padding-bottom: 24px;
  }
}
@media only screen and (max-width: 650px) {
  .footer{
    min-height: auto;
    margin-top: 50px;
  }
  .footer__content {
    padding: 100px 16px 0 16px;
  }
  .footer__texts{
    max-width: 300px;
  }
  .footer__text {
    padding-left: 50px;
  }
  .footer__text-arrow {
    left: 6px;
    top: 0;
    height: 49px;
    width: 50px;
  }
  .footer__info{
    flex-direction: column;
    gap: 40px;
    margin-top: 64px;
  }
  .footer__links{
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0;
  }
}
</style>
