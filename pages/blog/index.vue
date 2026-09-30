<template>
  <div class="blog-page">
    <Header :show-links="true"/>

    <main class="blog-main">
      <section class="blog-hero">
        <h1>{{ t('blog.title') }}</h1>
        <p>{{ t('blog.intro') }}</p>
      </section>

      <section v-if="posts.length" class="blog-list" :aria-label="t('blog.title')">
        <article v-for="post in posts" :key="post._path" class="blog-post">
          <div class="post-meta">
            <time :datetime="post.date">{{ formatDate(post.date) }}</time>
            <span v-if="isDraft(post)" class="post-draft">{{ t('blog.draft') }}</span>
          </div>
          <h2>
            <NuxtLink :to="localePath(`/blog/${post.slug}`)">{{ post.title }}</NuxtLink>
          </h2>
          <p class="post-excerpt">{{ post.description }}</p>
        </article>
      </section>

      <section v-else class="blog-empty">
        <h2>{{ t('blog.emptyTitle') }}</h2>
        <p>{{ t('blog.emptyText') }}</p>
      </section>
    </main>

    <Footer/>
  </div>
</template>

<script setup>
import Header from "~/components/LandingComponents/Header.vue"
import Footer from "~/components/LandingComponents/Footer.vue"

const MIN_PUBLISHED_FOR_INDEX = 3

const { t, locale } = useI18n()
const localePath = useLocalePath()
const site = useSiteConfig()

const isPublished = (doc) => doc.draft === false && doc.reviewed === true
const isDraft = (doc) => !isPublished(doc)
const isVisible = (doc) => import.meta.dev || isPublished(doc)

const { data } = await useAsyncData(
  () => `blog-list-${locale.value}`,
  () => queryContent('blog').where({ locale: locale.value }).sort({ date: -1 }).find(),
  { watch: [locale] }
)

const posts = computed(() => (data.value || []).filter(isVisible))
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
.blog-page {
  min-height: 100vh;
  background: #fff;
}

.blog-main {
  max-width: 820px;
  margin: 0 auto;
  padding: 80px 20px;
}

.blog-hero {
  margin-bottom: 48px;

  h1 {
    font-size: 2.5rem;
    color: #1f1f24;
    margin-bottom: 12px;
    font-weight: 700;
  }

  p {
    font-size: 1.15rem;
    color: #55555f;
    max-width: 600px;
  }
}

.blog-list {
  display: grid;
  gap: 24px;
}

.blog-post {
  padding: 24px;
  border: 1px solid #e6e6ec;
  border-radius: 8px;

  .post-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
    font-size: 0.9rem;
    color: #55555f;
  }

  .post-draft {
    background: #b42318;
    color: #fff;
    padding: 2px 10px;
    border-radius: 10px;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.04em;
  }

  h2 {
    margin-bottom: 10px;
    font-size: 1.4rem;

    a {
      color: #1f1f24;
      text-decoration: none;

      &:hover,
      &:focus-visible {
        color: #6a1fcb;
        text-decoration: underline;
      }
    }
  }

  .post-excerpt {
    color: #3d3d46;
    line-height: 1.6;
  }
}

.blog-empty {
  padding: 40px 24px;
  border: 1px dashed #c9c9d3;
  border-radius: 8px;
  text-align: center;

  h2 {
    font-size: 1.4rem;
    margin-bottom: 8px;
    color: #1f1f24;
  }

  p {
    color: #55555f;
  }
}

@media (max-width: 768px) {
  .blog-main {
    padding: 40px 16px;
  }

  .blog-hero h1 {
    font-size: 2rem;
  }

  .blog-post {
    padding: 18px;
  }
}
</style>
