<template>
  <section id="how-recommendations-work" class="features" aria-labelledby="features-title">
    <div
      ref="root"
      class="features__body"
      :class="{ 'is-ready': ready, 'is-held': held, 'is-paused': paused }"
      @animationend="onProgressEnd"
    >
      <div class="features__side">
        <h2 id="features-title" class="features__title" v-reveal>{{ $t('features.title') }}</h2>
        <p class="features__lead" v-reveal>{{ $t('features.lead') }}</p>

        <ol class="steps">
          <li v-for="(item, i) in slides" :key="item.key" class="steps__li">
            <button
              type="button"
              class="step"
              :aria-current="i === active ? 'true' : undefined"
              :aria-label="$t('features.slideOf', { n: i + 1, total: slides.length, title: $t(`features.${item.key}Title`) })"
              @click="go(i)"
            >
              <span class="step__n" aria-hidden="true">{{ i + 1 }}</span>
              <span class="step__t" aria-hidden="true">{{ $t(`features.${item.key}Title`) }}</span>
              <span class="step__track" aria-hidden="true"><span class="fill"></span></span>
            </button>
          </li>
        </ol>
      </div>

      <div
        class="carousel"
        role="region"
        aria-roledescription="carousel"
        aria-labelledby="features-title"
        tabindex="0"
        @keydown.left.prevent="go(active - 1)"
        @keydown.right.prevent="go(active + 1)"
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
              <div v-if="item.chart" class="slide__media slide__media--chart">
                <ul class="chart" :class="{ 'is-on': grown }" :aria-label="$t('features.speedChart')">
                  <li v-for="(r, j) in speed" :key="r.n" class="chart__row" :style="{ '--w': r.s / speedMax, '--i': j }">
                    <span class="chart__label">{{ $t('features.speedRow', { n: fmtN(r.n) }) }}</span>
                    <span class="chart__track">
                      <span class="chart__bar" aria-hidden="true"></span>
                      <span class="chart__val">{{ $t('features.speedUnit', { n: fmtS(r.s) }) }}</span>
                    </span>
                  </li>
                </ul>
              </div>
              <div v-else class="slide__media">
                <img
                  class="slide__img"
                  :src="item.src"
                  :alt="$t(`features.${item.key}Alt`)"
                  width="1600"
                  height="900"
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
                <p v-if="item.chart" class="slide__live">{{ $t('features.speedNote') }}</p>
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
              <span class="dot__track"><span class="fill"></span></span>
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
    </div>
  </section>
</template>

<script setup>
// Screenshots are real captures of live client widgets (client names approved by the owner).
// Images are 1600x900 captures (2x), shown at about 760px wide so they stay sharp.
const slides = [
  { key: 'language', src: '/features/feature-language.webp', url: 'intermarche.wineater.com', client: 'Intermarché' },
  { key: 'reason', src: '/features/feature-reason.webp', url: 'briceandburnett.co.za/ai-wine-geek', client: 'Brice & Burnett' },
  { key: 'similar', src: '/features/feature-similar.webp', url: 'briceandburnett.co.za/ai-wine-geek', client: 'Brice & Burnett' },
  { key: 'speed', chart: true, url: 'wineater.com' },
];

