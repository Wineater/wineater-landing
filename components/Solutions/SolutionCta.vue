<template>
  <section :id="`${segment}-cta`" class="sol-section" :aria-labelledby="`${segment}-cta-title`">
    <div class="scta" v-reveal>
      <h2 :id="`${segment}-cta-title`" class="scta__title">{{ $t(`${base}.cta.title`) }}</h2>
      <p class="scta__text">{{ $t(`${base}.cta.text`) }}</p>
      <div class="sol-actions">
        <template v-if="primary === 'trial'">
          <Button bg-color="white" @btnClick="onTrial">{{ $t('solutionPage.startTrial') }}</Button>
          <a class="scta__ghost" :href="DEMO_URL" target="_blank" rel="noopener" @click="onDemo">{{ $t('cta.demo') }}<span class="sol-sr">({{ $t('Header.opensNewTab') }})</span></a>
        </template>
        <template v-else>
          <Button bg-color="white" :href="DEMO_URL" target="_blank" @btnClick="onDemo">{{ primary === 'sales' ? $t('solutionPage.talkToSales') : $t('cta.demo') }}<span class="sol-sr">({{ $t('Header.opensNewTab') }})</span></Button>
          <button v-if="primary === 'demo'" type="button" class="scta__ghost scta__ghost--btn" @click="onTrial">{{ $t('cta.primary') }}</button>
        </template>
      </div>
      <p v-if="primary !== 'sales'" class="scta__note">{{ selfServe ? $t('Footer.trialSelfServe') : $t('Footer.trial') }}</p>
    </div>
  </section>
</template>

<script setup>
const { enabled: selfServeOn } = useSelfServe()
import Button from '~/components/Buttons/Button.vue'
import { DEMO_URL } from '~/data/links'

const props = defineProps({
  segment: { type: String, required: true },
  base: { type: String, required: true },
  primary: { type: String, default: 'demo' },
})
const { openSignup, openManualTrial } = useSignup()
const { t } = useI18n()
// offline retail is always arranged with the team: manual-trial form, not self-serve
const selfServe = computed(() => selfServeOn && props.segment !== 'retail')
const onDemo = () => {
  track('cta_click', { cta_label: t('cta.demo'), location: `${props.segment}_cta` })
  track('demo_click', { location: `${props.segment}_cta` })
  track('outbound_link_click', { link_url: DEMO_URL })
}
const onTrial = () => {
  track('cta_click', { cta_label: t('cta.primary'), location: `${props.segment}_cta` })
  if (props.segment === 'retail') openManualTrial()
  else openSignup(`${props.segment}_cta`)
}
</script>

<style scoped lang="scss">
.scta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 56px 48px;
  border-radius: 24px;
  background: var(--brand-1);
  color: #fff;
}

.scta__title { margin: 0; max-width: 24ch; font-size: clamp(2.8rem, 3.6vw, 4rem); line-height: 1.12; color: #fff; }
.scta__text { margin: 0; max-width: 56ch; font-size: 1.8rem; line-height: 1.55; color: #fff; }
.scta__note { margin: 0; font-size: 1.4rem; color: #fff; }

.scta__ghost {
  display: inline-flex;
  align-items: center;
  min-height: 56px;
  padding: 0 28px;
  border: 1.5px solid #fff;
  border-radius: 72px;
  background: transparent;
  color: #fff;
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 1.6rem;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover { background: rgba(255, 255, 255, 0.14); }
  &:focus-visible { outline: 3px solid #fff; outline-offset: 3px; }
}

@media only screen and (max-width: 767px) {
  .scta { padding: 36px 20px; border-radius: 20px; }
  .scta__ghost { justify-content: center; width: 100%; }
}
</style>
