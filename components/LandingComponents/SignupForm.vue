<template>
  <div class="signup-overlay" @click.self="$emit('close')">
    <div
      ref="modal"
      class="signup-modal"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="submitted ? 'signup-success-title' : 'signup-title'"
      tabindex="-1"
      @keydown="onKeydown"
    >
      <button type="button" class="signup-modal__close" @click="$emit('close')" :aria-label="$t('SignupForm.close')">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
          <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>

      <div v-if="!submitted" class="signup-modal__content">
        <div class="signup-modal__logo" role="img" aria-label="Wineater"></div>
        <h2 id="signup-title" class="signup-modal__title">{{ $t('SignupForm.title') }}</h2>
        <p id="signup-subtitle" class="signup-modal__subtitle">{{ $t('SignupForm.subtitle') }}</p>

        <form class="signup-modal__form" aria-describedby="signup-subtitle" @submit.prevent="submit">
          <div class="signup-modal__field">
            <label class="signup-modal__label" for="signup-name">{{ $t('SignupForm.name') }}</label>
            <input
              id="signup-name"
              ref="firstField"
              v-model="form.name"
              class="signup-modal__input"
              type="text"
              name="name"
              required
              maxlength="120"
              autocomplete="name"
              :placeholder="$t('SignupForm.namePlaceholder')"
              :disabled="submitting"
            />
          </div>

          <div class="signup-modal__field">
            <label class="signup-modal__label" for="signup-business">{{ $t('SignupForm.businessName') }}</label>
            <input
              id="signup-business"
              v-model="form.businessName"
              class="signup-modal__input"
              type="text"
              name="businessName"
              required
              maxlength="160"
              autocomplete="organization"
              :placeholder="$t('SignupForm.businessNamePlaceholder')"
              :disabled="submitting"
            />
          </div>

          <div class="signup-modal__field">
            <label class="signup-modal__label" for="signup-email">{{ $t('SignupForm.email') }}</label>
            <input
              id="signup-email"
              v-model="form.email"
              class="signup-modal__input"
              type="email"
              name="email"
              required
              maxlength="254"
              autocomplete="email"
              :placeholder="$t('SignupForm.emailPlaceholder')"
              :disabled="submitting"
            />
          </div>

          <div class="signup-modal__field">
            <label class="signup-modal__label" for="signup-menu">
              {{ $t('SignupForm.menuFile') }}
              <span class="signup-modal__label-optional">{{ $t('SignupForm.optional') }}</span>
            </label>
            <div class="signup-modal__file-label" :class="{ 'has-file': !!menuFile, 'is-disabled': submitting }">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" focusable="false">
                <path d="M3 13V15H15V13M9 3V11M9 3L6 6M9 3L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>{{ menuFile ? menuFile.name : $t('SignupForm.menuFilePlaceholder') }}</span>
              <input
                id="signup-menu"
                ref="fileInput"
                type="file"
                name="menu"
                accept=".pdf,.csv,.xlsx,.xls,.png,.jpg,.jpeg"
                class="signup-modal__file-input"
                aria-describedby="signup-menu-hint"
                :disabled="submitting"
                @change="onFileChange"
              />
            </div>
            <p id="signup-menu-hint" class="signup-modal__field-hint">{{ $t('SignupForm.menuFileHint') }}</p>
          </div>

          <label class="signup-modal__gdpr" for="signup-gdpr" :class="{ 'signup-modal__gdpr--error': gdprError }">
            <input
              id="signup-gdpr"
              v-model="form.gdprConsent"
              type="checkbox"
              name="gdprConsent"
              class="signup-modal__gdpr-check"
              :aria-invalid="gdprError ? 'true' : undefined"
              :aria-describedby="gdprError ? 'signup-gdpr-error' : undefined"
              :disabled="submitting"
              @change="gdprError = false"
            />
            <span class="signup-modal__gdpr-text">
              {{ $t('SignupForm.gdprText') }}
              <a href="mailto:hi@wineater.com">hi@wineater.com</a>.
            </span>
          </label>
          <p v-if="gdprError" id="signup-gdpr-error" class="signup-modal__error" role="alert">{{ $t('SignupForm.gdprRequired') }}</p>

          <p v-if="error" class="signup-modal__error" role="alert">{{ $t('SignupForm.error') }}</p>

          <button class="signup-modal__submit" type="submit" :disabled="submitting">
            {{ submitting ? $t('SignupForm.submitting') : $t('SignupForm.submit') }}
          </button>
        </form>
      </div>

      <div v-else class="signup-modal__success">
        <div class="signup-modal__success-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
            <circle cx="24" cy="24" r="24" fill="#7E27ED"/>
            <path d="M14 24L21 31L34 17" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h2 id="signup-success-title" ref="successTitle" class="signup-modal__title" tabindex="-1">{{ $t('SignupForm.successTitle') }}</h2>
        <div class="signup-modal__next" role="status">
          <p class="signup-modal__next-title">{{ $t('SignupForm.nextTitle') }}</p>
          <ol class="signup-modal__next-list">
            <li>{{ $t('SignupForm.next1') }}</li>
            <li>{{ $t('SignupForm.next2', { email: submittedEmail }) }}</li>
          </ol>
        </div>
        <button type="button" class="signup-modal__demo-link" @click="tryDemo">
          {{ $t('SignupForm.successDemo') }}
        </button>
        <button type="button" class="signup-modal__submit" @click="$emit('close')">
          {{ $t('SignupForm.close') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick, onMounted, onBeforeUnmount } from 'vue';

const emit = defineEmits(['close']);

const form = reactive({ name: '', businessName: '', email: '', gdprConsent: false });
const menuFile = ref(null);
const fileInput = ref(null);
const modal = ref(null);
const firstField = ref(null);
const successTitle = ref(null);
const submitting = ref(false);
const submitted = ref(false);
const submittedEmail = ref('');
const error = ref(false);
const gdprError = ref(false);

let previouslyFocused = null;
let previousOverflow = '';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const onKeydown = (e) => {
  if (e.key === 'Escape') {
    e.stopPropagation();
    emit('close');
    return;
  }
  if (e.key !== 'Tab' || !modal.value) return;
  const items = [...modal.value.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);
  if (!items.length) return;
  const first = items[0];
  const last = items[items.length - 1];
  if (e.shiftKey && (document.activeElement === first || document.activeElement === modal.value)) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
};

const onDocumentKeydown = (e) => {
  if (e.key === 'Escape' && !modal.value?.contains(e.target)) emit('close');
};

onMounted(() => {
  previouslyFocused = document.activeElement;
  previousOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onDocumentKeydown);
  track('signup_modal_open');
  nextTick(() => (firstField.value || modal.value)?.focus());
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.style.overflow = previousOverflow;
  if (previouslyFocused && typeof previouslyFocused.focus === 'function') previouslyFocused.focus();
});

