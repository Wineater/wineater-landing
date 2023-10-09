<template>
  <div>
    <NuxtPage/>
  </div>
</template>

<script setup>
onMounted( () => {
  const {$startTracking} = useNuxtApp()
  $startTracking()
})
</script>
