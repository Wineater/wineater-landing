<template>
  <section id="pilot-results" class="pilot" aria-labelledby="pilot-title">
    <h2 id="pilot-title" class="pilot__title">{{ $t('proof.title') }}</h2>

    <div class="pilot__top">
      <div class="pilot__lead">
        <p class="pilot__lead-num">{{ pct(p.resultsToBuy.value) }}</p>
        <p class="pilot__lead-label">{{ $t('proof.leadLabel', { n: p.resultsToBuy.n, of: p.resultsToBuy.of }) }}</p>
        <p class="pilot__lead-meaning">{{ $t('proof.leadMeaning') }}</p>
      </div>

      <div class="pilot__side">
        <figure class="pilot__quote">
          <blockquote lang="en"><q>{{ p.examplePrompts[0] }}</q></blockquote>
          <figcaption>{{ $t('proof.typedTitle') }}. {{ $t('proof.typedNote') }}</figcaption>
        </figure>

        <h3 class="pilot__h3">{{ $t('proof.themesTitle', { total: p.freeTextRequests.total }) }}</h3>
        <ul class="pilot__themes">
          <li v-for="theme in p.freeTextRequests.themes" :key="theme.key" class="pilot__theme">
            <span class="pilot__theme-label">{{ $t(`proof.theme_${theme.key}`) }}</span>
            <span class="pilot__theme-bar" aria-hidden="true">
              <span class="pilot__theme-fill" :style="{ width: (theme.value / maxTheme * 100) + '%' }"></span>
            </span>
            <span class="pilot__theme-value">{{ theme.value }}</span>
          </li>
        </ul>
      </div>
    </div>

    <dl class="pilot__facts">
      <div class="pilot__fact">
        <dt>{{ $t('proof.f1Label') }}</dt>
        <dd><strong>{{ pct(p.activation.value) }}</strong> <span>{{ $t('proof.f1Detail', { n: p.activation.n, of: p.activation.of }) }}</span></dd>
      </div>
      <div class="pilot__fact">
        <dt>{{ $t('proof.f2Label') }}</dt>
        <dd><strong>{{ pct(p.searchToResults.value) }}</strong> <span>{{ $t('proof.f2Detail', { n: p.searchToResults.n, of: p.searchToResults.of }) }}</span></dd>
      </div>
      <div class="pilot__fact">
        <dt>{{ $t('proof.f3Label') }}</dt>
        <dd><strong>{{ fmt(p.requestsPerUser.value) }}</strong> <span>{{ $t('proof.f3Detail', { requests: p.requestsPerUser.requests, users: p.requestsPerUser.users }) }}</span></dd>
      </div>
    </dl>

    <div class="pilot__bottom">
      <p class="pilot__foot">{{ caveat }} {{ $t('proof.method') }} {{ source }}.</p>
      <Button bgColor="black" @btnClick="onPrimary">{{ $t('cta.primary') }}</Button>
    </div>
  </section>
</template>

<script setup>
import Button from '~/components/Buttons/Button.vue';
import { pilotProof as p } from '~/data/proof';

const emit = defineEmits(['getStarted']);
const { t, locale } = useI18n();

const fmt = (v) => new Intl.NumberFormat(locale.value === 'fr' ? 'fr-FR' : 'en-GB', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(v);
const pct = (v) => `${fmt(v)}%`;

const caveat = computed(() => (locale.value === 'fr' ? p.caveat.fr : p.caveat.en));
const source = computed(() => (locale.value === 'fr' ? p.source.fr : p.source.en));
const maxTheme = Math.max(...p.freeTextRequests.themes.map((x) => x.value));

const onPrimary = () => {
  track('cta_click', { cta_label: t('cta.primary'), location: 'pilot_results' });
  emit('getStarted');
};
</script>

<style scoped lang="scss">
.pilot {
  max-width: var(--container);
  margin: 0 auto;
  padding: var(--section-y) 0;
  color: var(--ink-2);
}

.pilot__title {
  margin: 0 0 32px;
  font-size: clamp(2.8rem, 3.6vw, 4rem);
  line-height: 1.15;
  color: var(--ink);
  max-width: 22ch;
}

.pilot__top {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: stretch;
}

.pilot__lead {
  padding: 32px;
  border-radius: 16px;
  background: var(--brand-7);
}

.pilot__lead-num {
  margin: 0;
  font-family: 'PoppinsMedium', sans-serif;
  font-size: clamp(4.8rem, 6vw, 5.6rem);
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--brand-1);
  font-variant-numeric: tabular-nums;
}

