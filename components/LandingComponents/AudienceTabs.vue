<template>
  <div
    class="aud-tabs"
    :class="`aud-tabs--${modelValue}`"
    role="tablist"
    :aria-label="$t('audience.tablistLabel')"
    @keydown="onKeydown"
  >
    <!-- The sliding paper label: a double-ruled wine label that moves to the active tab. -->
    <span class="aud-tabs__label" aria-hidden="true"></span>

    <button
      v-for="item in AUDIENCES"
      :id="`tab-${item}`"
      :key="item"
      :ref="(el) => (buttons[item] = el)"
      type="button"
      role="tab"
      class="aud-tabs__tab"
      :class="{ 'is-active': modelValue === item }"
      :aria-selected="modelValue === item"
      :aria-controls="`panel-${item}`"
      :tabindex="modelValue === item ? 0 : -1"
      @click="select(item)"
    >
      <svg class="aud-tabs__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <template v-if="item === 'retail'">
          <path d="M10 3h4M10.5 3v4.2c0 .7-.3 1.300-.9 1.800C8.600 10 8 11 8 12.300V20a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7.700c0-1.300-.6-2.300-1.600-3.300-.6-.5-.9-1.100-.9-1.800V3"/>
          <path d="M8 14.500h8"/>
        </template>
        <template v-else>
          <path d="M7 3h10c.5 4-.3 8-3 9.200-.7.300-1.500.3-2 .3V20M12 20H8.500M12 20h3.500"/>
          <path d="M7.200 8h9.600"/>
        </template>
      </svg>
      <span class="aud-tabs__text">{{ $t(`audience.tab.${item}`) }}</span>
    </button>
  </div>
</template>

<script setup>
import { AUDIENCES } from '~/data/demo';

const props = defineProps({ modelValue: { type: String, required: true } });
const emit = defineEmits(['update:modelValue']);

const buttons = {};

const select = (item) => {
  if (item !== props.modelValue) emit('update:modelValue', item);
};

const onKeydown = (event) => {
  const index = AUDIENCES.indexOf(props.modelValue);
  let next = null;
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % AUDIENCES.length;
  else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + AUDIENCES.length) % AUDIENCES.length;
  else if (event.key === 'Home') next = 0;
  else if (event.key === 'End') next = AUDIENCES.length - 1;
  if (next === null) return;
  event.preventDefault();
  const target = AUDIENCES[next];
  emit('update:modelValue', target);
  nextTick(() => buttons[target]?.focus());
};
</script>

<style scoped lang="scss">
$ease: cubic-bezier(0.16, 1, 0.3, 1);

// Compact segmented control, left-aligned with the hero text column.
.aud-tabs {
  --pad: 4px;
  position: relative;
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  width: fit-content;
  max-width: 100%;
  padding: var(--pad);
  border-radius: 999px;
  background: var(--label-track, #efe9fb);
  isolation: isolate;
}

.aud-tabs__label {
  position: absolute;
  top: var(--pad);
  bottom: var(--pad);
  left: var(--pad);
  width: calc((100% - var(--pad) * 2) / 2);
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 0 0 1.5px var(--brand-1), 0 4px 10px -4px rgba(58, 20, 110, 0.3);
  transition: transform 0.45s $ease;
  z-index: 0;
}

.aud-tabs--restaurants .aud-tabs__label {
  transform: translateX(100%);
  box-shadow: 0 0 0 1.5px var(--brand-2), 0 4px 10px -4px rgba(58, 20, 110, 0.3);
}

.aud-tabs__tab {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 40px;
  padding: 0 18px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--ink-2);
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 15px;
  line-height: 1.2;
  white-space: nowrap;
  cursor: pointer;
  transition: color 0.2s;

  &:hover,
  &.is-active { color: var(--ink); }

  &:focus-visible {
    outline: 3px solid var(--ink);
    outline-offset: 2px;
  }
}

.aud-tabs__icon { flex-shrink: 0; }

@media only screen and (max-width: 560px) {
  .aud-tabs { display: grid; width: 100%; }
  .aud-tabs__tab {
    padding: 0 8px;
    gap: 6px;
    font-size: 14px;
    white-space: normal;
    text-wrap: balance;
    min-height: 44px;
  }
  .aud-tabs__icon { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .aud-tabs__label,
  .aud-tabs__tab { transition: none; }
}
</style>
