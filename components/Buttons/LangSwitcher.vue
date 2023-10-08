<template>
 <div class="switcher"></div>
</template>
<script setup lang="ts">
const { locales, locale, setLocale } = useI18n();

const language = computed({
  get: () => locale.value,
  set: (value) => {
    setLocale(value);
  },
});
</script>
<style lang="scss">
.switcher{
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 52px;
  background: rgba(51, 51, 51, 0.15);
  padding: 4px;
  width: 108px;
  height: 58px;
  position: relative;
  &:before{
    content: '';
    display: flex;
    width: 50px;
    height: 50px;
    background-color: #FFFFFF;
    transition: .3s ease-in-out;
    left: 4px;
    top: 4px;
  }
}
</style>