.pilot__lead-label {
  margin: 12px 0 0;
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 2.2rem;
  line-height: 1.3;
  color: var(--ink);
  text-wrap: balance;
}

.pilot__lead-meaning {
  margin: 16px 0 0;
  font-size: 1.7rem;
  line-height: 1.55;
  color: var(--ink-2);
  max-width: 52ch;
}

.pilot__side {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 32px;
  border-radius: 16px;
  border: 1px solid var(--brand-5);
}

.pilot__quote {
  margin: 0 0 8px;

  blockquote { margin: 0; font-size: 1.9rem; line-height: 1.45; color: var(--ink); }
  q { quotes: "\201C" "\201D"; }
  figcaption { margin-top: 8px; font-size: 1.4rem; color: var(--ink-3); }
}

.pilot__h3 {
  margin: 0;
  font-size: 1.4rem;
  line-height: 1.4;
  color: var(--ink-3);
  font-family: 'PoppinsRegular', sans-serif;
  font-weight: 400;
}

.pilot__themes {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 2px;
}

.pilot__theme {
  display: grid;
  grid-template-columns: 190px 1fr 32px;
  align-items: center;
  gap: 12px;
  min-height: 28px;
  font-size: 1.4rem;
  color: var(--ink-2);
}

.pilot__theme-bar { display: block; height: 8px; border-radius: 4px; background: var(--brand-7); }

.pilot__theme-fill {
  display: block;
  height: 100%;
  min-width: 4px;
  border-radius: 4px;
  background: var(--brand-1);
}

.pilot__theme-value {
  text-align: right;
  font-family: 'PoppinsMedium', sans-serif;
  font-variant-numeric: tabular-nums;
  color: var(--ink);
}

.pilot__facts {
  margin: 24px 0 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.pilot__fact {
  padding: 20px 24px;
  border-radius: 16px;
  border: 1px solid var(--brand-5);

  dt { font-size: 1.4rem; color: var(--ink-3); margin: 0 0 4px; }

  dd {
    margin: 0;
    font-size: 1.4rem;
    line-height: 1.4;
    color: var(--ink-2);

    strong {
      display: block;
      font-family: 'PoppinsMedium', sans-serif;
      font-weight: 500;
      font-size: 3.2rem;
      line-height: 1.2;
      color: var(--ink);
      font-variant-numeric: tabular-nums;
    }
  }
}

.pilot__bottom {
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.pilot__foot {
  margin: 0;
  font-size: 1.4rem;
  line-height: 1.5;
  color: var(--ink-3);
  max-width: 72ch;
}

@media only screen and (max-width: 1023px) {
  .pilot__top { grid-template-columns: 1fr; }
}

@media only screen and (max-width: 767px) {
  .pilot__title { margin-bottom: 24px; }
  .pilot__lead, .pilot__side { padding: 24px 20px; }
  .pilot__facts { grid-template-columns: 1fr; gap: 12px; }
  .pilot__theme { grid-template-columns: 1fr 32px; gap: 0 12px; row-gap: 2px; padding: 4px 0; }
  .pilot__theme-label { grid-column: 1; }
  .pilot__theme-value { grid-column: 2; grid-row: 1; }
  .pilot__theme-bar { grid-column: 1 / -1; }
  .pilot__bottom { flex-direction: column; align-items: stretch; }
  .pilot__bottom :deep(.button) { width: 100%; }
}
</style>
