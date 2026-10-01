<template>
  <PageShell>
    <section class="err" aria-labelledby="err-title">
      <p class="err__code pg-meta">{{ code }}</p>
      <h1 id="err-title">{{ title }}</h1>
      <p class="prose-lead err__text">{{ text }}</p>
      <div class="pg-actions">
        <Button :href="homeHref">{{ fr ? "Retour à l'accueil" : 'Back to home' }}</Button>
        <a class="pg-btn-secondary" :href="demoHref">{{ fr ? 'Essayer la démo' : 'Try the live demo' }}</a>
      </div>
      <p class="err__faq">
        <a class="pg-link" :href="faqHref">{{ fr ? 'Lire la FAQ' : 'Read the FAQ' }}</a>
      </p>
    </section>
  </PageShell>
</template>

<script setup>
import PageShell from '~/components/PageShell.vue'
import Button from '~/components/Buttons/Button.vue'

const props = defineProps({
  error: { type: Object, default: () => ({}) }
})

const route = useRoute()
const fr = computed(() => route.path === '/fr' || route.path.startsWith('/fr/'))
const prefix = computed(() => (fr.value ? '/fr' : ''))
const homeHref = computed(() => `${prefix.value || ''}/`)
const demoHref = computed(() => `${prefix.value}/#ai-sommelier`)
const faqHref = computed(() => `${prefix.value}/faq`)

const is404 = computed(() => Number(props.error?.statusCode) === 404)
const code = computed(() => (is404.value ? '404' : String(props.error?.statusCode || 500)))
const title = computed(() => is404.value
  ? (fr.value ? 'Page introuvable' : 'Page not found')
  : (fr.value ? "Une erreur s'est produite" : 'Something went wrong'))
const text = computed(() => is404.value
  ? (fr.value
    ? "Le lien est peut-être incorrect ou la page a été déplacée. Revenez à l'accueil ou essayez la démo."
    : 'The link may be wrong or the page has moved. Head back home or try the live demo.')
  : (fr.value
    ? "Le problème vient de notre côté. Réessayez dans un instant ou revenez à l'accueil."
    : 'The problem is on our side. Try again in a moment or head back home.'))

useHead({
  title: () => `${title.value} - Wineater`,
  meta: [{ name: 'robots', content: 'noindex, follow' }]
})
</script>

<style scoped lang="scss">
.err {
  max-width: 640px;
  padding: 32px 0 24px;

  &__code { margin: 0 0 8px; }
  h1 {
    font-size: 4rem;
    line-height: 1.12;
    letter-spacing: -0.015em;
    color: var(--ink);
    margin: 0;
  }
  &__text { margin: 16px 0 32px; line-height: 1.5; }
  &__faq { margin-top: 16px; a { display: inline-flex; align-items: center; min-height: 44px; } }
}

@media (max-width: 767px) {
  .err h1 { font-size: 3.2rem; }
}
</style>
