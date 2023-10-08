<template>
  <div class="playground">
    <Header/>
  </div>
</template>

<script>
import {fetchRecommendations} from "~/services/api-layer.js";

export default {
  data() {
    return {
      selectedLanguage: this.$i18n.locale,
      supportedLocales: this.$i18n.locales,
      searchQuery: '',
      results: []
    };
  },
  methods: {
    async handleInput(query) {
      try {
        const argument = query; // Get the argument from route params or any other source
        const apiData = await fetchRecommendations(argument);
        this.results = apiData;
      } catch (error) {
        console.error('Error in asyncData:', error);
      }
    },
    clearResults() {
      this.results = []
    }
  },
};
</script>
<style lang="scss">
.playground {
  min-height: 100vh;
  background: var(--brand-7);
}
</style>
