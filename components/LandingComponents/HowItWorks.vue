<template>
  <h2 class="h2 color-brand-6">
    {{ $t('HowItWorks.title') }}
  </h2>
  <div
      class="how-it-works"
      :class="{
        'visible': visible,
        'how-it-works--fr': $i18n.locale === 'fr'
      }"
  >
  </div>
<!--  <video class="hiw-animation" autoplay muted playsinline preload="auto" src="https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media//Wineater_how_it_works_optimized_1080.mp4"></video>-->
</template>
<script>
import Button from "~/components/Buttons/Button.vue";

export default {
  components: {
    Button,
  },
  props: {
    visible: Boolean,
  },
};
</script>

<style scoped lang="scss">
.hiw-animation{
  width: 100%;
  margin-bottom: 6rem;
  min-height: 680px;
  background-size: contain;
  background-repeat: no-repeat;
}
.how-it-works {
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 6rem;
  min-height: 680px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(assets/imgs/hiw-large.svg);
  opacity: 0;
  transition: 0.2s ease;
  transform: translateY(100px);
  &--fr{
    background-image: url(https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/graph-desktop--fr.svg);
  }
}

.how-it-works.visible {
  opacity: 1;
  transform: translateY(0px);
}

@media only screen and (max-width: 1440px) {
  .how-it-works {
    height: 770px;
  }
}

@media only screen and (max-width: 1280px) {
  .how-it-works {
    height: 680px;
  }
}

@media only screen and (max-width: 1024px) {
  .how-it-works {
    height: 680px;
    background-image: url(assets/imgs/howitworks_larger_transparent.png);
    &--fr{
      background-image: url(https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/graph-tablet--fr.svg);
    }
  }
}

@media only screen and (max-width: 500px) {
  .how-it-works {
    height: 475px;
    background-position: center;
    background-image: url(assets/imgs/hiw-mobile.svg);
    &--fr{
      background-image: url(https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/graph-mobile--fr.svg);
    }
  }
}
</style>

