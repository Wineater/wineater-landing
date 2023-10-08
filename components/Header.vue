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
        <Button @btnClick="openDemoPage" :disabled="true">123123</Button>
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
    openDemoPage(name) {
      alert(`Hello, ${name}!`);
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
}
.header__btns{
  display: flex;
  align-items: center;
  gap: 24px;
}
</style>
