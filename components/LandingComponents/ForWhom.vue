<template>
  <div class="for-whom" :class="{ 'visible': visible }">
    <h2 class="h2 color-brand-6">
      {{ $t('ForWhom.title') }}
    </h2>
    <div class="for-whom__cards">
      <div class="for-whom__card" v-for="card in cards[$i18n.locale]">
        <div class="for-whom__card-texts">
          <div class="for-whom__card-title h3">
            {{ card.title }}
          </div>
          <!-- Added image between title and description -->
          <div class="for-whom__card-image">
            <img v-if="card.id === 'online'" src="~/assets/imgs/widget_test.png" alt="Widget screenshot">
            <img v-else-if="card.id === 'offline'" src="~/assets/imgs/QR_test.png" alt="QR code screenshot">
          </div>
          <div class="for-whom__card-description p1 color-dark-100">
            {{ card.description }}
          </div>
        </div>
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
            "id": "online",
            "title": "Online Wine Retailers",
            "description": "Increase conversion rates with an AI-powered wine pairing widget that seamlessly embeds into your website. Customers are more likely to purchase wine when they are confident that the recommended wine complements their meal."
          },
          {
            "id": "offline",
            "title": "Offline Wine Stores",
            "description": "Enhance in-store experience with QR code-based access to our wine pairing AI. Strategically placed near wine sections, it helps customers make informed choices without requiring dedicated sommelier staff."
          }
        ],
        'fr': [
          {
            "id": "online",
            "title": "Détaillants de Vin en Ligne",
            "description": "Augmentez les taux de conversion avec un widget d'accords mets-vins propulsé par IA qui s'intègre parfaitement à votre site web. Les clients sont plus susceptibles d'acheter du vin lorsqu'ils sont convaincus que le vin recommandé complète leur repas."
          },
          {
            "id": "offline",
            "title": "Magasins de Vin Physiques",
            "description": "Améliorez l'expérience en magasin avec un accès à notre IA d'accords mets-vins via code QR. Placé stratégiquement près des sections de vin, il aide les clients à faire des choix éclairés sans nécessiter de personnel sommelier dédié."
          }
        ]
      }
    };
  },
  watch: {},
  created() {
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.for-whom {
  display: flex;
  flex-direction: column;
  min-height: 500px;
  padding: 60px 0;
  opacity: 0;
  transition: 0.5s ease;
  transform: translateY(100px);
  gap: 40px; /* Add default gap between title and cards */
}

.for-whom.visible {
  opacity: 1;
  transform: translateY(0px);
}

.for-whom__cards {
  display: flex;
  gap: 24px;
}

.for-whom__card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 50px 50px 100px 50px;
  border-radius: 32px;
  box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.08);
  width: calc(50% - 12px);
}

.for-whom__card-texts {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.for-whom__card-title {
  word-break: break-word;
  display: flex;
  align-items: flex-start;
  margin: 0;
}

/* Added styling for the new image section */
.for-whom__card-image {
  margin: 15px 0;
  display: flex;
  justify-content: center;
}

.for-whom__card-image img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
}

.for-whom__card-infographic {
  padding-right: 100px;
}

@media only screen and (max-width: 1440px) {
  .for-whom {
    gap: 40px;
  }

  .for-whom__cards {
    gap: 20px;
  }

  .for-whom__card {
    padding: 50px 40px 80px 40px;
    width: calc(50% - 10px);
  }
}

@media only screen and (max-width: 1280px) {
  .for-whom {
    min-height: 620px;
  }
  .for-whom__card {
    padding: 30px 30px 80px 30px;
  }
}

@media only screen and (max-width: 1024px) {
  .for-whom {
    transform: translateY(50px);
    gap: 40px;
  }
  .for-whom__card {
    padding: 30px 30px 40px 30px;
  }
}

@media only screen and (max-width: 768px) {
  .for-whom {
    transform: translateY(50px);
  }
  .for-whom__cards {
    flex-direction: column;
  }
  .for-whom__card {
    padding: 30px 200px 40px 30px;
    width: 100%;
  }

  .for-whom__card-image img {
    max-width: 80%;
  }
}

@media only screen and (max-width: 600px) {
  .for-whom {
    padding: 60px 16px 80px 0px;
    min-height: auto;
    height: auto;
    transform: translateY(30px);
  }
  .for-whom__card {
    padding: 30px 30px 40px 30px;
    width: 100%;
  }

  .for-whom__card-image img {
    max-width: 90%;
  }
}
</style>