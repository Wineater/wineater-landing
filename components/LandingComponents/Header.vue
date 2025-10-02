<template>
  <div class="header">
    <div class="header__logo"
         @click="openMainPage"
         :style="{'background-image': `url(${store && logos[store] ? logos[store] : logos.Wineater})`}"></div>
    <div class="header__links" v-if="showLinks">
      <div class="header__link p1 color-text" @click="scrollToBlock('.widget-home')">{{ $t('Header.TryMe') }}</div>
      <div class="header__link p1 color-text" @click="scrollToBlock('.for-whom')">{{
          $t('Header.ForWhom')
        }}
      </div>
      <div class="header__link p1 color-text" @click="scrollToBlock('.how-it-works')">{{
          $t('Header.HowItWorks')
        }}
      </div>
    </div>
    <div class="header__right-container">
      <div class="header__btns">
<!--        <LangSwitcher></LangSwitcher>-->
        <div class="header__btn">
          <Button class="full-height-btn" @btnClick="openDemoPage">{{ $t('playground.BookDemo') }}</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Button from "~/components/Buttons/Button.vue";
// import LangSwitcher from "~/components/Buttons/LangSwitcher.vue";

const route = useRoute();
const router = useRouter();
const store = ref(route.query.store ? route.query.store : '');

// Props
const props = defineProps({
  showLinks: Boolean,
  logo: {
    type: String,
    default: 'Wineater',
  }
});

// Data
const logos = {
  Wineater: 'https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/logo.svg',
  Telckel: 'https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/Telckel.png',
  Climats: 'https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/Climats.png'
};

// Methods
const openMainPage = () => {
  if (route.path === '/') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  } else {
    router.push('/');
  }
};

const openDemoPage = () => {
  window.open('https://share-eu1.hsforms.com/1kziM_bz_TDqsB5emVJbReA2ehswf', '_blank');
};

const scrollToBlock = (block) => {
  const element = document.querySelector(block);
  window.scrollTo({
    top: element.offsetTop - 150,  // as the contewnt wasnt loading becasue it ddint reach the viewport
    behavior: 'smooth',
  });
};
</script>
<style scoped lang="scss">
.header {
  display: flex;
  position: fixed;
  z-index: 10000;
  height: 80px;
  top: 32px;
  left: 10%;
  border-radius: 40px;
  padding: 0px 0px 0px 40px;
  width: calc(100% - 20%);
  box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(7.5px);
  align-items: center;
  justify-content: space-between;
}

.header__right-container {
  display: flex;
  align-items: center;
  height: 100%;
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
  height: 100%;
  gap: 24px;
}

.header__btn {
  height: 100%;
  display: flex;
}

/* Add this class to style the full-height button */
:deep(.full-height-btn) {
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 59px;
  padding: 0 40px;
  margin: 0;
}

@media only screen and (max-width: 1440px) {
  .header {
    height: 70px;
    padding: 0px 0px 0px 40px;
    width: calc(100% - 80px);
    left: 40px;
  }
  .header__logo {
    height: 44px;
    width: 220px;
  }
  :deep(.full-height-btn) {
    border-radius: 45px;
    padding: 0 30px;
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
      background-image: url(https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/logo-small.svg) !important;
    }
  }
}
</style>