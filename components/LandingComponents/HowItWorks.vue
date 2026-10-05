<template>
  <div class="how-it-works" :class="{ 'visible': visible }">
    <header class="how-it-works__head" v-reveal>
      <div class="how-it-works__intro">
        <h2 id="how-it-works-title" class="how-it-works__title">{{ $t('HowItWorks.title') }}</h2>
        <p class="how-it-works__lead">{{ $t('HowItWorks.lead') }}</p>
      </div>
      <div id="get-started" class="how-it-works__start">
        <Button @btnClick="onCta">{{ $t('HowItWorks.upload') }}</Button>
        <p class="how-it-works__start-note">{{ selfServe ? $t('HowItWorks.startNoteSelfServe') : $t('HowItWorks.startNote') }}</p>
        <button v-if="selfServe" type="button" class="how-it-works__manual" @click="onManual">{{ $t('HowItWorks.manualTrial') }}</button>
      </div>
    </header>

    <ol class="how-it-works__steps" v-reveal:stagger>
      <li class="how-it-works__step" v-for="n in 3" :key="n">
        <span class="how-it-works__num" aria-hidden="true">{{ n }}</span>
        <h3 class="how-it-works__step-title">{{ $t(`HowItWorks.step${n}Title`) }}</h3>
        <p class="how-it-works__step-text">{{ $t(`HowItWorks.step${n}Text`) }}</p>
      </li>
    </ol>

    <div class="how-it-works__options" v-reveal>
      <h3 class="how-it-works__options-title">{{ $t('HowItWorks.optionsTitle') }}</h3>
      <ul class="how-it-works__channels">
        <li class="how-it-works__channel" v-for="o in options" :key="o">
          <span class="how-it-works__time">{{ $t(`HowItWorks.${o}Time`) }}</span>
          <strong class="how-it-works__name">{{ $t(`HowItWorks.${o}Name`) }}</strong>
          <span class="how-it-works__desc">{{ $t(`HowItWorks.${o}Desc`) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import Button from "~/components/Buttons/Button.vue";

defineProps({
  visible: Boolean,
});

const emit = defineEmits(['getStarted']);
const { t } = useI18n();
const { openSignup, openManualTrial } = useSignup();
const { enabled: selfServe } = useSelfServe();
const onManual = () => {
  track('cta_click', { cta_label: t('HowItWorks.manualTrial'), location: 'how_it_works_manual' });
  openManualTrial();
};

const options = ['qr', 'widget', 'api'];
function onCta() {
  track('cta_click', { cta_label: t('HowItWorks.upload'), location: 'how_it_works' });
  emit('getStarted');
  openSignup('how_it_works');
}
</script>

<style scoped lang="scss">
.how-it-works__manual {
  margin-top: 8px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--link);
  font: inherit;
  font-size: 1.5rem;
  text-align: left;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}

.how-it-works {
  max-width: var(--container);
  margin: 0 auto;
  padding: var(--section-y) 0 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.how-it-works__head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px 48px;
}

.how-it-works__intro {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 62ch;
}

.how-it-works__title {
  margin: 0;
  font-size: 4rem;
  line-height: 1.12;
  color: var(--ink);
}

.how-it-works__lead {
  margin: 0;
  font-size: 1.8rem;
  line-height: 1.55;
  color: var(--ink-2);
}

.how-it-works__steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.how-it-works__step {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 20px;
  border-top: 1px solid var(--brand-5);
}

.how-it-works__num {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--brand-7);
  color: var(--link);
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 1.6rem;
  margin-bottom: 8px;
}

.how-it-works__step-title {
  margin: 0;
  font-size: 2.2rem;
  line-height: 1.25;
  color: var(--ink);
}

.how-it-works__step-text {
  text-wrap: pretty;
  margin: 0;
  font-size: 1.7rem;
  line-height: 1.55;
  color: var(--ink-2);
  max-width: 38ch;
}

// The channel choice sits on one tinted panel: three columns, no nested cards.
.how-it-works__options {
  padding: 32px 40px 36px;
  border-radius: 24px;
  background: var(--brand-7);
}

.how-it-works__options-title {
  margin: 0 0 24px;
  font-size: 2rem;
  line-height: 1.25;
  color: var(--ink);
}

.how-it-works__channels {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 0;
  padding: 0;
  list-style: none;
}

.how-it-works__channel {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 32px;
  border-left: 1px solid color-mix(in srgb, var(--brand-1) 22%, #fff);

  &:first-child { padding-left: 0; border-left: 0; }
  &:last-child { padding-right: 0; }
}

.how-it-works__time {
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 3.2rem;
  line-height: 1.1;
  color: var(--brand-1);
}

.how-it-works__name {
  font-size: 1.8rem;
  line-height: 1.3;
  color: var(--ink);
}

.how-it-works__desc {
  text-wrap: pretty;
  max-width: 30ch;
  font-size: 1.5rem;
  line-height: 1.5;
  color: var(--ink-2);
}

.how-it-works__start {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  scroll-margin-top: 120px;
}

.how-it-works__start-note {
  margin: 0;
  font-size: 1.5rem;
  line-height: 1.4;
  color: var(--ink-2);
  text-align: right;
}

@media only screen and (max-width: 900px) {
  .how-it-works__steps { grid-template-columns: 1fr; gap: 16px; }
  .how-it-works__step { padding-top: 16px; }
  .how-it-works__num { margin-bottom: 0; }
  .how-it-works__options { padding: 24px 20px 28px; border-radius: 20px; }
  .how-it-works__channels { grid-template-columns: 1fr; }
  .how-it-works__channel { flex-direction: row; flex-wrap: wrap; align-items: baseline; gap: 2px 14px; padding: 16px 0; border-left: 0; border-top: 1px solid color-mix(in srgb, var(--brand-1) 22%, #fff); }
  .how-it-works__channel:first-child { border-top: 0; padding-top: 0; }
  .how-it-works__channel:last-child { padding-bottom: 0; }
  .how-it-works__time { font-size: 2.6rem; min-width: 7.5ch; }
  .how-it-works__desc { flex-basis: 100%; max-width: none; }
}

@media only screen and (max-width: 767px) {
  .how-it-works { gap: 24px; }
  .how-it-works__title { font-size: 3.2rem; }
  .how-it-works__start { width: 100%; align-items: stretch; }
  .how-it-works__start :deep(.button) { width: 100%; }
  .how-it-works__start-note { text-align: left; }
  .how-it-works__lead, .how-it-works__step-text { font-size: 1.6rem; }
}
</style>
