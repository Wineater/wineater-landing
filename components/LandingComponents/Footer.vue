<template>
  <div class="footer">
    <div class="footer__content">
      <div class="footer__texts">
        <div class="footer__title color-brand-4 decorative-1">
          {{ $t('Footer.title') }}
        </div>
        <div class="footer__text h2 color-brand-4">
          {{ $t('Footer.text') }}
          <div class="footer__text-arrow"></div>
        </div>
        <div class="footer__btn">
          <Button @btnClick="openDemoPage">{{ $t('playground.BookDemo') }}</Button>
        </div>
      </div>
      <div class="footer__info">
        <div class="footer__logo"></div>
        <div class="footer__links">
          <a class="p1 color-brand-4" href="hi@wineater.com">hi@wineater.com</a>
<!--          <a class="p1 color-brand-4" href="tel:334563278">+33 456-32-78</a>-->
          <a class="p1 color-brand-4" href="https://instagram.com/ah_vladimir?igshid=MzRlODBiNWFlZA==" target="_blank">Instagram</a>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
.footer {
  width: 100%;
  height: 890px;
  background-size: cover;
  background-position: top center;
  background-image: url(https://landing-static.s3.eu-central-1.amazonaws.com/images/footer.webp);
}

.footer__content {
  max-width: 1920px;
  padding: 300px 80px 0 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin: 0 auto;
}

.footer__texts {
  display: flex;
  flex-direction: column;
  max-width: 900px;
  text-align: left;
}

.footer__text {
  padding-left: 161px;
  position: relative;
  margin-top: 22px;
  text-align: center;
}

.footer__text-arrow {
  position: absolute;
  left: 39px;
  top: 0;
  height: 137px;
  width: 109px;
  background-image: url(https://landing-static.s3.eu-central-1.amazonaws.com/images/footer-arrow.svg);
  background-size: contain;
  background-repeat: no-repeat;
}
.footer__btn{
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
.footer__links{
  display: flex;
  gap: 24px;
}
.footer__info{
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 32px;
  margin-top: auto;
}
.footer__logo{
  height: 44px;
  width: 220px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: left;
  background-image: url(https://landing-static.s3.eu-central-1.amazonaws.com/images/logo--white.svg);
}
@media only screen and (max-width: 1440px) {
  .footer{
    height: 722px;
  }
  .footer__content {
    padding-top: 220px;
  }
  .footer__texts {
    max-width: 668px;
  }
}
@media only screen and (max-width: 1024px) {
  .footer{
    height: 622px;
  }
  .footer__content {
    padding: 220px 40px 0 40px;
  }
  .footer__texts{
    max-width: 566px;
  }
  .footer__text-arrow {
    position: absolute;
    left: 96px;
    top: 0;
    height: 102px;
    width: 92px;
  }
}

@media only screen and (max-width: 768px) {
  .footer{
    height: 466px;
  }
  .footer__content {
    padding: 150px 24px 0 24px;
  }
  .footer__texts{
    max-width: 360px;
  }
  .footer__text{
    padding-left: 96px;
  }
  .footer__text-arrow {
    left: 35px;
    top: 0;
    height: 63px;
    width: 59px;
  }
  .footer__info{
    padding-bottom: 24px;
  }
}
@media only screen and (max-width: 650px) {
  .footer{
    height: auto;
    margin-top: 50px;
  }
  .footer__content {
    padding: 100px 16px 0 16px;
  }
  .footer__texts{
    max-width: 300px;
  }
  .footer__text {
    padding-left: 50px;
  }
  .footer__text-arrow {
    left: 6px;
    top: 0;
    height: 49px;
    width: 50px;
  }
  .footer__info{
    flex-direction: column;
    gap: 40px;
    margin-top: 64px;
  }
  .footer__links{
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
}
</style>
<script>
import Button from "~/components/Buttons/Button.vue";

export default {
  components: {
    Button,
  },
  methods: {
    openDemoPage() {
      window.open('https://share-eu1.hsforms.com/1kziM_bz_TDqsB5emVJbReA2ehswf', '_blank')
    },
  },
};
</script>
