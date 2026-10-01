<template>
  <section class="faq-teaser" id="faq-teaser" aria-labelledby="faq-teaser-title">
    <div class="faq-teaser__inner">
      <div class="faq-teaser__head">
        <h2 id="faq-teaser-title" class="faq-teaser__title">{{ $t('faq.teaserTitle') }}</h2>
        <NuxtLink class="faq-teaser__all" :to="localePath('/faq')">
          <span>{{ $t('faq.teaserAll') }}</span>
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false">
            <path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
      </div>
      <div class="faq-teaser__list">
        <details v-for="item in items" :key="item.id" class="faq-teaser__item">
          <summary class="faq-teaser__q">
            <span>{{ item.q }}</span>
            <svg class="faq-teaser__chev" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
              <path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </summary>
          <div class="faq-teaser__a">
            <p>{{ item.a }}</p>
            <NuxtLink class="faq-teaser__more" :to="localePath({ path: '/faq', hash: `#${item.id}` })">{{ $t('faq.permalink') }}</NuxtLink>
          </div>
        </details>
      </div>
    </div>
  </section>
</template>

<script setup>
import { faqByLocale, faqTeaserIds, flattenFaq } from '~/data/faq'

const { locale } = useI18n()
const localePath = useLocalePath()

const items = computed(() => {
  const all = flattenFaq(faqByLocale[locale.value] || faqByLocale.en)
  return faqTeaserIds.map(id => all.find(q => q.id === id)).filter(Boolean)
})
</script>

<style scoped lang="scss">
.faq-teaser {
  &__inner {
    max-width: var(--container);
    margin: 0 auto;
    padding: var(--section-y) 0;
    display: grid;
    grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
    gap: 32px 64px;
    align-items: start;
  }

  &__head {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  &__title {
    margin: 0;
    font-size: 4rem;
    line-height: 1.12;
    color: var(--ink);
  }

  &__all {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 44px;
    font-family: 'PoppinsMedium', sans-serif;
    font-size: 1.6rem;
    color: var(--link);
    text-decoration: underline;
    text-underline-offset: 4px;
    border-radius: 8px;

    &:hover { color: var(--brand-1); }
    &:focus-visible { outline: 3px solid var(--brand-1); outline-offset: 2px; }
  }

  &__list {
    border-top: 1px solid var(--brand-5);
  }

  &__item {
    border-bottom: 1px solid var(--brand-5);
  }

  &__q {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    min-height: 64px;
    padding: 16px 0;
    cursor: pointer;
    list-style: none;
    font-family: 'PoppinsMedium', sans-serif;
    font-size: 1.8rem;
    line-height: 1.4;
    color: var(--ink);

    &::-webkit-details-marker { display: none; }
    &:hover { color: var(--link); }
    &:focus-visible { outline: 3px solid var(--brand-1); outline-offset: 2px; border-radius: 8px; }
  }

  &__chev {
    flex-shrink: 0;
    color: var(--link);
    transition: transform 0.2s ease;
  }

  &__item[open] &__chev { transform: rotate(180deg); }

  &__a {
    padding: 0 40px 24px 0;
    max-width: 68ch;

    p {
      margin: 0 0 12px;
      font-size: 1.7rem;
      line-height: 1.6;
      color: var(--ink-2);
    }
  }

  &__more {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    font-size: 1.5rem;
    color: var(--link);
    text-decoration: underline;
    text-underline-offset: 3px;

    &:focus-visible { outline: 3px solid var(--brand-1); outline-offset: 2px; border-radius: 8px; }
  }
}

@media (max-width: 900px) {
  .faq-teaser__inner { grid-template-columns: 1fr; gap: 24px; }
  .faq-teaser__title { font-size: 3.2rem; }
  .faq-teaser__q { font-size: 1.7rem; }
  .faq-teaser__a { padding-right: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .faq-teaser__chev { transition: none; }
}
</style>
