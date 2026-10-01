<template>
  <!-- Floating accent card layered on the hero banner. Both cards stay mounted and only cross-fade. -->
  <div class="aud-scene" :class="`aud-scene--${audience}`" aria-hidden="true">
    <div class="aud-scene__card aud-scene__card--retail">
      <svg class="aud-scene__svg" viewBox="24 104 372 216" focusable="false">
        <rect x="24" y="302" width="372" height="10" rx="3" class="aud-scene__wood"/>
        <rect x="24" y="312" width="372" height="3" rx="1.500" class="aud-scene__shade"/>
        <g v-for="(b, i) in bottles" :key="`b${i}`">
          <g :transform="`translate(${b.x} ${302 - b.h})`">
            <path :d="bottlePath(b.h)" :class="b.tone"/>
            <rect x="6" :y="b.h * 0.56" width="32" height="44" rx="3" class="aud-scene__paper"/>
            <path :d="`M12 ${b.h * 0.56 + 14}h20M12 ${b.h * 0.56 + 24}h14`" class="aud-scene__ink"/>
          </g>
        </g>
      </svg>
    </div>

    <div class="aud-scene__card aud-scene__card--restaurants">
      <svg class="aud-scene__svg" viewBox="24 104 372 216" focusable="false">
        <rect x="24" y="302" width="372" height="10" rx="5" class="aud-scene__wood"/>
        <g v-for="(g, i) in glasses" :key="`g${i}`">
          <g :transform="`translate(${g.x} ${302 - g.h})`">
            <path d="M0 0h56c2 34-8 70-28 74C8 70-2 34 0 0Z" class="aud-scene__glass"/>
            <path d="M1 34c8 4 18 2 27 0s19-4 27 0c-2 18-10 34-27 38C11 68 3 52 1 34Z" :class="g.tone"/>
            <path :d="`M28 74V${g.h - 6}M10 ${g.h - 2}h36`" class="aud-scene__stem"/>
          </g>
        </g>
        <g transform="translate(168 208) scale(1.4) rotate(-4 32 33)">
          <rect width="64" height="66" rx="8" class="aud-scene__paper aud-scene__paper--card"/>
          <g class="aud-scene__qr">
            <rect x="9" y="9" width="16" height="16" rx="2"/>
            <rect x="39" y="9" width="16" height="16" rx="2"/>
            <rect x="9" y="39" width="16" height="16" rx="2"/>
            <rect x="31" y="31" width="6" height="6"/><rect x="43" y="37" width="6" height="6"/><rect x="37" y="47" width="6" height="6"/><rect x="49" y="49" width="6" height="6"/>
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup>
defineProps({ audience: { type: String, default: 'retail' } });

const bottles = [
  { x: 52, h: 176, tone: 'aud-scene__bottle aud-scene__bottle--a' },
  { x: 130, h: 196, tone: 'aud-scene__bottle aud-scene__bottle--b' },
  { x: 208, h: 168, tone: 'aud-scene__bottle aud-scene__bottle--c' },
  { x: 286, h: 188, tone: 'aud-scene__bottle aud-scene__bottle--a' },
];
const glasses = [
  { x: 40, h: 150, tone: 'aud-scene__wine aud-scene__wine--a' },
  { x: 112, h: 150, tone: 'aud-scene__wine aud-scene__wine--b' },
  { x: 250, h: 150, tone: 'aud-scene__wine aud-scene__wine--a' },
  { x: 322, h: 150, tone: 'aud-scene__wine aud-scene__wine--b' },
];

const bottlePath = (h) =>
  `M15 0h14v38c0 12 15 16 15 40v${h - 78 - 8}a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V78c0-24 15-28 15-40Z`;
</script>

<style scoped lang="scss">
$ease: cubic-bezier(0.16, 1, 0.3, 1);

.aud-scene {
  position: relative;
  width: 100%;
  aspect-ratio: 372 / 216;
}

.aud-scene__card {
  position: absolute;
  inset: 0;
  padding: 10px 12px 6px;
  border-radius: 18px;
  background: #fff;
  border: 1px solid rgba(126, 39, 237, 0.18);
  box-shadow: 0 18px 36px -12px rgba(58, 20, 112, 0.35), 0 4px 10px rgba(58, 20, 112, 0.08);
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease-out, transform 0.5s $ease;
  pointer-events: none;
}

.aud-scene__card--restaurants { border-color: rgba(47, 192, 191, 0.7); }

.aud-scene--retail .aud-scene__card--retail,
.aud-scene--restaurants .aud-scene__card--restaurants {
  opacity: 1;
  transform: translateY(0);
}

.aud-scene__svg {
  display: block;
  width: 100%;
  height: 100%;
}

.aud-scene__wood { fill: var(--wine-wood); }
.aud-scene__shade { fill: rgba(58, 20, 110, 0.14); }
.aud-scene__paper { fill: var(--label-paper); }
.aud-scene__paper--card { stroke: rgba(58, 20, 110, 0.35); stroke-width: 2; }
.aud-scene__ink { stroke: rgba(58, 20, 110, 0.4); stroke-width: 2; stroke-linecap: round; fill: none; }
.aud-scene__qr rect { fill: var(--wine-deep); }
.aud-scene__bottle--a { fill: var(--wine-deep); }
.aud-scene__bottle--b { fill: #7E27ED; }
.aud-scene__bottle--c { fill: var(--wine-mid); }
.aud-scene__glass { fill: rgba(255, 255, 255, 0.7); stroke: var(--wine-deep); stroke-width: 2; stroke-linejoin: round; }
.aud-scene__wine--a { fill: #7E27ED; }
.aud-scene__wine--b { fill: var(--wine-deep); }
.aud-scene__stem { stroke: var(--wine-deep); stroke-width: 2.500; stroke-linecap: round; fill: none; }

@media (prefers-reduced-motion: reduce) {
  .aud-scene__card { transition: none; }
}
</style>
