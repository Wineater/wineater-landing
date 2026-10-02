<template>
  <div class="wl">
    <Button v-if="!open && !done" bg-color="outline" :aria-expanded="'false'" :aria-controls="formId" @btnClick="openForm">{{ $t('earlyAccess.join') }}</Button>

    <form v-if="open && !done" :id="formId" class="wl__form" novalidate @submit.prevent="submit">
      <div class="wl__field">
        <label :for="`${formId}-name`">{{ $t('earlyAccess.name') }}</label>
        <input :id="`${formId}-name`" ref="firstField" v-model="form.name" type="text" name="name" autocomplete="name" required maxlength="120">
      </div>
      <div class="wl__field">
        <label :for="`${formId}-business`">{{ $t('earlyAccess.business') }}</label>
        <input :id="`${formId}-business`" v-model="form.businessName" type="text" name="businessName" autocomplete="organization" maxlength="160">
      </div>
      <div class="wl__field">
        <label :for="`${formId}-email`">{{ $t('earlyAccess.email') }}</label>
        <input :id="`${formId}-email`" v-model="form.email" type="email" name="email" autocomplete="email" required maxlength="254">
      </div>
      <div class="wl__check">
        <input :id="`${formId}-gdpr`" v-model="form.gdprConsent" type="checkbox" :aria-invalid="gdprError ? 'true' : undefined" :aria-describedby="gdprError ? `${formId}-err` : undefined">
        <label :for="`${formId}-gdpr`">{{ $t('earlyAccess.gdpr') }} <a class="sol-link" href="mailto:hi@wineater.com">hi@wineater.com</a></label>
      </div>
      <p v-if="gdprError" :id="`${formId}-err`" class="wl__error" role="alert">{{ $t('SignupForm.gdprRequired') }}</p>
      <p v-if="error" class="wl__error" role="alert">{{ $t('SignupForm.error') }}</p>
      <Button :disabled="submitting" @btnClick="submit">{{ submitting ? $t('SignupForm.submitting') : $t('earlyAccess.submit') }}</Button>
    </form>

    <p v-if="done" ref="successRef" class="wl__done" role="status" tabindex="-1">{{ $t('earlyAccess.done') }}</p>
  </div>
</template>

<script setup>
import Button from '~/components/Buttons/Button.vue'

const props = defineProps({
  feature: { type: String, required: true }, // ai-ready-catalog | shopify-app
  titleId: { type: String, required: true },
})

const { locale, t } = useI18n()
const formId = `${props.titleId}-form`
const open = ref(false)
const done = ref(false)
const submitting = ref(false)
const error = ref(false)
const gdprError = ref(false)
const firstField = ref(null)
const successRef = ref(null)
const form = reactive({ name: '', businessName: '', email: '', gdprConsent: false })

const openForm = () => {
  open.value = true
  track('cta_click', { cta_label: t('earlyAccess.join'), location: `waitlist_${props.feature}` })
  nextTick(() => firstField.value?.focus())
}

const valid = () => form.name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())

const submit = async () => {
  error.value = false
  gdprError.value = false
  if (!valid()) { error.value = true; return }
  if (!form.gdprConsent) { gdprError.value = true; return }
  submitting.value = true
  try {
    await $fetch('/api/waitlist', {
      method: 'POST',
      body: { name: form.name, businessName: form.businessName, email: form.email, gdprConsent: true, feature: props.feature, locale: locale.value },
    })
    done.value = true
    // Same event whatever the page: the feature is the only parameter (never name, email or business).
    track('waitlist_signup', { feature: props.feature })
    nextTick(() => successRef.value?.focus())
  } catch {
    error.value = true
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped lang="scss">
.wl { margin-top: auto; padding-top: 8px; }
.wl__form { display: grid; gap: 12px; }
.wl__field { display: grid; gap: 4px; label { font-size: 1.4rem; color: var(--ink); } }

.wl__field input {
  min-height: 48px;
  padding: 0 14px;
  border: 1.5px solid var(--ink-3);
  border-radius: 10px;
  background: #fff;
  color: var(--ink);
  font-size: 1.6rem;

  &:focus-visible { outline: 3px solid var(--ink); outline-offset: 2px; }
}

.wl__check {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 1.3rem;
  line-height: 1.45;
  color: var(--ink-2);

  input { flex: none; width: 20px; height: 20px; margin-top: 2px; accent-color: var(--brand-1); }
  input:focus-visible { outline: 3px solid var(--ink); outline-offset: 2px; }
}

.wl__error { margin: 0; font-size: 1.4rem; color: #B3261E; }
.wl__done { margin: 0; padding: 14px 16px; border-radius: 12px; background: var(--brand-7); font-size: 1.6rem; color: var(--ink); &:focus { outline: none; } }
</style>
