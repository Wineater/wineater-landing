<script lang="ts">
import { fetchRecommendations } from '../services/api-layer';

export default {
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    async handleInput() {
      try {
      const argument = 'кортоха с грибами'; // Get the argument from route params or any other source
      const apiData = await fetchRecommendations(argument);
      console.log(apiData);
      return { apiData };
    } catch (error) {
      console.error('Error in asyncData:', error);
    }
    },
  },
};

</script>

<template>
  <section>
    <div>
    <input
      v-model="searchQuery"
      @input="handleInput"
      placeholder="Search..."
    />
  </div>
  </section>
</template>
