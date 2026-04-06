<template>
  <div class="client-logos">
    <p class="client-logos__label">{{ $t('Clients.title') }}</p>
    <div class="client-logos__grid">
      <div class="client-logos__item" v-for="client in clients" :key="client.name">
        <span class="client-logos__name">{{ client.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const clients = [
  { name: 'Lenez' },
  { name: 'Toymart' },
  { name: 'Metro Cash & Carry' },
  { name: 'Intermarché' },
];
</script>

<style scoped lang="scss">
.client-logos {
  padding: 32px 0 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.client-logos__label {
  font-family: 'PoppinsRegular', sans-serif;
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #C1C1C1;
}

.client-logos__grid {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.client-logos__item {
  padding: 12px 28px;
  border: 1.5px solid #EDEDED;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s;

  &:hover {
    border-color: #C1C1C1;
  }
}

.client-logos__name {
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 15px;
  color: #696969;
  white-space: nowrap;
}

@media only screen and (max-width: 600px) {
  .client-logos {
    padding: 24px 0 32px;
  }

  .client-logos__grid {
    gap: 12px;
  }

  .client-logos__item {
    padding: 10px 20px;
  }

  .client-logos__name {
    font-size: 13px;
  }
}
</style>
