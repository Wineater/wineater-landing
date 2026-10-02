<template>
  <section :id="`${segment}-faq`" class="sol-section sfaq" :aria-labelledby="`${segment}-faq-title`">
    <h2 :id="`${segment}-faq-title`" class="sol-h2" v-reveal>{{ $t('solutionPage.faqTitle') }}</h2>
    <div class="sfaq__list" v-reveal:stagger>
      <details v-for="item in items" :key="item.id" class="sfaq__item">
        <summary class="sfaq__q">
          <span>{{ item.q }}</span>
          <svg class="sfaq__chev" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
            <path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </summary>
        <div class="sfaq__a"><p>{{ item.a }}</p></div>
      </details>
    </div>
    <p class="sol-note"><NuxtLink class="sol-link" :to="localePath('/faq')">{{ $t('faq.teaserAll') }}</NuxtLink></p>
  </section>
</template>

<script setup>
const props = defineProps({ segment: { type: String, required: true } })
const localePath = useLocalePath()
const items = useSegmentFaq(props.segment)

useSchemaOrg([
  {
    '@type': 'FAQPage',
    mainEntity: items.value.map(i => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
  },
])
</script>

<style scoped lang="scss">
.sfaq__list { display: grid; max-width: 860px; }
.sfaq__item { border-bottom: 1px solid var(--brand-5); &:first-child { border-top: 1px solid var(--brand-5); } }

.sfaq__q {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 64px;
  padding: 12px 0;
  font-size: 1.8rem;
  line-height: 1.35;
  color: var(--ink);
  cursor: pointer;
  list-style: none;

  &::-webkit-details-marker { display: none; }
  &:focus-visible { outline: 3px solid var(--ink); outline-offset: 2px; border-radius: 6px; }
}

.sfaq__chev { flex: none; transition: transform 0.2s ease; }
.sfaq__item[open] .sfaq__chev { transform: rotate(180deg); }
.sfaq__a { padding: 0 0 20px; max-width: 70ch; font-size: 1.7rem; line-height: 1.6; color: var(--ink-2); p { margin: 0; } }

@media (prefers-reduced-motion: reduce) { .sfaq__chev { transition: none; } }
</style>
