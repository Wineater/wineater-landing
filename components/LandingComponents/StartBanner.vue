<template>
  <div class="main-banner">
    <div class="main-banner__info">
      <h1 id="hero-title" class="h1 main-banner__info-title color-text">
        {{ $t('startBanner.WineAndFoodPairing') }}
      </h1>
      <div class="main-banner__info-description">
        <p class="p1 color-text">
          {{ $t('startBanner.subtitle1') }}
          <span class="color-brand-1">{{ $t('startBanner.subtitle2') }}</span>
          {{ $t('startBanner.subtitle3') }}
        </p>
      </div>
      <div class="main-banner__ctas">
        <div class="main-banner__cta-primary" @click="$emit('getStarted')">
          <span class="p1">{{ $t('startBanner.ctaPrimary') }}</span>
        </div>
        <div class="main-banner__cta-secondary" @click="openDemoPage">
          <span class="p1">{{ $t('startBanner.ctaSecondary') }}</span>
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
  min-height: 1080px;
  padding-top: 244px;
}

.main-banner__info {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 60%;
}

.main-banner__info-title {
  width: 868px;
  margin-bottom: 32px;
  z-index: 1;
}

.main-banner__info-description {
  max-width: 560px;
  margin-bottom: 40px;
}

.main-banner__ctas {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.main-banner__cta-primary {
  padding: 18px 40px;
  border-radius: 72px;
  background: linear-gradient(135deg, #7E27ED 0%, #2FC0BF 100%);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  transition: opacity 0.2s, transform 0.2s;

  span {
    color: #fff;
    font-family: 'PoppinsMedium', sans-serif;
  }

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
}

.main-banner__cta-secondary {
  padding: 18px 40px;
  border-radius: 72px;
  border: 1.5px solid #333;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  transition: background 0.2s, color 0.2s;

  span {
    color: #333;
    font-family: 'PoppinsMedium', sans-serif;
  }

  &:hover {
    background: #333;

    span {
      color: #fff;
    }
  }
}

.main-banner__img {
  width: 40%;
  height: 992px;
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
    align-items: flex-start;
    padding-top: 244px;
    min-height: 772px;
  }

  .main-banner__info-title {
    width: 763px;
    margin-bottom: 24px;
  }

  .main-banner__info-description {
    max-width: 440px;
    margin-bottom: 36px;
  }

  .main-banner__img {
    height: 771px;
    top: 50px;
  }
}

@media only screen and (max-width: 1280px) {
  .main-banner {
    padding-top: 214px;
    min-height: 720px;
  }

  .main-banner__info-title {
    width: 618px;
  }

  .main-banner__info-description {
    max-width: 400px;
  }

  .main-banner__img {
    height: 720px;
    margin-top: 50px;
  }
}

@media only screen and (max-width: 1024px) {
  .main-banner {
    padding-top: 229px;
    min-height: 720px;
  }

  .main-banner__info-title {
    width: 442px;
  }

  .main-banner__info-description {
    max-width: 368px;
  }

  .main-banner__img {
    width: 50%;
  }

  .main-banner__info {
    width: 50%;
  }
}

@media only screen and (max-width: 768px) {
  .main-banner {
    padding-top: 173px;
    min-height: auto;
    height: 600px;
  }

  .main-banner__info-title {
    width: 433px;
  }

  .main-banner__info-description {
    max-width: 344px;
  }

  .main-banner__img {
    width: 100%;
    max-width: 372px;
    height: 425px;
    top: 146px;
  }

  .main-banner__info {
    width: 100%;
  }
}

@media only screen and (max-width: 600px) {
  .main-banner {
    padding-top: 140px;
    min-height: auto;
    height: auto;
    flex-direction: column;
  }

  .main-banner__info-title {
    width: 100%;
    max-width: 100%;
  }

  .main-banner__info-description {
    width: 100%;
    max-width: 100%;
  }

  .main-banner__ctas {
    gap: 12px;
  }

  .main-banner__cta-primary,
  .main-banner__cta-secondary {
    padding: 16px 28px;
    width: 100%;
    justify-content: center;
  }

  .main-banner__img {
    position: relative;
    max-width: 100%;
    height: 361px;
    top: 0;
    right: 0;
    margin-right: -16px;
    margin-top: 24px;
  }

  .main-banner__info {
    width: 100%;
  }
}
</style>
