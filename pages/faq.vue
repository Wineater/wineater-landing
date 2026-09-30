<template>
  <div class="faq-page">
    <Header :show-links="true"/>

    <main class="faq-main">
      <section class="faq-hero">
        <h1>{{ content.h1 }}</h1>
        <p class="faq-hero__intro">{{ content.intro }}</p>
        <p class="faq-hero__updated">
          {{ $t('faq.lastUpdated') }}:
          <time :datetime="faqLastUpdated">{{ updatedLabel }}</time>
        </p>
      </section>

      <nav class="faq-toc" :aria-label="$t('faq.tocLabel')">
        <ul class="faq-toc__list">
          <li v-for="category in content.categories" :key="category.id">
            <a class="faq-toc__chip" :href="`#${category.id}`">{{ category.title }}</a>
          </li>
        </ul>
      </nav>

      <form v-if="mounted" class="faq-search" role="search" @submit.prevent>
        <label class="faq-search__label" for="faq-search-input">{{ $t('faq.searchLabel') }}</label>
        <input id="faq-search-input"
               v-model="query"
               class="faq-search__input"
               type="search"
               autocomplete="off"
               :placeholder="$t('faq.searchPlaceholder')">
        <p class="faq-search__status" role="status" aria-live="polite">
          <template v-if="query.trim()">
            {{ shownCount ? $t('faq.searchCount', { count: shownCount }) : $t('faq.searchEmpty') }}
          </template>
        </p>
      </form>

      <section v-for="category in content.categories"
               v-show="categoryCount(category) > 0"
               :key="category.id"
               :id="category.id"
               class="faq-category"
               :aria-labelledby="`${category.id}-title`">
        <h2 :id="`${category.id}-title`" class="faq-category__title">{{ category.title }}</h2>

        <article v-for="item in category.items"
                 v-show="isShown(item)"
                 :key="item.id"
                 :id="item.id"
                 class="faq-q">
          <div class="faq-q__head">
            <h3 class="faq-q__title">{{ item.q }}</h3>
            <a class="faq-q__permalink"
               :href="`#${item.id}`"
               :aria-label="`${$t('faq.permalink')}: ${item.q}`"
               :title="$t('faq.permalink')">#</a>
          </div>
          <p class="faq-q__answer">{{ item.a }}</p>
          <p v-if="item.links && item.links.length" class="faq-q__links">
            <NuxtLink v-for="link in item.links"
                      :key="link.label"
                      :to="linkTo(link)">{{ link.label }}</NuxtLink>
          </p>
        </article>
      </section>

      <section class="faq-cta" aria-labelledby="faq-cta-title">
        <h2 id="faq-cta-title">{{ $t('faq.ctaTitle') }}</h2>
        <p>{{ $t('faq.ctaText') }}</p>
        <NuxtLink class="faq-cta__btn" :to="localePath({ path: '/', hash: '#get-started' })" @click="trackCta">
          {{ $t('cta.primary') }}
        </NuxtLink>
      </section>

      <nav class="faq-related" :aria-label="$t('faq.relatedTitle')">
        <h2 class="faq-related__title">{{ $t('faq.relatedTitle') }}</h2>
        <ul>
          <li><NuxtLink :to="localePath({ path: '/', hash: '#ai-sommelier' })">{{ $t('faq.relatedDemo') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/privacy')">{{ $t('faq.relatedPrivacy') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/blog')">{{ $t('faq.relatedBlog') }}</NuxtLink></li>
        </ul>
      </nav>
    </main>

    <Footer/>
  </div>
</template>

<script setup>
import Header from "~/components/LandingComponents/Header.vue"
import Footer from "~/components/LandingComponents/Footer.vue"
import { faqByLocale, faqLastUpdated, flattenFaq } from "~/data/faq"

const ORIGIN = 'https://wineater.com'

const { locale, t } = useI18n()
const localePath = useLocalePath()

const content = computed(() => faqByLocale[locale.value] || faqByLocale.en)

const updatedLabel = computed(() =>
  new Intl.DateTimeFormat(locale.value === 'fr' ? 'fr-FR' : 'en-GB', {
    dateStyle: 'long',
    timeZone: 'UTC'
  }).format(new Date(`${faqLastUpdated}T00:00:00Z`))
)

// Progressive search: rendered only after hydration; without JS every answer stays visible.
const mounted = ref(false)
const query = ref('')
onMounted(() => { mounted.value = true })

const needle = computed(() => query.value.trim().toLowerCase())
const isShown = (item) => !needle.value || `${item.q} ${item.a}`.toLowerCase().includes(needle.value)
const categoryCount = (category) => category.items.filter(isShown).length
const shownCount = computed(() => content.value.categories.reduce((sum, c) => sum + categoryCount(c), 0))

const linkTo = (link) => link.hash ? localePath({ path: link.to, hash: link.hash }) : localePath(link.to)

const trackCta = () => {
  track('cta_click', { cta_label: t('cta.primary'), location: 'faq' })
}

useSeoMeta({
  title: () => content.value.meta.title,
  description: () => content.value.meta.description,
  ogTitle: () => content.value.meta.title,
  ogDescription: () => content.value.meta.description,
})

// FAQPage + BreadcrumbList, built from the same data as the visible page (answers are identical plain text).
useSchemaOrg(computed(() => {
  const pageUrl = `${ORIGIN}${localePath('/faq')}`
  const homeUrl = `${ORIGIN}${localePath('/')}`
  return [
    defineWebPage({
      '@type': 'FAQPage',
      name: content.value.meta.title,
      description: content.value.meta.description,
      url: pageUrl,
      inLanguage: locale.value === 'fr' ? 'fr-FR' : 'en-US',
      dateModified: faqLastUpdated,
      mainEntity: flattenFaq(content.value).map(item => ({
        '@type': 'Question',
        '@id': `${pageUrl}#${item.id}`,
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a }
      }))
    }),
    defineBreadcrumb({
      itemListElement: [
        { name: content.value.breadcrumbHome, item: homeUrl },
        { name: content.value.breadcrumbFaq, item: pageUrl }
      ]
    })
  ]
}))
</script>

