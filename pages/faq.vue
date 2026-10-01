<template>
  <PageShell>
    <header class="faq-head pg-head">
      <h1>{{ content.h1 }}</h1>
      <p class="prose-lead">{{ content.intro }}</p>

      <form class="faq-search" :class="{ 'faq-search--pending': !mounted }" role="search" @submit.prevent>
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
    </header>

    <div class="faq-layout">
      <nav class="faq-toc" :aria-label="$t('faq.tocLabel')">
        <ul class="faq-toc__list">
          <li v-for="category in content.categories" :key="category.id">
            <a class="faq-toc__link"
               :class="{ 'is-active': activeId === category.id }"
               :aria-current="activeId === category.id ? 'location' : undefined"
               :href="`#${category.id}`">{{ category.title }}</a>
          </li>
        </ul>
      </nav>

      <div class="faq-body">
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
            <div class="faq-q__answer prose">
              <p>{{ item.a }}</p>
              <p v-if="item.links && item.links.length" class="faq-q__links">
                <NuxtLink v-for="link in item.links"
                          :key="link.label"
                          :to="linkTo(link)">{{ link.label }}</NuxtLink>
              </p>
            </div>
          </article>
        </section>

        <p class="faq-updated pg-meta">
          {{ $t('faq.lastUpdated') }}:
          <time :datetime="faqLastUpdated">{{ updatedLabel }}</time>
        </p>

        <section class="faq-cta" aria-labelledby="faq-cta-title">
          <h2 id="faq-cta-title">{{ $t('faq.ctaTitle') }}</h2>
          <p class="prose">{{ $t('faq.ctaText') }}</p>
          <div class="pg-actions">
            <Button :href="localePath({ path: '/', hash: '#get-started' })" @btnClick="trackCta">{{ $t('cta.primary') }}</Button>
            <NuxtLink class="pg-btn-secondary" :to="localePath({ path: '/', hash: '#ai-sommelier' })">{{ $t('faq.relatedDemo') }}</NuxtLink>
          </div>
        </section>

        <nav class="faq-related" :aria-label="$t('faq.relatedTitle')">
          <h2 class="faq-related__title">{{ $t('faq.relatedTitle') }}</h2>
          <ul>
            <li><NuxtLink class="pg-link" :to="localePath('/privacy')">{{ $t('faq.relatedPrivacy') }}</NuxtLink></li>
            <li><NuxtLink class="pg-link" :to="localePath('/blog')">{{ $t('faq.relatedBlog') }}</NuxtLink></li>
          </ul>
        </nav>
      </div>
    </div>
  </PageShell>
</template>

<script setup>
import PageShell from "~/components/PageShell.vue"
import Button from "~/components/Buttons/Button.vue"
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
const activeId = ref('')
let observer = null
onMounted(() => {
  mounted.value = true
  if (!('IntersectionObserver' in window)) return
  observer = new IntersectionObserver((entries) => {
    const hit = entries.find(e => e.isIntersecting)
    if (hit) activeId.value = hit.target.id
  }, { rootMargin: '-20% 0px -70% 0px' })
  document.querySelectorAll('.faq-category').forEach(el => observer.observe(el))
})
onBeforeUnmount(() => observer && observer.disconnect())

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
.faq-head {
  margin-bottom: 48px;
}

.faq-search {
  margin-top: 32px;
  max-width: 560px;

  &--pending { visibility: hidden; }

  &__label {
    display: block;
    font-size: 1.4rem;
    color: var(--ink-2);
    margin-bottom: 8px;
  }

  &__input {
    width: 100%;
    min-height: 48px;
    padding: 0 16px;
    font-size: 16px;
    color: var(--ink);
    background: #fff;
    border: 1px solid var(--ink-3);
    border-radius: 16px;
    appearance: none;

    &:focus-visible {
      outline: 3px solid var(--brand-1);
      outline-offset: 2px;
      border-color: var(--brand-1);
    }
  }

  &__status {
    min-height: 1.5em;
    margin: 8px 0 0;
    font-size: 1.4rem;
    color: var(--ink-3);
  }
}

