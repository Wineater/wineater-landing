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
        <div class="how-it-works__step-head">
          <span class="how-it-works__num" aria-hidden="true">{{ n }}</span>
          <span class="how-it-works__step-time">{{ $t(`HowItWorks.step${n}Time`) }}</span>
        </div>
        <h3 class="how-it-works__step-title">{{ $t(`HowItWorks.step${n}Title`) }}</h3>
        <p class="how-it-works__step-text">{{ $t(`HowItWorks.step${n}Text`) }}</p>
      </li>
    </ol>

    <section class="how-it-works__options" aria-labelledby="how-options-title" v-reveal>
      <h3 id="how-options-title" class="how-it-works__options-title">{{ $t('HowItWorks.optionsTitle') }}</h3>
      <ul class="how-it-works__channels">
        <li class="how-it-works__channel" v-for="o in options" :key="o.key">
          <div class="how-it-works__stage">
            <IntegrationArt :kind="o.kind" />
            <span class="how-it-works__time">{{ $t(`HowItWorks.${o.key}Time`) }}</span>
          </div>
          <h4 class="how-it-works__name">{{ $t(`HowItWorks.${o.key}Name`) }}</h4>
          <p class="how-it-works__desc">{{ $t(`HowItWorks.${o.key}Desc`) }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import Button from "~/components/Buttons/Button.vue";
import IntegrationArt from "~/components/LandingComponents/IntegrationArt.vue";

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

// Three ways shoppers reach Wineater: a page of its own, the widget on the shop's site, the API.
const options = [
  { key: 'qr', kind: 'page' },
  { key: 'widget', kind: 'widget' },
  { key: 'api', kind: 'api' },
];
function onCta() {
  track('cta_click', { cta_label: t('HowItWorks.upload'), location: 'how_it_works' });
  emit('getStarted');
  openSignup('how_it_works');
}
</script>

<style scoped lang="scss">
.how-it-works {
  max-width: var(--container);
  margin: 0 auto;
  padding: var(--section-y) 0 0;
  display: flex;
  flex-direction: column;
  gap: 56px;
}

// Header: the title and lead on the left, the sign-up action on the right, both left-aligned.
.how-it-works__head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 390px);
  align-items: center;
  gap: 28px 72px;
}

.how-it-works__intro {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 60ch;
}

.how-it-works__title {
  margin: 0;
  font-size: 4rem;
  line-height: 1.12;
  color: var(--ink);
  text-wrap: balance;
}

.how-it-works__lead {
  margin: 0;
  font-size: 1.8rem;
  line-height: 1.55;
  color: var(--ink-2);
  text-wrap: pretty;
}

.how-it-works__start {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  scroll-margin-top: 120px;
}

.how-it-works__start-note {
  margin: 0;
  max-width: 40ch;
  font-size: 1.5rem;
  line-height: 1.5;
  color: var(--ink-2);
  text-wrap: pretty;
}

.how-it-works__manual {
  padding: 0;
  border: 0;
  background: none;
  color: var(--link);
  font: inherit;
  font-size: 1.5rem;
  line-height: 1.5;
  text-align: left;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}

// Steps: a number and how long it takes, then what happens.
.how-it-works__steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 40px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.how-it-works__step {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 20px;
  border-top: 1px solid var(--brand-5);
}

.how-it-works__step-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 6px;
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
}

.how-it-works__step-time {
  font-size: 1.4rem;
  line-height: 1;
  color: var(--ink-3);
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

// Three ways in: each is a picture on a tinted stage, then its name and one line. No cards.
.how-it-works__options-title {
  margin: 0 0 28px;
  font-size: 2.8rem;
  line-height: 1.2;
  color: var(--ink);
}

.how-it-works__channels {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 40px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.how-it-works__channel {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.how-it-works__stage {
  position: relative;
  margin-bottom: 12px;
  padding: 20px 16px 12px;
  border-radius: 24px;
  background: var(--brand-7);
}

.how-it-works__time {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 12px;
  border-radius: 999px;
  background: #fff;
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 1.3rem;
  line-height: 1;
  color: var(--link);
}

.how-it-works__name {
  margin: 0;
  font-size: 2.2rem;
  line-height: 1.25;
  color: var(--ink);
}

.how-it-works__desc {
  margin: 0;
  max-width: 36ch;
  font-size: 1.6rem;
  line-height: 1.55;
  color: var(--ink-2);
  text-wrap: pretty;
}

@media only screen and (max-width: 1024px) {
  .how-it-works__head { grid-template-columns: minmax(0, 1fr); align-items: start; gap: 24px; }
  .how-it-works__start-note { max-width: 48ch; }
}

@media only screen and (max-width: 900px) {
  .how-it-works { gap: 40px; }
  .how-it-works__steps { grid-template-columns: 1fr; gap: 28px; }
  .how-it-works__step { padding-top: 16px; }
  .how-it-works__channels { grid-template-columns: 1fr; gap: 36px; }
  .how-it-works__stage { max-width: 440px; }
}

@media only screen and (max-width: 767px) {
  .how-it-works { gap: 32px; }
  .how-it-works__title { font-size: 3.2rem; }
  .how-it-works__options-title { font-size: 2.4rem; margin-bottom: 20px; }
  .how-it-works__start { width: 100%; align-items: stretch; }
  .how-it-works__start :deep(.button) { width: 100%; }
  .how-it-works__lead, .how-it-works__step-text { font-size: 1.6rem; }
}
</style>
