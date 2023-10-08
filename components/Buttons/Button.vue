<template>
  <div
      :class="`button button--${props.bgColor} ${props.disabled ? 'button--disabled' : '' }`"
      @click="!props.disabled && $emit('btnClick')"
  >
  <span class="p1">
    <slot></slot>
  </span>
  </div>
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
});
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
