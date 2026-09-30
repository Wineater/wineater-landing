<template>
  <section class="for-whom" :class="{ 'visible': visible }">
    <div class="for-whom__header">
      <h2 class="h2 color-text">{{ $t('ForWhom.title') }}</h2>
      <p class="p1 color-dark-100 for-whom__subtitle">{{ $t('ForWhom.subtitle') }}</p>
    </div>

    <div class="for-whom__cards">
      <article
        class="for-whom__card"
        v-for="card in cards[$i18n.locale] || cards.en"
        :key="card.id"
      >
        <div class="for-whom__segment">
          <svg v-if="card.id === 'restaurant'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3h8l-.6 6.2a3.4 3.4 0 0 1-6.8 0L8 3Z"/><path d="M12 12.6V21"/><path d="M8.5 21h7"/></svg>
          <svg v-else-if="card.id === 'offline'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10v10h16V10"/><path d="M3 4h18l-1.2 5.2a2.6 2.6 0 0 1-5 0 2.6 2.6 0 0 1-5.6 0 2.6 2.6 0 0 1-5 0L3 4Z"/><path d="M10 20v-5h4v5"/></svg>
          <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>
          <span>{{ card.segment }}</span>
        </div>

        <h3 class="for-whom__card-title h3">{{ card.title }}</h3>
        <p class="for-whom__card-pain p1 color-dark-100">{{ card.pain }}</p>

        <div class="for-whom__card-image">
          <img v-if="card.id === 'online'" src="~/assets/imgs/widget_test.png" width="963" height="580" loading="lazy" :alt="card.imageAlt"/>
          <img v-else-if="card.id === 'offline'" src="~/assets/imgs/offline_retailers.jpg" width="875" height="560" loading="lazy" :alt="card.imageAlt"/>
          <img v-else src="~/assets/imgs/bar_lenez.jpg" width="1179" height="544" loading="lazy" :alt="card.imageAlt"/>
        </div>

        <ul class="for-whom__features">
          <li v-for="f in card.features" :key="f">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>
            <span>{{ f }}</span>
          </li>
        </ul>

        <button type="button" class="for-whom__cta" @click="onCta(card.id)">
          {{ $t('cta.primary') }}
        </button>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  props: { visible: Boolean },
  emits: ['getStarted'],
  data() {
    return {
      cards: {
        'en': [
          {
            id: 'restaurant',
            segment: 'Restaurants & Bars',
            title: 'Your sommelier\'s voice at every table.',
            pain: 'Staff are busy, and guests hesitate over the wine list.',
            imageAlt: 'A guest typing a wine question on a phone next to a Wineater QR stand on a restaurant table',
            features: [
              'A QR code at every table, no app download',
              'Wine suggestions by dish, mood, or occasion',
              'Your team can use it too, on a tablet in the room',
              'Wine bars, fine dining, casual bistros',
            ],
          },
          {
            id: 'offline',
            segment: 'Wine Stores',
            title: 'Your whole shelf, explained to every customer.',
            pain: 'Customers feel lost in the aisle and reach for the bottle they already know.',
            imageAlt: 'A Wineater QR sticker on a wine shelf, with the recommendation screen it opens on a phone',
            features: [
              'A QR code by the shelves for instant answers',
              'Recommends from your own catalog, not generic lists',
              'Brings forward wines shoppers would not think to ask for',
              'Answers while your staff are busy',
            ],
          },
          {
            id: 'online',
            segment: 'Online Retailers',
            title: 'Help visitors choose before they leave.',
            pain: 'When there are too many bottles, people give up without buying.',
            imageAlt: 'Wineater widget recommending wines on a shop page',
            features: [
              'Embeddable widget, live on your site in about a day',
              'API option to plug into your existing search',
              'External link option, no development needed',
              'Recommendations from your own stock only',
            ],
          },
        ],
        'fr': [
          {
            id: 'restaurant',
            segment: 'Restaurants & Bars',
            title: 'La voix de votre sommelier à chaque table.',
            pain: 'Le personnel est occupé et les clients hésitent devant la carte des vins.',
            imageAlt: 'Un client saisit une question sur son téléphone près d\'un support QR Wineater sur une table de restaurant',
            features: [
              'Un QR code à chaque table, sans application à télécharger',
              'Des vins suggérés selon le plat, l\'envie ou l\'occasion',
              'Votre équipe peut aussi l\'utiliser, sur une tablette en salle',
              'Bars à vins, gastronomique, bistros décontractés',
            ],
          },
          {
            id: 'offline',
            segment: 'Cavistes',
            title: 'Tout votre rayon, expliqué à chaque client.',
            pain: 'Les clients se sentent perdus devant les rayons et choisissent la bouteille qu\'ils connaissent déjà.',
            imageAlt: 'Un autocollant QR Wineater sur un rayon de vin, avec l\'écran de recommandation qu\'il ouvre sur un téléphone',
            features: [
              'Un QR code près des rayons pour des réponses immédiates',
              'Recommande depuis votre propre catalogue, pas des listes génériques',
              'Met en avant des vins que les clients n\'auraient pas pensé à demander',
              'Répond pendant que votre équipe est occupée',
            ],
          },
          {
            id: 'online',
            segment: 'Boutiques en ligne',
            title: 'Aidez les visiteurs à choisir avant qu\'ils ne partent.',
            pain: 'Devant trop de bouteilles, beaucoup abandonnent sans acheter.',
            imageAlt: 'Widget Wineater recommandant des vins sur une page boutique',
            features: [
              'Widget intégrable, en ligne en 1 jour environ',
              'Option API pour se brancher sur votre moteur de recherche',
              'Option lien externe, aucun développement nécessaire',
              'Recommandations uniquement depuis votre stock',
            ],
          },
        ],
      },
    };
  },
  methods: {
    onCta(id) {
      track('cta_click', { cta_label: this.$t('cta.primary'), location: `for_whom_${id}` });
      this.$emit('getStarted');
    },
  },
};
</script>

