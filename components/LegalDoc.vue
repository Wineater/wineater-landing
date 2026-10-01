<template>
  <PageShell>
    <header class="pg-head legal-head">
      <h1>{{ doc.h1 }}</h1>
      <p class="legal-updated pg-meta">
        {{ fr ? 'Dernière mise à jour :' : 'Last updated:' }}
        <LegalText :text="doc.updated"/>
      </p>
    </header>

    <div class="legal-layout" :class="{ 'legal-layout--toc': hasToc }">
      <template v-if="hasToc">
        <nav class="legal-toc" :aria-label="tocLabel">
          <p class="legal-toc__title">{{ tocLabel }}</p>
          <ol class="legal-toc__list">
            <li v-for="(section, s) in doc.sections" :key="s">
              <a :href="`#section-${s + 1}`">{{ section.title }}</a>
            </li>
          </ol>
        </nav>

        <details class="legal-toc-m">
          <summary>{{ tocLabel }}</summary>
          <ol class="legal-toc-m__list">
            <li v-for="(section, s) in doc.sections" :key="s">
              <a :href="`#section-${s + 1}`">{{ section.title }}</a>
            </li>
          </ol>
        </details>
      </template>

      <article class="legal-article prose">
        <p v-for="(text, i) in doc.intro" :key="`intro-${i}`">
          <LegalText :text="text"/>
        </p>

        <section v-for="(section, s) in doc.sections" :id="`section-${s + 1}`" :key="s" class="legal-section">
          <h2>{{ section.title }}</h2>
          <p v-for="(text, i) in section.paragraphs" :key="`p-${i}`">
            <LegalText :text="text"/>
          </p>
          <ul v-if="section.list">
            <li v-for="(text, i) in section.list" :key="`l-${i}`">
              <LegalText :text="text"/>
            </li>
          </ul>
        </section>

        <nav class="legal-nav" :aria-label="fr ? 'Pages légales' : 'Legal pages'">
          <NuxtLink class="pg-link" :to="localePath('/legal')">{{ fr ? 'Mentions légales' : 'Legal notice' }}</NuxtLink>
          <NuxtLink class="pg-link" :to="localePath('/privacy')">{{ fr ? 'Politique de confidentialité' : 'Privacy policy' }}</NuxtLink>
          <NuxtLink class="pg-link" :to="localePath('/terms')">{{ fr ? "Conditions d'utilisation" : 'Terms of use' }}</NuxtLink>
          <button type="button" class="pg-btn-secondary" @click="reopen">{{ fr ? 'Paramètres des cookies' : 'Cookie settings' }}</button>
        </nav>
      </article>
    </div>
  </PageShell>
</template>

<script setup>
import PageShell from '~/components/PageShell.vue'
import LegalText from '~/components/LegalText.vue'
import { legalDocs } from '~/data/legal'

const props = defineProps({
  docKey: { type: String, required: true }
})

const { locale } = useI18n()
const localePath = useLocalePath()
const { reopen } = useConsent()

const fr = computed(() => locale.value === 'fr')
const doc = computed(() => legalDocs[props.docKey][fr.value ? 'fr' : 'en'])
const hasToc = computed(() => doc.value.sections.length >= 5)
const tocLabel = computed(() => (fr.value ? 'Sur cette page' : 'On this page'))

useSeoMeta({
  title: () => doc.value.title,
  description: () => doc.value.description,
  ogTitle: () => doc.value.title,
  ogDescription: () => doc.value.description
})
</script>

<style scoped lang="scss">
.legal-head { margin-bottom: 40px; }
.legal-updated { margin: 16px 0 0; }

.legal-layout {
  &--toc {
    display: grid;
    grid-template-columns: 280px minmax(0, 760px);
    column-gap: 80px;
    align-items: start;
  }
}

.legal-article {
  max-width: 760px;

  h2 { font-size: 2.8rem; margin-top: 0; scroll-margin-top: 120px; }
  li { list-style: disc; }
}

.legal-section {
  scroll-margin-top: 120px;

  & + & { margin-top: 3.2rem; }
}

.legal-toc {
  position: sticky;
  top: 124px;
  max-height: calc(100vh - 148px);
  overflow-y: auto;

  &__title {
    font-size: 1.4rem;
    color: var(--ink-3);
    margin: 0 0 8px;
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    border-left: 1px solid var(--brand-5);
  }

  a {
    display: flex;
    align-items: center;
    min-height: 44px;
    padding: 4px 0 4px 16px;
    font-size: 1.5rem;
    line-height: 1.35;
    color: var(--ink-2);
    text-decoration: none;

    &:hover { color: var(--link); }
  }
}

.legal-toc-m {
  display: none;
  margin-bottom: 32px;
  border: 1px solid var(--brand-5);
  border-radius: 16px;
  background: #fff;

  summary {
    display: flex;
    align-items: center;
    min-height: 48px;
    padding: 0 16px;
    justify-content: space-between;
    cursor: pointer;
    color: var(--ink);
    list-style: none;

    &::-webkit-details-marker { display: none; }
    &::after {
      content: '';
      width: 8px;
      height: 8px;
      border-right: 2px solid var(--ink-3);
      border-bottom: 2px solid var(--ink-3);
      transform: rotate(45deg);
      transition: transform 0.2s;
    }
  }

  &[open] summary::after { transform: rotate(-135deg); }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0 16px 8px;
  }

  a {
    display: flex;
    align-items: center;
    min-height: 44px;
    color: var(--link);
    text-decoration: none;
    font-size: 1.6rem;
  }
}

.legal-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 24px;
  margin-top: 56px !important;
  padding-top: 24px;
  border-top: 1px solid var(--brand-5);

  a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
  }

  .pg-btn-secondary { margin-top: 8px; }
}

@media (max-width: 1023px) {
  .legal-layout--toc { display: block; }
  .legal-toc { display: none; }
  .legal-toc-m { display: block; }
}

@media (max-width: 767px) {
  .legal-head { margin-bottom: 28px; }
  .legal-article h2 { font-size: 2.4rem; }
}
</style>
