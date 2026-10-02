<template>
  <section :id="id" class="sol-section" :aria-labelledby="`${id}-title`">
    <div v-if="badge" class="fc__badge"><span class="sol-badge sol-badge--early">{{ $t(badge) }}</span></div>
    <h2 :id="`${id}-title`" class="sol-h2" v-reveal>{{ $t(`${base}.title`) }}</h2>
    <p v-if="lead" class="sol-lead" v-reveal>{{ $t(`${base}.lead`) }}</p>
    <ul class="sol-grid" :style="{ '--cols': cols }" v-reveal:stagger>
      <li v-for="n in count" :key="n" class="sol-card" :class="{ 'sol-card--tint': tint }">
        <h3 class="sol-h3">{{ $t(`${base}.items.i${n}.title`) }}</h3>
        <p class="sol-text">{{ $t(`${base}.items.i${n}.text`) }}</p>
      </li>
    </ul>
    <p v-if="note" class="sol-note">{{ $t(`${base}.note`) }}</p>
  </section>
</template>

<script setup>
defineProps({
  id: { type: String, required: true },
  base: { type: String, required: true },
  count: { type: Number, default: 3 },
  cols: { type: Number, default: 3 },
  lead: { type: Boolean, default: true },
  note: { type: Boolean, default: false },
  tint: { type: Boolean, default: false },
  badge: { type: String, default: '' },
})
</script>

<style scoped lang="scss">
.fc__badge { margin-bottom: 12px; }
</style>
