<template>
  <div
    v-if="isOpen"
    class="cookie-banner"
    role="dialog"
    aria-live="polite"
    :aria-label="$t('cookie.ariaLabel')"
    aria-describedby="cookie-banner-text"
  >
    <div class="cookie-banner__body">
      <p class="cookie-banner__title">{{ $t('cookie.title') }}</p>
      <p id="cookie-banner-text" class="cookie-banner__text">
        {{ $t('cookie.text') }}
        <NuxtLink class="cookie-banner__link" :to="localePath('/privacy')">{{ $t('cookie.learnMore') }}</NuxtLink>
      </p>
    </div>
    <div class="cookie-banner__actions">
      <button type="button" class="cookie-banner__btn" @click="reject">{{ $t('cookie.reject') }}</button>
      <button type="button" class="cookie-banner__btn" @click="accept">{{ $t('cookie.accept') }}</button>
    </div>
  </div>
</template>

<script setup>
const localePath = useLocalePath()
const { isOpen, accept, reject, init } = useConsent()

onMounted(() => {
  const fontsReady = document.fonts?.ready ?? Promise.resolve()
  Promise.race([fontsReady, new Promise(resolve => setTimeout(resolve, 1500))]).then(init)
})
</script>

<style scoped lang="scss">
.cookie-banner {
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 16px;
  z-index: 10000;
  max-width: 960px;
  margin: 0 auto;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 24px;
  background: #fff;
  color: var(--text);
  border: 1px solid var(--brand-5);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
}

.cookie-banner__body {
  flex: 1;
  min-width: 0;
}

.cookie-banner__title {
  margin: 0 0 4px;
  font-weight: 600;
  font-size: 16px;
}

.cookie-banner__text {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
}

.cookie-banner__link {
  color: var(--brand-1);
  text-decoration: underline;
  white-space: nowrap;

  &:focus-visible {
    outline: 2px solid var(--brand-1);
    outline-offset: 2px;
  }
}

.cookie-banner__actions {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
}

.cookie-banner__btn {
  min-height: 44px;
  min-width: 120px;
  padding: 0 24px;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  background: var(--brand-1);
  border: 2px solid var(--brand-1);
  border-radius: 999px;
  cursor: pointer;

  &:hover {
    filter: brightness(1.1);
  }

  &:focus-visible {
    outline: 3px solid var(--brand-2);
    outline-offset: 2px;
  }
}

@media (max-width: 640px) {
  .cookie-banner {
    left: 8px;
    right: 8px;
    bottom: 8px;
    padding: 16px;
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    max-height: calc(100vh - 16px);
    overflow-y: auto;
  }

  .cookie-banner__actions {
    width: 100%;
  }

  .cookie-banner__btn {
    flex: 1;
    min-width: 0;
  }
}
</style>
