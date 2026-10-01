<template>
  <PageShell>
    <article v-if="doc" class="article" itemscope itemtype="https://schema.org/Article">
      <nav class="article-back" :aria-label="t('blog.back')">
        <NuxtLink class="pg-link" :to="localePath('/blog')">{{ t('blog.back') }}</NuxtLink>
      </nav>

      <header class="article-header pg-head">
        <p v-if="isDraft" class="article-draft" role="status">{{ t('blog.draft') }}</p>
        <h1 itemprop="headline">{{ doc.title }}</h1>
        <p class="prose-lead">{{ doc.description }}</p>
        <p class="article-meta pg-meta">
          <span>{{ t('blog.published') }} <time :datetime="doc.date" itemprop="datePublished">{{ formatDate(doc.date) }}</time></span>
          <span v-if="doc.updated && doc.updated !== doc.date">
            {{ t('blog.updated') }} <time :datetime="doc.updated" itemprop="dateModified">{{ formatDate(doc.updated) }}</time>
          </span>
          <span>{{ t('blog.minRead', { n: readingTime }) }}</span>
        </p>
      </header>

      <div class="prose article-body" itemprop="articleBody">
        <ContentRenderer :value="doc"/>
      </div>

      <section v-if="doc.sources?.length" class="article-sources prose" aria-labelledby="sources-title">
        <h2 id="sources-title">{{ t('blog.sources') }}</h2>
        <ul>
          <li v-for="source in doc.sources" :key="source.url">
            <a :href="source.url" target="_blank" rel="noopener noreferrer">{{ source.title }}</a>
          </li>
        </ul>
      </section>

      <aside class="article-cta" aria-labelledby="cta-title">
        <h2 id="cta-title">{{ t('blog.ctaTitle') }}</h2>
        <p class="prose">{{ t('blog.ctaText') }}</p>
        <Button :href="ctaPath" @btnClick="onCta">{{ t('cta.primary') }}</Button>
      </aside>

      <nav v-if="related.length" class="article-related prose" aria-labelledby="related-title">
        <h2 id="related-title">{{ t('blog.related') }}</h2>
        <ul>
          <li v-for="item in related" :key="item._path">
            <NuxtLink :to="localePath(`/blog/${item.slug}`)">{{ item.title }}</NuxtLink>
          </li>
        </ul>
      </nav>
    </article>
  </PageShell>
</template>

<script setup>
import PageShell from "~/components/PageShell.vue"
import Button from "~/components/Buttons/Button.vue"
import { track } from "~/utils/track"

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const site = useSiteConfig()

const slug = computed(() => [].concat(route.params.slug || []).join('/'))

const isPublished = (d) => d.draft === false && d.reviewed === true
const isVisible = (d) => import.meta.dev || isPublished(d)

const { data: doc } = await useAsyncData(
  () => `blog-article-${locale.value}-${slug.value}`,
  async () => {
    if (!slug.value) return null
    const found = await queryContent('blog').where({ slug: slug.value, locale: locale.value }).findOne().catch(() => null)
    return found && isVisible(found) ? found : null
  },
  { watch: [locale, slug] }
)

if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: t('blog.notFound'), fatal: true })
}

const { data: allDocs } = await useAsyncData(
  () => `blog-all-${slug.value}`,
  async () => (await queryContent('blog').only(['slug', 'locale', 'translationOf', 'title', 'keywords', 'date', 'draft', 'reviewed', '_path']).find()).filter(isVisible)
)

const isDraft = computed(() => !isPublished(doc.value))

const related = computed(() => {
  const mine = new Set(doc.value.keywords || [])
  return (allDocs.value || [])
    .filter((d) => d.slug !== doc.value.slug && d.locale === locale.value && isVisible(d))
    .map((d) => ({ ...d, score: (d.keywords || []).filter((k) => mine.has(k)).length }))
    .sort((a, b) => b.score - a.score || new Date(b.date) - new Date(a.date))
    .slice(0, 3)
})

