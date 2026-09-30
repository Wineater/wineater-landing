<template>
  <section id="pilot-results" class="pilot" aria-labelledby="pilot-title">
    <div class="pilot__intro">
      <h2 id="pilot-title" class="pilot__title">{{ $t('proof.title') }}</h2>
      <p class="pilot__context">{{ $t('proof.context') }}</p>
    </div>

    <div class="pilot__lead">
      <p class="pilot__lead-figure">
        <span class="pilot__lead-num">{{ p.resultsToBuy.n }}</span>
        <span class="pilot__lead-of">{{ $t('proof.leadOf', { total: p.resultsToBuy.of }) }}</span>
      </p>
      <div class="pilot__lead-copy">
        <h3 class="pilot__h3">{{ $t('proof.leadTitle', { pct: pct(p.resultsToBuy.value) }) }}</h3>
        <p class="pilot__p pilot__p--muted">{{ $t('proof.leadMeaning') }}</p>
      </div>
    </div>

    <h3 class="pilot__h3 pilot__h3--section">{{ $t('proof.moreTitle') }}</h3>
    <dl class="pilot__facts">
      <div class="pilot__fact">
        <dt>{{ $t('proof.f1Label') }}</dt>
        <dd><strong>{{ pct(p.activation.value) }}</strong> {{ $t('proof.f1Detail', { n: p.activation.n, of: p.activation.of }) }}</dd>
      </div>
      <div class="pilot__fact">
        <dt>{{ $t('proof.f2Label') }}</dt>
        <dd><strong>{{ pct(p.searchToResults.value) }}</strong> {{ $t('proof.f2Detail', { n: p.searchToResults.n, of: p.searchToResults.of }) }}</dd>
      </div>
      <div class="pilot__fact">
        <dt>{{ $t('proof.f3Label') }}</dt>
        <dd><strong>{{ fmt(p.requestsPerUser.value) }}</strong> {{ $t('proof.f3Detail', { requests: p.requestsPerUser.requests, users: p.requestsPerUser.users }) }}</dd>
      </div>
      <div class="pilot__fact">
        <dt>{{ $t('proof.f4Label') }}</dt>
        <dd><strong>{{ pct(p.fullSetOfFour.value) }}</strong> {{ $t('proof.f4Detail', { of: p.fullSetOfFour.of }) }}</dd>
      </div>
      <div class="pilot__fact">
        <dt>{{ $t('proof.f5Label') }}</dt>
        <dd><strong>{{ p.uniqueWinesShown }}</strong> {{ $t('proof.f5Detail') }}</dd>
      </div>
    </dl>

    <h3 class="pilot__h3 pilot__h3--section">{{ $t('proof.typedTitle') }}</h3>
    <figure class="pilot__quote">
      <blockquote lang="en"><q>{{ p.examplePrompts[0] }}</q></blockquote>
      <figcaption>{{ $t('proof.typedNote') }}</figcaption>
    </figure>

    <h4 class="pilot__h4">{{ $t('proof.themesTitle', { total: p.freeTextRequests.total }) }}</h4>
    <ul class="pilot__themes">
      <li v-for="theme in p.freeTextRequests.themes" :key="theme.key" class="pilot__theme">
        <span class="pilot__theme-label">{{ $t(`proof.theme_${theme.key}`) }}</span>
        <span class="pilot__theme-bar" aria-hidden="true">
          <span class="pilot__theme-fill" :style="{ width: (theme.value / maxTheme * 100) + '%' }"></span>
        </span>
        <span class="pilot__theme-value">{{ theme.value }}</span>
      </li>
    </ul>

    <p class="pilot__foot">
      {{ caveat }} {{ $t('proof.method') }}<br />
      {{ source }}
    </p>

    <div class="pilot__cta">
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
  padding: 96px 0;
  max-width: 1040px;
  margin: 0 auto;
  color: #333333;
  font-family: 'PoppinsRegular', sans-serif;
}

.pilot__intro { max-width: 720px; }

