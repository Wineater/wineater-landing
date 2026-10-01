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
  left: var(--gutter, 24px);
  right: var(--gutter, 24px);
  bottom: 16px;
  z-index: 10000;
  max-width: calc(var(--container, 1200px) - 2 * var(--gutter, 24px));
  margin: 0 auto;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 32px;
  background: #fff;
  color: var(--ink);
  border: 1px solid var(--brand-5);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(26, 20, 38, 0.18);
}

.cookie-banner__body {
  flex: 1;
  min-width: 0;
}

.cookie-banner__title {
  margin: 0 0 4px;
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 1.6rem;
  line-height: 1.3;
  color: var(--ink);
}

.cookie-banner__text {
  margin: 0;
  font-size: 1.5rem;
  line-height: 1.5;
  color: var(--ink);
  max-width: 78ch;
}

.cookie-banner__link {
  color: var(--link);
  text-decoration: underline;
  text-underline-offset: 3px;

  &:focus-visible {
    outline: 3px solid var(--brand-1);
    outline-offset: 2px;
    border-radius: 4px;
  }
}

.cookie-banner__actions {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
}

.cookie-banner__btn {
  min-height: 48px;
  min-width: 128px;
  padding: 0 24px;
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 1.5rem;
  color: #fff;
  background: var(--brand-1);
  border: 2px solid var(--brand-1);
  border-radius: 999px;
  cursor: pointer;

  &:hover { background: var(--link); border-color: var(--link); }

  &:focus-visible {
    outline: 3px solid var(--ink);
    outline-offset: 2px;
  }
}

@media (max-width: 767px) {
  .cookie-banner {
    left: 8px;
    right: 8px;
    bottom: 8px;
    padding: 14px 16px;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    max-height: calc(100dvh - 16px);
    overflow-y: auto;
  }

  .cookie-banner__title { font-size: 1.5rem; margin-bottom: 2px; }
  .cookie-banner__text { font-size: 1.5rem; line-height: 1.4; }
  .cookie-banner__actions { width: 100%; gap: 8px; }
  .cookie-banner__btn { flex: 1; min-width: 0; min-height: 44px; padding: 0 12px; }
}
</style>
