<template>
  <component
      :is="to && !disabled ? NuxtLink : (href && !disabled ? 'a' : 'button')"
      :class="['button', `button--${variant}`, `button--${size}`, { 'button--disabled': disabled }]"
      :type="(href || to) && !disabled ? undefined : 'button'"
      :href="href && !disabled ? href : undefined"
      :target="href && !disabled ? target : undefined"
      :rel="href && !disabled && target === '_blank' ? 'noopener' : undefined"
      :to="to && !disabled ? to : undefined"
      :disabled="!href && !to && disabled ? true : undefined"
      :aria-disabled="disabled ? 'true' : undefined"
      @click="onClick"
  >
    <span class="button__label"><slot></slot></span>
  </component>
</template>
<script setup>
const props = defineProps({
  bgColor: {
    type: String,
    required: false,
    default: 'black'
  },
  disabled: {
    type: Boolean,
  },
  href: {
    type: String,
    default: '',
  },
  to: {
    type: [String, Object],
    default: '',
  },
  size: {
    type: String,
    default: 'md', // md = 56px, sm = 44px (header)
  },
  target: {
    type: String,
    default: '',
  },
});

const NuxtLink = resolveComponent('NuxtLink');

const emit = defineEmits(['btnClick']);

// Two styles only. Legacy bgColor values map onto them:
//  primary   = solid violet (black, brand, violet, purple, default)
//  secondary = outlined (outline, secondary, transparent, ghost)
//  inverse   = white pill for the gradient banners (white, light)
const variant = computed(() => {
  if (['outline', 'secondary', 'transparent', 'ghost'].includes(props.bgColor)) return 'secondary';
  if (['white', 'light', 'inverse'].includes(props.bgColor)) return 'inverse';
  return 'primary';
});

const onClick = () => {
  if (!props.disabled) emit('btnClick');
};
</script>

<style scoped lang="scss">
.button {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 56px;
  padding: 0 32px;
  border: 1.5px solid transparent;
  border-radius: 72px;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  font-family: 'PoppinsMedium', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.25;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s, transform 0.2s;

  &__label { display: inline-flex; align-items: center; gap: 8px; color: inherit; font: inherit; }

  &--sm { min-height: 44px; padding: 0 24px; font-size: 15px; }

  &--primary {
    background: var(--brand-1);
    color: var(--brand-4);
    &:hover { background: #6A1FD0; }
  }

  &--secondary {
    background: transparent;
    color: var(--ink);
    border-color: var(--ink-3);
    &:hover { border-color: var(--brand-1); color: var(--brand-1); }
  }

  &--inverse {
    background: var(--brand-4);
    color: var(--ink);
    &:hover { background: var(--brand-7); }
  }

  &:active { transform: scale(0.98); }

  &:focus-visible {
    outline: 3px solid var(--ink);
    outline-offset: 3px;
  }

  &--disabled {
    pointer-events: none;
    background: var(--brand-5);
    border-color: transparent;
    color: var(--ink-3);
  }
}

@media (prefers-reduced-motion: reduce) {
  .button { transition: none; }
}
</style>
