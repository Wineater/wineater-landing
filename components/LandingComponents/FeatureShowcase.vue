<template>
  <section id="how-recommendations-work" class="features" aria-labelledby="features-title">
    <h2 id="features-title" class="features__title" v-reveal>{{ $t('features.title') }}</h2>
    <p class="features__lead" v-reveal>{{ $t('features.lead') }}</p>

    <div
      ref="root"
      class="carousel"
      :class="{ 'is-ready': ready, 'is-held': held, 'is-paused': paused }"
      role="region"
      aria-roledescription="carousel"
      aria-labelledby="features-title"
      tabindex="0"
      @keydown.left.prevent="go(active - 1)"
      @keydown.right.prevent="go(active + 1)"
      @animationend="onProgressEnd"
    >
      <div class="carousel__frame">
        <div ref="track" class="carousel__track" :aria-live="live">
          <div
            v-for="(item, i) in slides"
            :key="item.key"
            class="slide"
            role="group"
            aria-roledescription="slide"
            :aria-label="$t('features.slideN', { n: i + 1, total: slides.length })"
          >
            <div class="slide__bar" aria-hidden="true">
              <span class="slide__url">{{ item.url }}</span>
            </div>
            <div class="slide__media">
              <img
                class="slide__img"
                :src="item.src"
                :alt="$t(`features.${item.key}Alt`)"
                width="1000"
                :height="item.height"
                loading="eager"
                decoding="async"
                :fetchpriority="i === 0 ? 'auto' : 'low'"
                @error="retryImg"
              />
            </div>
            <div class="slide__panel">
              <h3 class="slide__title">{{ $t(`features.${item.key}Title`) }}</h3>
              <p class="slide__desc">{{ $t(`features.${item.key}Text`) }}</p>
              <p v-if="item.client" class="slide__live">{{ $t('features.liveOn', { client: item.client }) }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="carousel__controls">
        <div class="carousel__dots">
          <button
            v-for="(item, i) in slides"
            :key="item.key"
            type="button"
            class="dot"
            :aria-current="i === active ? 'true' : undefined"
            :aria-label="$t('features.slideOf', { n: i + 1, total: slides.length, title: $t(`features.${item.key}Title`) })"
            @click="go(i)"
          >
            <span class="dot__track"><span class="dot__fill"></span></span>
          </button>
        </div>
        <div class="carousel__buttons">
          <button type="button" class="ctl ctl--prev" :aria-label="$t('features.prev')" @click="go(active - 1)"></button>
          <button type="button" class="ctl ctl--next" :aria-label="$t('features.next')" @click="go(active + 1)"></button>
          <button
            type="button"
            class="ctl ctl--toggle"
            :class="{ 'is-play': paused }"
            :aria-label="$t('features.pause')"
            :aria-pressed="paused ? 'true' : 'false'"
            @click="paused = !paused"
          ></button>
        </div>
      </div>
    </div>

    <p class="features__caption" v-reveal>{{ $t('features.caption') }}</p>
  </section>
</template>

<script setup>
// Screenshots are real captures of live client widgets (client names approved by the owner).
const slides = [
  { key: 'language', src: '/features/feature-language.webp', height: 743, url: 'intermarche.wineater.com', client: 'Intermarché' },
  { key: 'reason', src: '/features/feature-reason.webp', height: 577, url: 'briceandburnett.co.za/ai-wine-geek', client: 'Brice & Burnett' },
  { key: 'similar', src: '/features/feature-similar.webp', height: 577, url: 'briceandburnett.co.za/ai-wine-geek', client: 'Brice & Burnett' },
];

const root = ref(null);
const track = ref(null);
const active = ref(0);
const paused = ref(false); // user choice (toggle) or reduced motion
const ready = ref(false); // true after hydration: controls and autoplay exist only with JS
// Autoplay holds: pointer over, keyboard focus, touch, off-screen, hidden tab. Starts held until seen.
const hold = reactive({ hover: false, focus: false, touch: false, off: true, hidden: false });
const held = computed(() => Object.values(hold).some(Boolean));
const live = computed(() => (ready.value && !paused.value && !held.value ? 'off' : 'polite'));

let reduced = false;
let lock = -1;
let lockTimer;
const n = slides.length;

const go = (to) => {
  const i = (to + n) % n;
  const el = track.value;
  if (!el) return;
  const wrap = Math.abs(i - active.value) > 1; // looping back: jump instead of rewinding through every slide
  active.value = lock = i;
  clearTimeout(lockTimer);
  lockTimer = setTimeout(() => (lock = -1), 900);
  el.scrollTo({ left: i * el.clientWidth, behavior: reduced || wrap ? 'auto' : 'smooth' });
};

// The progress bar animation on the active dot drives autoplay: when it ends, advance.
const onProgressEnd = (e) => {
  if (e.target.classList.contains('dot__fill')) go(active.value + 1);
};

// A slide image that failed once (transient request, or an eager fetch lost inside the
// scroll-snap track) gets one retry with a cache-busting query string.
const retryImg = (e) => {
  const img = e.target;
  if (!img || img.dataset.retried) return;
  img.dataset.retried = '1';
  const src = img.getAttribute('src');
  img.src = `${src}${src.includes('?') ? '&' : '?'}r=${Date.now()}`;
};

onMounted(() => {
  // Errors that fired before hydration attached the handler.
  track.value.querySelectorAll('img').forEach((img) => {
    if (img.complete && img.naturalWidth === 0) retryImg({ target: img });
  });

  reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) paused.value = true;
  ready.value = true;

  const el = root.value;
  const on = (type, fn, target = el) => target.addEventListener(type, fn, { passive: true });
  on('pointerenter', (e) => e.pointerType === 'mouse' && (hold.hover = true));
  on('pointerleave', () => (hold.hover = false));
  on('focusin', (e) => (hold.focus = e.target.matches(':focus-visible')));
  on('focusout', () => (hold.focus = false));
  on('touchstart', () => (hold.touch = true));
  on('touchend', () => setTimeout(() => (hold.touch = false), 2500));

  const slideEls = [...track.value.children];
  const slideIO = new IntersectionObserver(
    (entries) => {
      for (const { isIntersecting, target } of entries) {
        const i = slideEls.indexOf(target);
        if (!isIntersecting || (lock >= 0 && i !== lock)) continue;
        lock = -1;
        active.value = i;
      }
    },
    { root: track.value, threshold: 0.6 },
  );
  slideEls.forEach((s) => slideIO.observe(s));

  const viewIO = new IntersectionObserver(([e]) => (hold.off = !e.isIntersecting), { threshold: 0.35 });
  viewIO.observe(el);

  const onVis = () => (hold.hidden = document.visibilityState === 'hidden');
  on('visibilitychange', onVis, document);
  onVis();

  onBeforeUnmount(() => {
    slideIO.disconnect();
    viewIO.disconnect();
    document.removeEventListener('visibilitychange', onVis);
    clearTimeout(lockTimer);
  });
});
</script>

