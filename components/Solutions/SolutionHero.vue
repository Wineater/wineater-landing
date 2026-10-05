<template>
  <section class="shero" :aria-labelledby="`${segment}-title`">
    <div class="shero__main">
      <p v-if="badge" class="shero__badges">
        <span class="sol-badge sol-badge--early">{{ $t(badge) }}</span>
      </p>
      <h1 :id="`${segment}-title`" class="shero__title">{{ $t(`${base}.hero.title`) }}</h1>
      <p class="shero__sub">{{ $t(`${base}.hero.subtitle`, params) }}</p>
      <div class="sol-actions">
        <template v-if="primary === 'demo'">
          <Button :href="DEMO_URL" target="_blank" @btnClick="onDemo">{{ $t('cta.demo') }}<span class="sol-sr">({{ $t('Header.opensNewTab') }})</span></Button>
          <Button bg-color="outline" @btnClick="onTrial">{{ $t('cta.primary') }}</Button>
        </template>
        <template v-else-if="primary === 'trial'">
          <Button @btnClick="onTrial">{{ $t('solutionPage.startTrial') }}</Button>
          <Button bg-color="outline" :href="DEMO_URL" target="_blank" @btnClick="onDemo">{{ $t('cta.demo') }}<span class="sol-sr">({{ $t('Header.opensNewTab') }})</span></Button>
        </template>
        <template v-else>
          <Button :href="DEMO_URL" target="_blank" @btnClick="onDemo">{{ $t('solutionPage.talkToSales') }}<span class="sol-sr">({{ $t('Header.opensNewTab') }})</span></Button>
          <Button bg-color="outline" :to="localePath('/pricing')" @btnClick="onPricing">{{ $t('solutionPage.seePricing') }}</Button>
        </template>
      </div>
      <p v-if="trialNote" class="sol-note">{{ selfServe ? $t('Footer.trialSelfServe') : $t('Footer.trial') }}</p>
      <ul class="shero__points">
        <li v-for="n in 3" :key="n">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/>
          </svg>
          <span>{{ $t(`${base}.hero.point${n}`) }}</span>
        </li>
      </ul>
    </div>
    <div class="shero__media">
      <Photo :name="photo" :alt="$t(`photos.${photo}`)" priority sizes="(max-width: 1023px) 100vw, 45vw" />
    </div>
  </section>
</template>

<script setup>
const { enabled: selfServeOn } = useSelfServe()
import Button from '~/components/Buttons/Button.vue'
import Photo from '~/components/Solutions/Photo.vue'
import { DEMO_URL } from '~/data/links'

const props = defineProps({
  segment: { type: String, required: true },
  base: { type: String, required: true },
  photo: { type: String, required: true },
  primary: { type: String, default: 'demo' }, // demo | trial | sales
  badge: { type: String, default: '' },
  trialNote: { type: Boolean, default: true },
  params: { type: Object, default: () => ({}) },
})
const localePath = useLocalePath()
const { openSignup, openManualTrial } = useSignup()
const { t } = useI18n()
// offline retail is always arranged with the team: manual-trial form, not self-serve
const selfServe = computed(() => selfServeOn && props.segment !== 'retail')

const onDemo = () => {
  track('cta_click', { cta_label: t('cta.demo'), location: `${props.segment}_hero` })
  track('demo_click', { location: `${props.segment}_hero` })
  track('outbound_link_click', { link_url: DEMO_URL })
}
const onTrial = () => {
  track('cta_click', { cta_label: t('cta.primary'), location: `${props.segment}_hero` })
  if (props.segment === 'retail') openManualTrial()
  else openSignup(`${props.segment}_hero`)
}
const onPricing = () => track('cta_click', { cta_label: t('solutionPage.seePricing'), location: `${props.segment}_hero` })
</script>

<style scoped lang="scss">
.shero {
  display: grid;
  grid-template-columns: minmax(0, 55fr) minmax(0, 45fr);
  gap: 40px;
  align-items: center;
  max-width: var(--container);
  margin: 0 auto;
  padding-top: 128px;
}

.shero__main { display: flex; flex-direction: column; align-items: flex-start; gap: 24px; min-width: 0; }
.shero__badges { margin: 0; }

.shero__title {
  margin: 0;
  font-size: clamp(3.4rem, 4.6vw, 5.6rem);
  line-height: 1.08;
  letter-spacing: -0.015em;
  color: var(--ink);
}

.shero__sub { margin: 0; max-width: 54ch; font-size: 1.9rem; line-height: 1.55; color: var(--ink-2); }

.shero__points {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;

  li { display: flex; align-items: flex-start; gap: 10px; font-size: 1.6rem; line-height: 1.45; color: var(--ink); }
  svg { flex: none; margin-top: 2px; color: var(--brand-1); }
}

.shero__media { min-width: 0; }

@media only screen and (max-width: 1023px) {
  .shero { grid-template-columns: 1fr; gap: 32px; }
  .shero__media { order: -1; }
}

@media only screen and (max-width: 767px) {
  .shero { padding-top: 96px; gap: 24px; }
  .shero__sub { font-size: 1.7rem; }
  .shero__main :deep(.button) { width: 100%; }
}
</style>
