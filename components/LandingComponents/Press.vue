<template>
  <div class="logo-strip" role="region" :aria-label="$t('Press.title')">
    <div class="logo-strip__row" v-for="group in groups" :key="group.key">
      <p class="logo-strip__label">{{ $t(`${group.key}.title`) }}</p>
      <ul class="logo-strip__list">
        <li v-for="item in group.items" :key="item.id">
          <a :href="item.url" target="_blank" rel="noopener" class="logo-strip__item">
            <img
                :src="item.logo"
                :alt="item.name"
                :width="item.width"
                :height="item.height"
                loading="lazy"
                class="logo-strip__logo"
                :class="{ 'logo-strip__logo--tall': item.height > item.width }"
            />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const groups = [
  {
    key: 'Press',
    items: [
      {
        id: 1,
        name: 'La Revue du Vin de France',
        logo: '/press/larvf.jpg',
        width: 250,
        height: 250,
        url: 'https://www.larvf.com/a-bordeaux-bernard-magrez-fait-naitre-un-sommelier-digital,4907283.asp'
      },
      {
        id: 2,
        name: 'Le Figaro',
        logo: '/press/figaro.svg',
        width: 310,
        height: 42,
        url: 'https://avis-vin.lefigaro.fr/economie-du-vin/accords-mets-et-vins-grace-a-l-ia-durabilite-ces-startups-qui-tentent-de-revolutionner-le-monde-du-vin-20250723'
      },
    ],
  },
  {
    key: 'Partners',
    items: [
      {
        id: 3,
        name: 'Bernard Magrez Start-Up Win',
        logo: '/press/bmstartupwin.png',
        width: 400,
        height: 75,
        url: 'https://bmstartupwin.com/en/startups/wineater/'
      },
      {
        id: 4,
        name: 'La French Tech Bordeaux',
        logo: '/press/frenchtech-bordeaux.png',
        width: 242,
        height: 300,
        url: 'https://annuaire.frenchtechbordeaux.com/organisations/wineater'
      },
    ],
  },
];
</script>

<style scoped lang="scss">
.logo-strip {
  max-width: var(--container);
  margin: 0 auto;
  padding: calc(var(--section-y) / 2) 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 24px 48px;
  border-top: 1px solid var(--brand-5);
}

.logo-strip__row {
  display: flex;
  align-items: center;
  gap: 16px 24px;
  min-width: 0;
}

.logo-strip__label {
  margin: 0;
  flex: none;
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 1.5rem;
  line-height: 1.3;
  color: var(--ink-2);
  white-space: nowrap;
}

.logo-strip__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;
  gap: 16px 28px;
}

.logo-strip__item {
  display: flex;
  align-items: center;
  min-height: 48px;
  padding: 2px 0;
  border-radius: 8px;

  &:focus-visible {
    outline: 3px solid var(--brand-1);
    outline-offset: 4px;
  }
}

.logo-strip__logo {
  height: 40px;
  width: auto;
  max-width: 200px;
  object-fit: contain;
  transition: opacity 0.2s ease;
}

.logo-strip__logo--tall { height: 56px; }

.logo-strip__item:hover .logo-strip__logo { opacity: 0.75; }

@media only screen and (max-width: 1099px) {
  .logo-strip { justify-content: flex-start; }
}

@media only screen and (max-width: 767px) {
  .logo-strip { flex-direction: column; align-items: flex-start; }
  .logo-strip__row { flex-direction: column; align-items: flex-start; gap: 8px; }
  .logo-strip__list { flex-wrap: wrap; }
}
</style>
