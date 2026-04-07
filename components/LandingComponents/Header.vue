<template>
  <div class="header" :class="{ 'header--scrolled': scrolled }">
    <div class="header__logo"
         @click="openMainPage"
         :style="{'background-image': `url(${store && logos[store] ? logos[store] : logos.Wineater})`}"></div>

    <div class="header__links" v-if="showLinks">
      <div class="header__link p1" @click="scrollToBlock('.for-whom')">
        {{ $t('Header.ForRestaurants') }}
      </div>
      <div class="header__link p1" @click="scrollToBlock('.for-whom')">
        {{ $t('Header.ForStores') }}
      </div>
      <div class="header__link p1" @click="scrollToBlock('.how-it-works')">
        {{ $t('Header.HowItWorks') }}
      </div>
      <div class="header__link p1" @click="scrollToBlock('.widget-home')">
        {{ $t('Header.TryMe') }}
      </div>
    </div>

    <div class="header__right-container">
      <div class="header__btns">
        <div class="header__btn-ghost p1" @click="openDemoPage">
          {{ $t('playground.BookDemo') }}
        </div>
        <div class="header__btn-primary" @click="$emit('getStarted')">
          <span class="p1">{{ $t('Header.GetStarted') }}</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const route = useRoute();
const router = useRouter();
const store = ref(route.query.store ? route.query.store : '');
const scrolled = ref(false);

defineEmits(['getStarted']);

const props = defineProps({
  showLinks: Boolean,
  logo: { type: String, default: 'Wineater' }
});

const logos = {
  Wineater: 'https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/logo.svg',
  Telckel: 'https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/Telckel.png',
  Climats: 'https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/Climats.png'
};

const handleScroll = () => {
  scrolled.value = window.scrollY > 40;
};

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));

const openMainPage = () => {
  if (route.path === '/') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    router.push('/');
  }
};

const openDemoPage = () => {
  window.open('https://share-eu1.hsforms.com/1kziM_bz_TDqsB5emVJbReA2ehswf', '_blank');
};

const scrollToBlock = (block) => {
  const element = document.querySelector(block);
  if (element) {
    window.scrollTo({ top: element.offsetTop - 120, behavior: 'smooth' });
  }
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  position: fixed;
  z-index: 10000;
  height: 76px;
  top: 24px;
  border-radius: 40px;
  padding: 0 8px 0 40px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  left: calc(50% - 600px);
  align-items: center;
  justify-content: space-between;
  transition: background 0.3s, box-shadow 0.3s, backdrop-filter 0.3s;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.3);

  &--scrolled {
    background: rgba(255, 255, 255, 0.92);
    box-shadow: 0 4px 32px rgba(0, 0, 0, 0.08);
    border-color: transparent;
  }
}

.header__right-container {
  display: flex;
  align-items: center;
  height: 100%;
}

.header__links {
  display: flex;
  gap: 4px;
}

.header__link {
  cursor: pointer;
  padding: 8px 14px;
  border-radius: 20px;
  color: #333;
  font-family: 'PoppinsRegular', sans-serif;
  font-size: 14px;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: rgba(126, 39, 237, 0.07);
    color: #7E27ED;
  }
}

.header__logo {
  height: 44px;
  width: 220px;
  cursor: pointer;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: left center;
  flex-shrink: 0;
}

.header__btns {
  display: flex;
  align-items: center;
  height: 100%;
  gap: 8px;
}

.header__btn-ghost {
  padding: 0 20px;
  height: 44px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 59px;
  color: #333;
  font-family: 'PoppinsRegular', sans-serif;
  font-size: 14px;
  transition: background 0.2s;
  white-space: nowrap;

  &:hover {
    background: rgba(0, 0, 0, 0.06);
  }
}

.header__btn-primary {
  height: 52px;
  padding: 0 24px;
  border-radius: 59px;
  background: linear-gradient(135deg, #7E27ED 0%, #2FC0BF 100%);
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;
  margin: 12px 0;
  box-shadow: 0 4px 16px rgba(126, 39, 237, 0.25);

  span {
    color: #fff;
    font-family: 'PoppinsMedium', sans-serif;
    font-size: 14px;
    white-space: nowrap;
  }

  svg {
    color: #fff;
    flex-shrink: 0;
  }

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
}

@media only screen and (max-width: 1440px) {
  .header {
    height: 70px;
    width: calc(100% - 80px);
    left: 40px;
  }

  .header__logo {
    height: 38px;
    width: 190px;
  }
}

@media only screen and (max-width: 1100px) {
  .header__links {
    display: none;
  }
}

@media only screen and (max-width: 767px) {
  .header {
    height: 60px;
    width: calc(100% - 32px);
    left: 16px;
    top: 16px;
    padding-left: 20px;
    padding-right: 6px;
  }

  .header__logo {
    height: 34px;
    width: 160px;
  }

  .header__btn-ghost {
    display: none;
  }

  .header__btn-primary {
    height: 40px;
    padding: 0 16px;

    span {
      font-size: 13px;
    }
  }
}
</style>
