<template>
  <section :id="id" class="sol-section steps" :aria-labelledby="`${id}-title`">
    <h2 :id="`${id}-title`" class="sol-h2" v-reveal>{{ $t(`${base}.title`) }}</h2>
    <p v-if="lead" class="sol-lead" v-reveal>{{ $t(`${base}.lead`) }}</p>
    <ol class="steps__list" :style="{ '--n': count }" v-reveal:stagger>
      <li v-for="n in count" :key="n" class="steps__item">
        <span class="steps__num" aria-hidden="true">{{ n }}</span>
        <h3 class="sol-h3">{{ $t(`${base}.steps.s${n}.title`) }}</h3>
        <p class="sol-text">{{ $t(`${base}.steps.s${n}.text`) }}</p>
      </li>
    </ol>
    <p v-if="note" class="sol-note">{{ $t(`${base}.note`) }}</p>
  </section>
</template>

<script setup>
defineProps({
  id: { type: String, default: 'how-it-works' },
  base: { type: String, required: true },
  count: { type: Number, default: 3 },
  lead: { type: Boolean, default: true },
  note: { type: Boolean, default: false },
})
</script>

<style scoped lang="scss">
.steps__list {
  display: grid;
  grid-template-columns: repeat(var(--n), minmax(0, 1fr));
  gap: 32px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.steps__item { display: flex; flex-direction: column; gap: 8px; padding-top: 20px; border-top: 1px solid var(--brand-5); }

.steps__num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
  border-radius: 50%;
  background: var(--brand-7);
  color: var(--link);
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 1.6rem;
}

@media only screen and (max-width: 1023px) {
  .steps__list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media only screen and (max-width: 767px) {
  .steps__list { grid-template-columns: 1fr; gap: 16px; }
  .steps__item { padding-top: 16px; }
  .steps__num { margin-bottom: 0; }
}
</style>