<style scoped lang="scss">
$brand: #7E27ED;
$brand-dark: #6a1fd0;
$text: #2b2b2b;
$text-body: #444;
$text-muted: #595959;

.faq-page {
  min-height: 100vh;
  background: #fff;
}

.faq-main {
  max-width: 820px;
  margin: 0 auto;
  padding: 150px 16px 72px;
}

.faq-hero {
  text-align: center;
  margin-bottom: 32px;

  h1 {
    font-size: 2.5rem;
    line-height: 1.15;
    color: $text;
    margin: 0 0 16px;
    font-weight: 700;
  }

  &__intro {
    font-size: 1.15rem;
    line-height: 1.55;
    color: $text-muted;
    max-width: 640px;
    margin: 0 auto 12px;
  }

  &__updated {
    font-size: 0.9rem;
    color: $text-muted;
    margin: 0;
  }
}

.faq-toc {
  margin-bottom: 28px;

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
  }

  &__chip {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 0 18px;
    border: 1px solid $brand-dark;
    border-radius: 999px;
    color: $brand-dark;
    background: #fff;
    font-size: 0.95rem;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      background: #f3ebfd;
    }

    &:focus-visible {
      outline: 3px solid $brand-dark;
      outline-offset: 2px;
    }
  }
}

.faq-search {
  margin: 0 auto 36px;
  max-width: 560px;

  &__label {
    display: block;
    font-size: 0.9rem;
    font-weight: 600;
    color: $text;
    margin-bottom: 6px;
  }

  &__input {
    width: 100%;
    min-height: 48px;
    padding: 0 16px;
    font-size: 16px;
    color: $text;
    background: #fff;
    border: 1px solid #767676;
    border-radius: 12px;

    &:focus-visible {
      outline: 3px solid $brand-dark;
      outline-offset: 1px;
      border-color: $brand-dark;
    }
  }

  &__status {
    min-height: 1.4em;
    margin: 8px 0 0;
    font-size: 0.9rem;
    color: $text-muted;
  }
}

.faq-category {
  margin-bottom: 44px;
  scroll-margin-top: 120px;

  &__title {
    font-size: 1.6rem;
    line-height: 1.25;
    color: $text;
    margin: 0 0 16px;
    padding-bottom: 10px;
    border-bottom: 2px solid #ece3fb;
  }
}

.faq-q {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  scroll-margin-top: 120px;

  &:last-child {
    border-bottom: 0;
  }

  &__head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
  }

  &__title {
    font-size: 1.2rem;
    line-height: 1.35;
    color: $text;
    font-weight: 600;
    margin: 0;
  }

  &__permalink {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    min-height: 44px;
    margin: -10px -8px 0 0;
    border-radius: 8px;
    color: $brand-dark;
    font-size: 1.2rem;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      background: #f3ebfd;
    }

    &:focus-visible {
      outline: 3px solid $brand-dark;
      outline-offset: 1px;
    }
  }

  &__answer {
    margin: 10px 0 0;
    font-size: 1.05rem;
    line-height: 1.65;
    color: $text-body;
  }

  &__links {
    margin: 10px 0 0;
    display: flex;
    flex-wrap: wrap;
    gap: 4px 20px;

    a {
      display: inline-flex;
      align-items: center;
      min-height: 44px;
      color: $brand-dark;
      font-weight: 600;
      text-decoration: underline;
      text-underline-offset: 3px;

      &:focus-visible {
        outline: 3px solid $brand-dark;
        outline-offset: 2px;
        border-radius: 4px;
      }
    }
  }
}

.faq-cta {
  margin-top: 56px;
  padding: 36px 20px;
  text-align: center;
  background: #f7f4fd;
  border-radius: 20px;

  h2 {
    font-size: 1.6rem;
    line-height: 1.25;
    color: $text;
    margin: 0 0 10px;
  }

  p {
    color: $text-body;
    line-height: 1.55;
    max-width: 520px;
    margin: 0 auto 22px;
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 52px;
    padding: 0 28px;
    border-radius: 999px;
    background: $brand-dark;
    color: #fff;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      background: #5a17b8;
    }

    &:focus-visible {
      outline: 3px solid $brand-dark;
      outline-offset: 3px;
    }
  }
}

.faq-related {
  margin-top: 40px;
  text-align: center;

  &__title {
    font-size: 1.1rem;
    color: $text;
    margin: 0 0 8px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 4px 24px;
  }

  a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    color: $brand-dark;
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 3px;

    &:focus-visible {
      outline: 3px solid $brand-dark;
      outline-offset: 2px;
      border-radius: 4px;
    }
  }
}

@media (max-width: 767px) {
  .faq-main {
    padding: 112px 16px 48px;
  }

  .faq-hero h1 {
    font-size: 2rem;
  }

  .faq-category__title {
    font-size: 1.4rem;
  }

  .faq-q__title {
    font-size: 1.1rem;
  }
}
</style>
