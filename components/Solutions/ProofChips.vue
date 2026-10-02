<template>
  <section class="sol-section proofchips" aria-labelledby="proofchips-title">
    <h2 id="proofchips-title" class="sol-h2" v-reveal>{{ $t('proofChips.title') }}</h2>
    <ul class="proofchips__list" v-reveal:stagger>
      <li v-for="c in chips" :key="c.key" class="proofchips__chip">
        <span class="proofchips__value">{{ c.value }}</span>
        <span class="proofchips__label">{{ $t(`proofChips.${c.key}`) }}</span>
      </li>
    </ul>
    <p class="sol-note">{{ caveat }}</p>
  </section>
</template>

<script setup>
import { pilotProof } from '~/data/proof'

const { locale } = useI18n()
const lang = computed(() => (locale.value === 'fr' ? 'fr' : 'en'))
const chips = computed(() => [
  { key: 'buy', value: pilotProof.buyClick[lang.value] },
  { key: 'requests', value: pilotProof.requestsPerShopper[lang.value] },
  { key: 'search', value: pilotProof.search[lang.value] },
])
const caveat = computed(() => pilotProof.caveat[lang.value])
</script>

<style scoped lang="scss">
.proofchips__list { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin: 0; padding: 0; list-style: none; }
.proofchips__chip { display: flex; flex-direction: column; gap: 4px; padding: 24px; border-radius: 16px; background: var(--brand-7); }
.proofchips__value { font-family: 'PoppinsMedium', sans-serif; font-size: 4.4rem; line-height: 1.05; color: var(--brand-1); }
.proofchips__label { font-size: 1.6rem; line-height: 1.4; color: var(--ink); }

@media only screen and (max-width: 767px) {
  .proofchips__list { grid-template-columns: 1fr; gap: 12px; }
  .proofchips__chip { flex-direction: row; align-items: baseline; gap: 16px; padding: 16px 20px; }
  .proofchips__value { font-size: 3.2rem; min-width: 5.5ch; }
}
</style>
