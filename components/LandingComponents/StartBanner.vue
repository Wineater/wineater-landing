<template>
  <div class="hero" :class="`hero--${audience}`">
    <div class="hero__main">
      <AudienceTabs class="hero__tabs" :model-value="audience" @update:model-value="setAudience" />

      <div
        v-for="item in AUDIENCES"
        :id="`panel-${item}`"
        :key="item"
        class="hero__panel"
        :class="{ 'is-entering': entering && audience === item }"
        role="tabpanel"
        :aria-labelledby="`tab-${item}`"
        :hidden="audience !== item"
      >
        <component
          :is="audience === item ? 'h1' : 'h2'"
          :id="audience === item ? 'hero-title' : undefined"
          class="hero__title"
        >
          {{ $t(`startBanner.${item}.headline1`) }}
          <span class="hero__title-highlight">{{ $t(`startBanner.${item}.headline2`) }}</span>
        </component>

        <p class="hero__subtitle">{{ $t(`startBanner.${item}.subtitle`) }}</p>

        <div class="hero__ctas">
          <Button @btnClick="onPrimary(item)">
            {{ $t('cta.primary') }}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </Button>
          <Button bg-color="outline" :href="demoUrl" target="_blank" @btnClick="onDemo(item)">
            {{ $t('cta.demo') }}
            <span class="hero__sr">({{ $t('Header.opensNewTab') }})</span>
          </Button>
        </div>
        <p class="hero__trial">{{ selfServe ? $t('Footer.trialSelfServe') : $t('Footer.trial') }}</p>

        <ul class="hero__points">
          <li v-for="n in 3" :key="n" class="hero__point">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9"/>
              <path d="M8 12.500l3 3 5-6"/>
            </svg>
            <span>{{ $t(`startBanner.${item}.point${n}`) }}</span>
          </li>
        </ul>
      </div>

      <div class="hero__proof">
        <dl class="hero__chips">
          <div v-for="chip in chips" :key="chip.key" class="hero__chip">
            <dt>{{ chip.value }}</dt>
            <dd>{{ $t(`startBanner.proof.${chip.key}`) }}</dd>
          </div>
        </dl>
        <p class="hero__footnote">{{ proofCaveat }}</p>
      </div>
    </div>

    <!-- The owner's pattern: constant for both audiences. Only the accent card on top changes. -->
    <div class="hero__banner">
      <img
        class="hero__banner-img"
        :src="BANNER_SRC"
        width="948"
        height="992"
        fetchpriority="high"
        decoding="async"
        :alt="$t('startBanner.imageAlt')"
      >
      <div class="hero__accent">
        <AudienceScene :audience="audience" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { AUDIENCES, DEFAULT_AUDIENCE, AUDIENCE_STORAGE_KEY, isAudience } from '~/data/demo';
import { pilotProof } from '~/data/proof';
import AudienceTabs from '~/components/LandingComponents/AudienceTabs.vue';
import AudienceScene from '~/components/LandingComponents/AudienceScene.vue';
import Button from '~/components/Buttons/Button.vue';

const BANNER_SRC = 'https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/main-banner.webp';

useHead({
  link: [{ rel: 'preload', as: 'image', href: BANNER_SRC, type: 'image/webp', fetchpriority: 'high' }],
});

const emit = defineEmits(['getStarted']);
const { enabled: selfServe } = useSelfServe();
const { t, locale } = useI18n();

const lang = computed(() => (locale.value === 'fr' ? 'fr' : 'en'));
const chips = computed(() => [
  { key: 'buy', value: pilotProof.buyClick[lang.value] },
  { key: 'requests', value: pilotProof.requestsPerShopper[lang.value] },
  { key: 'search', value: pilotProof.search[lang.value] },
]);
const proofCaveat = computed(() => pilotProof.caveat[lang.value]);

const demoUrl = 'https://share-eu1.hsforms.com/1kziM_bz_TDqsB5emVJbReA2ehswf';

// Shared with the demo (WidgetHome) so its example prompts follow the tab.
// Server render and first client render are always the retail default.
const audience = useState('audience', () => DEFAULT_AUDIENCE);
const entering = ref(false);
let enterTimer = null;

const readStored = () => {
  try {
    const stored = window.localStorage.getItem(AUDIENCE_STORAGE_KEY);
    return isAudience(stored) ? stored : null;
  } catch {
    return null;
  }
};

const persist = (value) => {
  try {
    window.localStorage.setItem(AUDIENCE_STORAGE_KEY, value);
  } catch {
    /* storage unavailable: the tab still works */
  }
  // replaceState does not scroll and does not add history entries.
  try {
    window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}#${value}`);
  } catch {
    /* ignore */
  }
};

const setAudience = (value, { user = true } = {}) => {
  if (!isAudience(value) || value === audience.value) return;
  audience.value = value;
  entering.value = true;
  clearTimeout(enterTimer);
  enterTimer = setTimeout(() => (entering.value = false), 600);
  if (user) {
    persist(value);
    track('audience_switch', { audience: value });
  }
};

const fromHash = () => {
  const hash = window.location.hash.replace('#', '');
  return isAudience(hash) ? hash : null;
};

const onHashChange = () => {
  const value = fromHash();
  if (value) setAudience(value, { user: false });
};

onMounted(() => {
  // Hash wins over the stored choice. Panel ids are prefixed ("panel-retail"), so the
  // browser never scrolls to #retail on load.
  const initial = fromHash() || readStored();
  if (initial) setAudience(initial, { user: false });
  window.addEventListener('hashchange', onHashChange);
});

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', onHashChange);
  clearTimeout(enterTimer);
});