<style scoped lang="scss">
.features {
  max-width: var(--container);
  margin: 0 auto;
  padding: var(--section-y) 0 0;
  color: var(--ink-2);
}

.features__title {
  margin: 0;
  font-size: clamp(2.8rem, 3.6vw, 4rem);
  line-height: 1.15;
  color: var(--ink);
  max-width: 22ch;
  text-wrap: balance;
}

.features__lead {
  margin: 16px 0 0;
  font-size: 1.7rem;
  line-height: 1.55;
  color: var(--ink-2);
  max-width: 60ch;
}

.carousel {
  margin-top: 40px;
  border-radius: 16px;
  --panel: rgba(26, 20, 38, 0.96); // --ink at 96%: opaque enough that the screenshot only ghosts through
  --dur: 6s;

  &:focus-visible { outline: 2px solid var(--brand-1); outline-offset: 4px; }
}

.carousel__frame {
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid var(--brand-5);
  background: #fff;
  box-shadow: 0 8px 24px rgba(26, 20, 38, 0.06);
}

.carousel__track {
  display: flex;
  aspect-ratio: 16 / 9; // fixed box: no layout shift between slides
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
}

.carousel.is-ready .carousel__track {
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}

.slide {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 0 0 100%;
  min-width: 0;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

.slide__bar {
  flex: none;
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 12px;
  background: var(--brand-7);
  border-bottom: 1px solid var(--brand-5);
}

.slide__url {
  display: block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 3px 12px;
  border-radius: 999px;
  background: #fff;
  font-size: 1.2rem;
  line-height: 1.5;
  color: var(--ink-3);
}

.slide__media {
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  background: #fff;
}

.slide__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

// Text over the image: opaque-enough ink sheet, so contrast holds over any part of the screenshot.
.slide__panel {
  position: absolute;
  inset: auto 0 0;
  padding: 28px 40px 32px;
  border-radius: 20px 20px 0 0;
  background: var(--panel);
  color: #fff;
}

.slide__title {
  margin: 0;
  max-width: 34ch;
  font-family: 'PoppinsMedium', sans-serif;
  font-weight: 500;
  font-size: 2.4rem;
  line-height: 1.3;
  color: #fff;
  text-wrap: balance;
}

.slide__desc {
  margin: 8px 0 0;
  max-width: 72ch;
  font-size: 1.7rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.88);
}

