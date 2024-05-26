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
          <div class="for-whom__card-description p1 color-dark-100">
            {{ card.description }}
          </div>
        </div>
        <!-- <div class="for-whom__card-infographic decorative-2 color-brand-1">
          {{ card.infographic }}
        </div> -->

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
            "description": "Consumers are more likely to purchase wine when they are confident that the recommended bottle complements their meal",
            "title": "Increase in the Number of Orders"
          },
          {
            "description": "Our algorithm includes the most profitable products, naturally leading to a higher average spend per purchase and boosting overall sales",
            "title": "Average Check Growth "
          },
          {
            "description": "By offering a unique value proposition, we make it convenient for users to choose wines, encouraging repeat visits and purchases",
            "title": "Higher User Return Rate"
          }
        ],
        'fr': [
          {
            "description": "Les consommateurs sont plus susceptibles d'acheter du vin lorsqu'ils sont convaincus que la bouteille recommandée complète leur repas",
            "title": "Augmentation du nombre de commandes"
          },
          {
            "description": "Notre algorithme inclut les produits les plus rentables, ce qui conduit naturellement à une dépense moyenne par achat plus élevée et à une augmentation globale des ventes",
            "title": "Croissance du panier moyen"
          },
          {
            "description": "En offrant une proposition de valeur unique, nous facilitons le choix des vins pour les utilisateurs, les incitant à revenir et à acheter à nouveau",
            "title": "Taux de retour utilisateur plus élevé"
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
  gap: 64px;
  opacity: 0;
  transition: 1s ease;
  transform: translateY(100px);
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
  width: calc(33% - 12px);
}

.for-whom__card-texts {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.for-whom__card-title{
  word-break: break-word;
}
.for-whom__card-infographic{
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
    width: calc(33% - 10px);
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
}
</style>

