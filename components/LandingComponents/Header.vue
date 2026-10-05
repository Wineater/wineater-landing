<template>
  <header class="header" :class="{ 'header--scrolled': scrolled, 'header--open': menuOpen }">
    <div class="header__bar">
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
           class="header__link"
           :href="`${homePath}#${item.id}`"
           @click="onNavClick($event, item.id)">
          {{ $t(item.label) }}
        </a>
        <NuxtLink class="header__link" :to="localePath('/faq')">{{ $t('Header.Faq') }}</NuxtLink>
      </nav>

      <div class="header__btns">
        <a class="header__btn-ghost"
           :href="demoUrl"
           target="_blank"
           rel="noopener"
           @click="onDemoClick">
          {{ $t('cta.demo') }}
          <span class="header__sr-only">({{ $t('Header.opensNewTab') }})</span>
        </a>
        <Button v-if="isHome" size="sm" class="header__cta" @btnClick="onPrimaryClick">{{ $t('cta.primary') }}</Button>
        <Button v-else size="sm" class="header__cta" :href="selfServe ? signupUrl('header') : undefined" :to="selfServe ? undefined : `${homePath}#get-started`" @btnClick="trackPrimary">{{ $t('cta.primary') }}</Button>

        <button v-if="showLinks"
                ref="toggleRef"
                type="button"
                class="header__burger"
                :aria-expanded="menuOpen ? 'true' : 'false'"
                aria-controls="site-menu"
                :aria-label="menuOpen ? $t('Header.closeMenu') : $t('Header.menu')"
                @click="toggleMenu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" focusable="false">
            <path v-if="!menuOpen" d="M4 7h16M4 12h16M4 17h16"/>
            <path v-else d="M6 6l12 12M18 6L6 18"/>
          </svg>
        </button>
      </div>
    </div>

    <Transition name="menu">
      <div v-if="menuOpen && showLinks"
           id="site-menu"
           ref="menuRef"
           class="header__menu"
           role="dialog"
           aria-modal="true"
           :aria-label="$t('Header.menuTitle')"
           @keydown="onMenuKeydown">
        <nav :aria-label="$t('Header.mainNav')">
          <a v-for="item in navItems"
             :key="item.id"
             class="header__menu-link"
             :href="`${homePath}#${item.id}`"
             @click="onMenuNav($event, item.id)">
            {{ $t(item.label) }}
          </a>
          <NuxtLink class="header__menu-link" :to="localePath('/faq')" @click="closeMenu()">{{ $t('Header.Faq') }}</NuxtLink>
        </nav>
        <div class="header__menu-ctas">
          <Button v-if="isHome" @btnClick="onMenuPrimary">{{ $t('cta.primary') }}</Button>
          <Button v-else :href="selfServe ? signupUrl('header_menu') : undefined" :to="selfServe ? undefined : `${homePath}#get-started`" @btnClick="trackPrimary">{{ $t('cta.primary') }}</Button>
          <Button bg-color="outline" :href="demoUrl" target="_blank" @btnClick="onDemoClick">
            {{ $t('cta.demo') }}
            <span class="header__sr-only">({{ $t('Header.opensNewTab') }})</span>
          </Button>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import Button from '~/components/Buttons/Button.vue';

const route = useRoute();
const localePath = useLocalePath();
const { t } = useI18n();
const store = ref(route.query.store ? route.query.store : '');
const scrolled = ref(false);
const menuOpen = ref(false);
const toggleRef = ref(null);
const menuRef = ref(null);

const emit = defineEmits(['getStarted']);
const { enabled: selfServe, signupUrl } = useSelfServe();

const props = defineProps({
  showLinks: Boolean,
  logo: { type: String, default: 'Wineater' }
});

const demoUrl = 'https://share-eu1.hsforms.com/1kziM_bz_TDqsB5emVJbReA2ehswf';

const navItems = [
  { id: 'ai-sommelier', label: 'Header.TryMe' },
  { id: 'how-recommendations-work', label: 'Header.Why' },
  { id: 'for-whom', label: 'Header.Who' },
  { id: 'how-it-works', label: 'Header.GetStarted' }
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
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.documentElement.style.overflow = '';
});

// Mobile menu: a modal dialog with a focus trap. Esc closes and returns focus to the toggle.
const focusables = () => Array.from(menuRef.value?.querySelectorAll('a[href], button:not([disabled])') ?? []);

const closeMenu = (returnFocus = false) => {
  if (!menuOpen.value) return;
  menuOpen.value = false;
  if (returnFocus) nextTick(() => toggleRef.value?.focus());
};

const toggleMenu = () => {
  if (menuOpen.value) closeMenu(true);
  else menuOpen.value = true;
};

watch(menuOpen, async (open) => {
  document.documentElement.style.overflow = open ? 'hidden' : '';
  if (open) {
    await nextTick();
    focusables()[0]?.focus();
  }
});

const onMenuKeydown = (e) => {
  if (e.key === 'Escape') {
    e.preventDefault();
    closeMenu(true);
    return;
  }
  if (e.key !== 'Tab') return;
  // Keep Tab inside the dialog and the toggle (which closes it).
  const items = [toggleRef.value, ...focusables()].filter(Boolean);
  const first = items[0];
  const last = items[items.length - 1];
  const active = document.activeElement;
  if (e.shiftKey && (active === first || active === focusables()[0])) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && active === last) {
    e.preventDefault();
    (focusables()[0] ?? first).focus();
  }
};

const onGlobalKey = (e) => {
  if (e.key === 'Escape' && menuOpen.value) closeMenu(true);
};

const onResize = () => {
  if (window.innerWidth >= 1100) closeMenu();
};

