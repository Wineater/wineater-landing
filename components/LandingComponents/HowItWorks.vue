<template>
  <div
      class="how-it-works"
      :class="{
        'visible': visible,
        'how-it-works--fr': $i18n.locale === 'fr'
      }"
  ></div>
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
  height: 1080px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(assets/imgs/graph-desktop.svg);
  opacity: 0;
  transition: 1s ease;
  transform: translateY(100px);
  &--fr{
    background-image: url(assets/imgs/graph-desktop--fr.svg);
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
    background-image: url(assets/imgs/graph-tablet.svg);
    &--fr{
      background-image: url(assets/imgs/graph-tablet--fr.svg);
    }
  }
}

@media only screen and (max-width: 500px) {
  .how-it-works {
    height: 475px;
    background-position: center;
    background-image: url(assets/imgs/graph-mobile.svg);
    &--fr{
      background-image: url(assets/imgs/graph-mobile--fr.svg);
    }
  }
}
</style>

