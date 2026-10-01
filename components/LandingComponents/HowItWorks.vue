<template>
  <div class="how-it-works" :class="{ 'visible': visible }">
    <header class="how-it-works__head" v-reveal>
      <h2 id="how-it-works-title" class="how-it-works__title">{{ $t('HowItWorks.title') }}</h2>
      <p class="how-it-works__lead">{{ $t('HowItWorks.lead') }}</p>
    </header>

    <ol class="how-it-works__steps" v-reveal:stagger>
      <li class="how-it-works__step" v-for="n in 3" :key="n">
        <span class="how-it-works__num" aria-hidden="true">{{ n }}</span>
        <h3 class="how-it-works__step-title">{{ $t(`HowItWorks.step${n}Title`) }}</h3>
        <p class="how-it-works__step-text">{{ $t(`HowItWorks.step${n}Text`) }}</p>
        <div v-if="n === 3" id="get-started" class="how-it-works__start">
          <Button @btnClick="onCta">{{ $t('cta.primary') }}</Button>
          <p class="how-it-works__start-note">{{ $t('HowItWorks.startNote') }}</p>
        </div>
      </li>
    </ol>

    <div class="how-it-works__options">
      <h3 class="how-it-works__options-title" v-reveal>{{ $t('HowItWorks.optionsTitle') }}</h3>
      <ul class="how-it-works__rows" v-reveal:stagger>
        <li class="how-it-works__row" v-for="o in options" :key="o">
          <span class="how-it-works__time">{{ $t(`HowItWorks.${o}Time`) }}</span>
          <span class="how-it-works__what">
            <strong>{{ $t(`HowItWorks.${o}Name`) }}</strong>
            <span class="how-it-works__for">{{ $t(`HowItWorks.${o}For`) }}</span>
          </span>
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

const options = ['qr', 'widget', 'api'];
function onCta() {
  track('cta_click', { cta_label: t('cta.primary'), location: 'how_it_works' });
  emit('getStarted');
}
</script>

<style scoped lang="scss">
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
  margin: 0;
  font-size: 1.7rem;
  line-height: 1.55;
  color: var(--ink-2);
  max-width: 38ch;
}

.how-it-works__options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.how-it-works__options-title {
  margin: 0;
  font-size: 2.2rem;
  line-height: 1.25;
  color: var(--ink);
}

.how-it-works__rows {
  margin: 0;
  padding: 0;
  list-style: none;
}

.how-it-works__row {
  display: grid;
  grid-template-columns: 160px minmax(0, 1fr) minmax(0, 1.4fr);
  gap: 8px 32px;
  align-items: baseline;
  padding: 20px 0;
  border-bottom: 1px solid var(--brand-5);
}

.how-it-works__time {
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 2.2rem;
  line-height: 1.25;
  color: var(--link);
}

.how-it-works__what {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 1.7rem;
  color: var(--ink);

  strong { font-size: 1.8rem; color: var(--ink); }
}

.how-it-works__for {
  font-size: 1.4rem;
  color: var(--ink-3);
}

.how-it-works__desc {
  font-size: 1.7rem;
  line-height: 1.55;
  color: var(--ink-2);
}

.how-it-works__start {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 16px;
  margin-top: 12px;
  scroll-margin-top: 120px;
}

.how-it-works__start-note {
  margin: 0;
  font-size: 1.5rem;
  line-height: 1.4;
  color: var(--ink-2);
}

@media only screen and (max-width: 900px) {
  .how-it-works__steps { grid-template-columns: 1fr; gap: 16px; }
  .how-it-works__step { padding-top: 16px; }
  .how-it-works__num { margin-bottom: 0; }
  .how-it-works__row { grid-template-columns: 1fr; gap: 4px; padding: 16px 0; }
}

@media only screen and (max-width: 767px) {
  .how-it-works { gap: 24px; }
  .how-it-works__title { font-size: 3.2rem; }
  .how-it-works__start :deep(.button) { width: 100%; }
  .how-it-works__lead, .how-it-works__step-text, .how-it-works__desc { font-size: 1.6rem; }
}
</style>