<style scoped lang="scss">
.for-whom {
  display: flex;
  flex-direction: column;
  padding: 60px 0 80px;
  gap: 48px;
  animation: fadeUp 0.6s ease both;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}

.for-whom__header {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 560px;
}

.for-whom__subtitle {
  line-height: 1.7;
  font-size: 17px;
}

.for-whom__cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  align-items: stretch;
}

.for-whom__card {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 28px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.07);
  background: #fff;
  border: 1px solid #f0f0f0;
}

.for-whom__segment {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 14px;
  color: #7E27ED;

  svg {
    flex-shrink: 0;
  }
}

.for-whom__card-title {
  font-size: 20px;
  line-height: 1.35;
  color: #222;
  margin: 0;
  text-wrap: balance;
}

.for-whom__card-pain {
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}

.for-whom__card-image {
  height: 160px;
  border-radius: 14px;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.for-whom__features {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
  flex-grow: 1;

  li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-family: 'PoppinsRegular', sans-serif;
    font-size: 14px;
    color: #555;
    line-height: 1.5;
  }

  svg {
    flex-shrink: 0;
    margin-top: 3px;
    color: #0B7978;
  }
}

.for-whom__cta {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: 1.5px solid #7E27ED;
  border-radius: 72px;
  background: transparent;
  color: #7E27ED;
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background: #7E27ED;
    color: #fff;
  }
}

@media only screen and (max-width: 1280px) {
  .for-whom__cards {
    gap: 16px;
  }

  .for-whom__card {
    padding: 22px;
  }
}

@media only screen and (max-width: 1024px) {
  .for-whom__cards {
    grid-template-columns: 1fr;
    max-width: 600px;
  }

  .for-whom__card-image {
    height: 200px;
  }
}

@media only screen and (max-width: 600px) {
  .for-whom {
    padding: 40px 0 60px;
  }

  .for-whom__card {
    border-radius: 20px;
  }

  .for-whom__card-image {
    height: 160px;
  }
}
</style>