.slide__live {
  margin: 10px 0 0;
  font-size: 1.4rem;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.76);
}

// Controls exist only once JS runs (visibility keeps the layout identical).
.carousel__controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 12px;
  visibility: hidden;
}
.carousel.is-ready .carousel__controls { visibility: visible; }

.carousel__dots, .carousel__buttons { display: flex; align-items: center; gap: 4px; }
.carousel__buttons { gap: 8px; }

.dot {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
}

.dot__track {
  display: block;
  width: 32px;
  height: 4px;
  overflow: hidden;
  border-radius: 2px;
  background: color-mix(in srgb, var(--ink-3) 55%, #fff); // >= 3:1 on white
}

.dot__fill {
  display: block;
  width: 100%;
  height: 100%;
  background: var(--brand-1);
  transform: scaleX(0);
  transform-origin: left;
}

.dot[aria-current='true'] .dot__fill { transform: scaleX(1); }

@media (prefers-reduced-motion: no-preference) {
  .carousel.is-ready .dot[aria-current='true'] .dot__fill {
    transform: scaleX(0);
    animation: progress var(--dur) linear forwards;
  }
  .carousel.is-held .dot[aria-current='true'] .dot__fill,
  .carousel.is-paused .dot[aria-current='true'] .dot__fill { animation-play-state: paused; }
}

@keyframes progress { to { transform: scaleX(1); } }

.ctl {
  position: relative;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 1px solid var(--brand-5);
  border-radius: 50%;
  background: #fff;
  color: var(--ink);
  cursor: pointer;
  transition: background-color 0.15s ease-out, transform 0.15s ease-out;

  &:hover { background: var(--brand-7); }
  &:active { transform: scale(0.96); }

  // CSS-drawn glyphs (no icon dependency)
  &::before, &::after { content: ''; position: absolute; top: 50%; left: 50%; }
}

.ctl--prev::before, .ctl--next::before {
  width: 9px;
  height: 9px;
  border: solid currentColor;
  border-width: 2px 2px 0 0;
}
.ctl--next::before { transform: translate(-65%, -50%) rotate(45deg); }
.ctl--prev::before { transform: translate(-35%, -50%) rotate(-135deg); }

// pause glyph: two bars; play glyph: triangle
.ctl--toggle::before, .ctl--toggle::after {
  width: 3px;
  height: 14px;
  border-radius: 1px;
  background: currentColor;
  transform: translateY(-50%);
}
.ctl--toggle::before { margin-left: -6px; }
.ctl--toggle::after { margin-left: 3px; }
.ctl--toggle.is-play::before {
  width: 0;
  height: 0;
  margin-left: -4px;
  border-radius: 0;
  background: none;
  border: solid transparent;
  border-width: 7px 0 7px 12px;
  border-left-color: currentColor;
}
.ctl--toggle.is-play::after { display: none; }

.ctl:focus-visible, .dot:focus-visible { outline: 2px solid var(--brand-1); outline-offset: 2px; }

@media (prefers-reduced-motion: reduce) {
  .ctl--toggle { display: none; } // nothing autoplays, so nothing to pause
}

.features__caption {
  margin: 16px 0 0;
  max-width: 80ch;
  font-size: 1.5rem;
  line-height: 1.5;
  color: var(--ink-3);
}

@media only screen and (max-width: 767px) {
  .features__lead { margin-top: 12px; }
  .carousel { margin-top: 28px; }
  .carousel__track { aspect-ratio: 5 / 7; }
  .slide__img { position: static; height: auto; }
  .slide__panel { padding: 20px 16px 24px; }
  .slide__title { font-size: 2.1rem; }
  .slide__desc { font-size: 1.6rem; }
  .slide__live { margin-top: 8px; }
  .ctl--prev, .ctl--next { display: none; }
  .features__caption { font-size: 1.4rem; }
}
</style>
