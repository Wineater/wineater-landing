<template>
  <div class="main-banner">
    <div class="main-banner__info">
      <h1 class="h1 main-banner__info-title color-text">Wine and food pairing</h1>
      <div class="main-banner__info-description">
        <p class="p1 color-text">Enhance a dining experience with the AI sommelier, ensuring <span class="color-brand-1">impeccable wine and food pairings</span> every time.</p>
        <div class="main-banner__info-hint"></div>
      </div>
    </div>
    <div class="main-banner__img"></div>
  </div>
</template>
<script setup>

</script>
<style scoped lang="scss">
.main-banner {
  display: flex;
  min-height: 1080px;
  padding-top: 244px;
}
.main-banner__info{
  display: flex;
  flex-direction: column;
  position: relative;
  width: 60%;
}
.main-banner__info-title{
  width: 868px;
  margin-bottom: 50px;
  z-index: 1;
}
.main-banner__info-description{
  max-width: 623px;
  position: relative;
}
.main-banner__info-hint{
  position: absolute;
  width: 381px;
  height: 172px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(assets/imgs/learn-more.png);
  bottom: -226px;
  right: -110px;
}
.main-banner__img{
  width: 40%;
  height: 992px;
  top: 0;
  right: 0;
  background-position: right top;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(assets/imgs/main-banner.png);
  position: absolute;
}
@media only screen and (max-width: 1440px) {
  .main-banner {
    align-items: flex-start;
    padding-top: 244px;
    min-height: 1024px;
  }
  .main-banner__info{
  }
  .main-banner__info-title{
    width: 763px;
    margin-bottom: 20px;
  }
  .main-banner__info-description{
    max-width: 368px;
  }
  .main-banner__info-hint{
    width: 298px;
    height: 148px;
    bottom: -167px;
    right: -85px;
  }
  .main-banner__img{
    //width: 710px;
    height: 771px;
    top: 50px;
  }
}
@media only screen and (max-width: 1280px) {
  .main-banner {
    padding-top: 214px;
    min-height: 720px;
  }
  .main-banner__info-title{
    width: 618px;
  }
  .main-banner__info-description{
    max-width: 368px;
  }
  .main-banner__info-hint{
    bottom: -167px;
    right: -85px;
  }
  .main-banner__img{
    //width: 630px;
    height: 720px;
    margin-top: 50px;
  }
}
@media only screen and (max-width: 1024px) {
  .main-banner {
    padding-top: 229px;
    min-height: 720px;
  }
  .main-banner__info-title{
    width: 442px;
  }
  .main-banner__info-description{
    max-width: 368px;
  }
  .main-banner__info-hint{
    width: 250px;
    height: 123px;
    bottom: -167px;
    right: -21px;
  }
  .main-banner__img{
    width: 50%;
  }
  .main-banner__info{
    width: 50%;
  }
}
@media only screen and (max-width: 768px) {
  .main-banner {
    padding-top: 173px;
    min-height: auto;
    height: 600px;
  }
  .main-banner__info-title{
    width: 433px;
  }
  .main-banner__info-description{
    max-width: 344px;
  }
  .main-banner__info-hint{
    bottom: -161px;
    right: 34px;
  }
  .main-banner__img{
    width: 100%;
    max-width: 372px;
    height: 425px;
    top: 146px;
  }
  .main-banner__info{
    width: 100%;
  }
}
@media only screen and (max-width: 600px) {
  .main-banner {
    padding-top: 140px;
    min-height: auto;
    height: auto;
    flex-direction: column;
    width: calc(100vw + 16px);
  }
  .main-banner__info-title{
    width: 100%;
    max-width: 100%;
  }
  .main-banner__info-description{
    width: 100%;
    max-width: 100%;
  }
  .main-banner__info-hint{
    display: none;
  }
  .main-banner__img{
    position: relative;
    max-width: 100%;
    height: 361px;
    top: 0;
    right: 0;
    margin-right: -16px;
    margin-top: 0;
  }
  .main-banner__info{
    width: 100%;
  }
}

</style>
