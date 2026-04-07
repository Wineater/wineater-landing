<template>
  <div class="signup-overlay" @click.self="$emit('close')">
    <div class="signup-modal">
      <button class="signup-modal__close" @click="$emit('close')" :aria-label="$t('SignupForm.close')">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>

      <div v-if="!submitted" class="signup-modal__content">
        <div class="signup-modal__logo"></div>
        <h2 class="signup-modal__title h2 color-text">{{ $t('SignupForm.title') }}</h2>
        <p class="signup-modal__subtitle p1 color-dark-100">{{ $t('SignupForm.subtitle') }}</p>

        <form class="signup-modal__form" @submit.prevent="submit">
          <!-- Name -->
          <div class="signup-modal__field">
            <label class="signup-modal__label">{{ $t('SignupForm.name') }}</label>
            <input
              v-model="form.name"
              class="signup-modal__input"
              type="text"
              required
              autocomplete="name"
              :placeholder="$t('SignupForm.namePlaceholder')"
              :disabled="submitting"
            />
          </div>

          <!-- Business name -->
          <div class="signup-modal__field">
            <label class="signup-modal__label">{{ $t('SignupForm.businessName') }}</label>
            <input
              v-model="form.businessName"
              class="signup-modal__input"
              type="text"
              required
              autocomplete="organization"
              :placeholder="$t('SignupForm.businessNamePlaceholder')"
              :disabled="submitting"
            />
          </div>

          <!-- Email -->
          <div class="signup-modal__field">
            <label class="signup-modal__label">{{ $t('SignupForm.email') }}</label>
            <input
              v-model="form.email"
              class="signup-modal__input"
              type="email"
              required
              autocomplete="email"
              :placeholder="$t('SignupForm.emailPlaceholder')"
              :disabled="submitting"
            />
          </div>

          <!-- Menu file (optional) -->
          <div class="signup-modal__field">
            <label class="signup-modal__label">
              {{ $t('SignupForm.menuFile') }}
              <span class="signup-modal__label-optional">{{ $t('SignupForm.optional') }}</span>
            </label>
            <label class="signup-modal__file-label" :class="{ 'has-file': !!menuFile, 'is-disabled': submitting }">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 13V15H15V13M9 3V11M9 3L6 6M9 3L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>{{ menuFile ? menuFile.name : $t('SignupForm.menuFilePlaceholder') }}</span>
              <input
                ref="fileInput"
                type="file"
                accept=".pdf,.csv,.xlsx,.xls,.png,.jpg,.jpeg"
                class="signup-modal__file-input"
                :disabled="submitting"
                @change="onFileChange"
              />
            </label>
            <p class="signup-modal__field-hint">{{ $t('SignupForm.menuFileHint') }}</p>
          </div>

          <!-- GDPR consent (required) -->
          <label class="signup-modal__gdpr" :class="{ 'signup-modal__gdpr--error': gdprError }">
            <input
              v-model="form.gdprConsent"
              type="checkbox"
              class="signup-modal__gdpr-check"
              :disabled="submitting"
              @change="gdprError = false"
            />
            <span class="signup-modal__gdpr-text">
              {{ $t('SignupForm.gdprText') }}
              <a href="mailto:hi@wineater.com">hi@wineater.com</a>.
            </span>
          </label>
          <p v-if="gdprError" class="signup-modal__error">{{ $t('SignupForm.gdprRequired') }}</p>

          <p v-if="error" class="signup-modal__error">{{ $t('SignupForm.error') }}</p>

          <button class="signup-modal__submit" type="submit" :disabled="submitting">
            {{ submitting ? $t('SignupForm.submitting') : $t('SignupForm.submit') }}
          </button>
        </form>
      </div>

      <div v-else class="signup-modal__success">
        <div class="signup-modal__success-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="24" fill="url(#grad)"/>
            <path d="M14 24L21 31L34 17" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                <stop stop-color="#7E27ED"/>
                <stop offset="1" stop-color="#2FC0BF"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h2 class="h2 color-text">{{ $t('SignupForm.successTitle') }}</h2>
        <p class="p1 color-dark-100">{{ $t('SignupForm.success') }}</p>
        <button class="signup-modal__submit" @click="$emit('close')">
          {{ $t('SignupForm.close') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

defineEmits(['close']);

const form = reactive({ name: '', businessName: '', email: '', gdprConsent: false });
const menuFile = ref(null);
const fileInput = ref(null);
const submitting = ref(false);
const submitted = ref(false);
const error = ref(false);
const gdprError = ref(false);

const onFileChange = (e) => {
  menuFile.value = e.target.files?.[0] ?? null;
};

const submit = async () => {
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
    submitted.value = true;
  } catch {
    error.value = true;
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
  top: 24px;
  right: 24px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f5f2ff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #333;
  transition: background 0.2s;

  &:hover { background: #ede8ff; }
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
  color: #999;
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
</style>
