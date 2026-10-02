<template>
  <!-- Renders only when a case exists. Cases need the customer's written permission to be named. -->
  <section v-if="item" class="sol-section" :aria-labelledby="`${segment}-case-title`">
    <h2 :id="`${segment}-case-title`" class="sol-h2">{{ item.title }}</h2>
    <p class="sol-lead">{{ item.text }}</p>
  </section>
</template>

<script setup>
defineProps({
  segment: { type: String, required: true },
  item: { type: Object, default: null }, // { title, text } once a customer has approved it
})
</script>
