<template>
  <section class="faq-teaser" id="faq-teaser" aria-labelledby="faq-teaser-title">
    <h2 id="faq-teaser-title" class="faq-teaser__title">{{ $t('faq.teaserTitle') }}</h2>
    <ul class="faq-teaser__list">
      <li v-for="item in items" :key="item.id">
        <NuxtLink class="faq-teaser__link" :to="localePath({ path: '/faq', hash: `#${item.id}` })">
          <span>{{ item.q }}</span>
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false">
            <path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
      </li>
    </ul>
    <NuxtLink class="faq-teaser__all" :to="localePath('/faq')">{{ $t('faq.teaserAll') }}</NuxtLink>
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
  max-width: 860px;
  margin: 0 auto;
  padding: 64px 16px;

  &__title {
    font-size: 2rem;
    line-height: 1.2;
    color: #222;
    text-align: center;
    margin: 0 0 28px;
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 10px;
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    min-height: 56px;
    padding: 12px 20px;
    border-radius: 12px;
    background: #f7f4fd;
    color: #2b2b2b;
    text-decoration: none;
    font-size: 1.05rem;
    line-height: 1.4;
    font-weight: 600;

    svg {
      flex-shrink: 0;
      color: #6a1fd0;
    }

    &:hover {
      background: #efe7fb;
    }

    &:focus-visible {
      outline: 3px solid #6a1fd0;
      outline-offset: 2px;
    }
  }

  &__all {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    margin: 20px auto 0;
    width: fit-content;
    padding: 0 24px;
    color: #6a1fd0;
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 3px;
    border-radius: 999px;

    &:focus-visible {
      outline: 3px solid #6a1fd0;
      outline-offset: 2px;
    }
  }
}

@media (max-width: 767px) {
  .faq-teaser {
    padding: 40px 16px;

    &__title {
      font-size: 1.6rem;
    }
  }
}
</style>
