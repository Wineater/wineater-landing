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
        <h2 id="signup-title" class="signup-modal__title h2 color-text">{{ $t('SignupForm.title') }}</h2>
        <p id="signup-subtitle" class="signup-modal__subtitle p1 color-dark-100">{{ $t('SignupForm.subtitle') }}</p>

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
            <circle cx="24" cy="24" r="24" fill="url(#signup-grad)"/>
            <path d="M14 24L21 31L34 17" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <defs>
              <linearGradient id="signup-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                <stop stop-color="#7E27ED"/>
                <stop offset="1" stop-color="#2FC0BF"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h2 id="signup-success-title" ref="successTitle" class="h2 color-text" tabindex="-1">{{ $t('SignupForm.successTitle') }}</h2>
        <div class="signup-modal__next" role="status">
          <p class="signup-modal__next-title p1 color-text">{{ $t('SignupForm.nextTitle') }}</p>
          <ol class="signup-modal__next-list p1 color-dark-100">
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
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  overflow-y: auto;
}

.signup-modal {
  background: #fff;
  border-radius: 32px;
  padding: 56px 48px;
  width: 100%;
  max-width: 520px;
  position: relative;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.15);
  margin: auto;

  @media (max-width: 600px) {
    padding: 40px 24px;
    border-radius: 24px;
  }
}

.signup-modal__close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #f5f2ff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #333;
  transition: background 0.2s;
  border: 0;

  &:hover { background: #ede8ff; }
  &:focus-visible { outline: 3px solid #7E27ED; outline-offset: 2px; }
}

.signup-modal__logo {
  width: 160px;
  height: 32px;
  background-image: url('https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/logo.svg');
  background-size: contain;
  background-repeat: no-repeat;
  margin-bottom: 24px;
}

.signup-modal__title { margin-bottom: 8px; }
.signup-modal__subtitle { margin-bottom: 32px; }

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
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 6px;
}

.signup-modal__label-optional {
  font-family: 'PoppinsRegular', sans-serif;
  font-size: 12px;
  color: #aaa;
}

.signup-modal__input {
  height: 52px;
  border: 1.5px solid #e0e0e0;
  border-radius: 12px;
  padding: 0 16px;
  font-family: 'PoppinsRegular', sans-serif;
  font-size: 15px;
  color: #333;
  transition: border-color 0.2s;
  background: #fff;

  &:focus {
    border-color: #7E27ED;
    outline: none;
  }
  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(126, 39, 237, 0.3);
  }
  &::placeholder { color: #bbb; }
  &:disabled { background: #f9f9f9; opacity: 0.6; }
}

.signup-modal__file-label {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 52px;
  border: 1.5px dashed #d0d0d0;
  border-radius: 12px;
  padding: 0 16px;
  cursor: pointer;
  font-family: 'PoppinsRegular', sans-serif;
  font-size: 14px;
  color: #767676;
  transition: border-color 0.2s, background 0.2s;
  position: relative;
  overflow: hidden;

  svg { flex-shrink: 0; color: #bbb; transition: color 0.2s; }

  span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  &:hover:not(.is-disabled) {
    border-color: #7E27ED;
    background: #faf8ff;
    svg { color: #7E27ED; }
  }

  &.has-file {
    border-color: #2FC0BF;
    color: #333;
    svg { color: #2FC0BF; }
  }

  &.is-disabled { opacity: 0.6; cursor: not-allowed; }

  &:focus-within {
    border-color: #7E27ED;
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
  font-family: 'PoppinsRegular', sans-serif;
  font-size: 12px;
  color: #aaa;
  margin: 0;
}

.signup-modal__gdpr {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  border: 1.5px solid #e8e8e8;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover { border-color: #7E27ED; }
  &--error { border-color: #e53e3e; background: #fff5f5; }
}

.signup-modal__gdpr-check {
  flex-shrink: 0;
  margin-top: 2px;
  width: 18px;
  height: 18px;
  min-width: 18px;
  accent-color: #7E27ED;
  cursor: pointer;
  opacity: 1 !important;
  position: relative;
  z-index: 1;
  appearance: auto;
  -webkit-appearance: checkbox;
}

.signup-modal__gdpr-text {
  font-family: 'PoppinsRegular', sans-serif;
  font-size: 13px;
  color: #555;
  line-height: 1.5;

  :deep(a) {
    color: #7E27ED;
    text-decoration: underline;
    &:hover { opacity: 0.8; }
  }
}

.signup-modal__error {
  font-family: 'PoppinsRegular', sans-serif;
  font-size: 13px;
  color: #e53e3e;
  margin: 0;
}

.signup-modal__submit {
  margin-top: 8px;
  height: 56px;
  border-radius: 72px;
  background: linear-gradient(135deg, #7E27ED 0%, #2FC0BF 100%);
  color: #fff;
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;
  border: none;

  &:focus-visible { outline: 3px solid #7E27ED; outline-offset: 3px; }
  &:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
}

.signup-modal__success {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  padding: 16px 0;

  .signup-modal__submit {
    margin-top: 8px;
    padding: 0 40px;
    width: auto;
  }
}

.signup-modal__success-icon { margin-bottom: 8px; }

.signup-modal__success h2:focus { outline: none; }

.signup-modal__next {
  text-align: left;
  width: 100%;
  background: #faf8ff;
  border-radius: 16px;
  padding: 16px 20px;
}

.signup-modal__next-title {
  font-family: 'PoppinsMedium', sans-serif;
  margin: 0 0 8px;
}

.signup-modal__next-list {
  margin: 0;
  padding-left: 20px;
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
  font-size: 15px;
  color: #7E27ED;
  text-decoration: underline;

  &:focus-visible { outline: 3px solid #7E27ED; outline-offset: 2px; border-radius: 8px; }
}
</style>
