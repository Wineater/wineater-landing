<template>
  <component
      :is="href && !disabled ? 'a' : 'button'"
      :class="['button', `button--${bgColor}`, { 'button--disabled': disabled }]"
      :type="href && !disabled ? undefined : 'button'"
      :href="href && !disabled ? href : undefined"
      :target="href && !disabled ? target : undefined"
      :rel="href && !disabled && target === '_blank' ? 'noopener' : undefined"
      :disabled="!href && disabled ? true : undefined"
      :aria-disabled="disabled ? 'true' : undefined"
      @click="onClick"
  >
  <span class="p1">
    <slot></slot>
  </span>
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
  target: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['btnClick']);

const onClick = () => {
  if (!props.disabled) emit('btnClick');
};
</script>

<style scoped lang="scss">
.button {
  padding: 20px 56px;
  border-radius: 72px;
  background: var(--text);
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 0;
  min-height: 44px;
  text-decoration: none;
  font: inherit;

  &:focus-visible {
    outline: 3px solid #7E27ED;
    outline-offset: 3px;
  }

  .p1 {
    color: var(--brand-4);
  }

  &--disabled {
    pointer-events: none;
    .p1{
      color: var(--dark-100) !important;
    }
  }
}
</style>
