<template>
  <div class="for-whom-wrap">
    <span id="problem" class="for-whom__anchor" aria-hidden="true"></span>
    <section class="for-whom" :class="{ 'visible': visible }" aria-labelledby="forwho-title">
      <div class="for-whom__header" v-reveal>
        <h2 id="forwho-title" class="for-whom__title">{{ $t('ForWhom.title') }}</h2>
        <p class="for-whom__subtitle">{{ $t('ForWhom.subtitle') }}</p>
      </div>

      <div class="for-whom__panel" v-reveal>
        <article
          v-for="col in columns"
          :key="col.id"
          class="for-whom__col"
          :class="{ 'is-active': audience === col.id }"
        >
          <h3 class="for-whom__col-head">
            <button
              type="button"
              class="for-whom__switch"
              :aria-pressed="audience === col.id"
              @click="select(col.id)"
              @focus="select(col.id)"
            >{{ col.segment }}</button>
          </h3>

          <div class="for-whom__images" :class="{ 'for-whom__images--pair': col.images.length > 1 }">
            <img
              v-for="img in col.images"
              :key="img.src"
              :src="img.src"
              :width="img.width"
              :height="img.height"
              loading="lazy"
              :alt="img.alt"
            />
          </div>

          <p class="for-whom__pain">{{ col.pain }}</p>

          <ul class="for-whom__features">
            <li v-for="f in col.features" :key="f">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>
              <span>{{ f }}</span>
            </li>
          </ul>
        </article>
      </div>

      <div class="for-whom__action" v-reveal>
        <Button bgColor="black" class="for-whom__cta" @btnClick="onCta">{{ $t('cta.primary') }}</Button>
      </div>
    </section>
  </div>
</template>

<script setup>
import Button from '~/components/Buttons/Button.vue';
import widgetImg from '~/assets/imgs/widget_test.png';
import shelfImg from '~/assets/imgs/offline_retailers.jpg';
import barImg from '~/assets/imgs/bar_lenez.jpg';
import { DEFAULT_AUDIENCE } from '~/data/demo';

defineProps({ visible: Boolean });
const emit = defineEmits(['getStarted']);
const { t, locale } = useI18n();

// Same state as the hero tabs and the demo chips.
const audience = useState('audience', () => DEFAULT_AUDIENCE);

const select = (id) => {
  if (audience.value !== id) audience.value = id;
};

const copy = {
  en: {
    retail: {
      segment: 'Wine shops and online retailers',
      pain: 'Shoppers feel lost in the aisle or among too many bottles. They reach for the label they know, or give up without buying.',
      features: [
        'Embeddable widget that matches your store\'s look',
        'API option to plug into your existing search',
        'A QR code by the shelves for instant answers',
        'Shoppers ask in their own words and see wines they would not think to ask for',
      ],
      alts: [
        'Wineater widget recommending wines on a shop page',
        'A Wineater QR sticker on a wine shelf, with the recommendation screen it opens on a phone',
      ],
    },
    restaurants: {
      segment: 'Restaurants and bars',
      pain: 'Staff are busy, and guests hesitate over the wine list. Your sommelier\'s voice at every table.',
      features: [
        'A QR code at every table, no app download',
        'Wine suggestions by dish, mood, or occasion',
        'Your team can use it too, on a tablet in the room',
        'Backs up your team when the room is full, never replaces it',
      ],
      alts: ['A guest typing a wine question on a phone next to a Wineater QR stand on a restaurant table'],
    },
  },
  fr: {
    retail: {
      segment: 'Cavistes et boutiques en ligne',
      pain: 'Les clients se sentent perdus devant les rayons ou face à trop de bouteilles. Ils choisissent l\'étiquette qu\'ils connaissent, ou repartent sans acheter.',
      features: [
        'Widget intégrable aux couleurs de votre boutique',
        'Option API pour se brancher sur votre moteur de recherche',
        'Un QR code près des rayons pour des réponses immédiates',
        'Les clients demandent avec leurs mots et découvrent des vins auxquels ils n\'auraient pas pensé',
      ],
      alts: [
        'Widget Wineater recommandant des vins sur une page boutique',
        'Un autocollant QR Wineater sur un rayon de vin, avec l\'écran de recommandation qu\'il ouvre sur un téléphone',
      ],
    },
    restaurants: {
      segment: 'Restaurants et bars',
      pain: 'Le personnel est occupé et les clients hésitent devant la carte des vins. La voix de votre sommelier à chaque table.',
      features: [
        'Un QR code à chaque table, sans application à télécharger',
        'Des vins suggérés selon le plat, l\'envie ou l\'occasion',
        'Votre équipe peut aussi l\'utiliser, sur une tablette en salle',
        'Épaule votre équipe quand la salle est pleine, sans la remplacer',
      ],
      alts: ['Un client saisit une question sur son téléphone près d\'un support QR Wineater sur une table de restaurant'],
    },
  },
};

