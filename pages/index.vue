<template>
  <div>
    <!--    <label for="language">Select Language:</label>-->
    <!--    <select id="language" v-model="selectedLanguage" @change="changeLanguage">-->
    <!--      <option v-for="locale in supportedLocales" :key="locale.code" :value="locale.code">{{ locale.name }}</option>-->
    <!--    </select>-->
    <LangSwitcher></LangSwitcher>
    <p>{{ $t('about') }}</p> {{ message }}
    <div v-for="(wineDetail, index) in results" :key="index">
      <div class="wine-image">
      <img :src="wineDetail.Image" alt="Wine Image" />
    </div>
    <div class="wine-info">
      <h2>{{ wineDetail.Title }}</h2>
      <p>
        <strong>Appellation:</strong> {{ wineDetail.Appellation }}
      </p>
      <p>
        <strong>Country:</strong> {{ wineDetail.Country }}
      </p>
      <p>
        <strong>Region:</strong> {{ wineDetail.Region }}
      </p>
      <p>
        <strong>Grape:</strong> {{ wineDetail.Grape }}
      </p>
      <p>
        <strong>Type:</strong> {{ wineDetail.Type }}
      </p>
      <p>
        <strong>Price:</strong> {{ wineDetail.Price }}
      </p>
      <p>
        <strong>Producer:</strong> {{ wineDetail.Producer }}
      </p>
      <p>
        <strong>Store:</strong> {{ wineDetail.Store }}
      </p>
      <a :href="wineDetail.Url" target="_blank" rel="noopener noreferrer">More Info</a>
    </div>
    </div>
  </div>
</template>

<script setup>
import { fetchRecommendations } from '../services/api-layer';

const message = ref('Hello, Nuxt 3');
</script>

<script>
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
    changeLanguage() {
      this.$i18n.locale = this.selectedLanguage;
      localStorage.setItem('selectedLanguage', this.selectedLanguage);
    },
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
