<template>
  <div class="how-to-start">
    <div class="how-to-start__header">
      <h2 class="h2 color-text how-to-start__title">
        {{ $t('HowToStart.title') }}<br>
        <span class="color-brand-1">{{ $t('HowToStart.titleAccent') }}</span>
      </h2>
      <p class="p1 color-dark-100 how-to-start__subtitle">{{ $t('HowToStart.subtitle') }}</p>
    </div>

    <div class="how-to-start__steps">
      <div class="how-to-start__step" v-for="(step, i) in steps" :key="i">
        <div class="how-to-start__step-num">{{ String(i + 1).padStart(2, '0') }}</div>
        <div class="how-to-start__step-content">
          <h3 class="how-to-start__step-title">{{ $t(`HowToStart.step${i + 1}Title`) }}</h3>
          <p class="how-to-start__step-text p1 color-dark-100">{{ $t(`HowToStart.step${i + 1}Text`) }}</p>
        </div>
        <div v-if="i < steps.length - 1" class="how-to-start__connector"></div>
      </div>
    </div>

    <div class="how-to-start__integrations">
      <div class="how-to-start__integration" v-for="plan in plans" :key="plan.key">
        <div class="how-to-start__integration-header">
          <div class="how-to-start__integration-icon" aria-hidden="true" v-html="icons[plan.icon]"></div>
          <div class="how-to-start__integration-time">
            <span class="how-to-start__integration-label">{{ $t(`HowToStart.${plan.key}Label`) }}</span>
            <span class="how-to-start__integration-duration">{{ $t(`HowToStart.${plan.key}Duration`) }}</span>
          </div>
        </div>
        <h3 class="how-to-start__integration-title">{{ $t(`HowToStart.${plan.key}Title`) }}</h3>
        <p class="how-to-start__integration-desc p1 color-dark-100">{{ $t(`HowToStart.${plan.key}Desc`) }}</p>
        <ul class="how-to-start__integration-features">
          <li v-for="f in plan.features" :key="f">
            <svg class="how-to-start__check" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>
            <span>{{ $t(`HowToStart.${f}`) }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="how-to-start__trial">
      <div class="how-to-start__trial-inner">
        <div class="how-to-start__trial-text">
          <div class="how-to-start__trial-badge">{{ $t('HowToStart.trialBadge') }}</div>
          <h3 class="h2 how-to-start__trial-title">{{ $t('HowToStart.trialTitle') }}</h3>
          <p class="p1 color-dark-100">{{ $t('HowToStart.trialDesc') }}</p>
        </div>
        <button type="button" class="how-to-start__trial-cta" @click="onCta">
          <span>{{ $t('cta.primary') }}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['getStarted']);
const { t } = useI18n();

function onCta() {
  track('cta_click', { cta_label: t('cta.primary'), location: 'how_to_start_trial' });
  emit('getStarted');
}

const steps = [1, 2, 3, 4];