const columns = computed(() => {
  const c = copy[locale.value === 'fr' ? 'fr' : 'en'];
  return [
    {
      id: 'retail',
      ...c.retail,
      images: [
        { src: widgetImg, width: 963, height: 580, alt: c.retail.alts[0] },
        { src: shelfImg, width: 875, height: 560, alt: c.retail.alts[1] },
      ],
    },
    {
      id: 'restaurants',
      ...c.restaurants,
      images: [{ src: barImg, width: 1179, height: 544, alt: c.restaurants.alts[0] }],
    },
  ];
});

function onCta() {
  track('cta_click', { cta_label: t('cta.primary'), location: 'for_whom' });
  emit('getStarted', 'for_whom');
}
</script>

<style scoped lang="scss">
.for-whom__anchor { display: block; height: 0; }

.for-whom {
  max-width: var(--container);
  margin: 0 auto;
  padding: var(--section-y) 0 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.for-whom__header {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 760px;
}

.for-whom__title {
  margin: 0;
  font-size: clamp(2.8rem, 3.6vw, 4rem);
  line-height: 1.15;
  color: var(--ink);
}

.for-whom__subtitle {
  margin: 0;
  font-size: 1.7rem;
  line-height: 1.55;
  color: var(--ink-2);
  max-width: 62ch;
}

.for-whom__panel {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  align-items: stretch;
}

// Both columns always carry a 2px border, so emphasis changes colour and tint only: no layout shift.
.for-whom__col {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border-radius: 16px;
  border: 2px solid var(--brand-5);
  background: #fff;
  transition: border-color 0.25s ease, background-color 0.25s ease;

  &.is-active {
    border-color: var(--brand-1);
    background: var(--brand-7);
  }
}

.for-whom__col-head { margin: 0; }

.for-whom__switch {
  display: block;
  width: 100%;
  min-height: 44px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--ink);
  font: inherit;
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 2.2rem;
  line-height: 1.25;
  text-align: left;
  cursor: pointer;
  border-radius: 8px;

  &:focus-visible { outline: 3px solid var(--brand-1); outline-offset: 4px; }
}

.for-whom__images {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
  gap: 12px;
  height: 180px;
  overflow: hidden;

  &--pair { grid-template-columns: repeat(2, minmax(0, 1fr)); }

  img {
    display: block;
    width: 100%;
    height: 100%;
    min-width: 0;
    object-fit: cover;
    border-radius: 12px;
    background: var(--brand-7);
  }
}

.for-whom__pain {
  margin: 0;
  font-size: 1.6rem;
  line-height: 1.5;
  color: var(--ink-2);
}

.for-whom__features {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 1.5rem;
    color: var(--ink-2);
    line-height: 1.45;
  }

  svg {
    flex-shrink: 0;
    margin-top: 4px;
    color: var(--brand-2-text);
  }
}

.for-whom__action { display: flex; }

@media only screen and (max-width: 767px) {
  .for-whom { gap: 24px; }
  .for-whom__panel { grid-template-columns: 1fr; gap: 16px; }
  .for-whom__col { padding: 20px 16px; gap: 12px; }
  .for-whom__images { height: 110px; }
  .for-whom__images--pair { grid-template-columns: minmax(0, 1fr); }
  .for-whom__images--pair img:nth-child(2) { display: none; }
  .for-whom__action :deep(.button) { width: 100%; }
}

@media (prefers-reduced-motion: reduce) {
  .for-whom__col { transition: none; }
}
</style>
