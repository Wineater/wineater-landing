<template>
  <div class="legal-page">
    <Header :show-links="false"/>

    <main class="legal-main">
      <article class="legal-article">
        <h1>{{ doc.h1 }}</h1>
        <p class="legal-updated">
          {{ locale === 'fr' ? 'Dernière mise à jour :' : 'Last updated:' }}
          <template v-for="(part, i) in parts(doc.updated)" :key="i">
            <mark v-if="part.placeholder" class="legal-placeholder">{{ part.text }}</mark>
            <template v-else>{{ part.text }}</template>
          </template>
        </p>

        <p v-for="(text, i) in doc.intro" :key="`intro-${i}`">
          <template v-for="(part, j) in parts(text)" :key="j">
            <mark v-if="part.placeholder" class="legal-placeholder">{{ part.text }}</mark>
            <template v-else>{{ part.text }}</template>
          </template>
        </p>

        <section v-for="(section, s) in doc.sections" :key="s">
          <h2>{{ section.title }}</h2>
          <p v-for="(text, i) in section.paragraphs" :key="`p-${i}`">
            <template v-for="(part, j) in parts(text)" :key="j">
              <mark v-if="part.placeholder" class="legal-placeholder">{{ part.text }}</mark>
              <template v-else>{{ part.text }}</template>
            </template>
          </p>
          <ul v-if="section.list">
            <li v-for="(text, i) in section.list" :key="`l-${i}`">
              <template v-for="(part, j) in parts(text)" :key="j">
                <mark v-if="part.placeholder" class="legal-placeholder">{{ part.text }}</mark>
                <template v-else>{{ part.text }}</template>
              </template>
            </li>
          </ul>
        </section>

        <nav class="legal-nav" :aria-label="locale === 'fr' ? 'Pages légales' : 'Legal pages'">
          <NuxtLink :to="localePath('/legal')">{{ locale === 'fr' ? 'Mentions légales' : 'Legal notice' }}</NuxtLink>
          <NuxtLink :to="localePath('/privacy')">{{ locale === 'fr' ? 'Politique de confidentialité' : 'Privacy policy' }}</NuxtLink>
          <NuxtLink :to="localePath('/terms')">{{ locale === 'fr' ? "Conditions d'utilisation" : 'Terms of use' }}</NuxtLink>
          <button type="button" class="legal-nav__btn" @click="reopen">{{ locale === 'fr' ? 'Paramètres des cookies' : 'Cookie settings' }}</button>
        </nav>
      </article>
    </main>

    <Footer/>
  </div>
</template>

<script setup>
import Header from '~/components/LandingComponents/Header.vue'
import Footer from '~/components/LandingComponents/Footer.vue'
import { legalDocs, splitPlaceholders } from '~/data/legal'

const props = defineProps({
  docKey: { type: String, required: true }
})

const { locale } = useI18n()
const localePath = useLocalePath()
const { reopen } = useConsent()

const doc = computed(() => legalDocs[props.docKey][locale.value === 'fr' ? 'fr' : 'en'])
const parts = splitPlaceholders

useSeoMeta({
  title: () => doc.value.title,
  description: () => doc.value.description,
  ogTitle: () => doc.value.title,
  ogDescription: () => doc.value.description
})
</script>

<style scoped lang="scss">
.legal-page {
  min-height: 100vh;
  background: #fff;
  color: var(--text);
}

.legal-main {
  padding: 140px 24px 80px;
}

.legal-article {
  max-width: 820px;
  margin: 0 auto;
  font-size: 16px;
  line-height: 1.65;

  h1 {
    font-size: 2.25rem;
    line-height: 1.2;
    margin: 0 0 12px;
  }

  h2 {
    font-size: 1.35rem;
    margin: 36px 0 12px;
  }

  p,
  ul {
    margin: 0 0 14px;
  }

  ul {
    padding-left: 22px;
  }

  li {
    margin-bottom: 10px;
  }
}

.legal-updated {
  color: var(--dark-100);
  margin-bottom: 24px;
}

.legal-placeholder {
  background: #fff3bf;
  color: #7a4b00;
  padding: 0 4px;
  border-radius: 4px;
}

.legal-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid var(--brand-5);

  a,
  .legal-nav__btn {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    color: var(--brand-1);
    text-decoration: underline;
    font: inherit;
    background: none;
    border: 0;
    padding: 0;
    cursor: pointer;
  }
}

@media (max-width: 768px) {
  .legal-main {
    padding: 110px 16px 48px;
  }

  .legal-article h1 {
    font-size: 1.75rem;
  }
}
</style>
