<template>
  <div class="algorithm-info" :class="{ 'visible': visible }">
    <h2 class="h2 color-text algorithm-info__text">
      {{ $t('algorithm.title1') }} <span class="color-brand-6">{{ $t('algorithm.title2') }}</span> {{$t('algorithm.title3') }}
    </h2>
    <NuxtLink to="/playground/all">
      <Button class="algorithm-info__btn">
        {{ $t('playground.FindAMatch') }}
      </Button>
    </NuxtLink>
  </div>
</template>
<script setup>
import Button from "~/components/Buttons/Button.vue";

const props = defineProps({
  visible: Boolean,
});
</script>

<style scoped lang="scss">
.algorithm-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 800px;
  opacity: 0;
  transition: 1s ease;
  transform: translateY(100px);
}

.algorithm-info__btn {
  margin-top: 48px;
}

.algorithm-info.visible {
  opacity: 1;
  transform: translateY(0px);
}

.algorithm-info__text {
  max-width: 1424px;
  text-align: center;
  width: 100%;
}

@media only screen and (max-width: 1440px) {
  .algorithm-info {
    min-height: 700px;
  }
  .algorithm-info__text {
    max-width: 1150px;
  }
}

@media only screen and (max-width: 1280px) {
  .algorithm-info {
    min-height: 620px;
  }
  .algorithm-info__text {
    max-width: 1150px;
  }
}

@media only screen and (max-width: 1024px) {
  .algorithm-info {
    transform: translateY(50px);
  }
  .algorithm-info__text {
    max-width: 751px;
  }
}

@media only screen and (max-width: 768px) {
  .algorithm-info {
    min-height: 500px;
    transform: translateY(50px);
  }
  .algorithm-info__text {
    max-width: 636px;
  }
}

@media only screen and (max-width: 600px) {
  .algorithm-info {
    padding: 60px 16px 80px 0px;
    min-height: auto;
    height: auto;
    transform: translateY(30px);
  }
  .algorithm-info__text {
    max-width: 100%;
  }
}
</style>

