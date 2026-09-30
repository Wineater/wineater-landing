<template>
  <div class="hero" :class="`hero--${audience}`">
    <div class="hero__main">
      <AudienceTabs :model-value="audience" @update:model-value="setAudience" />

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
          class="hero__title color-text"
        >
          {{ $t(`startBanner.${item}.headline1`) }}
          <span class="hero__title-highlight">{{ $t(`startBanner.${item}.headline2`) }}</span>
        </component>

        <p class="hero__subtitle color-dark-100">{{ $t(`startBanner.${item}.subtitle`) }}</p>

        <div class="hero__ctas">
          <button type="button" class="hero__cta-primary" @click="onPrimary(item)">
            <span>{{ $t('cta.primary') }}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <a class="hero__cta-secondary" :href="demoUrl" target="_blank" rel="noopener" @click="onDemo(item)">
            <span>{{ $t('cta.demo') }}</span>
            <span class="hero__sr">{{ $t('Header.opensNewTab') }}</span>
          </a>
        </div>

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
            <dd>{{ $t(`startBanner.proof.${chip.key}`, chip.params) }}</dd>
          </div>
        </dl>
        <p class="hero__footnote">{{ proofSource }}. {{ proofCaveat }}</p>
      </div>
    </div>

    <div class="hero__scene">
      <AudienceScene :audience="audience" />
    </div>
  </div>
</template>

<script setup>
import { AUDIENCES, DEFAULT_AUDIENCE, AUDIENCE_STORAGE_KEY, isAudience } from '~/data/demo';
import { pilotProof } from '~/data/proof';
import AudienceTabs from '~/components/LandingComponents/AudienceTabs.vue';
import AudienceScene from '~/components/LandingComponents/AudienceScene.vue';

const emit = defineEmits(['getStarted']);
const { t, locale } = useI18n();

const lang = computed(() => (locale.value === 'fr' ? 'fr' : 'en'));
const fmt = (n) => new Intl.NumberFormat(lang.value, { maximumFractionDigits: 1 }).format(n);
const chips = computed(() => [
  { key: 'buy', value: `${fmt(pilotProof.resultsToBuy.value)}%`, params: { n: pilotProof.resultsToBuy.n, of: pilotProof.resultsToBuy.of } },
  { key: 'requests', value: fmt(pilotProof.requestsPerUser.value), params: {} },
  { key: 'search', value: `${fmt(pilotProof.activation.value)}%`, params: { n: pilotProof.activation.n, of: pilotProof.activation.of } },
]);
const proofSource = computed(() => pilotProof.source[lang.value]);
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
  emit('getStarted');
};

const onDemo = (item) => {
  track('cta_click', { cta_label: t('cta.demo'), location: 'hero', audience: item });
};
</script>

<style scoped lang="scss">
$ease: cubic-bezier(0.16, 1, 0.3, 1);

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: 48px;
  align-items: stretch;
  margin-top: 150px;
  position: relative;
}

.hero__main {
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-width: 0;
}

.hero__scene {
  min-width: 0;
}

.hero__panel {
  min-height: 420px;

  &[hidden] {
    display: none;
  }

  &.is-entering {
    animation: panel-in 0.6s $ease both;
  }
}

@keyframes panel-in {
  from { opacity: 0; transform: translateY(10px); filter: blur(4px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}

.hero__title {
  margin: 0 0 20px;
  font-family: 'PoppinsMedium', sans-serif;
  font-weight: 500;
  font-size: clamp(2rem, 3.6vw, 3.25rem);
  line-height: 1.12;
  text-wrap: balance;
}

.hero__title-highlight {
  color: #7E27ED;
}

.hero__subtitle {
  max-width: 540px;
  margin: 0 0 28px;
  font-size: 18px;
  line-height: 1.65;
}

.hero__ctas {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}

.hero__cta-primary {
  padding: 16px 32px;
  min-height: 52px;
  border: 0;
  border-radius: 72px;
  background: #7E27ED;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s, transform 0.3s $ease, box-shadow 0.3s $ease;
  box-shadow: 0 8px 24px rgba(126, 39, 237, 0.28);

  span {
    color: #fff;
    font-family: 'PoppinsMedium', sans-serif;
    font-size: 16px;
  }

  svg {
    color: #fff;
    transition: transform 0.3s $ease;
  }

  &:hover {
    background: #6A1FD0;
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(126, 39, 237, 0.36);

    svg { transform: translateX(3px); }
  }

  &:active { transform: scale(0.98); }

  &:focus-visible {
    outline: 3px solid #333;
    outline-offset: 3px;
  }
}

.hero__cta-secondary {
  padding: 16px 32px;
  min-height: 52px;
  border-radius: 72px;
  border: 1.5px solid #8a8a8a;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transition: border-color 0.2s;

  span {
    color: #333;
    font-family: 'PoppinsMedium', sans-serif;
    font-size: 16px;
  }

  &:hover {
    border-color: #7E27ED;

    span { color: #7E27ED; }
  }

  &:focus-visible {
    outline: 3px solid #333;
    outline-offset: 3px;
  }
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
  font-family: 'PoppinsRegular', sans-serif;
  font-size: 15px;
  line-height: 1.5;
  color: #333;

  svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: #7E27ED;
  }
}

.hero__chips {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0;
  margin: 0;
}

.hero__chip {
  padding: 0 16px;
  border-left: 1px solid #e2e2e2;

  &:first-child { padding-left: 0; border-left: 0; }

  dt {
    font-family: 'PoppinsMedium', sans-serif;
    font-size: 26px;
    line-height: 1.2;
    color: #7E27ED;
    font-variant-numeric: tabular-nums;
  }

  dd {
    margin: 4px 0 0;
    font-family: 'PoppinsRegular', sans-serif;
    font-size: 13px;
    line-height: 1.4;
    color: #595959;
  }
}

.hero__footnote {
  margin: 14px 0 0;
  font-family: 'PoppinsRegular', sans-serif;
  font-size: 12px;
  line-height: 1.5;
  color: #595959;
}

@media only screen and (max-width: 1100px) {
  .hero {
    margin-top: 130px;
    gap: 32px;
  }

  .hero__panel { min-height: 460px; }
}

@media only screen and (max-width: 899px) {
  .hero {
    display: flex;
    flex-direction: column;
    margin-top: 0;
    padding-top: 96px;
    gap: 24px;
  }

  .hero__panel { min-height: 0; }

  .hero__subtitle {
    max-width: 100%;
    font-size: 16px;
  }
}

@media only screen and (max-width: 600px) {
  .hero__chip { padding: 0 8px; }
  .hero__chip dt { font-size: 20px; }
  .hero__chip dd { font-size: 12px; }

  .hero {
    padding-top: 84px;
  }

  .hero__main { gap: 24px; }

  .hero__title {
    font-size: 1.875rem;
    margin-bottom: 16px;
  }

  .hero__subtitle { margin-bottom: 24px; }

  .hero__ctas {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .hero__cta-primary,
  .hero__cta-secondary {
    justify-content: center;
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__panel.is-entering { animation: none; }

  .hero__cta-primary,
  .hero__cta-primary svg {
    transition: none;
  }
}
</style>
