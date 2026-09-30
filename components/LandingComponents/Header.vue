<template>
  <header class="header" :class="{ 'header--scrolled': scrolled }">
    <NuxtLink :to="homePath" class="header__logo-link" :aria-label="$t('Header.home')" @click="onLogoClick">
      <img class="header__logo"
           :src="store && logos[store] ? logos[store] : logos.Wineater"
           alt="Wineater"
           width="220"
           height="44">
    </NuxtLink>

    <nav class="header__links" v-if="showLinks" :aria-label="$t('Header.mainNav')">
      <a v-for="item in navItems"
         :key="item.id"
         class="header__link p1"
         :href="`${homePath}#${item.id}`"
         @click="onNavClick($event, item.id)">
        {{ $t(item.label) }}
      </a>
      <NuxtLink class="header__link p1" :to="localePath('/faq')">{{ $t('Header.Faq') }}</NuxtLink>
    </nav>

    <div class="header__right-container">
      <div class="header__btns">
        <a class="header__btn-ghost p1"
           :href="demoUrl"
           target="_blank"
           rel="noopener"
           @click="onDemoClick">
          {{ $t('cta.demo') }}
          <span class="header__sr-only">({{ $t('Header.opensNewTab') }})</span>
        </a>
        <button v-if="isHome" type="button" class="header__btn-primary" @click="onPrimaryClick">
          <span class="p1">{{ $t('cta.primary') }}</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false">
            <path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <NuxtLink v-else :to="`${homePath}#get-started`" class="header__btn-primary" @click="trackPrimary">
          <span class="p1">{{ $t('cta.primary') }}</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false">
            <path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const route = useRoute();
const localePath = useLocalePath();
const { t } = useI18n();
const store = ref(route.query.store ? route.query.store : '');
const scrolled = ref(false);

const emit = defineEmits(['getStarted']);

const props = defineProps({
  showLinks: Boolean,
  logo: { type: String, default: 'Wineater' }
});

const demoUrl = 'https://share-eu1.hsforms.com/1kziM_bz_TDqsB5emVJbReA2ehswf';

const navItems = [
  { id: 'problem', label: 'Header.Challenge' },
  { id: 'for-whom', label: 'Header.Solution' },
  { id: 'ai-sommelier', label: 'Header.TryMe' },
  { id: 'how-it-works', label: 'Header.HowItWorks' }
];

const logos = {
  Wineater: 'https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/logo.svg',
  Telckel: 'https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/Telckel.png',
  Climats: 'https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/Climats.png'
};

const homePath = computed(() => localePath('/'));
const isHome = computed(() => route.path.replace(/\/$/, '') === homePath.value.replace(/\/$/, ''));

const handleScroll = () => {
  scrolled.value = window.scrollY > 40;
};

onMounted(() => {
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
});
onUnmounted(() => window.removeEventListener('scroll', handleScroll));

const isModifiedClick = (e) => e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button > 0;

const onLogoClick = (e) => {
  if (isModifiedClick(e) || !isHome.value) return;
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const onNavClick = (e, id) => {
  if (isModifiedClick(e) || !isHome.value) return;
  const element = document.getElementById(id);
  if (!element) return;
  e.preventDefault();
  const top = element.getBoundingClientRect().top + window.scrollY - 120;
  window.scrollTo({ top, behavior: 'smooth' });
  history.replaceState(history.state, '', `#${id}`);
};

const trackPrimary = () => {
  track('cta_click', { cta_label: t('cta.primary'), location: 'header' });
};

const onPrimaryClick = () => {
  trackPrimary();
  emit('getStarted');
};

const onDemoClick = () => {
  track('demo_click', { location: 'header' });
  track('outbound_link_click', { url: demoUrl });
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  position: fixed;
  z-index: 10000;
  height: 76px;
  top: 24px;
  border-radius: 40px;
  padding: 0 8px 0 40px;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  left: calc(50% - 640px);
  align-items: center;
  justify-content: space-between;
  transition: background 0.3s, box-shadow 0.3s, backdrop-filter 0.3s;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.3);

  &--scrolled {
    background: rgba(255, 255, 255, 0.92);
    box-shadow: 0 4px 32px rgba(0, 0, 0, 0.08);
    border-color: transparent;
  }
}

.header__right-container {
  display: flex;
  align-items: center;
  height: 100%;
}

.header__links {
  display: flex;
  gap: 4px;
}

.header__link {
  cursor: pointer;
  display: flex;
  align-items: center;
  min-height: 44px;
  padding: 8px 14px;
  text-decoration: none;
  border-radius: 20px;
  color: #333;
  font-family: 'PoppinsRegular', sans-serif;
  font-size: 14px;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: rgba(126, 39, 237, 0.07);
    color: #7E27ED;
  }
}

.header__logo-link {
  display: flex;
  align-items: center;
  min-height: 44px;
  min-width: 0;
  border-radius: 8px;
  flex-shrink: 1;
}

.header__logo {
  display: block;
  height: 44px;
  width: 220px;
  max-width: 100%;
  object-fit: contain;
  object-position: left center;
}

.header__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

.header__logo-link:focus-visible,
.header__link:focus-visible,
.header__btn-ghost:focus-visible,
.header__btn-primary:focus-visible {
  outline: 3px solid #7E27ED;
  outline-offset: 2px;
}

.header__btns {
  display: flex;
  align-items: center;
  height: 100%;
  gap: 8px;
}

.header__btn-ghost {
  padding: 0 20px;
  height: 44px;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  position: relative;
  border-radius: 59px;
  color: #333;
  font-family: 'PoppinsRegular', sans-serif;
  font-size: 14px;
  transition: background 0.2s;
  white-space: nowrap;

  &:hover {
    background: rgba(0, 0, 0, 0.06);
  }
}

.header__btn-primary {
  height: 52px;
  padding: 0 24px;
  border-radius: 59px;
  background: linear-gradient(135deg, #7E27ED 0%, #2FC0BF 100%);
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  border: 0;
  text-decoration: none;
  transition: opacity 0.2s, transform 0.2s;
  margin: 12px 0;
  box-shadow: 0 4px 16px rgba(126, 39, 237, 0.25);

  span {
    color: #fff;
    font-family: 'PoppinsMedium', sans-serif;
    font-size: 14px;
    white-space: nowrap;
  }

  svg {
    color: #fff;
    flex-shrink: 0;
  }

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
}

@media only screen and (max-width: 1440px) {
  .header {
    height: 70px;
    width: calc(100% - 80px);
    left: 40px;
  }

  .header__logo {
    height: 38px;
    width: 190px;
  }
}

@media only screen and (max-width: 1279px) {
  .header__links {
    display: none;
  }
}

@media only screen and (max-width: 767px) {
  .header {
    height: 60px;
    width: calc(100% - 32px);
    left: 16px;
    top: 16px;
    padding-left: 20px;
    padding-right: 6px;
  }

  .header__logo {
    height: 34px;
    width: 140px;
  }

  .header__btn-ghost {
    display: none;
  }

  .header__btn-primary {
    height: 44px;
    margin: 0;
    padding: 0 16px;

    span {
      font-size: 13px;
      white-space: normal;
      text-align: left;
      line-height: 1.15;
    }
  }
}

@media only screen and (max-width: 480px) {
  .header__logo {
    width: 96px;
  }

  .header__btn-primary {
    padding: 0 12px;

    span {
      font-size: 12px;
    }

    svg {
      display: none;
    }
  }
}
</style>
