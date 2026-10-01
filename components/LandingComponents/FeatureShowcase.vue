<template>
  <section id="how-recommendations-work" class="features" aria-labelledby="features-title">
    <h2 id="features-title" class="features__title" v-reveal>{{ $t('features.title') }}</h2>
    <p class="features__lead" v-reveal>{{ $t('features.lead') }}</p>

    <div class="features__grid" v-reveal:stagger>
      <figure v-for="item in items" :key="item.key" class="feature">
        <div class="feature__frame">
          <div class="feature__bar" aria-hidden="true">
            <span class="feature__url">{{ item.url }}</span>
          </div>
          <img
            class="feature__img"
            :src="item.src"
            :alt="$t(`features.${item.key}Alt`)"
            width="1000"
            :height="item.height"
            loading="lazy"
            decoding="async"
          />
        </div>
        <figcaption class="feature__text">
          <h3 class="feature__title">{{ $t(`features.${item.key}Title`) }}</h3>
          <p class="feature__desc">{{ $t(`features.${item.key}Text`) }}</p>
          <p class="feature__live">{{ $t('features.liveOn', { client: item.client }) }}</p>
        </figcaption>
      </figure>

      <div class="feature feature--figures">
        <div class="figures">
          <h3 class="feature__title">{{ $t('features.catalogTitle') }}</h3>
          <p class="feature__desc">{{ $t('features.catalogText') }}</p>
          <p class="figures__label">{{ $t('features.figuresLabel') }}</p>
          <dl class="figures__list">
            <div v-for="row in measured" :key="row.wines" class="figures__row">
              <dt>{{ $t('features.wines', { n: row.wines }) }}</dt>
              <dd>{{ $t('features.seconds', { n: row.sec }) }}</dd>
            </div>
          </dl>
          <p class="figures__note">{{ $t('features.figuresNote') }}</p>
        </div>
      </div>
    </div>

    <div class="features__cta" v-reveal>
      <Button bgColor="black" @btnClick="onPrimary">{{ $t('cta.primary') }}</Button>
    </div>
  </section>
</template>

<script setup>
import Button from '~/components/Buttons/Button.vue';

const emit = defineEmits(['getStarted']);
const { t } = useI18n();

// Screenshots are real captures of live client widgets (client names approved by the owner).
const items = [
  { key: 'language', src: '/features/feature-language.webp', height: 743, url: 'intermarche.wineater.com', client: 'Intermarché' },
  { key: 'reason', src: '/features/feature-reason.webp', height: 577, url: 'briceandburnett.co.za/ai-wine-geek', client: 'Brice & Burnett' },
  { key: 'similar', src: '/features/feature-similar.webp', height: 577, url: 'briceandburnett.co.za/ai-wine-geek', client: 'Brice & Burnett' },
];

// Median time to an answer, measured on live stores in October 2026 (in-stock wines).
const measured = [
  { wines: '29', sec: '4.8' },
  { wines: '68', sec: '4.8' },
  { wines: '393', sec: '5.1' },
  { wines: '762', sec: '6.7' },
  { wines: '3,344', sec: '5.3' },
];

const onPrimary = () => {
  track('cta_click', { cta_label: t('cta.primary'), location: 'feature_showcase' });
  emit('getStarted');
};
</script>

<style scoped lang="scss">
.features {
  max-width: var(--container);
  margin: 0 auto;
  padding: var(--section-y) 0 0;
  color: var(--ink-2);
}

.features__title {
  margin: 0;
  font-size: clamp(2.8rem, 3.6vw, 4rem);
  line-height: 1.15;
  color: var(--ink);
  max-width: 22ch;
  text-wrap: balance;
}

.features__lead {
  margin: 16px 0 0;
  font-size: 1.7rem;
  line-height: 1.55;
  color: var(--ink-2);
  max-width: 60ch;
}

.features__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 40px 24px;
  margin-top: 40px;
}

.feature {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0;
  min-width: 0;
}

.feature__frame {
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid var(--brand-5);
  background: #fff;
  box-shadow: 0 8px 24px rgba(26, 20, 38, 0.06);
}

.feature__bar {
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 12px;
  background: var(--brand-7);
  border-bottom: 1px solid var(--brand-5);
}

.feature__url {
  display: block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 3px 12px;
  border-radius: 999px;
  background: #fff;
  font-size: 1.2rem;
  line-height: 1.5;
  color: var(--ink-3);
}

.feature__img {
  display: block;
  width: 100%;
  height: auto;
}

.feature__text { margin: 0; }

.feature__title {
  margin: 0;
  font-family: 'PoppinsMedium', sans-serif;
  font-weight: 500;
  font-size: 2.2rem;
  line-height: 1.3;
  color: var(--ink);
  text-wrap: balance;
}

.feature__desc {
  margin: 8px 0 0;
  font-size: 1.7rem;
  line-height: 1.55;
  color: var(--ink-2);
  max-width: 52ch;
}

.feature__live {
  margin: 12px 0 0;
  font-size: 1.4rem;
  line-height: 1.4;
  color: var(--ink-3);
}

.feature--figures {
  justify-content: center;
  padding: 32px;
  border-radius: 16px;
  background: var(--brand-7);
}

.figures__label {
  margin: 24px 0 8px;
  font-size: 1.4rem;
  line-height: 1.4;
  color: var(--ink-3);
}

.figures__list {
  display: grid;
  gap: 4px;
  margin: 0;
}

.figures__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 44px;
  padding: 0 16px;
  border-radius: 12px;
  background: #fff;
  font-size: 1.7rem;
  color: var(--ink);

  dt { margin: 0; }
  dd { margin: 0; font-family: 'PoppinsMedium', sans-serif; font-variant-numeric: tabular-nums; }
}

.figures__note {
  margin: 16px 0 0;
  font-size: 1.4rem;
  line-height: 1.5;
  color: var(--ink-3);
  max-width: 52ch;
}

.features__cta { margin-top: 40px; }

@media only screen and (max-width: 1023px) {
  .features__grid { grid-template-columns: minmax(0, 1fr); gap: 32px; }
}

@media only screen and (max-width: 767px) {
  .features__lead { margin-top: 12px; }
  .features__grid { margin-top: 28px; }
  .feature--figures { padding: 24px 20px; }
  .features__cta { margin-top: 32px; }
  .features__cta :deep(.button) { width: 100%; }
}
</style>
