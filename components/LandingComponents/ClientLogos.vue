<template>
  <section class="client-logos" aria-labelledby="client-logos-title">
    <h2 id="client-logos-title" class="client-logos__label">{{ $t('Clients.title') }}</h2>
    <ul class="client-logos__list">
      <li v-for="client in clients" :key="client.id" class="client-logos__item">
        <a :href="client.href" class="client-logos__link" target="_blank" rel="noopener">
          <img
            :src="client.src"
            :alt="client.name"
            :width="client.width"
            :height="client.height"
            class="client-logos__img"
            :style="{ height: client.displayHeight + 'px' }"
            loading="lazy"
            decoding="async"
          />
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { liveClients } from '~/data/proof';

// Logo files: public/clients/. Sources:
// brice-burnett.png  https://www.briceandburnett.co.za/media/logo/stores/1/BB-Logo-Horizontal.png (site header logo)
// intermarche.png    https://www.mousquetaires.com/wp-content/uploads/2025/07/enseigne-intermarche_petit.png (official group site)
const assets = {
  'brice-burnett': { src: '/clients/brice-burnett.png', width: 1298, height: 107, displayHeight: 22, href: 'https://www.briceandburnett.co.za/' },
  intermarche: { src: '/clients/intermarche.png', width: 349, height: 66, displayHeight: 30, href: 'https://www.intermarche.com/' },
};

const clients = liveClients.map((c) => ({ id: c.id, name: c.name, ...assets[c.id] }));
</script>

<style scoped lang="scss">
.client-logos {
  padding: 40px 0 48px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px 40px;
}

.client-logos__label {
  margin: 0;
  font-family: 'PoppinsRegular', sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: #696969;
}

.client-logos__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px 48px;
}

.client-logos__link {
  display: flex;
  align-items: center;
  min-height: 44px;
  min-width: 44px;
  border-radius: 8px;

  &:focus-visible {
    outline: 3px solid #7E27ED;
    outline-offset: 3px;
  }
}

.client-logos__img {
  width: auto;
  max-width: 100%;
  display: block;
  filter: grayscale(1);
  opacity: 0.8;
  transition: filter 0.2s, opacity 0.2s;
}

.client-logos__link:hover .client-logos__img,
.client-logos__link:focus-visible .client-logos__img {
  filter: none;
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .client-logos__img { transition: none; }
}

@media only screen and (max-width: 600px) {
  .client-logos {
    padding: 28px 0 32px;
    flex-direction: column;
    gap: 4px;
  }

  .client-logos__list {
    gap: 4px 32px;
  }
}
</style>
