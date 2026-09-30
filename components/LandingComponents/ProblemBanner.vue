<template>
  <div class="problem-banner">
    <div class="problem-banner__inner">
      <div class="problem-banner__left">
        <div class="problem-banner__tag">{{ $t('ProblemBanner.tag') }}</div>
        <h2 class="h2 color-text problem-banner__title">
          {{ $t('ProblemBanner.title1') }}<br>
          <span class="color-brand-1">{{ $t('ProblemBanner.title2') }}</span>
        </h2>
        <p class="p1 color-dark-100 problem-banner__desc">{{ $t('ProblemBanner.desc') }}</p>
        <button type="button" class="problem-banner__cta" @click="onCta">
          {{ $t('ProblemBanner.cta') }}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 3V13M8 13L4 9M8 13L12 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="problem-banner__pains">
      <div class="problem-banner__pain" v-for="pain in pains" :key="pain.key">
        <svg
          class="problem-banner__pain-icon"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          v-html="pain.icon"
        ></svg>
        <div class="problem-banner__pain-content">
          <h3 class="problem-banner__pain-title">{{ $t(`ProblemBanner.pain${pain.key}Title`) }}</h3>
          <p class="problem-banner__pain-text">{{ $t(`ProblemBanner.pain${pain.key}Text`) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['scrollToDemo']);
const { t } = useI18n();

const pains = [
  { key: '1', icon: '<path d="M3 7h18l-1.5 11a2 2 0 0 1-2 1.7H6.5a2 2 0 0 1-2-1.7L3 7z"/><path d="M8 7V5a4 4 0 0 1 8 0v2"/>' },
  { key: '2', icon: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>' },
  { key: '3', icon: '<path d="M15 4h5v5M20 4l-9 9"/><path d="M10 6H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5"/>' },
];

const onCta = () => {
  track('cta_click', { cta_label: t('ProblemBanner.cta'), location: 'problem' });
  emit('scrollToDemo');
};
</script>

<style scoped lang="scss">
.problem-banner {
  padding: 80px 0 60px;
  display: flex;
  flex-direction: column;
  gap: 56px;
}

.problem-banner__inner {
  display: flex;
  gap: 80px;
  align-items: flex-start;
}

.problem-banner__left {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 760px;
}

.problem-banner__tag {
  display: inline-flex;
  align-items: center;
  padding: 6px 16px;
  border-radius: 100px;
  background: #fff3f3;
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 12px;
  color: #b42318;
  width: fit-content;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.problem-banner__title {
  line-height: 1.2;
}

.problem-banner__desc {
  line-height: 1.7;
}

.problem-banner__cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 15px;
  color: #7E27ED;
  cursor: pointer;
  background: none;
  border: 0;
  padding: 12px 0;
  min-height: 44px;
  width: fit-content;
  transition: gap 0.2s;

  &:hover {
    gap: 12px;
  }

  &:focus-visible {
    outline: 3px solid #333;
    outline-offset: 3px;
  }
}

.problem-banner__pains {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.problem-banner__pain {
  display: flex;
  gap: 16px;
  padding: 28px 24px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  border: 1px solid #f0f0f0;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  }
}

.problem-banner__pain-icon {
  flex-shrink: 0;
  color: #7E27ED;
}

.problem-banner__pain-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.problem-banner__pain-title {
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 16px;
  color: #333;
  margin: 0;
  font-weight: 500;
}

.problem-banner__pain-text {
  margin: 0;
  font-family: 'PoppinsRegular', sans-serif;
  line-height: 1.6;
  font-size: 15px;
  color: #595959;
}

@media only screen and (max-width: 1024px) {
  .problem-banner__inner {
    flex-direction: column;
    gap: 40px;
  }

}

@media only screen and (max-width: 768px) {
  .problem-banner {
    padding: 60px 0 40px;
    gap: 40px;
  }

  .problem-banner__pains {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}

@media only screen and (max-width: 600px) {
  .problem-banner {
    padding: 40px 0 32px;
  }
}
</style>