const onPrimary = (item) => {
  track('cta_click', { cta_label: t('cta.primary'), location: 'hero', audience: item });
  emit('getStarted', 'hero');
};

const onDemo = (item) => {
  track('cta_click', { cta_label: t('cta.demo'), location: 'hero', audience: item });
};
</script>

<style scoped lang="scss">
$ease: cubic-bezier(0.16, 1, 0.3, 1);

// Original geometry: image on the right at ~45% width, anchored top-right, uncropped.
.hero {
  display: grid;
  grid-template-columns: minmax(0, 55fr) minmax(0, 45fr);
  column-gap: 0;
  align-items: start;
  padding-top: 120px;
  position: relative;
}

.hero__main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  min-width: 0;
  padding-right: 32px;
  position: relative;
  z-index: 2;
}

@keyframes hero-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.hero__banner {
  // Slow float starts after load (3s) so it never touches the LCP paint.
  animation: hero-float 9s ease-in-out 3s infinite;
  position: relative;
  min-width: 0;
  align-self: start;
}

.hero__banner-img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 948 / 992;
  object-fit: contain;
  object-position: right top;
}

.hero__accent {
  position: absolute;
  left: -4%;
  top: 6%;
  width: 48%;
  max-width: 280px;
}

.hero__panel {
  &[hidden] { display: none; }
  &.is-entering { animation: panel-in 0.5s $ease both; }
}

@keyframes panel-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero__title {
  margin: 0 0 20px;
  color: var(--ink);
  font-family: 'PoppinsMedium', sans-serif;
  font-weight: 500;
  font-size: clamp(3.2rem, 3.4vw, 4.8rem);
  line-height: 1.1;
  letter-spacing: -0.015em;
  text-wrap: balance;
}

.hero__title-highlight { color: var(--brand-1); }

.hero__subtitle {
  max-width: 54ch;
  margin: 0 0 32px;
  color: var(--ink-2);
  font-size: 1.8rem;
  line-height: 1.6;
}

.hero__ctas {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.hero__trial {
  margin: 0 0 28px;
  color: var(--ink-3);
  font-size: 1.4rem;
  line-height: 1.5;
}

.hero__sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.hero__points {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.hero__point {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: var(--ink-2);
  font-size: 1.6rem;
  line-height: 1.5;

  svg {
    flex-shrink: 0;
    margin-top: 3px;
    color: var(--brand-1);
  }
}

.hero__proof { width: 100%; }

.hero__chips {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 0;
  padding-top: 24px;
  border-top: 1px solid var(--brand-5);
}

.hero__chip {
  padding: 0 16px;
  border-left: 1px solid var(--brand-5);

  &:first-child { padding-left: 0; border-left: 0; }

  dt {
    color: var(--ink);
    font-family: 'PoppinsMedium', sans-serif;
    font-size: 2.8rem;
    line-height: 1.15;
    font-variant-numeric: tabular-nums;
  }

  dd {
    margin: 4px 0 0;
    color: var(--ink-2);
    font-size: 1.4rem;
    line-height: 1.4;
  }
}

.hero__footnote {
  margin: 16px 0 0;
  color: var(--ink-3);
  font-size: 1.4rem;
  line-height: 1.5;
}

@media only screen and (max-width: 1100px) {
  .hero { padding-top: 110px; }
  .hero__main { padding-right: 24px; }
  .hero__chip { padding: 0 12px; }
  .hero__chip dt { font-size: 2.4rem; }
}

// Single column: the banner sits in-flow between the headline and the CTAs.
@media only screen and (max-width: 899px) {
  .hero {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding-top: 92px;
    gap: 24px;
  }

  .hero__main,
  .hero__panel { display: contents; }
  .hero__panel[hidden] { display: none; }

  .hero__tabs { order: 0; }
  .hero__title { order: 1; margin: 0; font-size: clamp(3rem, 7vw, 4.4rem); }
  .hero__subtitle { order: 2; max-width: 100%; margin: 0; }
  .hero__banner { order: 3; }
  .hero__ctas { order: 4; margin: 0; }
  .hero__trial { order: 4; margin: -12px 0 0; }
  .hero__points { order: 5; }
  .hero__proof { order: 6; }

  .hero__panel.is-entering { animation: none; }
  .hero__panel.is-entering > * { animation: panel-in 0.5s $ease both; }

  .hero__banner {
    align-self: center;
    width: fit-content;
    max-width: 100%;
  }

  .hero__banner-img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 320px;
    object-position: center;
  }

  .hero__accent {
    left: 0;
    top: 4%;
    width: 46%;
    max-width: 170px;
  }
}

@media only screen and (max-width: 600px) {
  .hero { padding-top: 84px; }
  .hero__title { font-size: 3rem; }
  .hero__subtitle { font-size: 1.6rem; }
  .hero__ctas { flex-direction: column; align-items: stretch; gap: 12px; }
  .hero__ctas :deep(.button) { width: 100%; }
  .hero__chip { padding: 0 8px; }
  .hero__chip dt { font-size: 2.2rem; }
  .hero__chip dd { font-size: 1.4rem; }
}

@media (prefers-reduced-motion: reduce) {
  .hero__panel.is-entering,
  .hero__panel.is-entering > * { animation: none; }
  .hero__banner { animation: none; }
}
</style>
