<template>
  <div>
    <LangSwitcher></LangSwitcher>
    <p class="decorative-1">{{ $t('about') }}</p> {{ message }}

  </div>
</template>

<script setup>
const message = ref('Hello, Nuxt 3');
// export default {
//   data() {
//     return {
//       selectedLanguage: this.$i18n.locale,
//       supportedLocales: this.$i18n.locales,
//     };
//   },
//   methods: {
//     // changeLanguage() {
//     //   this.$i18n.locale = this.selectedLanguage;
//     //   localStorage.setItem('selectedLanguage', this.selectedLanguage);
//     // },
//   },
// };
</script>
