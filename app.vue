<template>
  <div>
    <NuxtPage/>
    <Transition name="fade">
      <SignupForm v-if="signupOpen" @close="closeSignup"/>
    </Transition>
    <ClientOnly>
      <CookieBanner/>
    </ClientOnly>
  </div>
</template>

<script setup>
import SignupForm from '~/components/LandingComponents/SignupForm.vue'
const { open: signupOpen, closeSignup } = useSignup()
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

<style lang="scss">
.fade-enter-active,
.fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>
