<template>
  <div class="partners" :class="{ 'visible': visible }">
    <h2 class="h2 color-brand-6 partners__title">
      {{ $t('Partners.title') }}
    </h2>
    <div class="partners__grid">
      <a
          v-for="partner in partners"
          :key="partner.id"
          :href="partner.url"
          target="_blank"
          class="partners__item"
      >
        <img
            :src="partner.logo"
            :alt="partner.name"
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

// Placeholder partner data - you can replace these later
const partners = [
  {
    id: 1,
    name: 'Bernard Magrez Start-Up Win',
    logo: 'https://bmstartupwin.com/wp-content/uploads/2023/06/LOGO-NOIR-.png',
    url: 'https://bmstartupwin.com/en/startups/wineater/'
  },
  {
    id: 2,
    name: 'La French Tech Bordeaux',
    logo: 'https://annuaire.frenchtechbordeaux.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6IjI2YzViNTRmLWE1NTctNGI3Yi04YTE4LTY0OWYxYTVlZjI0MyIsInB1ciI6ImJsb2JfaWQifX0=--3ec8d92adf4699ae40492eb006456907b6b83218/Logo_FT_Bordeaux_FondBlanc.png',
    url: 'https://annuaire.frenchtechbordeaux.com/organisations/wineater'
  },
];
</script>

<style scoped lang="scss">
.partners {
  padding: 60px 0;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

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
    height: 120px;
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
    max-width: 100%;
    max-height: 80px;
    width: auto;
    height: auto;
    object-fit: contain;
    filter: grayscale(100%);
    opacity: 0.7;
    transition: filter 0.3s ease, opacity 0.3s ease;

    .partners__item:hover & {
      filter: grayscale(0%);
      opacity: 1;
    }
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
    padding: 60px 16px 80px 0px;

    &__grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    &__item {
      height: 80px;
    }

    &__logo {
      max-height: 40px;
    }
  }
}
</style>