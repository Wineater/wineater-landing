<template>
  <section id="pilot-results" class="pilot" aria-labelledby="pilot-title">
    <h2 id="pilot-title" class="pilot__title" v-reveal>{{ $t('proof.title') }}</h2>

    <div class="pilot__top" v-reveal:stagger>
      <div class="pilot__lead">
        <p class="pilot__lead-label">{{ $t('proof.leadLabel') }}</p>
        <p class="pilot__lead-meaning">{{ $t('proof.leadMeaning') }}</p>
        <div class="pilot__cta">
          <Button bgColor="black" @btnClick="onPrimary">{{ $t('cta.primary') }}</Button>
        </div>
      </div>

      <div class="pilot__side">
        <figure class="pilot__quote">
          <blockquote lang="en"><q>{{ p.examplePrompts[0] }}</q></blockquote>
          <figcaption>{{ $t('proof.typedTitle') }}. {{ $t('proof.typedNote') }}</figcaption>
        </figure>

        <h3 class="pilot__h3">{{ $t('proof.themesTitle') }}</h3>
        <ol class="pilot__themes">
          <li v-for="(key, i) in p.themeOrder" :key="key" class="pilot__theme">
            <span class="pilot__theme-label">{{ $t(`proof.theme_${key}`) }}</span>
            <span class="pilot__theme-bar" aria-hidden="true">
              <span class="pilot__theme-fill" :style="{ width: barWidth(i) + '%' }"></span>
            </span>
          </li>
        </ol>
      </div>
    </div>

  </section>
</template>

<script setup>
import Button from '~/components/Buttons/Button.vue';
import { pilotProof as p } from '~/data/proof';

const emit = defineEmits(['getStarted']);
const { t } = useI18n();

// Bars show rank only (most common first), not measured shares.
const barWidth = (i) => 100 - i * (80 / Math.max(p.themeOrder.length - 1, 1));

const onPrimary = () => {
  track('cta_click', { cta_label: t('cta.primary'), location: 'pilot_results' });
  emit('getStarted');
};
</script>

<style scoped lang="scss">
.pilot {
  max-width: var(--container);
  margin: 0 auto;
  padding: var(--section-y) 0 0;
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
  align-items: start;
}

.pilot__lead {
  padding: 32px;
  border-radius: 16px;
  background: var(--brand-7);
}

.pilot__lead-label {
  margin: 0;
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
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover { border-color: color-mix(in srgb, var(--brand-1) 45%, #fff); box-shadow: 0 8px 24px rgba(26, 20, 38, 0.06); }
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
  grid-template-columns: 190px 1fr;
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


.pilot__cta { margin-top: 28px; }

@media only screen and (max-width: 1023px) {
  .pilot__top { grid-template-columns: 1fr; }
}

@media only screen and (max-width: 767px) {
  .pilot__title { margin-bottom: 24px; }
  .pilot__top { gap: 16px; }
  .pilot__lead, .pilot__side { padding: 24px 20px; }
  .pilot__theme { grid-template-columns: 1fr; gap: 2px; padding: 4px 0; }
  .pilot__cta :deep(.button) { width: 100%; }
}
</style>
