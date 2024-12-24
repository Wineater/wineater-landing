<template>
  <div class="skeleton-wrapper">
    <!-- Header Skeleton with dynamic logo and title -->
    <div class="skeleton-header">
      <img :src="store && logos[storeKey] ? logos[storeKey] : logos.Wineater" alt="Logo" class="dynamic-logo" v-if="store" />
      <h1 class="h3" v-if="store">{{ storeKey }}</h1>
      <div v-else class="skeleton-logo"></div>
      <div v-if="!store" class="skeleton-title"></div>
    </div>

    <!-- Main Content -->
    <div class="skeleton-content">
      <!-- Sidebar Filters Skeleton -->
      <div class="skeleton-sidebar">
        <div class="skeleton-filter" v-for="n in 10" :key="`filter-${n}`"></div>
      </div>

      <!-- Product Cards Skeleton -->
      <div class="skeleton-cards">
        <div class="skeleton-card" v-for="n in 9" :key="`card-${n}`">
          <div class="skeleton-card-image"></div>
          <div class="skeleton-card-text"></div>
          <div class="skeleton-card-text"></div>
          <div class="skeleton-card-text shorter"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkeletonScreen',
  data() {
    return {
      store: null, // Will hold the dynamic title based on the URL parameter
      logoUrl: null, // Will hold the dynamic logo URL
      storeKey: null
    };
  }
}
</script>

<script setup>
const logos = {
  Wineater: 'https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/logo.svg',
  Telckel: 'https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/Telckel.png',
  Climats: 'https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/Climats.png',
  Biobio: 'https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/Biobio.png',
  Weinpoint: 'https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/Weinpoint.png'
};

const route = useRoute()
const store = route.params.id;
const storeKey = (store || '').toString().charAt(0).toUpperCase() + store.slice(1);
</script>


<style scoped>
.skeleton-wrapper {
  display: flex;
  flex-direction: column;
}

.skeleton-header {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #f0f0f0;
}

.dynamic-logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
}

.skeleton-logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ccc;
  margin-right: 1rem;
}

.skeleton-title {
  flex-grow: 1;
  height: 24px;
  background-color: #ccc;
}

.skeleton-content {
  display: flex;
}

.skeleton-sidebar {
  flex-basis: 200px;
  padding: 1rem;
  background-color: #f0f0f0;
}

.skeleton-filter {
  height: 20px;
  background-color: #ccc;
  margin-bottom: 1rem;
  &:last-child {
    margin-bottom: 0;
  }
}

.skeleton-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  padding: 1rem;
  flex-grow: 1;
}

.skeleton-card {
  background-color: #eee;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.skeleton-card-image {
  width: 100%;
  height: 160px;
  background-color: #ccc;
  margin-bottom: 1rem;
}

.skeleton-card-text {
  height: 10px;
  background-color: #ccc;
  margin-bottom: 0.5rem;
  
  &.shorter {
    width: 80%;
  }
}
</style>