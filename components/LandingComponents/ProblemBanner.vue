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
        <div class="problem-banner__cta" @click="$emit('scrollToDemo')">
          {{ $t('ProblemBanner.cta') }}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3V13M8 13L4 9M8 13L12 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>

      <div class="problem-banner__right">
        <div class="problem-banner__stat" v-for="stat in stats" :key="stat.key">
          <div class="problem-banner__stat-number">{{ stat.number }}</div>
          <div class="problem-banner__stat-text">{{ $t(`ProblemBanner.${stat.key}`) }}</div>
        </div>
      </div>
    </div>

    <div class="problem-banner__pains">
      <div class="problem-banner__pain" v-for="pain in pains" :key="pain.key">
        <div class="problem-banner__pain-icon">{{ pain.icon }}</div>
        <div class="problem-banner__pain-content">
          <div class="problem-banner__pain-title">{{ $t(`ProblemBanner.pain${pain.key}Title`) }}</div>
          <div class="problem-banner__pain-text p1 color-dark-100">{{ $t(`ProblemBanner.pain${pain.key}Text`) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['scrollToDemo']);

const stats = [
  { key: 'stat1', number: '46%' },
  { key: 'stat2', number: '70%' },
  { key: 'stat3', number: '2×' },
];

const pains = [
  { key: '1', icon: '😕' },
  { key: '2', icon: '💸' },
  { key: '3', icon: '🏃' },
];
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
}

.problem-banner__tag {
  display: inline-flex;
  align-items: center;
  padding: 6px 16px;
  border-radius: 100px;
  background: #fff3f3;
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 12px;
  color: #e53e3e;
  width: fit-content;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.problem-banner__title {
  line-height: 1.2;
}

.problem-banner__desc {
  line-height: 1.7;
  max-width: 420px;
}

.problem-banner__cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 15px;
  color: #7E27ED;
  cursor: pointer;
  transition: gap 0.2s;

  &:hover {
    gap: 12px;
  }
}

.problem-banner__right {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 320px;
}

.problem-banner__stat {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 24px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  border: 1px solid #f5f2ff;
}

.problem-banner__stat-number {
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 36px;
  background: linear-gradient(135deg, #7E27ED, #2FC0BF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  flex-shrink: 0;
  min-width: 72px;
}

.problem-banner__stat-text {
  font-family: 'PoppinsRegular', sans-serif;
  font-size: 14px;
  color: #696969;
  line-height: 1.5;
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
  font-size: 28px;
  flex-shrink: 0;
  line-height: 1;
}

.problem-banner__pain-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.problem-banner__pain-title {
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 15px;
  color: #333;
}

.problem-banner__pain-text {
  line-height: 1.6;
  font-size: 14px;
}

@media only screen and (max-width: 1024px) {
  .problem-banner__inner {
    flex-direction: column;
    gap: 40px;
  }

  .problem-banner__right {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .problem-banner__stat {
    flex: 1;
    min-width: 200px;
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

  .problem-banner__right {
    flex-direction: column;
  }

  .problem-banner__stat {
    min-width: unset;
  }
}

@media only screen and (max-width: 600px) {
  .problem-banner {
    padding: 40px 0 32px;
  }
}
</style>
