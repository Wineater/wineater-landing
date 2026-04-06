<template>
  <div class="for-whom" :class="{ 'visible': visible }">
    <div class="for-whom__header">
      <h2 class="h2 color-text">{{ $t('ForWhom.title') }}</h2>
      <p class="p1 color-dark-100 for-whom__subtitle">{{ $t('ForWhom.subtitle') }}</p>
    </div>

    <div class="for-whom__cards">
      <div
        class="for-whom__card"
        v-for="card in cards[$i18n.locale]"
        :key="card.id"
        :class="`for-whom__card--${card.id}`"
      >
        <div class="for-whom__card-top">
          <div class="for-whom__card-tag">{{ card.tag }}</div>
          <div class="for-whom__card-title h3">{{ card.title }}</div>
          <div class="for-whom__card-pain p1 color-dark-100">
            <span class="for-whom__pain-label">{{ $t('ForWhom.problemLabel') }}</span>
            {{ card.pain }}
          </div>
        </div>

        <div class="for-whom__card-image">
          <img v-if="card.id === 'online'" src="~/assets/imgs/widget_test.png" alt="Widget screenshot"/>
          <img v-else-if="card.id === 'offline'" src="~/assets/imgs/offline_retailers.jpg" alt="Offline store"/>
          <img v-else-if="card.id === 'restaurant'" src="~/assets/imgs/QR_test.png" alt="Restaurant QR"/>
        </div>

        <div class="for-whom__card-bottom">
          <div class="for-whom__card-solution-label">{{ $t('ForWhom.solutionLabel') }}</div>
          <ul class="for-whom__features">
            <li v-for="f in card.features" :key="f">
              <span class="for-whom__check">✓</span>
              <span>{{ f }}</span>
            </li>
          </ul>
          <div class="for-whom__card-result">
            <span class="for-whom__result-number">{{ card.resultNumber }}</span>
            <span class="for-whom__result-text">{{ card.resultText }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { visible: Boolean },
  data() {
    return {
      cards: {
        'en': [
          {
            id: 'restaurant',
            tag: '🍽️ Restaurants & Bars',
            title: 'Your sommelier can\'t be at every table. Wineater can.',
            pain: 'Staff can\'t be wine experts for 80 covers at once. Guests feel uncertain, order less, leave tips on the table.',
            features: [
              'QR at every table — no app download needed',
              'Recommendations by dish, mood, or occasion in seconds',
              'POS tool so your team guides with confidence',
              'Works for wine bars, fine dining, casual bistros',
            ],
            resultNumber: '+15%',
            resultText: 'average upsell on wine per table',
          },
          {
            id: 'offline',
            tag: '🏪 Wine Stores',
            title: 'Your shelves hold 500 wines. Your staff can\'t know all of them.',
            pain: 'Customers feel overwhelmed in the wine aisle. They pick the cheapest bottle they recognize — or leave without buying.',
            features: [
              'QR near wine shelves — instant AI guidance on any question',
              'Recommends from YOUR catalog, not generic lists',
              'Promotes lesser-known wines customers would never find alone',
              'Works 24/7, even when staff are busy',
            ],
            resultNumber: '90%',
            resultText: 'of recommendations from lesser-known SKUs',
          },
          {
            id: 'online',
            tag: '🛒 Online Retailers',
            title: 'Visitors drop off when they can\'t choose. Wineater keeps them.',
            pain: 'Wine category has the highest bounce rate in F&B e-commerce. Choice paralysis costs you conversions every day.',
            features: [
              'Embeddable widget — live on your site in 1 day',
              'API integration into your existing search',
              'External link option — zero dev work required',
              'Personalized recommendations from your inventory only',
            ],
            resultNumber: '1 in 3',
            resultText: 'online shoppers engage with Wineater',
          },
        ],
        'fr': [
          {
            id: 'restaurant',
            tag: '🍽️ Restaurants & Bars',
            title: 'Votre sommelier ne peut pas être à chaque table. Wineater le peut.',
            pain: 'Le personnel ne peut pas être expert en vin pour 80 couverts à la fois. Les clients hésitent, commandent moins.',
            features: [
              'QR à chaque table — sans téléchargement d\'application',
              'Recommandations par plat, humeur ou occasion en secondes',
              'Outil POS pour guider votre équipe avec confiance',
              'Pour bars à vins, gastronomique, bistros décontractés',
            ],
            resultNumber: '+15%',
            resultText: 'de ventes additionnelles sur le vin par table',
          },
          {
            id: 'offline',
            tag: '🏪 Cavistes',
            title: 'Vos rayons ont 500 vins. Votre personnel ne peut pas tous les connaître.',
            pain: 'Les clients se sentent dépassés dans le rayon vins. Ils choisissent la bouteille la moins chère ou repartent sans acheter.',
            features: [
              'QR près des rayons vins — conseils IA instantanés',
              'Recommande depuis VOTRE catalogue uniquement',
              'Met en avant les vins méconnus que les clients ne trouveraient jamais seuls',
              'Fonctionne 24h/24, même quand le personnel est occupé',
            ],
            resultNumber: '90%',
            resultText: 'des recommandations proviennent de références méconnues',
          },
          {
            id: 'online',
            tag: '🛒 Boutiques en ligne',
            title: 'Les visiteurs partent quand ils ne savent pas choisir. Wineater les retient.',
            pain: 'La catégorie vins a le taux de rebond le plus élevé du e-commerce alimentaire. La paralysie du choix coûte des conversions chaque jour.',
            features: [
              'Widget intégrable — en ligne en 1 jour',
              'Intégration API dans votre moteur de recherche existant',
              'Option lien externe — aucun travail de développement requis',
              'Recommandations personnalisées depuis votre inventaire uniquement',
            ],
            resultNumber: '1 sur 3',
            resultText: 'acheteurs en ligne interagissent avec Wineater',
          },
        ],
      },
    };
  },
};
</script>

