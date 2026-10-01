<template>
  <div class="widget-home" :class="{ 'visible': visible }">
    <h2 id="demo-title" class="h2 color-brand-6">
      {{ $t('WidgetHome.title') }}
    </h2>

    <p class="widget-description p1">
      {{ $t('WidgetHome.description') }}
    </p>

    <div class="widget-examples" role="group" :aria-label="$t('WidgetHome.examplesLabel')">
      <span class="widget-examples-label">{{ $t('WidgetHome.examplesLabel') }}</span>
      <button
        v-for="prompt in prompts"
        :key="prompt"
        type="button"
        class="widget-example"
        @click="runExample(prompt)"
      >
        {{ prompt }}
      </button>
    </div>

    <div id="wineater-widget-conteiner" ref="container"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { DEMO_CLIENT_TOKEN, DEMO_STORE_LANGUAGES, DEFAULT_AUDIENCE, demoPrompts } from '~/data/demo';

defineProps({ visible: { type: Boolean, default: false } });

const WIDGET_SRC = 'https://unpkg.com/wineater-bot@4.16.1/dist/wineater-chatbot.mjs';

const { locale } = useI18n();
// Same state as the hero tabs: example prompts follow the active audience.
const audience = useState('audience', () => DEFAULT_AUDIENCE);
const prompts = computed(() => (demoPrompts[audience.value] || demoPrompts[DEFAULT_AUDIENCE])[locale.value === 'fr' ? 'fr' : 'en']);
const container = ref(null);

let observer = null;
let intersection = null;
let searchPending = false;
let lastCount = 0;

const tiles = () => container.value?.querySelectorAll('.wr-WineTile').length ?? 0;

// The widget reads ?lang= only when the store lists that language; otherwise it ignores it.
// We set it only for supported locales, so an unsupported locale changes nothing.
function applyWidgetLang() {
  try {
    if (!DEMO_STORE_LANGUAGES.includes(locale.value)) return;
    const url = new URL(window.location.href);
    if (url.searchParams.get('lang') === locale.value) return;
    url.searchParams.set('lang', locale.value);
    window.history.replaceState(window.history.state, '', url);
  } catch {
    /* never block the widget on a URL problem */
  }
}

function setupWidget() {
  applyWidgetLang();
  window.wineaterData = {
    CLIENT_TOKEN: DEMO_CLIENT_TOKEN,
    TYPE: 'widget',
    WIDGET_TYPE: 'store',
    WIDGET_WRAPPER: 'wineater-widget-conteiner',
    apiVersion: 2
  };
  // The bundle mounts once, when it is evaluated. A fresh query string makes the
  // browser evaluate it again if this component is mounted a second time.
  const src = window.__wineaterWidgetLoaded ? `${WIDGET_SRC}?m=${Date.now()}` : WIDGET_SRC;
  window.__wineaterWidgetLoaded = true;
  import(/* @vite-ignore */ src).catch((error) => console.error('[wineater] widget failed to load', error));
}

function onSubmit(event) {
  if (!event.target.closest?.('.wr-Search')) return;
  const input = event.target.querySelector('.wr-Search-input');
  const query = (input?.value || '').trim();
  if (!query) return;
  searchPending = true;
  track('widget_search_submit', { query_length: query.length, language: locale.value });
}

function onClick(event) {
  const link = event.target.closest?.('.wr-WineTile-action--link');
  if (!link) return;
  const tile = link.closest('.wr-WineTile');
  track('widget_wine_click', {
    wine_title: (tile?.querySelector('.wr-WineTile-title')?.textContent?.trim() || '').slice(0, 100)
  });
}

function onMutate() {
  const count = tiles();
  if (searchPending && count > 0 && lastCount === 0) {
    searchPending = false;
    track('widget_results_shown', { results_count: count, language: locale.value });
  }
  lastCount = count;
}

function runExample(text, attempt = 0) {
  const input = container.value?.querySelector('.wr-Search-input');
  const form = input?.closest('form');
  if (!input || !form) {
    if (attempt < 20) setTimeout(() => runExample(text, attempt + 1), 250);
    return;
  }
  input.focus();
  input.value = text;
  input.dispatchEvent(new Event('input', { bubbles: true }));
  setTimeout(() => form.requestSubmit(), 0);
}

onMounted(() => {
  const el = container.value;
  el.addEventListener('submit', onSubmit, true);
  el.addEventListener('click', onClick);
  observer = new MutationObserver(onMutate);
  observer.observe(el, { childList: true, subtree: true });

  if ('IntersectionObserver' in window) {
    intersection = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      intersection.disconnect();
      setupWidget();
    }, { rootMargin: '600px 0px' });
    intersection.observe(el);
  } else {
    setupWidget();
  }
});

onBeforeUnmount(() => {
  observer?.disconnect();
  intersection?.disconnect();
  container.value?.removeEventListener('submit', onSubmit, true);
  container.value?.removeEventListener('click', onClick);
});
</script>

<style lang="scss" scoped>
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

.widget-home {
  padding: 60px 0;
  animation: fadeUp 0.6s ease both;

  #wineater-widget-conteiner {
    width: 100%;
    min-height: 400px;
  }

  .widget-description {
    margin: 20px 0;
    font-size: 16px;
    line-height: 1.6;
    color: #666;
    max-width: 800px;
  }

  .widget-examples {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    min-height: 92px; // chips differ per tab: reserve the space so nothing jumps
    align-content: flex-start;
  }

  .widget-examples-label {
    font-size: 14px;
    color: #666;
  }

  .widget-example {
    padding: 10px 14px;
    min-height: 44px;
    border: 1px solid #d5d9ee;
    border-radius: 999px;
    background: #fff;
    color: inherit;
    font: inherit;
    font-size: 14px;
    cursor: pointer;

    &:hover,
    &:focus-visible {
      border-color: var(--wineater-corp-color, #8004FF);
    }
  }

  :deep(#wr-Custom) {
    min-width: 0;
    max-width: 100%;
    margin: 24px auto;
  }

  :deep(#wr-Custom .wr-Header) {
    display: none;
  }

  @media screen and (max-width: 768px) {
    :deep(#wr-Custom .wr-App-placeholder) {
      width: 100%;
      min-width: 0;
    }
  }
}
</style>