.faq-layout {
  display: grid;
  grid-template-columns: 240px minmax(0, 760px);
  column-gap: 80px;
  align-items: start;
}

.faq-toc {
  position: sticky;
  top: 124px;

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
    border-left: 1px solid var(--brand-5);
  }

  &__link {
    display: flex;
    align-items: center;
    min-height: 44px;
    padding: 6px 0 6px 16px;
    margin-left: -1px;
    border-left: 2px solid transparent;
    font-size: 1.5rem;
    line-height: 1.35;
    color: var(--ink-2);
    text-decoration: none;

    &:hover { color: var(--link); }

    &.is-active {
      color: var(--link);
      border-left-color: var(--link);
      font-family: 'PoppinsMedium', 'Poppins Fallback', system-ui, sans-serif;
    }
  }
}

.faq-category {
  scroll-margin-top: 120px;

  & + & { margin-top: 64px; }

  &__title {
    font-size: 4rem;
    line-height: 1.12;
    letter-spacing: -0.015em;
    color: var(--ink);
    margin: 0 0 8px;
  }
}

.faq-q {
  padding: 28px 0;
  border-top: 1px solid var(--brand-5);
  scroll-margin-top: 120px;

  &:first-of-type { border-top: 0; }

  &__head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
  }

  &__title {
    font-size: 2.2rem;
    line-height: 1.3;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin: 0;
  }

  &__permalink {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    min-height: 44px;
    margin: -9px -10px 0 0;
    border-radius: 12px;
    color: var(--ink-3);
    font-size: 1.8rem;
    text-decoration: none;
    opacity: 0.55;
    transition: opacity 0.2s, color 0.2s;

    &:hover,
    &:focus-visible { opacity: 1; color: var(--link); }
  }

  &:hover &__permalink,
  &:focus-within &__permalink { opacity: 1; }

  &__answer {
    margin-top: 12px;
  }

  &__links {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 24px;

    a {
      display: inline-flex;
      align-items: center;
      min-height: 44px;
    }
  }
}

.faq-updated {
  margin: 48px 0 0;
}

.faq-cta {
  margin-top: 32px;
  padding: 40px;
  background: var(--brand-7);
  border-radius: 16px;

  h2 {
    font-size: 2.8rem;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin: 0;
  }

  .prose {
    margin: 12px 0 24px;
  }
}

.faq-related {
  margin-top: 40px;

  &__title {
    font-size: 1.7rem;
    color: var(--ink);
    margin: 0 0 4px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0 24px;
  }

  a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    font-size: 1.7rem;
  }
}

@media (max-width: 1023px) {
  .faq-layout {
    display: block;
  }

  .faq-toc {
    position: static;
    margin: 0 calc(var(--gutter) * -1) 32px;

    &__list {
      flex-direction: row;
      gap: 8px;
      border-left: 0;
      overflow-x: auto;
      padding: 0 var(--gutter) 4px;
      scroll-snap-type: x proximity;
      scroll-padding-inline: var(--gutter);
      scrollbar-width: none;

      &::-webkit-scrollbar { display: none; }
      li { flex: 0 0 auto; scroll-snap-align: start; }
    }

    &__link {
      padding: 0 16px;
      margin: 0;
      border: 1px solid var(--brand-5);
      border-radius: 16px;
      white-space: nowrap;
      background: #fff;

      &.is-active {
        border: 1px solid var(--link);
        background: var(--brand-7);
      }
    }
  }
}

@media (max-width: 767px) {
  .faq-head { margin-bottom: 32px; }

  .faq-category__title { font-size: 2.8rem; }
  .faq-q { padding: 24px 0; }
  .faq-q__title { font-size: 2rem; }
  .faq-q__permalink { margin-right: -12px; }
  .faq-cta { padding: 28px 20px; }
  .faq-cta h2 { font-size: 2.4rem; }
}
</style>
