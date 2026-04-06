<template>
  <div class="for-whom" :class="{ 'visible': visible }">
    <h2 class="h2 color-brand-6 for-whom__title">
      {{ $t('ForWhom.title') }}
    </h2>
    <div class="for-whom__cards">
      <div class="for-whom__card" v-for="card in cards[$i18n.locale]" :key="card.id">
        <div class="for-whom__card-tag">{{ card.tag }}</div>
        <div class="for-whom__card-title h3">{{ card.title }}</div>
        <div class="for-whom__card-image">
          <img v-if="card.id === 'online'" src="~/assets/imgs/widget_test.png" alt="Widget screenshot" />
          <img v-else-if="card.id === 'offline'" src="~/assets/imgs/offline_retailers.jpg" alt="Offline store QR code" />
          <img v-else-if="card.id === 'restaurant'" src="~/assets/imgs/QR_test.png" alt="QR code for restaurants" />
        </div>
        <div class="for-whom__card-description p1 color-dark-100">{{ card.description }}</div>
        <ul class="for-whom__card-features">
          <li class="for-whom__card-feature p1" v-for="f in card.features" :key="f">
            <span class="for-whom__feature-dot"></span>{{ f }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean,
  },
  data() {
    return {
      cards: {
        'en': [
          {
            id: 'restaurant',
            tag: 'Restaurants & Bars',
            title: 'Restaurants & Bars',
            description: 'Let every guest discover wine with confidence — without putting pressure on your staff.',
            features: [
              'QR codes at tables for instant recommendations',
              'AI-guided suggestions by dish, mood, or occasion',
              'POS tool for your team to recommend with confidence',
            ],
          },
          {
            id: 'offline',
            tag: 'Wine Stores',
            title: 'Offline Wine Stores',
            description: 'Help customers find a bottle they\'ll love — and come back for more.',
            features: [
              'QR codes near wine sections for self-guided discovery',
              'Recommendations based on any query, not just food',
              'Reduces dependence on knowledgeable floor staff',
            ],
          },
          {
            id: 'online',
            tag: 'Online Retail',
            title: 'Online Retailers',
            description: 'Turn browsing into buying with personalized AI recommendations embedded in your store.',
            features: [
              'Embeddable widget — up and running in 1 day',
              'API integration with your existing search',
              'External link option — no dev work required',
            ],
          },
        ],
        'fr': [
          {
            id: 'restaurant',
            tag: 'Restaurants & Bars',
            title: 'Restaurants & Bars',
            description: 'Permettez à chaque client de découvrir le vin en toute confiance, sans surcharger votre équipe.',
            features: [
              'QR codes sur les tables pour des recommandations instantanées',
              'Suggestions guidées par l\'IA selon le plat, l\'humeur ou l\'occasion',
              'Outil POS pour aider votre équipe à conseiller avec assurance',
            ],
          },
          {
            id: 'offline',
            tag: 'Cavistes',
            title: 'Magasins de Vin',
            description: 'Aidez chaque client à trouver une bouteille qu\'il adorera — et à revenir.',
            features: [
              'QR codes près des rayons vins pour une découverte autonome',
              'Recommandations basées sur toute requête, pas seulement la nourriture',
              'Réduit la dépendance à un personnel expert en vin',
            ],
          },
          {
            id: 'online',
            tag: 'E-commerce',
            title: 'Boutiques en Ligne',
            description: 'Transformez la navigation en achat grâce à des recommandations IA personnalisées intégrées à votre boutique.',
            features: [
              'Widget intégrable — opérationnel en 1 jour',
              'Intégration API avec votre moteur de recherche existant',
              'Option lien externe — sans développement requis',
            ],
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
  padding: 60px 0;
  opacity: 0;
  transition: opacity 0.6s ease, transform 0.6s ease;
  transform: translateY(60px);
  gap: 40px;
}

.for-whom.visible {
  opacity: 1;
  transform: translateY(0);
}

.for-whom__title {
  text-align: left;
}

.for-whom__cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.for-whom__card {
  display: flex;
  flex-direction: column;
  padding: 36px 32px 40px;
  border-radius: 24px;
  box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.07);
  gap: 16px;
  background: #fff;
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
  font-family: 'PoppinsMedium', sans-serif;
}

.for-whom__card-image {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 180px;
  border-radius: 12px;
  overflow: hidden;
  background: #f9f9f9;

  img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: cover;
    border-radius: 8px;
  }
}

.for-whom__card-description {
  line-height: 1.6;
}

.for-whom__card-features {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 4px;
}

.for-whom__card-feature {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: #696969;
}

.for-whom__feature-dot {
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7E27ED, #2FC0BF);
  margin-top: 7px;
}

@media only screen and (max-width: 1280px) {
  .for-whom__cards {
    gap: 16px;
  }

  .for-whom__card {
    padding: 28px 24px 32px;
  }

  .for-whom__card-image {
    height: 150px;
  }
}

@media only screen and (max-width: 1024px) {
  .for-whom {
    transform: translateY(40px);
  }

  .for-whom__cards {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .for-whom__card {
    padding: 28px 28px 32px;
  }

  .for-whom__card-image {
    height: 200px;
  }
}

@media only screen and (max-width: 768px) {
  .for-whom {
    transform: translateY(30px);
  }

  .for-whom__card-image {
    height: 180px;
  }
}

@media only screen and (max-width: 600px) {
  .for-whom {
    padding: 40px 0 60px;
    transform: translateY(20px);
  }

  .for-whom__card {
    padding: 24px 20px 28px;
    border-radius: 20px;
  }

  .for-whom__card-image {
    height: 160px;
  }
}
</style>
