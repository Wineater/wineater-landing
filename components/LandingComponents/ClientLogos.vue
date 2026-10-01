<template>
  <section ref="root" class="trust" aria-labelledby="trust-title" :class="{ 'is-paused': paused }">
    <div class="trust__head">
      <p id="trust-title" class="trust__label">{{ $t('Clients.title') }}</p>
      <button
        type="button"
        class="trust__toggle"
        :aria-pressed="paused"
        :aria-label="paused ? $t('Clients.play') : $t('Clients.pause')"
        @click="paused = !paused"
      >
        <svg v-if="!paused" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
          <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
          <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
        </svg>
        <svg v-else viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
          <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" fill="currentColor" />
        </svg>
      </button>
    </div>

    <div class="trust__ribbon">
      <div class="trust__track">
        <ul class="trust__list">
          <li v-for="logo in logos" :key="logo.id" class="trust__item">
            <a :href="logo.href" class="trust__link" target="_blank" rel="noopener">
              <img
                :src="logo.src"
                :alt="logo.name"
                :width="logo.width"
                :height="logo.height"
                class="trust__img"
                :style="{ height: logo.displayHeight + 'px' }"
                loading="eager"
                decoding="async"
                @error="retryImg"
              />
            </a>
          </li>
        </ul>
        <!-- Duplicate half for a seamless loop: hidden from assistive tech and the tab order -->
        <ul class="trust__list trust__list--clone" aria-hidden="true">
          <li v-for="logo in logos" :key="logo.id" class="trust__item">
            <a :href="logo.href" class="trust__link" target="_blank" rel="noopener" tabindex="-1">
              <img
                :src="logo.src"
                alt=""
                :width="logo.width"
                :height="logo.height"
                class="trust__img"
                :style="{ height: logo.displayHeight + 'px' }"
                loading="eager"
                decoding="async"
                @error="retryImg"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// One honest group: clients, press and supporters, no per-logo category labels.
// Logo files: public/clients/ and public/press/. Sources:
// brice-burnett.png  https://www.briceandburnett.co.za/media/logo/stores/1/BB-Logo-Horizontal.png (site header logo)
// intermarche.png    https://www.mousquetaires.com/wp-content/uploads/2025/07/enseigne-intermarche_petit.png (official group site)
// Order is interleaved on purpose. Every entry is a real client, article or backer: do not add placeholders.
const logos = [
  { id: 'brice-burnett', name: 'Brice & Burnett', src: '/clients/brice-burnett.png', width: 1298, height: 107, displayHeight: 22, href: 'https://www.briceandburnett.co.za/' },
  { id: 'figaro', name: 'Le Figaro', src: '/press/figaro.svg', width: 310, height: 42, displayHeight: 28, href: 'https://avis-vin.lefigaro.fr/economie-du-vin/accords-mets-et-vins-grace-a-l-ia-durabilite-ces-startups-qui-tentent-de-revolutionner-le-monde-du-vin-20250723' },
  { id: 'bm-startupwin', name: 'Bernard Magrez Start-Up Win', src: '/press/bmstartupwin.png', width: 400, height: 75, displayHeight: 40, href: 'https://bmstartupwin.com/en/startups/wineater/' },
  { id: 'intermarche', name: 'Intermarché', src: '/clients/intermarche.png', width: 349, height: 66, displayHeight: 40, href: 'https://www.intermarche.com/' },
  { id: 'larvf', name: 'La Revue du Vin de France', src: '/press/larvf.jpg', width: 250, height: 250, displayHeight: 48, href: 'https://www.larvf.com/a-bordeaux-bernard-magrez-fait-naitre-un-sommelier-digital,4907283.asp' },
  { id: 'french-tech', name: 'La French Tech Bordeaux', src: '/press/frenchtech-bordeaux.png', width: 242, height: 300, displayHeight: 52, href: 'https://annuaire.frenchtechbordeaux.com/organisations/wineater' },
];

const paused = ref(false);
const root = ref(null);

// No loading="lazy" here: lazy images inside a transformed, moving track can fail to load in Safari.
// A logo that fails once gets one retry with a cache-busting query string.
const retryImg = (e) => {
  const img = e.target;
  if (!img || img.dataset.retried) return;
  img.dataset.retried = '1';
  const src = img.getAttribute('src');
  img.src = `${src}${src.includes('?') ? '&' : '?'}r=${Date.now()}`;
};

onMounted(() => {
  // Errors that fired before hydration attached the handler.
  root.value?.querySelectorAll('img').forEach((img) => {
    if (img.complete && img.naturalWidth === 0) retryImg({ target: img });
  });
});
</script>

<style scoped lang="scss">
.trust {
  --trust-gap: 72px;
  max-width: var(--container);
  margin: 48px auto 0; // demo -> ribbon: tighter than a full section gap, by intent
  padding: 8px 0;
  border-top: 1px solid var(--brand-5);
  border-bottom: 1px solid var(--brand-5);
}

.trust__head {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 32px;
  padding: 0 52px;
}

.trust__label {
  margin: 0;
  font-size: 1.4rem;
  line-height: 1.3;
  text-align: center;
  text-wrap: balance;
  color: var(--ink-2);
}

.trust__toggle {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--ink-2);
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;

  &:hover { background: var(--brand-5); color: var(--ink-1, currentColor); }
  &:focus-visible { outline: 3px solid var(--brand-1); outline-offset: 2px; }
}

.trust__ribbon {
  height: 56px;
  margin-top: 0;
  overflow: clip;
  display: flex;
  align-items: center;
  -webkit-mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
  mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
}

.trust__track {
  display: flex;
  flex: none;
  width: max-content;
  animation: trust-scroll 52s linear infinite;
  will-change: transform;
}

.trust__list {
  list-style: none;
  margin: 0;
  padding: 0 var(--trust-gap) 0 0; // trailing gap keeps both halves identical, so -50% loops exactly
  display: flex;
  flex: none;
  align-items: center;
  gap: var(--trust-gap);
}

.trust__link {
  display: flex;
  align-items: center;
  min-height: 52px;
  border-radius: 8px;

  &:focus-visible {
    outline: 3px solid var(--brand-1);
    outline-offset: 3px;
  }
}

.trust__img {
  width: auto;
  display: block;
  filter: grayscale(1);
  opacity: 0.8;
  transition: filter 0.25s, opacity 0.25s;
}

.trust__link:hover .trust__img,
.trust__link:focus-visible .trust__img {
  filter: none;
  opacity: 1;
}

.trust.is-paused .trust__track,
.trust__ribbon:hover .trust__track,
.trust__ribbon:focus-within .trust__track {
  animation-play-state: paused;
}

// Left to right: the track starts shifted back by one full copy and slides to rest.
@keyframes trust-scroll {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}

@media (prefers-reduced-motion: reduce) {
  .trust__toggle,
  .trust__list--clone { display: none; }

  .trust__ribbon {
    height: auto;
    -webkit-mask-image: none;
    mask-image: none;
  }

  .trust__track {
    animation: none;
    will-change: auto;
    width: 100%;
    justify-content: center;
  }

  .trust__list {
    flex-wrap: wrap;
    justify-content: center;
    padding: 8px 0 0;
    gap: 12px 40px;
  }

  .trust__head { padding: 0; }
  .trust__img { transition: none; }
}

@media only screen and (max-width: 767px) {
  .trust { --trust-gap: 48px; margin-top: 32px; }
  .trust__head { padding: 0 48px; }
}
</style>
