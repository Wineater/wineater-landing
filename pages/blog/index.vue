<template>
  <PageShell>
    <header class="pg-head blog-head">
      <h1>{{ t('blog.title') }}</h1>
      <p class="prose-lead">{{ t('blog.intro') }}</p>
    </header>

    <ul v-if="posts.length" class="blog-list" :aria-label="t('blog.title')">
      <li v-for="post in posts" :key="post._path" class="blog-post">
        <article>
          <p class="blog-post__meta pg-meta">
            <time :datetime="post.date">{{ formatDate(post.date) }}</time>
            <span v-if="isDraft(post)" class="blog-post__draft">{{ t('blog.draft') }}</span>
          </p>
          <h2 class="blog-post__title">
            <NuxtLink :to="localePath(`/blog/${post.slug}`)">{{ post.title }}</NuxtLink>
          </h2>
          <p class="blog-post__excerpt prose">{{ post.description }}</p>
        </article>
      </li>
    </ul>

    <section v-else class="blog-empty" aria-labelledby="blog-empty-title">
      <h2 id="blog-empty-title">{{ t('blog.emptyTitle') }}</h2>
      <p class="prose">{{ t('blog.emptyText') }}</p>
      <div class="pg-actions">
        <Button :href="demoPath">{{ $t('faq.relatedDemo') }}</Button>
        <NuxtLink class="pg-btn-secondary" :to="faqPath">{{ $t('Header.Faq') }}</NuxtLink>
      </div>
    </section>
  </PageShell>
</template>

<script setup>
import PageShell from "~/components/PageShell.vue"
import Button from "~/components/Buttons/Button.vue"

const MIN_PUBLISHED_FOR_INDEX = 3

const { t, locale } = useI18n()
const localePath = useLocalePath()
const site = useSiteConfig()

const isPublished = (doc) => doc.draft === false && doc.reviewed === true
const isDraft = (doc) => !isPublished(doc)
const showDrafts = useRuntimeConfig().public.showDrafts
// Nuxt Content hides `draft: true` documents unless the query names _draft. isVisible decides what is shown.
const anyDraftState = { _draft: { $in: [true, false] } }
const isVisible = (doc) => import.meta.dev || showDrafts || isPublished(doc)

const { data } = await useAsyncData(
  () => `blog-list-${locale.value}`,
  // Filter inside the fetcher so unpublished posts never reach the payload outside dev.
  async () => (await queryContent('blog').where({ locale: locale.value, ...anyDraftState }).sort({ date: -1 }).find()).filter(isVisible),
  { watch: [locale] }
)

const posts = computed(() => (data.value || []).filter(isVisible))
const demoPath = computed(() => localePath({ path: '/', hash: '#ai-sommelier' }))
const faqPath = computed(() => localePath('/faq'))
const publishedCount = computed(() => posts.value.filter(isPublished).length)

const formatDate = (value) =>
  new Intl.DateTimeFormat(locale.value, { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(value))

const path = computed(() => (locale.value === 'en' ? '/blog' : `/${locale.value}/blog`))

useSeoMeta({
  title: () => t('blog.metaTitle'),
  description: () => t('blog.metaDescription'),
  ogTitle: () => t('blog.metaTitle'),
  ogDescription: () => t('blog.metaDescription'),
  robots: () => (publishedCount.value < MIN_PUBLISHED_FOR_INDEX ? 'noindex, follow' : 'index, follow'),
})

useHead({
  link: [{ rel: 'canonical', href: () => `${site.url}${path.value}` }],
})
</script>

<style scoped lang="scss">
.blog-head { margin-bottom: 48px; }

.blog-list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 760px;
}

.blog-post {
  padding: 32px 0;
  border-top: 1px solid var(--brand-5);

  &:last-child { border-bottom: 1px solid var(--brand-5); }

  &__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px 12px;
    margin: 0 0 8px;
  }

  &__draft {
    padding: 2px 10px;
    border-radius: 8px;
    background: var(--brand-7);
    color: var(--ink-2);
    font-size: 1.4rem;
  }

  &__title {
    font-size: 2.8rem;
    line-height: 1.2;
    letter-spacing: -0.01em;
    margin: 0;

    a {
      color: var(--ink);
      text-decoration: none;

      &:hover,
      &:focus-visible { color: var(--link); text-decoration: underline; text-underline-offset: 0.2em; }
    }
  }

  &__excerpt { margin-top: 12px; }
}

.blog-empty {
  max-width: 760px;
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
  .blog-head { margin-bottom: 32px; }
  .blog-post { padding: 24px 0; }
  .blog-post__title { font-size: 2.4rem; }
  .blog-empty { padding: 28px 20px; }
}
</style>
