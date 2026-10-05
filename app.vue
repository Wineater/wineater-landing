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

// Spanish exists only for the distributors page: advertise es_ES as an alternate locale only where an
// es hreflang alternate is really emitted, so the OG tags agree with hreflang.
const hasSpanishVersion = computed(() => (head.value.link ?? []).some(l => l.rel === 'alternate' && /^es(-|$)/i.test(l.hreflang ?? '')))

useHead(() => ({
  htmlAttrs: { lang: head.value.htmlAttrs?.lang },
  link: head.value.link,
  meta: (head.value.meta ?? []).filter(m => hasSpanishVersion.value || !(m.property === 'og:locale:alternate' && m.content === 'es_ES')),
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
