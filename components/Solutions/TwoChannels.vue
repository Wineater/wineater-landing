<template>
  <section id="two-channels" class="sol-section" aria-labelledby="channels-title">
    <h2 id="channels-title" class="sol-h2" v-reveal>{{ $t('solutions.restaurants.channels.title') }}</h2>
    <p class="sol-lead" v-reveal>{{ $t('solutions.restaurants.channels.lead') }}</p>
    <div class="chan" v-reveal:stagger>
      <article v-for="c in channels" :key="c" class="sol-card chan__card" :class="{ 'sol-card--tint': c === 'staff' }">
        <p class="chan__who">{{ $t(`solutions.restaurants.channels.${c}.who`) }}</p>
        <h3 class="sol-h3">{{ $t(`solutions.restaurants.channels.${c}.title`) }}</h3>
        <p class="sol-text">{{ $t(`solutions.restaurants.channels.${c}.text`) }}</p>
        <ul class="chan__list">
          <li v-for="n in 3" :key="n">{{ $t(`solutions.restaurants.channels.${c}.point${n}`) }}</li>
        </ul>
      </article>
    </div>
    <blockquote class="chan__query" v-reveal>
      <p class="chan__q"><q>{{ $t('solutions.restaurants.channels.query') }}</q></p>
      <p class="sol-note">{{ $t('solutions.restaurants.channels.queryNote') }}</p>
    </blockquote>
  </section>
</template>

<script setup>
const channels = ['staff', 'guest']
</script>

<style scoped lang="scss">
.chan { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
.chan__card { gap: 12px; }
.chan__who { margin: 0; font-size: 1.3rem; letter-spacing: 0.04em; text-transform: uppercase; color: var(--link); font-family: 'PoppinsMedium', sans-serif; }

.chan__list {
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 1.6rem;
  line-height: 1.45;
  color: var(--ink);

  li { position: relative; padding-left: 24px; }
  li::before { content: ''; position: absolute; left: 4px; top: 0.55em; width: 8px; height: 8px; border-radius: 50%; background: var(--brand-1); }
}

.chan__query { margin: 24px 0 0; padding: 0; }
.chan__q { margin: 0; font-size: 2.2rem; line-height: 1.35; color: var(--ink); q { quotes: "\201C" "\201D"; } }

@media only screen and (max-width: 767px) { .chan { grid-template-columns: 1fr; gap: 16px; } .chan__q { font-size: 1.9rem; } }
</style>
