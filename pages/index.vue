<template>
  <div>
    <!--    <label for="language">Select Language:</label>-->
    <!--    <select id="language" v-model="selectedLanguage" @change="changeLanguage">-->
    <!--      <option v-for="locale in supportedLocales" :key="locale.code" :value="locale.code">{{ locale.name }}</option>-->
    <!--    </select>-->
    <LangSwitcher></LangSwitcher>
    <p>{{ $t('about') }}</p> {{ message }}

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
