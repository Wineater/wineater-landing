<template>
  <div
      class="how-it-works"
      :class="{
        'visible': visible,
        'how-it-works--fr': $i18n.locale === 'fr'
      }"
  >
    <h2 class="h2 color-brand-6">
      {{ $t('HowItWorks.title') }}
    </h2>
  </div>
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
.how-it-works {
  width: 100%;
  margin-top: 4rem; //on mobile it doesnt work anyway, ut ion desktop adds necessary spacing
  min-height: 680px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/graph-desktop.svg);
  opacity: 0;
  transition: 0.5s ease;
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
    background-image: url(https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/graph-tablet.svg);
    &--fr{
      background-image: url(https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/graph-tablet--fr.svg);
    }
  }
}

@media only screen and (max-width: 500px) {
  .how-it-works {
    height: 475px;
    background-position: center;
    background-image: url(https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/graph-mobile.svg);
    &--fr{
      background-image: url(https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/graph-mobile--fr.svg);
    }
  }
}
</style>

