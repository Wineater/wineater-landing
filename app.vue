<template>
  <div>
    <NuxtPage/>
    <ClientOnly>
      <CookieBanner/>
    </ClientOnly>
  </div>
</template>

<script setup>
const head = useLocaleHead({ dir: false, seo: true })
const { t } = useI18n()

useHead(() => ({
  htmlAttrs: { lang: head.value.htmlAttrs?.lang },
  link: head.value.link,
  meta: head.value.meta,
}))

useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  ogTitle: () => t('seo.title'),
  ogDescription: () => t('seo.description'),
  twitterTitle: () => t('seo.title'),
  twitterDescription: () => t('seo.description'),
})
</script>
