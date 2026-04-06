<template>
  <div class="main-banner">
    <div class="main-banner__info">
      <div class="main-banner__eyebrow">
        <span class="main-banner__eyebrow-dot"></span>
        {{ $t('startBanner.eyebrow') }}
      </div>

      <h1 id="hero-title" class="h1 main-banner__info-title color-text">
        {{ $t('startBanner.headline1') }}<br>
        <span class="main-banner__title-highlight">{{ $t('startBanner.headline2') }}</span>
      </h1>

      <p class="p1 main-banner__subtitle color-dark-100">
        {{ $t('startBanner.subtitle') }}
      </p>

      <div class="main-banner__ctas">
        <div class="main-banner__cta-primary" @click="$emit('getStarted')">
          <span>{{ $t('startBanner.ctaPrimary') }}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="main-banner__cta-secondary" @click="openDemoPage">
          <span>{{ $t('startBanner.ctaSecondary') }}</span>
        </div>
      </div>

      <div class="main-banner__proof">
        <div class="main-banner__proof-item">
          <span class="main-banner__proof-number">15%+</span>
          <span class="main-banner__proof-label">{{ $t('startBanner.proof1') }}</span>
        </div>
        <div class="main-banner__proof-divider"></div>
        <div class="main-banner__proof-item">
          <span class="main-banner__proof-number">1 in 3</span>
          <span class="main-banner__proof-label">{{ $t('startBanner.proof2') }}</span>
        </div>
        <div class="main-banner__proof-divider"></div>
        <div class="main-banner__proof-item">
          <span class="main-banner__proof-number">90%+</span>
          <span class="main-banner__proof-label">{{ $t('startBanner.proof3') }}</span>
        </div>
      </div>
    </div>

    <div
      class="main-banner__img"
      role="img"
      aria-label="Wineater AI Sommelier interface showing wine recommendations"
    ></div>
  </div>
</template>

<script setup>
defineEmits(['getStarted']);

const openDemoPage = () => {
  window.open('https://share-eu1.hsforms.com/1kziM_bz_TDqsB5emVJbReA2ehswf', '_blank');
};
</script>

<style scoped lang="scss">
.main-banner {
  display: flex;
  min-height: 960px;
  padding-top: 200px;
  position: relative;
}

.main-banner__info {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 55%;
  z-index: 2;
}

.main-banner__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #7E27ED;
  margin-bottom: 24px;
}

.main-banner__eyebrow-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7E27ED, #2FC0BF);
  flex-shrink: 0;
}

.main-banner__info-title {
  margin-bottom: 24px;
  line-height: 1.1;
}

.main-banner__title-highlight {
  background: linear-gradient(135deg, #7E27ED 0%, #2FC0BF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.main-banner__subtitle {
  max-width: 520px;
  line-height: 1.7;
  margin-bottom: 40px;
  font-size: 18px;
}

.main-banner__ctas {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 48px;
}

.main-banner__cta-primary {
  padding: 18px 32px;
  border-radius: 72px;
  background: linear-gradient(135deg, #7E27ED 0%, #2FC0BF 100%);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: opacity 0.2s, transform 0.2s;
  box-shadow: 0 8px 32px rgba(126, 39, 237, 0.3);

  span {
    color: #fff;
    font-family: 'PoppinsMedium', sans-serif;
    font-size: 16px;
  }

  svg {
    color: #fff;
  }

  &:hover {
    opacity: 0.92;
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(126, 39, 237, 0.4);
  }
}

.main-banner__cta-secondary {
  padding: 18px 32px;
  border-radius: 72px;
  border: 1.5px solid #ddd;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  transition: border-color 0.2s, background 0.2s;

  span {
    color: #333;
    font-family: 'PoppinsMedium', sans-serif;
    font-size: 16px;
  }

  &:hover {
    border-color: #7E27ED;

    span {
      color: #7E27ED;
    }
  }
}

.main-banner__proof {
  display: flex;
  align-items: center;
  gap: 0;
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(10px);
  border: 1px solid #f0f0f0;
  border-radius: 16px;
  padding: 20px 32px;
  width: fit-content;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}

.main-banner__proof-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 28px;

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }
}

.main-banner__proof-number {
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 26px;
  background: linear-gradient(135deg, #7E27ED, #2FC0BF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
}

.main-banner__proof-label {
  font-family: 'PoppinsRegular', sans-serif;
  font-size: 12px;
  color: #696969;
  text-align: center;
  margin-top: 2px;
}

.main-banner__proof-divider {
  width: 1px;
  height: 36px;
  background: #eee;
  flex-shrink: 0;
}

.main-banner__img {
  width: 45%;
  height: 900px;
  top: 0;
  right: 0;
  background-position: right top;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/main-banner.webp);
  position: absolute;
}

@media only screen and (max-width: 1440px) {
  .main-banner {
    padding-top: 180px;
    min-height: 800px;
  }

  .main-banner__info {
    width: 58%;
  }

  .main-banner__img {
    height: 780px;
    top: 40px;
  }

  .main-banner__subtitle {
    font-size: 16px;
    max-width: 440px;
  }
}

@media only screen and (max-width: 1280px) {
  .main-banner {
    padding-top: 180px;
    min-height: 760px;
  }

  .main-banner__img {
    height: 720px;
  }

  .main-banner__proof {
    padding: 16px 24px;
  }

  .main-banner__proof-item {
    padding: 0 20px;
  }
}

@media only screen and (max-width: 1024px) {
  .main-banner {
    padding-top: 200px;
    min-height: 700px;
  }

  .main-banner__info {
    width: 55%;
  }

  .main-banner__img {
    width: 48%;
    height: 620px;
    top: 140px;
  }

  .main-banner__proof-number {
    font-size: 22px;
  }

  .main-banner__proof-item {
    padding: 0 16px;
  }
}

@media only screen and (max-width: 768px) {
  .main-banner {
    padding-top: 160px;
    min-height: auto;
    flex-direction: column;
    padding-bottom: 400px;
  }

  .main-banner__info {
    width: 100%;
  }

  .main-banner__subtitle {
    max-width: 100%;
  }

  .main-banner__img {
    width: 100%;
    max-width: 380px;
    height: 400px;
    top: auto;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .main-banner__proof {
    width: 100%;
    justify-content: space-between;
  }
}

@media only screen and (max-width: 600px) {
  .main-banner {
    padding-top: 140px;
    padding-bottom: 360px;
  }

  .main-banner__ctas {
    flex-direction: column;
    align-items: stretch;
  }

  .main-banner__cta-primary,
  .main-banner__cta-secondary {
    justify-content: center;
  }

  .main-banner__proof {
    padding: 16px 20px;
    gap: 0;
  }

  .main-banner__proof-item {
    padding: 0 10px;
  }

  .main-banner__proof-number {
    font-size: 18px;
  }

  .main-banner__proof-label {
    font-size: 10px;
  }

  .main-banner__img {
    max-width: 100%;
    height: 320px;
    margin-right: -16px;
    left: auto;
    transform: none;
    right: 0;
  }
}
</style>
