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
      <svg class="aud-tabs__icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
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

.aud-tabs {
  --pad: 5px;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  max-width: 560px;
  padding: var(--pad);
  border-radius: 16px;
  background: var(--label-track, #efe9fb);
  box-shadow: inset 0 1px 2px rgba(58, 20, 110, 0.12);
  isolation: isolate;
}

// Paper label: white stock, hairline edge and an inner rule like a printed wine label.
.aud-tabs__label {
  position: absolute;
  top: var(--pad);
  bottom: var(--pad);
  left: var(--pad);
  width: calc((100% - var(--pad) * 2) / 2);
  border-radius: 12px;
  background: var(--label-paper, #fdfcff);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.9) inset,
    0 0 0 1px rgba(126, 39, 237, 0.22),
    0 6px 14px -6px rgba(58, 20, 110, 0.35);
  transition: transform 0.55s $ease;
  z-index: 0;

  &::after {
    content: '';
    position: absolute;
    inset: 4px;
    border-radius: 8px;
    border: 1px solid rgba(126, 39, 237, 0.18);
    pointer-events: none;
  }
}

.aud-tabs--restaurants .aud-tabs__label {
  transform: translateX(100%);
}

.aud-tabs__tab {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 60px;
  padding: 8px 12px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: #5b4a78;
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 14px;
  line-height: 1.25;
  text-align: left;
  cursor: pointer;
  transition: color 0.3s $ease;

  &:hover {
    color: #7E27ED;
  }

  &.is-active {
    color: #4a1394;
  }

  &:focus-visible {
    outline: 3px solid #7E27ED;
    outline-offset: 2px;
  }

  &:active .aud-tabs__icon {
    transform: scale(0.92);
  }
}

.aud-tabs__icon {
  flex-shrink: 0;
  transition: transform 0.4s $ease;
}

.aud-tabs__tab.is-active .aud-tabs__icon {
  transform: translateY(-1px);
}

.aud-tabs__text {
  text-wrap: balance;
}

@media only screen and (max-width: 420px) {
  .aud-tabs__tab {
    flex-direction: column;
    gap: 4px;
    text-align: center;
    font-size: 13px;
    padding: 8px 6px;
    min-height: 68px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .aud-tabs__label,
  .aud-tabs__tab,
  .aud-tabs__icon {
    transition: none;
  }
}
</style>
