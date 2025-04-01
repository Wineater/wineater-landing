<template>
  <div class="widget-home" :class="{ 'visible': visible }">
    <h2 class="h2 color-brand-6">
      {{ $t('WidgetHome.title') }}
    </h2>

    <!-- Use a keyed container that recreates completely when language changes -->
    <div v-if="mounted" :key="locale" id="wineater-widget-conteiner"></div>

    <button v-if="showReloadButton" @click="reloadPage" class="reload-button">
      Reload AI Sommelier Widget
    </button>
  </div>
</template>

<script setup>
import { watch, ref, onMounted } from 'vue';
import { useHead } from '#app';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});

const showReloadButton = ref(false);
const mounted = ref(false);
const { locale } = useI18n();

// Simply load the widget scripts once
const loadWidgetScripts = () => {
  // Short timeout to ensure DOM updates
  setTimeout(() => {
    const configScript = document.createElement('script');
    configScript.innerHTML = `window.wineaterData = {
      CLIENT_TOKEN: 'TOKEN',
      TYPE: 'widget',
      WIDGET_TYPE: 'store',
      WIDGET_WRAPPER: 'wineater-widget-conteiner'
    };`;
    document.head.appendChild(configScript);

    const moduleScript = document.createElement('script');
    moduleScript.type = 'module';
    moduleScript.src = 'https://unpkg.com/wineater-bot@latest/dist/wineater-chatbot.umd.js';
    document.head.appendChild(moduleScript);

    // Show reload button after 5 seconds if widget might not have loaded
    setTimeout(() => {
      const container = document.getElementById('wineater-widget-conteiner');
      if (container && container.childElementCount === 0) {
        showReloadButton.value = true;
      }
    }, 5000);
  }, 100);
};

// Force a page reload if manual refresh is needed
const reloadPage = () => {
  window.location.reload();
};

// Watch for visibility changes
watch(() => props.visible, (newValue) => {
  if (newValue && mounted.value) {
    loadWidgetScripts();
  }
}, { immediate: true });

// When language changes, force a page reload
watch(() => locale.value, () => {
  if (props.visible) {
    // Simple solution: reload the entire page on language change
    // This ensures the widget loads fresh with the new language
    window.location.reload();
  }
});

onMounted(() => {
  mounted.value = true;
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