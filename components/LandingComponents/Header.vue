<template>
  <div class="header">
    <div class="header__logo"
         @click="openMainPage"
         :style="{'background-image': `url(${store && logos[store] ? logos[store] : logos.Wineater})`}"></div>
    <div class="header__links" v-if="showLinks">
      <div class="header__link p1 color-text" @click="scrollToBlock('.algorithm-info')">{{ $t('Header.About') }}</div>
      <div class="header__link p1 color-text" @click="scrollToBlock('.science-behind')">{{ $t('Header.TryMe') }}</div>
      <div class="header__link p1 color-text" @click="scrollToBlock('.for-whom')">{{ $t('Header.ForWhom') }}</div>
      <div class="header__link p1 color-text" @click="scrollToBlock('.how-it-works')">{{
          $t('Header.HowItWorks')
        }}
      </div>
    </div>
    <div class="header__right-container">
      <div class="header__btns">
        <LangSwitcher></LangSwitcher>
        <div class="header__btn">
          <Button @btnClick="openDemoPage">{{ $t('playground.BookDemo') }}</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const route = useRoute()
const store = ref(route.query.store ? route.query.store : '')
</script>
<script>
import Button from "~/components/Buttons/Button.vue";
import LangSwitcher from "~/components/Buttons/LangSwitcher.vue";


export default {
  components: {
    Button,
    LangSwitcher,
  },
  props: {
    showLinks: {
      type: Boolean
    },
    logo: {
      type: String,
      default: 'Wineater',
    }
  },
  data: () => {
    return {
      logos: {
        Wineater: 'https://landing-static.s3.eu-central-1.amazonaws.com/images/logo.svg',
        Telckel: 'https://landing-static.s3.eu-central-1.amazonaws.com/images/Telckel.png',
        Climats: 'https://landing-static.s3.eu-central-1.amazonaws.com/images/Climats.png'
      }
    }
  },
  methods: {
    openDemoPage() {
      window.open('https://share-eu1.hsforms.com/1UgO6pMx2T76UXxvPdYCRpw2degs8', '_blank')
    },
    openMainPage() {
      navigateTo('/');
    },
    scrollToBlock(block) {
      const element = document.querySelector(block);
      window.scrollTo({
        top: element.offsetTop - 200,
        behavior: 'smooth',
      })
    }
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

.header__right-container {
  display: flex;
  align-items: center;
}

.header__links {
  display: flex;
  gap: 24px;
}

.header__link {
  cursor: pointer;
  transition: .3s;

  &:hover {
    color: var(--brand-1);
  }
}

.header__logo {
  height: 54px;
  width: 273px;
  cursor: pointer;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: left center;
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
  .header__btn {
    display: none;
  }
  .header__links {
    display: none;
  }
}

@media only screen and (max-width: 767px) {
  .header {
    height: 60px;
    padding-left: 28px;
    width: calc(100% - 36px);
    left: 16px;
    padding-right: 11px;
    top: 16px;
  }
  .header__logo {
    height: 38px;
    width: 157px;

    &--wineater {
      background-image: url(https://landing-static.s3.eu-central-1.amazonaws.com/images/logo-small.svg) !important;
    }
  }
}
</style>
