<template>
  <div class="widget-home" :class="{ 'visible': visible }">
    <h2 id="demo-title" class="h2 color-brand-6">
      {{ $t('WidgetHome.title') }}
    </h2>
    
    <p class="widget-description p1">
      Experience our AI-powered wine pairing technology. Simply describe your meal or occasion, and our digital sommelier will recommend the perfect wine from your inventory.
    </p>

    <div id="wineater-widget-conteiner"></div>
  </div>
</template>

<script setup>
import { watch } from 'vue';
import { useHead } from '#app';
import { useI18n } from 'vue-i18n';

defineProps({ visible: { type: Boolean, default: false } });

const { locale } = useI18n();

useHead({
  script: [
    {
      innerHTML: `window.wineaterData = {
        CLIENT_TOKEN: 'TOKEN',
        TYPE: 'widget',
        WIDGET_TYPE: 'store',
        WIDGET_WRAPPER: 'wineater-widget-conteiner'
      };`,
      tagPosition: 'bodyClose',
    },
    {
      src: 'https://unpkg.com/wineater-bot@3.4.4/dist/wineater-chatbot.mjs',
      type: 'module',
      tagPosition: 'bodyClose',
    },
  ],
});

watch(() => locale.value, () => {
  window.location.reload();
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
      background-color: #6600cc;
    }
  }
}
</style>