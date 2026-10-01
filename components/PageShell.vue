<template>
  <div class="pg">
    <Header :show-links="showLinks"/>
    <main :id="mainId" class="pg-main">
      <div class="pg-container">
        <slot/>
      </div>
    </main>
    <Footer/>
  </div>
</template>

<script setup>
import Header from '~/components/LandingComponents/Header.vue'
import Footer from '~/components/LandingComponents/Footer.vue'

defineProps({
  showLinks: { type: Boolean, default: true },
  mainId: { type: String, default: 'main' }
})
</script>

<style lang="scss">
/* Shared shell for reading pages (faq, blog, legal, error). Unscoped on purpose: slot content uses the .pg-* helpers. */
.pg {
  min-height: 100vh;
  background: #fff;
  color: var(--ink-2);
}

.pg-main {
  padding: 140px var(--gutter) var(--section-y);
}

.pg-container {
  max-width: var(--container);
  margin: 0 auto;
}

.pg-head {
  max-width: 760px;

  h1 {
    font-size: 4rem;
    line-height: 1.12;
    letter-spacing: -0.015em;
    color: var(--ink);
    margin: 0;
  }

  .prose-lead {
    margin-top: 16px;
    line-height: 1.5;
    max-width: 60ch;
  }
}

.pg-meta {
  font-size: 1.4rem;
  line-height: 1.5;
  color: var(--ink-3);
}

.pg-btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 28px;
  border: 1.5px solid var(--link);
  border-radius: 72px;
  background: transparent;
  color: var(--link);
  font: inherit;
  font-family: 'PoppinsMedium', 'Poppins Fallback', system-ui, sans-serif;
  font-size: 1.6rem;
  line-height: 1.2;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s;

  &:hover { background: var(--brand-7); }
}

.pg-link {
  color: var(--link);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.2em;

  &:hover { text-decoration-thickness: 2px; }
}

.pg-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 16px;
}

@media (max-width: 767px) {
  .pg-main { padding-top: 112px; }
  .pg-head h1 { font-size: 3.2rem; }
}
</style>
