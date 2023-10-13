<template>
  <div class="for-whom" :class="{ 'visible': visible }">
    <h2 class="h2 color-brand-6">
      For whom
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
        <div class="for-whom__card-infographic decorative-2 color-brand-1">
          {{ card.infographic }}
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
            "description": "Upload all wine and food SKUs, the algorithm will analyze your catalog and select combinations and specific SKU.",
            "infographic": "some infographics",
            "title": "Retailers"
          },
          {
            "description": "Upload your menu, the algorithm will analyze the ingredients and help you make a suitable wine list.",
            "infographic": "some infographics",
            "title": "Horeca"
          },
          {
            "description": "some text",
            "infographic": "some infographics",
            "title": "Manufacturers"
          }
        ],
        'fr': [
          {
            "description": "Upload all wine and food SKUs, the algorithm will analyze your catalog and select combinations and specific SKU.",
            "infographic": "some infographics",
            "title": "Retailers"
          },
          {
            "description": "Upload your menu, the algorithm will analyze the ingredients and help you make a suitable wine list.",
            "infographic": "some infographics",
            "title": "Horeca"
          },
          {
            "description": "some text",
            "infographic": "some infographics",
            "title": "Manufacturers"
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
  min-height: 680px;
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
    min-height: 630px;
    gap: 40px;
  }

  .for-whom__cards {
    gap: 20px;
  }

  .for-whom__card {
    padding: 50px 40px 80px 40px;
    min-height: 522px;
    width: calc(33% - 10px);
  }
}

@media only screen and (max-width: 1280px) {
  .for-whom {
    min-height: 620px;
  }
  .for-whom__card {
    padding: 30px 30px 80px 30px;
    min-height: 522px;
  }
}

@media only screen and (max-width: 1024px) {
  .for-whom {
    transform: translateY(50px);
    gap: 40px;
  }
  .for-whom__card {
    padding: 30px 30px 40px 30px;
    min-height: 400px;
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
    min-height: 280px;
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
    min-height: 320px;
    width: 100%;
  }
}
</style>

