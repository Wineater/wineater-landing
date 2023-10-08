<template>
  <div class="header">
    <div class="header__logo"></div>
    <div class="header__right-container">
      <!--      <div class="header__links">-->
      <!--        <div class="header__link">About</div>-->
      <!--        <div class="header__link">Try me</div>-->
      <!--        <div class="header__link">For whom</div>-->
      <!--        <div class="header__link">How it works</div>-->
      <!--      </div>-->
      <div class="header__btns">
        <LangSwitcher></LangSwitcher>
        <div class="header__btn">
          <Button @btnClick="openDemoPage">{{ $t('playground.BookDemo') }}</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Button from "~/components/Buttons/Button.vue";
import LangSwitcher from "~/components/Buttons/LangSwitcher.vue";


export default {
  components: {
    Button,
    LangSwitcher,
  },
  methods: {
    openDemoPage() {
      window.open('', '_blank')
    },
  },
};
</script>
<style scoped lang="scss">
.header {
  display: flex;
  position: fixed;
  z-index: 10000;
  height: 91px;
  top: 32px;
  left: 80px;
  border-radius: 59px;
  padding: 0px 6px 0px 40px;
  width: calc(100% - 160px);
  box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(7.5px);
  align-items: center;
  justify-content: space-between;
}

.header__links {
  display: flex;
  gap: 24px;
}

.header__logo {
  height: 54px;
  width: 273px;
  background-image: url(assets/imgs/logo.svg);
  cursor: pointer;
  background-size: contain;
  background-repeat: no-repeat;
}

.header__btns {
  display: flex;
  align-items: center;
  gap: 24px;
}

@media only screen and (max-width: 1440px) {
  .header {
    height: 70px;
    padding: 0px 3px 0px 40px;
    width: calc(100% - 80px);
    left: 40px;
  }
  .header__logo {
    height: 44px;
    width: 220px;
  }
}

@media only screen and (max-width: 1024px) {
  .header {
    height: 70px;
    padding-left: 31px;
  }
  .header__logo {
    height: 31px;
    width: 157px;
  }
  .header__btn{
    display: none;
  }
}

@media only screen and (max-width: 767px) {
  .header {
    height: 60px;
    padding-left: 28px;
    width: calc(100% - 24px);
    left: 12px;
    padding-right: 11px;
    top: 16px;
  }
  .header__logo {
    height: 38px;
    width: 30px;
    background-image: url(assets/imgs/logo-small.svg);
  }
}
</style>
