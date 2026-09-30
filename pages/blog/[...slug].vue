<template>
  <div class="article-page">
    <Header :show-links="true"/>

    <main class="article-main">
      <article v-if="doc" class="article" itemscope itemtype="https://schema.org/Article">
        <nav class="article-back">
          <NuxtLink :to="localePath('/blog')">{{ t('blog.back') }}</NuxtLink>
        </nav>

        <header class="article-header">
          <p v-if="isDraft" class="article-draft" role="status">{{ t('blog.draft') }}</p>
          <h1 itemprop="headline">{{ doc.title }}</h1>
          <p class="article-lead">{{ doc.description }}</p>
          <p class="article-meta">
            <span>{{ t('blog.published') }} <time :datetime="doc.date" itemprop="datePublished">{{ formatDate(doc.date) }}</time></span>
            <span v-if="doc.updated && doc.updated !== doc.date">
              {{ t('blog.updated') }} <time :datetime="doc.updated" itemprop="dateModified">{{ formatDate(doc.updated) }}</time>
            </span>
            <span>{{ t('blog.minRead', { n: readingTime }) }}</span>
          </p>
        </header>

        <div class="prose" itemprop="articleBody">
          <ContentRenderer :value="doc"/>
        </div>

        <section v-if="doc.sources?.length" class="article-sources" aria-labelledby="sources-title">
          <h2 id="sources-title">{{ t('blog.sources') }}</h2>
          <ul>
            <li v-for="source in doc.sources" :key="source.url">
              <a :href="source.url" target="_blank" rel="noopener noreferrer">{{ source.title }}</a>
            </li>
          </ul>
        </section>

        <aside class="article-cta" aria-labelledby="cta-title">
          <h2 id="cta-title">{{ t('blog.ctaTitle') }}</h2>
          <p>{{ t('blog.ctaText') }}</p>
          <NuxtLink class="cta-button" :to="localePath({ path: '/', hash: '#get-started' })" @click="onCta">
            {{ t('cta.primary') }}
          </NuxtLink>
        </aside>

        <nav v-if="related.length" class="article-related" aria-labelledby="related-title">
          <h2 id="related-title">{{ t('blog.related') }}</h2>
          <ul>
            <li v-for="item in related" :key="item._path">
              <NuxtLink :to="localePath(`/blog/${item.slug}`)">{{ item.title }}</NuxtLink>
            </li>
          </ul>
        </nav>
      </article>
    </main>

    <Footer/>
  </div>
</template>

<script setup>
import Header from "~/components/LandingComponents/Header.vue"
import Footer from "~/components/LandingComponents/Footer.vue"
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
  () => queryContent('blog').only(['slug', 'locale', 'translationOf', 'title', 'keywords', 'date', 'draft', 'reviewed', '_path']).find()
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

const onCta = () => track('cta_click', { location: 'blog_article', slug: doc.value.slug })
</script>

<style scoped lang="scss">
.article-page {
  min-height: 100vh;
  background: #fff;
}

.article-main {
  max-width: 720px;
  margin: 0 auto;
  padding: 64px 20px 80px;
}

.article-back a {
  color: #6a1fcb;
  font-size: 0.95rem;
}

.article-header {
  margin: 24px 0 32px;

  h1 {
    font-size: 2.3rem;
    line-height: 1.2;
    color: #1f1f24;
    margin-bottom: 14px;
  }
}

.article-draft {
  display: inline-block;
  background: #b42318;
  color: #fff;
  padding: 2px 10px;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  margin-bottom: 12px;
}

.article-lead {
  font-size: 1.15rem;
  color: #3d3d46;
  line-height: 1.6;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 18px;
  margin-top: 14px;
  font-size: 0.9rem;
  color: #55555f;
}

.prose {
  color: #25252b;
  font-size: 1.05rem;
  line-height: 1.75;

  :deep(h2) {
    font-size: 1.6rem;
    margin: 2.2rem 0 0.8rem;
    color: #1f1f24;
  }

  :deep(h3) {
    font-size: 1.25rem;
    margin: 1.6rem 0 0.6rem;
    color: #1f1f24;
  }

  :deep(p),
  :deep(ul),
  :deep(ol) {
    margin: 0 0 1.1rem;
  }

  :deep(ul),
  :deep(ol) {
    padding-left: 1.4rem;
  }

  :deep(li) {
    margin-bottom: 0.4rem;
  }

  :deep(a) {
    color: #6a1fcb;
    text-decoration: underline;
  }

  :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 0 0 1.4rem;
    font-size: 0.95rem;
  }

  :deep(th),
  :deep(td) {
    border: 1px solid #e0e0e8;
    padding: 8px 10px;
    text-align: left;
    vertical-align: top;
  }

  :deep(th) {
    background: #f5f5f8;
  }
}

.article-sources,
.article-related {
  margin-top: 40px;

  h2 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #1f1f24;
  }

  ul {
    padding-left: 1.2rem;
    line-height: 1.7;
  }

  a {
    color: #6a1fcb;
  }
}

.article-cta {
  margin-top: 48px;
  padding: 28px 24px;
  background: #f5f5f8;
  border-radius: 8px;

  h2 {
    font-size: 1.35rem;
    margin-bottom: 8px;
    color: #1f1f24;
  }

  p {
    color: #3d3d46;
    margin-bottom: 18px;
  }
}

.cta-button {
  display: inline-block;
  background: #6a1fcb;
  color: #fff;
  padding: 12px 22px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  min-height: 44px;

  &:hover,
  &:focus-visible {
    background: #571ba6;
  }
}

@media (max-width: 768px) {
  .article-main {
    padding: 32px 16px 56px;
  }

  .article-header h1 {
    font-size: 1.75rem;
  }
}
</style>
