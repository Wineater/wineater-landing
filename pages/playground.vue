<template>
  <Header :show-links="true"/>
  <div class="main-page">
    <StartBanner></StartBanner>
  </div>
</template>
<script setup lang="ts">
import StartBanner from "~/components/LandingComponents/StartBanner.vue";
</script>
<style lang="scss">
.main-page {
  max-width: 1920px;
  padding: 0 80px;
  margin: 0 auto;
}

@media only screen and (max-width: 768px) {
  .main-page {
    padding: 0 40px;
  }
}
@media only screen and (max-width: 600px) {
  .main-page {
    padding: 0 16px;
  }
}

</style>