onMounted(() => {
  window.addEventListener('keydown', onGlobalKey);
  window.addEventListener('resize', onResize, { passive: true });
});
onUnmounted(() => {
  window.removeEventListener('keydown', onGlobalKey);
  window.removeEventListener('resize', onResize);
});

const isModifiedClick = (e) => e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button > 0;

const onLogoClick = (e) => {
  if (isModifiedClick(e) || !isHome.value) return;
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const onMenuNav = (e, id) => {
  // Cancel the native jump now: the scroll below runs after the next tick, too late to do it.
  if (!isModifiedClick(e) && isHome.value) e.preventDefault();
  closeMenu();
  // The page scroll lock is released after the next tick; scroll once it is.
  nextTick(() => onNavClick(e, id));
};

const onMenuPrimary = () => {
  closeMenu();
  onPrimaryClick();
};

const onNavClick = (e, id) => {
  if (isModifiedClick(e) || !isHome.value) return;
  const element = document.getElementById(id);
  if (!element) return;
  e.preventDefault();
  // Land the section heading ~100px below the viewport top, under the fixed header.
  const anchor = element.querySelector('h2') || element;
  const top = anchor.getBoundingClientRect().top + window.scrollY - 100;
  window.scrollTo({ top, behavior: 'smooth' });
  history.replaceState(history.state, '', `#${id}`);
};

const trackPrimary = () => {
  track('cta_click', { cta_label: t('cta.primary'), location: 'header' });
};

const onPrimaryClick = () => {
  trackPrimary();
  emit('getStarted', 'header');
};

const onDemoClick = () => {
  track('demo_click', { location: 'header' });
  track('outbound_link_click', { link_url: demoUrl });
};
</script>

<style scoped lang="scss">
// One container: the bar spans the same width as the page content. The pill background
// extends 16px outside it after scrolling, so logo and CTA stay on the content edges.
.header {
  position: fixed;
  z-index: 10000;
  top: 16px;
  left: 0;
  right: 0;
  padding: 0 var(--gutter);
  pointer-events: none;
}

.header__bar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  max-width: var(--container);
  height: 64px;
  margin: 0 auto;
  pointer-events: auto;

  &::before {
    content: '';
    position: absolute;
    inset: 0 -16px;
    z-index: -1;
    border-radius: 40px;
    background: rgba(255, 255, 255, 0);
    box-shadow: 0 0 0 rgba(26, 20, 38, 0);
    transition: background 0.3s, box-shadow 0.3s;
  }
}

.header--scrolled .header__bar::before,
.header--open .header__bar::before {
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 4px 24px rgba(26, 20, 38, 0.1);
}

@supports (backdrop-filter: blur(8px)) {
  .header--scrolled .header__bar::before { backdrop-filter: blur(10px); }
}

.header__logo-link {
  display: flex;
  align-items: center;
  min-height: 44px;
  min-width: 0;
  flex-shrink: 1;
  border-radius: 8px;
}

.header__logo {
  display: block;
  height: 38px;
  width: 190px;
  max-width: 100%;
  object-fit: contain;
  object-position: left center;
}

.header__links {
  display: none;
  gap: 4px;
}

.header__link {
  display: flex;
  align-items: center;
  min-height: 44px;
  padding: 8px 14px;
  border-radius: 22px;
  color: var(--ink);
  font-family: 'PoppinsRegular', sans-serif;
  font-size: 15px;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: var(--brand-7);
    color: var(--brand-1);
  }
}

.header__btns {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header__btn-ghost {
  display: none;
  align-items: center;
  height: 44px;
  padding: 0 16px;
  border-radius: 22px;
  color: var(--ink);
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 15px;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.2s;

  &:hover { background: var(--brand-7); }
}

.header__burger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1.5px solid var(--ink-3);
  border-radius: 50%;
  background: #fff;
  color: var(--ink);
  cursor: pointer;
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
.header__burger:focus-visible,
.header__menu-link:focus-visible {
  outline: 3px solid var(--ink);
  outline-offset: 2px;
}

// Mobile menu panel
.header__menu {
  position: relative;
  max-width: var(--container);
  max-height: calc(100dvh - 104px);
  overflow-y: auto;
  margin: 8px auto 0;
  padding: 8px 20px 24px;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 16px 48px rgba(26, 20, 38, 0.18);
  pointer-events: auto;

  nav { display: flex; flex-direction: column; }
}

.header__menu-link {
  display: flex;
  align-items: center;
  min-height: 56px;
  border-bottom: 1px solid var(--brand-5);
  color: var(--ink);
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 18px;
  text-decoration: none;

  &:focus-visible { outline-offset: -3px; border-radius: 12px; }
}

.header__menu-ctas {
  display: grid;
  gap: 12px;
  margin-top: 20px;

  :deep(.button) { width: 100%; }
}

.menu-enter-active,
.menu-leave-active { transition: opacity 0.2s ease-out, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
.menu-enter-from,
.menu-leave-to { opacity: 0; transform: translateY(-8px); }

@media only screen and (min-width: 640px) {
  .header__btn-ghost { display: flex; }
}

@media only screen and (min-width: 1100px) {
  .header__links { display: flex; }
  .header__burger { display: none; }
}

@media only screen and (max-width: 479px) {
  // The menu carries the CTAs on phones; the bar stays logo + menu button.
  .header__cta { display: none; }
}

@media only screen and (max-width: 639px) {
  .header { top: 8px; }
  .header__bar { height: 56px; gap: 12px; }
  .header__logo { height: 32px; width: 130px; }
  .header__cta { padding: 0 14px; font-size: 14px; white-space: normal; line-height: 1.15; }
  .header__cta :deep(.button__label) { text-align: center; }
}

@media (prefers-reduced-motion: reduce) {
  .menu-enter-active,
  .menu-leave-active,
  .header__bar::before { transition: none; }
}
</style>
