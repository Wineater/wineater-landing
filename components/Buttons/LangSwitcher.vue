<template>
  <NuxtLink
      :to="switchLocalePath(otherLocale)"
      :hreflang="otherLocale"
      :lang="otherLocale"
      :aria-label="label"
      class="switcher"
      :class="{'switcher--active': locale === 'en'}"
      @click="track('cta_click', { cta_label: 'lang_switch_' + otherLocale, location: 'lang_switcher' })"
  >
    <span class="p1" :aria-current="locale === 'fr' ? 'true' : undefined">FR</span>
    <span class="p1" :aria-current="locale === 'en' ? 'true' : undefined">EN</span>
  </NuxtLink>
</template>
<script setup>
const {locale} = useI18n();
const switchLocalePath = useSwitchLocalePath();
const otherLocale = computed(() => (locale.value === 'fr' ? 'en' : 'fr'));
const label = computed(() => (otherLocale.value === 'en' ? 'Switch to English' : 'Passer en français'));
</script>
<style lang="scss">
.switcher {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 52px;
  background: rgba(51, 51, 51, 0.15);
  width: 108px;
  height: 58px;
  position: relative;
  cursor: pointer;
  gap: 16px;
  text-decoration: none;

  &:focus-visible {
    outline: 3px solid #7E27ED;
    outline-offset: 2px;
  }

  span {
    color: var(--text);
    position: relative;
    z-index: 1;
  }

  &:before {
    content: '';
    display: flex;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background-color: #FFFFFF;
    transition: .15s;
    left: 4px;
    top: 4px;
    z-index: 0;
    position: absolute;
  }
  &--active {
    background-color: rgba(126, 39, 237, 0.15);
    &:before {
      transform: translateX(50px);
    }
  }
}

@media only screen and (max-width: 1440px) {
  .switcher {
    width: 76px;
    height: 42px;
    gap: 12px;

    &:before {
      width: 34px;
      height: 34px;
      border-radius: 34px;
    }
    &--active{
      &:before{
        transform: translateX(35px);
      }
    }
  }
}
@media only screen and (max-width: 1024px) {
  .switcher {
    width: 68px;
    height: 38px;
    gap: 11px;

    &:before {
      width: 30px;
      height: 30px;
      border-radius: 34px;
    }
    &--active{
      &:before{
        transform: translateX(30px);
      }
    }
  }
}
</style>
