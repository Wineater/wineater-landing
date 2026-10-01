<template>
  <div class="for-whom-wrap">
    <span id="problem" class="for-whom__anchor" aria-hidden="true"></span>
    <section class="for-whom" :class="{ 'visible': visible }" aria-labelledby="forwho-title">
      <div class="for-whom__header">
        <h2 id="forwho-title" class="for-whom__title">{{ $t('ForWhom.title') }}</h2>
        <p class="for-whom__subtitle">{{ $t('ForWhom.subtitle') }}</p>
      </div>

      <div class="for-whom__cards">
        <article
          class="for-whom__card"
          v-for="card in cards[$i18n.locale] || cards.en"
          :key="card.id"
        >
          <div class="for-whom__card-image">
            <img v-if="card.id === 'online'" src="~/assets/imgs/widget_test.png" width="963" height="580" loading="lazy" :alt="card.imageAlt"/>
            <img v-else-if="card.id === 'offline'" src="~/assets/imgs/offline_retailers.jpg" width="875" height="560" loading="lazy" :alt="card.imageAlt"/>
            <img v-else src="~/assets/imgs/bar_lenez.jpg" width="1179" height="544" loading="lazy" :alt="card.imageAlt"/>
          </div>

          <div class="for-whom__card-body">
            <h3 class="for-whom__card-title">{{ card.segment }}</h3>
            <p class="for-whom__card-pain">{{ card.pain }}</p>

            <ul class="for-whom__features">
              <li v-for="f in card.features" :key="f">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>
                <span>{{ f }}</span>
              </li>
            </ul>

            <Button
              v-if="card.id === 'online'"
              bgColor="outline"
              class="for-whom__cta"
              :href="demoUrl"
              target="_blank"
              @btnClick="onDemo(card.id)"
            >
              {{ $t('cta.demo') }}
              <span class="for-whom__sr">({{ $t('Header.opensNewTab') }})</span>
            </Button>
            <Button v-else bgColor="black" class="for-whom__cta" @btnClick="onCta(card.id)">{{ $t('cta.primary') }}</Button>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
import Button from '~/components/Buttons/Button.vue';

export default {
  components: { Button },
  props: { visible: Boolean },
  emits: ['getStarted'],
  data() {
    return {
      demoUrl: 'https://share-eu1.hsforms.com/1kziM_bz_TDqsB5emVJbReA2ehswf',
      cards: {
        'en': [
          {
            id: 'restaurant',
            segment: 'Restaurants & Bars',
            pain: 'Staff are busy, and guests hesitate over the wine list.',
            imageAlt: 'A guest typing a wine question on a phone next to a Wineater QR stand on a restaurant table',
            features: [
              'A QR code at every table, no app download',
              'Wine suggestions by dish, mood, or occasion',
              'Your team can use it too, on a tablet in the room',
            ],
          },
          {
            id: 'offline',
            segment: 'Wine Stores',
            pain: 'Customers feel lost in the aisle and reach for the bottle they already know.',
            imageAlt: 'A Wineater QR sticker on a wine shelf, with the recommendation screen it opens on a phone',
            features: [
              'A QR code by the shelves for instant answers',
              'Shoppers ask in their own words, right at the shelf',
              'Brings forward wines shoppers would not think to ask for',
            ],
          },
          {
            id: 'online',
            segment: 'Online Retailers',
            pain: 'When there are too many bottles, people give up without buying.',
            imageAlt: 'Wineater widget recommending wines on a shop page',
            features: [
              'Embeddable widget that matches your store\'s look',
              'API option to plug into your existing search',
              'External link option, no development needed',
            ],
          },
        ],
        'fr': [
          {
            id: 'restaurant',
            segment: 'Restaurants & Bars',
            pain: 'Le personnel est occupé et les clients hésitent devant la carte des vins.',
            imageAlt: 'Un client saisit une question sur son téléphone près d\'un support QR Wineater sur une table de restaurant',
            features: [
              'Un QR code à chaque table, sans application à télécharger',
              'Des vins suggérés selon le plat, l\'envie ou l\'occasion',
              'Votre équipe peut aussi l\'utiliser, sur une tablette en salle',
            ],
          },
          {
            id: 'offline',
            segment: 'Cavistes',
            pain: 'Les clients se sentent perdus devant les rayons et choisissent la bouteille qu\'ils connaissent déjà.',
            imageAlt: 'Un autocollant QR Wineater sur un rayon de vin, avec l\'écran de recommandation qu\'il ouvre sur un téléphone',
            features: [
              'Un QR code près des rayons pour des réponses immédiates',
              'Les clients demandent avec leurs mots, devant le rayon',
              'Met en avant des vins que les clients n\'auraient pas pensé à demander',
            ],
          },
          {
            id: 'online',
            segment: 'Boutiques en ligne',
            pain: 'Devant trop de bouteilles, beaucoup abandonnent sans acheter.',
            imageAlt: 'Widget Wineater recommandant des vins sur une page boutique',
            features: [
              'Widget intégrable aux couleurs de votre boutique',
              'Option API pour se brancher sur votre moteur de recherche',
              'Option lien externe, aucun développement nécessaire',
            ],
          },
        ],
      },
    };
  },
  methods: {
    onDemo(id) {
      track('cta_click', { cta_label: this.$t('cta.demo'), location: `for_whom_${id}` });
      track('outbound_link_click', { link_url: this.demoUrl });
    },
    onCta(id) {
      track('cta_click', { cta_label: this.$t('cta.primary'), location: `for_whom_${id}` });
      this.$emit('getStarted');
    },
  },
};
</script>

<style scoped lang="scss">
.for-whom__anchor { display: block; height: 0; }

.for-whom__sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.for-whom {
  max-width: var(--container);
  margin: 0 auto;
  padding: var(--section-y) 0;
  display: flex;
  flex-direction: column;
  gap: 40px;
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

.for-whom__cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  align-items: stretch;
}

.for-whom__card {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  border: 1px solid var(--brand-5);
}

.for-whom__card-image {
  height: 180px;
  background: var(--brand-7);

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.for-whom__card-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-grow: 1;
  padding: 24px;
}

.for-whom__card-title {
  margin: 0;
  font-size: 2.2rem;
  line-height: 1.25;
  color: var(--ink);
}

.for-whom__card-pain {
  margin: 0;
  font-size: 1.6rem;
  line-height: 1.5;
  color: var(--ink-2);
}

.for-whom__features {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 4px 0 12px;
  padding: 0;
  list-style: none;
  flex-grow: 1;

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

.for-whom__cta {
  align-self: flex-start;
}

@media only screen and (max-width: 1023px) {
  .for-whom__cards {
    grid-template-columns: 1fr;
    max-width: 640px;
  }
}

@media only screen and (max-width: 767px) {
  .for-whom { gap: 28px; }
  .for-whom__card-image { height: 170px; }
  .for-whom__card-body { padding: 20px; }
  .for-whom__cta { align-self: stretch; }
}
</style>