// Median answer time (seconds) by catalog size, from our own timing runs. Bars use a 0-8 s scale.
const speed = [
  { n: 29, s: 4.8 },
  { n: 68, s: 4.8 },
  { n: 393, s: 5.1 },
  { n: 762, s: 6.7 },
  { n: 3344, s: 5.3 },
];
const speedMax = 8;
const speedIndex = slides.findIndex((x) => x.chart);
const { locale } = useI18n();
const fmtN = (v) => new Intl.NumberFormat(locale.value).format(v);
const fmtS = (v) => new Intl.NumberFormat(locale.value, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(v);

const root = ref(null);
const track = ref(null);
const active = ref(0);
const paused = ref(false); // user choice (toggle) or reduced motion
const ready = ref(false); // true after hydration: controls and autoplay exist only with JS
// Autoplay holds: pointer over, keyboard focus, touch, off-screen, hidden tab. Starts held until seen.
const hold = reactive({ hover: false, focus: false, touch: false, off: true, hidden: false });
const held = computed(() => Object.values(hold).some(Boolean));
const grown = ref(false); // speed bars grow once, the first time their slide is active
watch(active, (i) => { if (i === speedIndex) grown.value = true; });
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
  if (e.target.classList.contains('fill')) go(active.value + 1);
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
  root.value.querySelectorAll('img').forEach((img) => {
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

// Mobile/tablet: stacked (heading, lead, slide, dots). The step list only exists at desktop.
.steps { display: none; }

.carousel {
  margin-top: 28px;
  border-radius: 16px;
  --panel: rgba(255, 255, 255, 0.8); // frosted light glass: the screenshot shows through, blur keeps the text readable
  --dur: 6s;

  &:focus-visible { outline: 2px solid var(--brand-1); outline-offset: 4px; }
}

.features__body { --dur: 6s; }

.carousel__frame {
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid var(--brand-5);
  background: #fff;
  box-shadow: 0 8px 24px rgba(26, 20, 38, 0.06);
}

.carousel__track {
  display: flex;
  aspect-ratio: 16 / 10; // fixed box: no layout shift between slides
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
}

.features__body.is-ready .carousel__track {
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

// Text over the image: light frosted glass (80% white + blur) so the screenshot stays visible
// while ink text keeps >= 4.5:1 even over the darkest bottle (checked against the worst case).
.slide__panel {
  position: absolute;
  inset: auto 0 0;
  padding: 24px 32px 26px;
  border-radius: 20px 20px 0 0;
  background: var(--panel);
  -webkit-backdrop-filter: blur(14px) saturate(1.15);
  backdrop-filter: blur(14px) saturate(1.15);
  border-top: 1px solid rgba(255, 255, 255, 0.85);
  box-shadow: 0 -10px 30px rgba(26, 20, 38, 0.08);
  color: var(--ink);
}

@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .slide__panel { background: rgba(255, 255, 255, 0.95); }
}

.slide__title {
  margin: 0;
  max-width: 34ch;
  font-family: 'PoppinsMedium', sans-serif;
  font-weight: 500;
  font-size: 2.2rem;
  line-height: 1.3;
  color: var(--ink);
  text-wrap: balance;
}

.slide__desc {
  margin: 6px 0 0;
  max-width: 72ch;
  font-size: 1.6rem;
  line-height: 1.5;
  color: var(--ink-2);
}

.slide__live {
  margin: 8px 0 0;
  font-size: 1.4rem;
  line-height: 1.4;
  color: var(--ink-2);
}

// Speed slide: violet field with a plain HTML/CSS bar chart (0-8 s scale).
.slide__media--chart {
  display: flex;
  align-items: flex-start;
  background: var(--brand-1);
  color: #fff;
}

.chart {
  list-style: none;
  margin: 0;
  width: 100%;
  padding: 26px 32px 170px;
  display: grid;
  gap: 12px;
}

.chart__row {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  align-items: center;
  gap: 14px;
  min-height: 34px;
  font-size: 1.6rem;
  line-height: 1.2;
}

.chart__label { color: #fff; white-space: nowrap; }

.chart__track {
  position: relative;
  display: block;
  height: 28px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
}

.chart__bar {
  position: absolute;
  inset: 0 auto 0 0;
  width: calc((100% - 60px) * var(--w)); // 0-8 s scale; the last 60px hold the value label
  border-radius: 4px;
  background: #fff;
  transform-origin: left;
}

.chart__val {
  position: absolute;
  top: 50%;
  left: calc((100% - 60px) * var(--w) + 10px);
  transform: translateY(-50%);
  font-family: 'PoppinsMedium', sans-serif;
  font-weight: 500;
  font-size: 1.6rem;
  color: #fff;
  white-space: nowrap;
}

@media (prefers-reduced-motion: no-preference) {
  .chart__bar { transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1); transition-delay: calc(var(--i) * 90ms); }
  .chart__val { transition: opacity 0.4s ease-out; transition-delay: calc(var(--i) * 90ms + 500ms); }
  .features__body.is-ready .chart:not(.is-on) {
    .chart__bar { transform: scaleX(0); }
    .chart__val { opacity: 0; }
  }
}

// Controls exist only once JS runs (visibility keeps the layout identical).
.carousel__controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 8px;
  visibility: hidden;
}
.features__body.is-ready .carousel__controls { visibility: visible; }

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

.dot__track, .step__track {
  display: block;
  overflow: hidden;
  border-radius: 2px;
  background: color-mix(in srgb, var(--ink-3) 55%, #fff); // >= 3:1 on white
}
.dot__track { width: 32px; height: 4px; }

.fill {
  display: block;
  width: 100%;
  height: 100%;
  background: var(--brand-1);
  transform: scaleX(0);
  transform-origin: left;
}

.dot[aria-current='true'] .fill, .step[aria-current='true'] .fill { transform: scaleX(1); }

@media (prefers-reduced-motion: no-preference) {
  .features__body.is-ready .dot[aria-current='true'] .fill,
  .features__body.is-ready .step[aria-current='true'] .fill {
    transform: scaleX(0);
    animation: progress var(--dur) linear forwards;
  }
  .features__body.is-held .dot[aria-current='true'] .fill,
  .features__body.is-paused .dot[aria-current='true'] .fill,
  .features__body.is-held .step[aria-current='true'] .fill,
  .features__body.is-paused .step[aria-current='true'] .fill { animation-play-state: paused; }
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

.ctl:focus-visible, .dot:focus-visible, .step:focus-visible { outline: 2px solid var(--brand-1); outline-offset: 2px; }

@media (prefers-reduced-motion: reduce) {
  .ctl--toggle { display: none; } // nothing autoplays, so nothing to pause
}

// Desktop: how it works on the left (heading, lead, selectable list), the slide on the right.
@media only screen and (min-width: 1024px) {
  .features__body {
    display: grid;
    grid-template-columns: minmax(280px, 1fr) minmax(0, 2fr);
    column-gap: 40px;
    align-items: start;
  }

  .carousel { margin-top: 0; }
  .carousel__dots { display: none; }
  .carousel__controls { justify-content: flex-end; }

  .steps {
    display: grid;
    gap: 4px;
    margin: 24px 0 0;
    padding: 0;
    list-style: none;
    visibility: hidden;
  }
  .features__body.is-ready .steps { visibility: visible; }

  .steps__li { margin: 0; }

  .step {
    position: relative;
    display: grid;
    grid-template-columns: 28px minmax(0, 1fr);
    align-items: center;
    column-gap: 12px;
    width: 100%;
    min-height: 56px;
    padding: 8px 12px 12px;
    border: 0;
    border-radius: 12px;
    background: transparent;
    color: var(--ink-2);
    font: inherit;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.2s ease-out, color 0.2s ease-out;

    &:hover { background: var(--brand-7); }
    &[aria-current='true'] { background: var(--brand-7); color: var(--ink); }
  }

  .step__n {
    display: grid;
    place-items: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid var(--brand-5);
    background: #fff;
    font-family: 'PoppinsMedium', sans-serif;
    font-size: 1.3rem;
    line-height: 1;
    color: var(--ink-2);
  }
  .step[aria-current='true'] .step__n { background: var(--brand-1); border-color: var(--brand-1); color: #fff; }

  .step__t {
    font-size: 1.5rem;
    line-height: 1.35;
  }
  .step[aria-current='true'] .step__t { font-family: 'PoppinsMedium', sans-serif; font-weight: 500; }

  .step__track {
    position: absolute;
    left: 12px;
    right: 12px;
    bottom: 6px;
    height: 3px;
    background: transparent;
  }
  .step[aria-current='true'] .step__track { background: color-mix(in srgb, var(--ink-3) 35%, #fff); }
}

// Tablet and below: panel keeps overlaying the image, frame fills the width.
@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .carousel__track { aspect-ratio: 16 / 9.4; }
  .chart { padding-bottom: 200px; }
}

@media only screen and (max-width: 767px) {
  .features__lead { margin-top: 12px; }
  .carousel { margin-top: 20px; }
  .carousel__track { aspect-ratio: auto; }
  .slide__bar { height: 30px; }
  .slide__media { flex: none; }
  .slide__img { position: static; height: auto; aspect-ratio: 16 / 9; }
  .slide__panel { position: static; flex: 1; padding: 16px 16px 18px; border-radius: 0; background: #fff; -webkit-backdrop-filter: none; backdrop-filter: none; border-top: 1px solid var(--brand-5); box-shadow: none; }
  .slide__title { font-size: 1.9rem; }
  .slide__desc { font-size: 1.5rem; }
  .slide__live { margin-top: 6px; }
  .chart { padding: 16px 16px 18px; gap: 8px; }
  .chart__row { grid-template-columns: 104px minmax(0, 1fr); gap: 8px; min-height: 32px; font-size: 1.5rem; }
  .chart__track { height: 26px; }
  .chart__val { font-size: 1.5rem; }
  .ctl--prev, .ctl--next { display: none; }
  .carousel__controls { margin-top: 4px; }
}
</style>
