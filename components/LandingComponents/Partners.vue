<template>
  <div class="partners" :class="{ 'visible': visible }">
    <h2 id="partners-title" class="h2 color-text partners__title">
      {{ $t('Partners.title') }}
    </h2>
    <div class="partners__grid">
      <a
          v-for="partner in partners"
          :key="partner.id"
          :href="partner.url"
          target="_blank"
          rel="noopener"
          class="partners__item"
      >
        <img
            :src="partner.logo"
            :alt="partner.name"
            :width="partner.width"
            :height="partner.height"
            loading="lazy"
            class="partners__logo"
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

const partners = [
  {
    id: 1,
    name: 'Bernard Magrez Start-Up Win',
    logo: '/press/bmstartupwin.png',
    width: 400,
    height: 75,
    url: 'https://bmstartupwin.com/en/startups/wineater/'
  },
  {
    id: 2,
    name: 'La French Tech Bordeaux',
    logo: '/press/frenchtech-bordeaux.png',
    width: 242,
    height: 300,
    url: 'https://annuaire.frenchtechbordeaux.com/organisations/wineater'
  },
];
</script>

<style scoped lang="scss">
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

.partners {
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
    background: #fff;
    border: 1px solid #ececec;

    &:focus-visible {
      outline: 3px solid #333;
      outline-offset: 3px;
    }

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    }
  }

  &__logo {
    max-width: 170px;
    max-height: 80px;
    width: auto;
    height: auto;
    object-fit: contain;
  }
}

@media only screen and (max-width: 1440px) {
  .partners {
    &__grid {
      gap: 32px;
    }
  }
}

@media only screen and (max-width: 1024px) {
  .partners {
    &__grid {
      grid-template-columns: repeat(3, 1fr);
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
  .partners {
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
  .partners {
    padding: 60px 0 80px;

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