<template>
  <template v-for="(part, i) in parts" :key="i">
    <mark v-if="part.placeholder" class="legal-placeholder">{{ part.text }}</mark>
    <template v-else>{{ part.text }}</template>
  </template>
</template>

<script setup>
import { splitPlaceholders } from '~/data/legal'

const props = defineProps({
  text: { type: String, required: true }
})

const parts = computed(() => splitPlaceholders(props.text))
</script>

<style lang="scss">
.legal-placeholder {
  background: var(--brand-7);
  color: var(--ink-2);
  padding: 0 4px;
  border-radius: 4px;
  border-bottom: 1px dashed var(--ink-3);
}
</style>