<style scoped lang="scss">
.for-whom {
  display: flex;
  flex-direction: column;
  padding: 60px 0 80px;
  opacity: 0;
  transition: opacity 0.6s ease, transform 0.6s ease;
  transform: translateY(40px);
  gap: 48px;
}

.for-whom.visible {
  opacity: 1;
  transform: translateY(0);
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
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  align-items: start;
}

.for-whom__card {
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.07);
  background: #fff;
  border: 1px solid #f0f0f0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
  }
}

.for-whom__card-top {
  padding: 32px 28px 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.for-whom__card-tag {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: 100px;
  background: #F5F2FF;
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 12px;
  color: #7E27ED;
  width: fit-content;
}

.for-whom__card-title {
  font-size: 18px;
  line-height: 1.4;
  color: #222;
}

.for-whom__card-pain {
  font-size: 13px;
  line-height: 1.6;
  padding: 12px 14px;
  background: #fafafa;
  border-radius: 12px;
  border-left: 3px solid #ffb3b3;
}

.for-whom__pain-label {
  display: block;
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 11px;
  color: #e53e3e;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}

.for-whom__card-image {
  margin: 20px 0;
  height: 160px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.for-whom__card-bottom {
  padding: 0 28px 32px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.for-whom__card-solution-label {
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 11px;
  color: #2FC0BF;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.for-whom__features {
  display: flex;
  flex-direction: column;
  gap: 8px;

  li {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-family: 'PoppinsRegular', sans-serif;
    font-size: 13px;
    color: #555;
    line-height: 1.5;
  }
}

.for-whom__check {
  color: #2FC0BF;
  font-weight: 700;
  flex-shrink: 0;
  font-size: 14px;
}

.for-whom__card-result {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: #F5F2FF;
  border-radius: 12px;
  margin-top: 4px;
}

.for-whom__result-number {
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 22px;
  background: linear-gradient(135deg, #7E27ED, #2FC0BF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  flex-shrink: 0;
}

.for-whom__result-text {
  font-family: 'PoppinsRegular', sans-serif;
  font-size: 12px;
  color: #555;
  line-height: 1.4;
}

@media only screen and (max-width: 1280px) {
  .for-whom__cards {
    gap: 16px;
  }

  .for-whom__card-top {
    padding: 24px 22px 0;
  }

  .for-whom__card-bottom {
    padding: 0 22px 28px;
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