const onFileChange = (e) => {
  menuFile.value = e.target.files?.[0] ?? null;
};

const tryDemo = () => {
  emit('close');
  nextTick(() => {
    document.getElementById('ai-sommelier')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
};

const submit = async () => {
  track('signup_submit_attempt');

  if (!form.gdprConsent) {
    gdprError.value = true;
    return;
  }

  submitting.value = true;
  error.value = false;

  try {
    const body = new FormData();
    body.append('name', form.name);
    body.append('businessName', form.businessName);
    body.append('email', form.email);
    body.append('gdprConsent', String(form.gdprConsent));
    if (menuFile.value) body.append('menu', menuFile.value);

    await $fetch('/api/register', { method: 'POST', body });
    submittedEmail.value = form.email.trim();
    submitted.value = true;
    track('signup_success');
    nextTick(() => successTitle.value?.focus());
  } catch {
    error.value = true;
    track('signup_error');
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped lang="scss">
.signup-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(26, 20, 38, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  overflow-y: auto;
}

.signup-modal {
  background: #fff;
  border-radius: 16px;
  padding: 48px 40px;
  width: 100%;
  max-width: 520px;
  position: relative;
  box-shadow: 0 24px 64px rgba(26, 20, 38, 0.24);
  margin: auto;
  color: var(--ink);

  &:focus { outline: none; }

  @media (max-width: 600px) {
    padding: 56px 20px 28px;
  }
}

.signup-modal__close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--brand-7);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--ink);
  transition: background 0.2s;
  border: 0;

  &:hover { background: var(--brand-5); }
  &:focus-visible { outline: 3px solid var(--brand-1); outline-offset: 2px; }
}

.signup-modal__logo {
  width: 160px;
  height: 32px;
  background-image: url('https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/logo.svg');
  background-size: contain;
  background-repeat: no-repeat;
  margin-bottom: 24px;
}

.signup-modal__title {
  margin: 0 0 8px;
  font-size: 2.8rem;
  line-height: 1.15;
  color: var(--ink);
}

.signup-modal__subtitle {
  margin: 0 0 28px;
  font-size: 1.6rem;
  line-height: 1.5;
  color: var(--ink-2);
}

.signup-modal__form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.signup-modal__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.signup-modal__label {
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 1.5rem;
  line-height: 1.3;
  color: var(--ink);
  display: flex;
  align-items: center;
  gap: 6px;
}

.signup-modal__label-optional {
  font-family: 'PoppinsRegular', sans-serif;
  font-size: 1.4rem;
  color: var(--ink-3);
}

.signup-modal__input {
  height: 48px;
  border: 1.5px solid var(--ink-3);
  border-radius: 12px;
  padding: 0 16px;
  font-family: 'PoppinsRegular', sans-serif;
  font-size: 1.6rem;
  color: var(--ink);
  transition: border-color 0.2s, box-shadow 0.2s;
  background: #fff;

  &:hover:not(:disabled) { border-color: var(--ink); }
  &:focus {
    border-color: var(--brand-1);
    outline: none;
    box-shadow: 0 0 0 3px rgba(126, 39, 237, 0.3);
  }
  &::placeholder { color: var(--ink-3); opacity: 1; }
  &:disabled { background: var(--brand-7); opacity: 0.7; }
}

.signup-modal__file-label {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 48px;
  border: 1.5px dashed var(--ink-3);
  border-radius: 12px;
  padding: 0 16px;
  cursor: pointer;
  font-family: 'PoppinsRegular', sans-serif;
  font-size: 1.5rem;
  color: var(--ink-2);
  transition: border-color 0.2s, background 0.2s;
  position: relative;
  overflow: hidden;

  svg { flex-shrink: 0; color: var(--ink-3); transition: color 0.2s; }

  span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  &:hover:not(.is-disabled) {
    border-color: var(--brand-1);
    background: var(--brand-7);
    svg { color: var(--brand-1); }
  }

  &.has-file {
    border-style: solid;
    border-color: var(--brand-2-text);
    color: var(--ink);
    svg { color: var(--brand-2-text); }
  }

  &.is-disabled { opacity: 0.6; cursor: not-allowed; }

  &:focus-within {
    border-color: var(--brand-1);
    box-shadow: 0 0 0 3px rgba(126, 39, 237, 0.3);
  }
}

.signup-modal__file-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.signup-modal__field-hint {
  font-size: 1.4rem;
  line-height: 1.4;
  color: var(--ink-3);
  margin: 0;
}

.signup-modal__gdpr {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  border: 1.5px solid var(--brand-5);
  background: var(--brand-7);
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover { border-color: var(--brand-1); }
  &:focus-within { border-color: var(--brand-1); box-shadow: 0 0 0 3px rgba(126, 39, 237, 0.3); }
  &--error { border-color: #B42318; background: #FEF3F2; }
}

.signup-modal__gdpr-check {
  flex-shrink: 0;
  margin-top: 2px;
  width: 20px;
  height: 20px;
  min-width: 20px;
  accent-color: var(--brand-1);
  cursor: pointer;
  opacity: 1 !important;
  position: relative;
  z-index: 1;
  appearance: auto;
  -webkit-appearance: checkbox;
}

.signup-modal__gdpr-text {
  font-size: 1.4rem;
  color: var(--ink-2);
  line-height: 1.5;

  :deep(a) {
    color: var(--link);
    text-decoration: underline;
    text-underline-offset: 2px;
    &:hover { color: var(--brand-1); }
  }
}

.signup-modal__error {
  font-size: 1.4rem;
  line-height: 1.4;
  font-family: 'PoppinsMedium', sans-serif;
  color: #B42318;
  margin: 0;
}

.signup-modal__submit {
  margin-top: 8px;
  min-height: 56px;
  border-radius: 999px;
  background: var(--brand-1);
  color: #fff;
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 1.6rem;
  cursor: pointer;
  transition: background-color 0.2s;
  border: none;

  &:focus-visible { outline: 3px solid var(--ink); outline-offset: 3px; }
  &:hover:not(:disabled) { background: var(--link); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
}

.signup-modal__success {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  padding: 16px 0 0;

  .signup-modal__title { margin: 0; }

  .signup-modal__submit {
    margin-top: 0;
    padding: 0 40px;
    width: auto;
  }
}

.signup-modal__success-icon { margin-bottom: 4px; display: flex; }

.signup-modal__success h2:focus { outline: none; }

.signup-modal__next {
  text-align: left;
  width: 100%;
  background: var(--brand-7);
  border-radius: 12px;
  padding: 16px 20px;
}

.signup-modal__next-title {
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 1.6rem;
  color: var(--ink);
  margin: 0 0 8px;
}

.signup-modal__next-list {
  margin: 0;
  padding-left: 20px;
  font-size: 1.6rem;
  line-height: 1.5;
  color: var(--ink-2);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.signup-modal__demo-link {
  min-height: 44px;
  padding: 0 12px;
  background: none;
  border: 0;
  cursor: pointer;
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 1.6rem;
  color: var(--link);
  text-decoration: underline;
  text-underline-offset: 3px;

  &:focus-visible { outline: 3px solid var(--brand-1); outline-offset: 2px; border-radius: 8px; }
}
</style>
