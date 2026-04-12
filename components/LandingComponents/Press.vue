<template>
  <div class="press" :class="{ 'visible': visible }" role="region" aria-label="Press coverage">
    <h2 class="h2 color-brand-6 press__title">
      {{ $t('Press.title') }}
    </h2>
    <div class="press__grid">
      <a
          v-for="article in articles"
          :key="article.id"
          :href="article.url"
          target="_blank"
          class="press__item"
          :title="article.name"
      >
        <img
            :src="article.logo"
            :alt="article.name"
            class="press__logo"
        />
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});

const articles = [
  {
    id: 1,
    name: 'La Revue du Vin de France',
    logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/e/ee/La_Revue_du_vin_de_France_logo.png/200px-La_Revue_du_vin_de_France_logo.png',
    url: 'https://www.larvf.com/a-bordeaux-bernard-magrez-fait-naitre-un-sommelier-digital,4907283.asp'
  },
  {
    id: 2,
    name: 'Le Figaro',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Le_Figaro.svg',
    url: 'https://avis-vin.lefigaro.fr/economie-du-vin/accords-mets-et-vins-grace-a-l-ia-durabilite-ces-startups-qui-tentent-de-revolutionner-le-monde-du-vin-20250723'
  },
];
</script>

<style scoped lang="scss">
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

.press {
  padding: 60px 0;
  animation: fadeUp 0.6s ease both;

  &__title {
    text-align: center;
    margin-bottom: 48px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 40px;
    align-items: center;
    justify-items: center;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-radius: 12px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    width: 100%;
    max-width: 250px;
    height: 130px;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      background: rgba(255, 255, 255, 0.8);
    }
  }

  &__logo {
    max-width: 170px;
    max-height: 80px;
    width: auto;
    height: auto;
    object-fit: contain;
    filter: grayscale(0%);
    opacity: 0.7;
    transition: filter 0.3s ease, opacity 0.3s ease;

    .press__item:hover & {
      filter: grayscale(0%);
      opacity: 1;
    }
  }
}

@media only screen and (max-width: 1440px) {
  .press {
    &__grid {
      gap: 32px;
    }
  }
}

@media only screen and (max-width: 1024px) {
  .press {
    &__grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }

    &__item {
      max-width: none;
      height: 100px;
    }

    &__logo {
      max-height: 60px;
    }
  }
}

@media only screen and (max-width: 768px) {
  .press {
    &__grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }

    &__item {
      height: 90px;
    }

    &__logo {
      max-height: 50px;
    }
  }
}

@media only screen and (max-width: 600px) {
  .press {
    padding: 60px 16px 80px 0px;

    &__grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    &__item {
      height: 80px;
    }

    &__logo {
      max-height: 60px;
    }
  }
}
</style>
