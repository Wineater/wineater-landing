<template>
  <div class="widget-home" :class="{ 'visible': visible }">
    <h2 class="h2 color-brand-6">
      {{ $t('WidgetHome.title') }}
    </h2>
    <div id="wineater-widget-conteiner"></div>

    <button v-if="showReloadButton" @click="reinitializeWidget" class="reload-button">
      Reload AI Sommelier Widget
    </button>
  </div>
</template>

<script setup>
import { watch, ref, onMounted } from 'vue';
import { useHead } from '#app';
import { useI18n } from 'vue-i18n'; // Make sure this import matches your i18n setup

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});

const showReloadButton = ref(false);
const scriptsLoaded = ref(false);
const headScripts = ref([]);
const { locale } = useI18n();

// Function to load widget scripts
const loadWidgetScripts = () => {
  // First remove any existing scripts to force reinitialization
  scriptsLoaded.value = false;
  headScripts.value = [];

  // Short timeout to ensure DOM updates
  setTimeout(() => {
    headScripts.value = [
      {
        innerHTML: `window.wineaterData = {
          CLIENT_TOKEN: 'TOKEN',
          TYPE: 'widget',
          WIDGET_TYPE: 'store',
          WIDGET_WRAPPER: 'wineater-widget-conteiner'
        };`,
        id: 'wineater-config'
      },
      {
        src: 'https://unpkg.com/wineater-bot@latest/dist/wineater-chatbot.umd.js',
        type: 'module',
        id: 'wineater-module'
      }
    ];

    scriptsLoaded.value = true;

    // Show reload button after 5 seconds if widget might not have loaded
    setTimeout(() => {
      // Check if widget container is empty - this is a simple heuristic
      const container = document.getElementById('wineater-widget-conteiner');
      if (container && container.childElementCount === 0) {
        showReloadButton.value = true;
      }
    }, 5000);
  }, 100);
};

// Watch for visibility changes
watch(() => props.visible, (newValue) => {
  if (newValue) {
    loadWidgetScripts();
  }
}, { immediate: true });

// Watch for locale changes and reinitialize the widget
watch(() => locale.value, () => {
  if (props.visible) {
    // Clear widget container
    const container = document.getElementById('wineater-widget-conteiner');
    if (container) {
      container.innerHTML = '';
    }

    // Reload scripts
    loadWidgetScripts();
  }
});

// Use Nuxt's useHead to manage scripts reactively
useHead({
  script: headScripts
});

// Function to manually reinitialize widget
const reinitializeWidget = () => {
  showReloadButton.value = false;

  // Clear widget container
  const container = document.getElementById('wineater-widget-conteiner');
  if (container) {
    container.innerHTML = '';
  }

  loadWidgetScripts();
};

onMounted(() => {
  if (props.visible) {
    loadWidgetScripts();
  }
});
</script>

<style lang="scss" scoped>
.widget-home {
  padding: 60px 0;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }


  #wineater-widget-conteiner {
    width: 100%;
    min-height: 400px;
  }

  .reload-button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: var(--wineater-corp-color, #8004FF);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'PoppinsRegular', sans-serif;

    &:hover {
      background-color: darken(#8004FF, 10%);
    }
  }
}
</style>