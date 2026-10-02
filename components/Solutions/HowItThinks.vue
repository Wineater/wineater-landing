<template>
  <section id="how-it-thinks" class="sol-section think" aria-labelledby="think-title">
    <h2 id="think-title" class="sol-h2" v-reveal>{{ $t('howItThinks.title') }}</h2>
    <p class="sol-lead" v-reveal>{{ $t('howItThinks.lead') }}</p>
    <ul class="think__axes" v-reveal:stagger>
      <li v-for="axis in axes" :key="axis.id" class="think__axis">
        <span class="think__icon" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" v-html="axis.svg"></svg>
        </span>
        <span class="think__name">{{ $t(`howItThinks.axes.${axis.id}.name`) }}</span>
        <span class="think__desc">{{ $t(`howItThinks.axes.${axis.id}.desc`) }}</span>
      </li>
    </ul>
    <p class="think__buyers" v-reveal>{{ $t('howItThinks.buyers') }}</p>
    <ul class="think__facts" v-reveal>
      <li v-for="n in 3" :key="n">{{ $t(`howItThinks.fact${n}`) }}</li>
    </ul>
  </section>
</template>

<script setup>
// Static, trusted SVG path data (no user input).
const axes = [
  { id: 'food', svg: '<path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 2-3 5-3 8h3v10"/>' },
  { id: 'taste', svg: '<path d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z"/>' },
  { id: 'origin', svg: '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>' },
  { id: 'occasion', svg: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/>' },
  { id: 'making', svg: '<path d="M12 21V11M12 11c0-4 3-6 7-6 0 4-3 6-7 6zM12 15c0-3-2-5-6-5 0 3 2 5 6 5z"/>' },
]
</script>

<style scoped lang="scss">
.think__axes {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.think__axis {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px 20px;
  border-radius: 16px;
  background: var(--brand-7);
}

.think__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #fff;
  color: var(--brand-1);
}

.think__name { font-family: 'PoppinsMedium', sans-serif; font-size: 1.8rem; color: var(--ink); }
.think__desc { font-size: 1.5rem; line-height: 1.5; color: var(--ink-2); }

.think__buyers { margin: 32px 0 0; max-width: 70ch; font-size: 1.9rem; line-height: 1.5; color: var(--ink); font-family: 'PoppinsMedium', sans-serif; }

.think__facts {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  margin: 20px 0 0;
  padding: 0;
  list-style: none;

  li { padding: 8px 14px; border: 1px solid var(--brand-5); border-radius: 20px; font-size: 1.5rem; color: var(--ink-2); }
}

@media only screen and (max-width: 1023px) {
  .think__axes { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media only screen and (max-width: 479px) {
  .think__axes { grid-template-columns: 1fr; }
  .think__axis { flex-direction: row; flex-wrap: wrap; align-items: center; gap: 4px 12px; padding: 16px; }
  .think__desc { flex-basis: 100%; }
  .think__buyers { font-size: 1.7rem; }
}
</style>