.pilot__title {
  margin: 0 0 16px;
  font-family: 'PoppinsMedium', sans-serif;
  font-weight: 500;
  font-size: clamp(1.75rem, 3.2vw, 2.75rem);
  line-height: 1.15;
  text-wrap: balance;
}

.pilot__context {
  margin: 0;
  font-size: 18px;
  line-height: 1.6;
  color: #696969;
  max-width: 65ch;
}

.pilot__lead {
  display: grid;
  grid-template-columns: minmax(200px, 0.8fr) 1.4fr;
  gap: 40px 64px;
  align-items: start;
  margin: 64px 0 72px;
  padding: 40px 0;
  border-top: 1px solid #EDEDED;
  border-bottom: 1px solid #EDEDED;
}

.pilot__lead-figure {
  margin: 0;
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}

.pilot__lead-num {
  font-family: 'PoppinsMedium', sans-serif;
  font-size: clamp(4.5rem, 10vw, 6rem);
  line-height: 1;
  color: #7E27ED;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
}

.pilot__lead-of {
  font-size: 20px;
  line-height: 1.3;
}

.pilot__h3 {
  margin: 0 0 12px;
  font-family: 'PoppinsMedium', sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 1.25;
  text-wrap: balance;

  &--section { margin: 0 0 24px; }
}

.pilot__h4 {
  margin: 48px 0 16px;
  font-family: 'PoppinsMedium', sans-serif;
  font-weight: 500;
  font-size: 18px;
}

.pilot__p {
  margin: 0 0 12px;
  font-size: 17px;
  line-height: 1.65;
  max-width: 65ch;

  &--muted { color: #696969; }
}

.pilot__facts {
  margin: 0 0 72px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px 64px;
}

.pilot__fact {
  padding-top: 16px;
  border-top: 1px solid #EDEDED;

  dt { font-size: 15px; color: #696969; margin: 0 0 6px; }

  dd {
    margin: 0;
    font-size: 16px;
    line-height: 1.5;

    strong {
      display: block;
      font-family: 'PoppinsMedium', sans-serif;
      font-weight: 500;
      font-size: 32px;
      line-height: 1.2;
      color: #333333;
      font-variant-numeric: tabular-nums;
    }
  }
}

.pilot__quote {
  margin: 0;
  padding: 28px;
  max-width: 640px;
  background: #F5F2FF;
  border-radius: 16px;

  blockquote { margin: 0; font-size: 20px; line-height: 1.5; }
  q { quotes: "\201C" "\201D"; }
  figcaption { margin-top: 12px; font-size: 14px; color: #696969; }
}

.pilot__themes {
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 640px;
  display: grid;
  gap: 4px;
}

.pilot__theme {
  display: grid;
  grid-template-columns: 210px 1fr 40px;
  align-items: center;
  gap: 16px;
  min-height: 44px;
  font-size: 16px;
}

.pilot__theme-bar { display: block; height: 10px; }

.pilot__theme-fill {
  display: block;
  height: 100%;
  min-width: 4px;
  border-radius: 5px;
  background: #7E27ED;
}

.pilot__theme-value {
  text-align: right;
  font-family: 'PoppinsMedium', sans-serif;
  font-variant-numeric: tabular-nums;
}

.pilot__foot {
  margin: 48px 0 0;
  font-size: 14px;
  line-height: 1.6;
  color: #696969;
  max-width: 70ch;
}

.pilot__cta { margin-top: 40px; }

@media only screen and (max-width: 767px) {
  .pilot { padding: 56px 0; }
  .pilot__lead { grid-template-columns: 1fr; gap: 20px; margin: 40px 0 48px; padding: 28px 0; }
  .pilot__facts { grid-template-columns: 1fr; gap: 24px; margin-bottom: 48px; }
  .pilot__theme { grid-template-columns: 1fr 40px; gap: 0 12px; row-gap: 2px; padding: 6px 0; }
  .pilot__theme-label { grid-column: 1 / 2; }
  .pilot__theme-value { grid-column: 2; grid-row: 1; }
  .pilot__theme-bar { grid-column: 1 / -1; }
  .pilot__cta :deep(.button) { width: 100%; padding: 18px 24px; }
}
</style>
