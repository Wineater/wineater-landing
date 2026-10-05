<template>
  <section id="solutions" class="sol-section" aria-labelledby="solutions-title">
    <h2 id="solutions-title" class="sol-h2" v-reveal>{{ $t('home.cards.title') }}</h2>
    <p class="sol-lead" v-reveal>{{ $t('home.cards.lead') }}</p>
    <ul class="scards" v-reveal:stagger>
      <li v-for="c in cards" :key="c.id" class="scards__item">
        <NuxtLink class="scards__link" :to="localePath(c.to)" @click="onClick(c.id)">
          <Photo class="scards__photo" :name="c.photo" :alt="$t(`photos.${c.photo}`)" sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw" />
          <span v-if="c.early" class="sol-badge sol-badge--early scards__badge">{{ $t('solutionPage.earlyAccess') }}</span>
          <span class="scards__body">
            <span class="scards__title">{{ $t(`nav.${c.id}`) }}</span>
            <span class="scards__text">{{ $t(`home.cards.${c.id}`) }}</span>
            <span class="scards__more">{{ $t('home.cards.see') }}
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false"><path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
          </span>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script setup>
import Photo from '~/components/Solutions/Photo.vue'

const localePath = useLocalePath()
const cards = [
  { id: 'restaurants', to: '/solutions/restaurants', photo: 'restaurants-hero' },
  { id: 'onlineStores', to: '/solutions/online-stores', photo: 'online-stores' },
  { id: 'retail', to: '/solutions/retail', photo: 'retail-hero' },
  { id: 'distributors', to: '/solutions/distributors', photo: 'distributors-hero' },
]
const onClick = (id) => track('cta_click', { cta_label: id, location: 'home_solution_card' })
</script>

<style scoped lang="scss">
.scards { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 20px; margin: 0; padding: 0; list-style: none; }

.scards__link {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border: 1px solid var(--brand-5);
  border-radius: 20px;
  background: #fff;
  color: inherit;
  text-decoration: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;

  &:hover { border-color: color-mix(in srgb, var(--brand-1) 45%, #fff); box-shadow: 0 8px 24px rgba(26, 20, 38, 0.08); transform: translateY(-2px); }
  &:focus-visible { outline: 3px solid var(--ink); outline-offset: 3px; }
}

.scards__photo { border-radius: 0; aspect-ratio: 4 / 3; object-fit: cover; }
.scards__link :deep(picture) { display: block; }
.scards__link :deep(.sol-photo) { border-radius: 0; aspect-ratio: 4 / 3 !important; object-fit: cover; }
.scards__badge { position: absolute; top: 12px; left: 12px; }
.scards__body { display: flex; flex: 1; flex-direction: column; gap: 8px; padding: 20px; }
.scards__title { font-family: 'PoppinsMedium', sans-serif; font-size: 2rem; line-height: 1.25; color: var(--ink); }
.scards__text { font-size: 1.5rem; line-height: 1.5; color: var(--ink-2); }
.scards__more { display: inline-flex; align-items: center; gap: 6px; margin-top: auto; padding-top: 8px; font-family: 'PoppinsMedium', sans-serif; font-size: 1.5rem; color: var(--link); }

@media only screen and (max-width: 1023px) { .scards { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media only screen and (max-width: 639px) { .scards { grid-template-columns: 1fr; gap: 16px; } }
@media (prefers-reduced-motion: reduce) { .scards__link { transition: none; } .scards__link:hover { transform: none; } }
</style>