const translation = computed(() => {
  const all = (allDocs.value || []).filter(isVisible)
  const me = doc.value
  return all.find((d) => d.locale !== me.locale && (d.slug === me.translationOf || d.translationOf === me.slug))
})

const urlFor = (loc, s) => `${site.url}${loc === 'en' ? '' : `/${loc}`}/blog/${s}`

const words = (node) => {
  if (!node) return ''
  if (node.type === 'text') return node.value
  return (node.children || []).map(words).join(' ')
}
const readingTime = computed(() => {
  const count = words(doc.value.body).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(count / 200))
})

const formatDate = (value) =>
  new Intl.DateTimeFormat(locale.value, { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(value))

const canonical = computed(() => urlFor(locale.value, doc.value.slug))

useSeoMeta({
  title: () => doc.value.title,
  description: () => doc.value.description,
  ogTitle: () => doc.value.title,
  ogDescription: () => doc.value.description,
  ogType: 'article',
  ogUrl: () => canonical.value,
  ogLocale: () => (locale.value === 'fr' ? 'fr_FR' : locale.value === 'es' ? 'es_ES' : 'en_US'),
  articlePublishedTime: () => doc.value.date,
  articleModifiedTime: () => doc.value.updated || doc.value.date,
  robots: () => (isDraft.value ? 'noindex, nofollow' : 'index, follow'),
})

useHead(() => {
  const link = [{ rel: 'canonical', href: canonical.value }]
  if (translation.value) {
    const pair = [doc.value, translation.value]
    for (const d of pair) link.push({ rel: 'alternate', hreflang: d.locale, href: urlFor(d.locale, d.slug) })
    const en = pair.find((d) => d.locale === 'en')
    if (en) link.push({ rel: 'alternate', hreflang: 'x-default', href: urlFor('en', en.slug) })
  }
  return { link }
})

useSchemaOrg([
  {
    '@type': 'Article',
    headline: doc.value.title,
    description: doc.value.description,
    inLanguage: doc.value.locale,
    datePublished: doc.value.date,
    dateModified: doc.value.updated || doc.value.date,
    mainEntityOfPage: canonical.value,
    author: { '@type': 'Organization', name: 'Wineater', url: site.url },
    publisher: {
      '@type': 'Organization',
      name: 'Wineater',
      url: site.url,
      logo: { '@type': 'ImageObject', url: 'https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/logo.svg' },
    },
  },
])

const ctaPath = computed(() => localePath({ path: '/', hash: '#get-started' }))
const onCta = () => track('cta_click', { location: 'blog_article', slug: doc.value.slug })
</script>

<style scoped lang="scss">
.article { max-width: 760px; }

.article-back {
  margin-bottom: 24px;

  a { display: inline-flex; align-items: center; min-height: 44px; }
}

.article-header { margin-bottom: 40px; }

.article-draft {
  display: inline-block;
  margin: 0 0 12px;
  padding: 2px 10px;
  border-radius: 8px;
  background: var(--brand-7);
  color: var(--ink-2);
  font-size: 1.4rem;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 20px;
  margin-top: 16px;
}

.article-body {
  max-width: none;

  :deep(li) { list-style: inherit; }
  :deep(img) { max-width: 100%; height: auto; border-radius: 16px; }
}

.article-sources,
.article-related {
  max-width: none;
  margin-top: 48px;
  padding-top: 8px;
  border-top: 1px solid var(--brand-5);

  h2 { font-size: 2rem; margin-top: 1em; }
  li { list-style: disc; }
}

.article-sources a,
.article-related a { overflow-wrap: anywhere; }

.article-cta {
  margin-top: 56px;
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

  .prose { margin: 12px 0 24px; }
}

@media (max-width: 767px) {
  .article-header { margin-bottom: 32px; }
  .article-cta { padding: 28px 20px; }
  .article-cta h2 { font-size: 2.4rem; }
}
</style>