const svg = (paths) => `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7E27ED" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;

const icons = {
  qr: svg('<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v.01M14 21h3M21 17v4"/>'),
  widget: svg('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 14h8"/>'),
  api: svg('<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>'),
};

const plans = [
  {
    key: 'qr',
    icon: 'qr',
    features: ['qrF1', 'qrF2', 'qrF3'],
  },
  {
    key: 'widget',
    icon: 'widget',
    features: ['widgetF1', 'widgetF2', 'widgetF3'],
  },
  {
    key: 'api',
    icon: 'api',
    features: ['apiF1', 'apiF2', 'apiF3'],
  },
];
</script>

<style scoped lang="scss">
.how-to-start {
  padding: 80px 0 60px;
  display: flex;
  flex-direction: column;
  gap: 56px;
}

.how-to-start__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  max-width: 700px;
  margin: 0 auto;
}

.how-to-start__title {
  line-height: 1.2;
}

.how-to-start__subtitle {
  line-height: 1.7;
}

.how-to-start__steps {
  display: flex;
  align-items: flex-start;
  position: relative;
  justify-content: center;
  flex-wrap: wrap;
}

.how-to-start__step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
  max-width: 220px;
  position: relative;
  padding: 0 16px;
}

.how-to-start__step-num {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #7E27ED;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 18px;
  color: #fff;
  margin-bottom: 16px;
  flex-shrink: 0;
  box-shadow: 0 4px 16px rgba(126, 39, 237, 0.3);
}

.how-to-start__step-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.how-to-start__step-title {
  font-family: 'PoppinsMedium', sans-serif;
  font-weight: 400;
  font-size: 15px;
  color: #333;
  margin: 0;
}

.how-to-start__step-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
}

.how-to-start__connector {
  position: absolute;
  top: 28px;
  right: -50%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #7E27ED, #2FC0BF);
  opacity: 0.2;
  z-index: -1;
}

.how-to-start__integrations {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.how-to-start__integration {
  padding: 32px 28px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  border: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.1);
  }
}

.how-to-start__integration-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.how-to-start__integration-icon {
  font-size: 32px;
  line-height: 1;
}

.how-to-start__integration-time {
  display: flex;
  flex-direction: column;
}

.how-to-start__integration-label {
  font-family: 'PoppinsRegular', sans-serif;
  font-size: 11px;
  color: #696969;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.how-to-start__integration-duration {
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 16px;
  color: #7E27ED;
}

.how-to-start__integration-title {
  font-family: 'PoppinsMedium', sans-serif;
  font-weight: 400;
  font-size: 17px;
  color: #333;
  margin: 0;
}

.how-to-start__integration-desc {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
}

.how-to-start__integration-features {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 4px 0 0;
  padding: 0;
  list-style: none;

  li {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-family: 'PoppinsRegular', sans-serif;
    font-size: 14px;
    color: #696969;
    line-height: 1.5;
  }
}

.how-to-start__check {
  color: #0B7978;
  flex-shrink: 0;
  margin-top: 3px;
}

.how-to-start__trial {
  background: #7E27ED;
  border-radius: 24px;
  padding: 48px 56px;
}

.how-to-start__trial-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.how-to-start__trial-text {
  display: flex;
  flex-direction: column;
  gap: 12px;

  .how-to-start__trial-title {
    color: #fff;
    margin: 0;
  }

  .p1 {
    color: #fff;
    margin: 0;
    max-width: 500px;
  }
}

.how-to-start__trial-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  background: rgba(255,255,255,0.16);
  border-radius: 100px;
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 14px;
  color: #fff;
  width: fit-content;
}

.how-to-start__trial-cta {
  flex-shrink: 0;
  padding: 20px 40px;
  border-radius: 72px;
  background: #fff;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: opacity 0.2s, transform 0.2s;

  span {
    font-family: 'PoppinsMedium', sans-serif;
    font-size: 16px;
    color: #7E27ED;
    white-space: nowrap;
  }

  svg {
    color: #7E27ED;
  }

  &:hover {
    opacity: 0.95;
    transform: translateY(-2px);
  }
}

@media only screen and (max-width: 1024px) {
  .how-to-start__integrations {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .how-to-start__trial-inner {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
}

@media only screen and (max-width: 768px) {
  .how-to-start {
    padding: 60px 0 40px;
    gap: 40px;
  }

  .how-to-start__steps {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .how-to-start__step {
    flex-direction: row;
    text-align: left;
    max-width: 100%;
    padding: 0;
    gap: 16px;
  }

  .how-to-start__step-num {
    width: 44px;
    height: 44px;
    font-size: 15px;
    margin-bottom: 0;
    flex-shrink: 0;
  }

  .how-to-start__connector {
    display: none;
  }

  .how-to-start__trial {
    padding: 32px 28px;
  }
}

@media only screen and (max-width: 600px) {
  .how-to-start__trial {
    padding: 28px 20px;
    border-radius: 20px;
  }
}
</style>
