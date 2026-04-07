<template>
  <div class="statistic-banner" :class="{ 'visible': visible }">
    <div class="statistic-banner__title h2 color-text">
      {{$t('StatisticBanner.title1')}} <br>
      <span class="color-brand-6">{{ $t('StatisticBanner.title2') }}</span>
    </div>

    <div class="statistic-banner__grid">
      <div class="statistic-banner__card">
        <div class="statistic-banner__label">{{ $t('StatisticBanner.label1') }}</div>
        <div class="statistic-banner__value">
          <span class="value-number">{{ animatedPercent1 }}</span><span class="value-suffix">rd</span>
        </div>
        <div class="statistic-banner__subtitle">{{ $t('StatisticBanner.sub1') }}</div>
        <div class="statistic-banner__description p1">{{ $t('StatisticBanner.text1') }}</div>
      </div>

      <div class="statistic-banner__card">
        <div class="statistic-banner__label">{{ $t('StatisticBanner.label2') }}</div>
        <div class="statistic-banner__value">
          <span class="value-number">{{ animatedPercent2 }}</span><span class="value-suffix">%</span>
        </div>
        <div class="statistic-banner__subtitle">{{ $t('StatisticBanner.sub2') }}</div>
        <div class="statistic-banner__description p1">{{ $t('StatisticBanner.text2') }}</div>
      </div>

      <div class="statistic-banner__card">
        <div class="statistic-banner__label">{{ $t('StatisticBanner.label3') }}</div>
        <div class="statistic-banner__value">
          <span class="value-number">{{ animatedPercent3 }}</span><span class="value-suffix">%</span>
        </div>
        <div class="statistic-banner__subtitle">{{ $t('StatisticBanner.sub3') }}</div>
        <div class="statistic-banner__description p1">{{ $t('StatisticBanner.text3') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});

const animatedPercent1 = ref(0);
const animatedPercent2 = ref(0);
const animatedPercent3 = ref(0);

const animateNumbers = () => {
  // Target values
  const target1 = 3; // "3rd user"
  const target2 = 15; // "15% upsell increase"
  const target3 = 90; // "90% wines"

  // Animation duration in ms
  const duration = 1500;
  const steps = 60;
  const interval = duration / steps;

  let step = 0;

  const timer = setInterval(() => {
    step++;
    const progress = step / steps;

    animatedPercent1.value = Math.ceil(progress * target1);
    animatedPercent2.value = Math.ceil(progress * target2);
    animatedPercent3.value = Math.ceil(progress * target3);

    if (step >= steps) {
      clearInterval(timer);
      animatedPercent1.value = target1;
      animatedPercent2.value = target2;
      animatedPercent3.value = target3;
    }
  }, interval);
};

const resetNumbers = () => {
  animatedPercent1.value = 0;
  animatedPercent2.value = 0;
  animatedPercent3.value = 0;
};

onMounted(() => {
  animateNumbers();
});
</script>

<style lang="scss" scoped>
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

.statistic-banner {
  padding: 5rem 0;
  animation: fadeUp 0.6s ease both;

  &__title {
    text-align: center;
    margin-bottom: 60px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;

    @media only screen and (max-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media only screen and (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  &__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 30px;
    border-radius: 12px;
    background-color: white;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }
  }

  &__label {
    font-family: 'PoppinsRegular';
    font-size: 18px;
    color: #9c87ff;
    margin-bottom: 10px;

    @media only screen and (max-width: 1024px) {
      font-size: 16px;
    }
  }

  &__value {
    display: flex;
    align-items: flex-start;

    .value-number {
      font-family: 'PoppinsMedium';
      font-size: 78px;
      font-weight: 500;
      line-height: 1;
      background: linear-gradient(135deg, #9c87ff 0%, #55c8ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      @media only screen and (max-width: 1440px) {
        font-size: 65px;
      }

      @media only screen and (max-width: 1024px) {
        font-size: 50px;
      }
    }

    .value-suffix {
      font-family: 'PoppinsMedium';
      font-size: 32px;
      font-weight: 500;
      padding-top: 8px;
      background: linear-gradient(135deg, #9c87ff 0%, #55c8ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      @media only screen and (max-width: 1024px) {
        font-size: 24px;
      }
    }
  }

  &__subtitle {
    font-family: 'PoppinsRegular';
    font-size: 22px;
    color: #9c87ff;
    margin-bottom: 16px;

    @media only screen and (max-width: 1024px) {
      font-size: 18px;
    }
  }

  &__description {
    color: rgba(0, 0, 0, 0.7);
    max-width: 280px;
    margin: 0 auto;
  }
}
</style>