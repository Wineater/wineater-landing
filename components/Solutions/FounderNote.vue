<template>
  <section v-if="approved || showPlaceholder" class="sol-section" aria-labelledby="founder-title">
    <figure v-if="approved" class="founder" v-reveal>
      <h2 id="founder-title" class="founder__label">{{ $t('founder.title') }}</h2>
      <blockquote class="founder__quote">
        <p>{{ $t('founder.quote') }}</p>
      </blockquote>
      <figcaption class="founder__who">
        <img v-if="founderNote.photo" class="founder__photo" :src="founderNote.photo" :alt="$t('founder.name')" width="64" height="64" loading="lazy">
        <span>
          <span class="founder__name">{{ $t('founder.name') }}</span>
          <span class="founder__role">{{ $t('founder.role') }}</span>
        </span>
      </figcaption>
    </figure>

    <!-- Placeholder: preview only, when the wording is not approved yet -->
    <div v-else class="founder founder--placeholder" v-reveal>
      <p class="founder__tag">{{ $t('founder.placeholderTag') }}</p>
      <h2 id="founder-title" class="sol-h3">{{ $t('founder.title') }}</h2>
      <p class="sol-text">{{ $t('founder.placeholder') }}</p>
    </div>
  </section>
</template>

<script setup>
import { founderNote } from '~/data/founder'

const config = useRuntimeConfig()
const approved = founderNote.approved
const showPlaceholder = computed(() => !approved && config.public.showPlaceholders)
</script>

<style scoped lang="scss">
.founder {
  position: relative;
  display: grid;
  gap: 20px;
  margin: 0;
  padding: 40px 48px;
  border-radius: 24px;
  background: var(--brand-7);

  &--placeholder { border: 2px dashed var(--ink-3); background: transparent; padding: 28px 32px; gap: 8px; }
}

.founder__label { margin: 0; font-family: 'PoppinsMedium', sans-serif; font-size: 1.4rem; letter-spacing: 0.04em; text-transform: uppercase; color: var(--link); }
.founder__quote { margin: 0; padding: 0; }

.founder__quote p {
  margin: 0;
  max-width: 52ch;
  font-family: 'PoppinsMedium', sans-serif;
  font-size: clamp(2.2rem, 2.6vw, 3rem);
  line-height: 1.35;
  letter-spacing: -0.01em;
  color: var(--ink);
  text-wrap: pretty;

  &::before { content: '\201C'; }
  &::after { content: '\201D'; }
}

.founder__who { display: flex; align-items: center; gap: 16px; }
.founder__photo { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; }
.founder__name { display: block; font-family: 'PoppinsMedium', sans-serif; font-size: 1.7rem; color: var(--ink); }
.founder__role { display: block; font-size: 1.5rem; color: var(--ink-2); }
.founder__tag { margin: 0; font-size: 1.3rem; letter-spacing: 0.04em; text-transform: uppercase; color: var(--ink-3); }

@media only screen and (max-width: 767px) {
  .founder { padding: 28px 20px; border-radius: 20px; }
}
</style>
