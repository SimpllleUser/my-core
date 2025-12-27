<script setup lang="ts">
import type { IStatsCardProps, IStatsCardIcon, IStatsTrend } from '../../model';
import { TrendDirection, Icons } from '../../model';

const props = withDefaults(defineProps<IStatsCardProps>(), {
  variant: 'elevated',
  rounded: 'lg',
  elevation: 2,
  align: 'start',
  dense: false,
  horizontal: false,
  reverse: false,
  loading: false,
  disabled: false,
  clickable: false,
  iconBackground: true,
  actionsOnHover: false
});

const emit = defineEmits<{
  click: [event: MouseEvent];
  action: [action: string, event: MouseEvent];
}>();

// Computed: Normalize icon configuration
const normalizedIcon = computed((): IStatsCardIcon | null => {
  if (!props.icon) return null;

  if (typeof props.icon === 'string') {
    return {
      icon: props.icon,
      color: props.iconColor,
      showBackground: props.iconBackground
    };
  }

  return {
    ...props.icon,
    color: props.icon.color ?? props.iconColor,
    showBackground: props.icon.showBackground ?? props.iconBackground
  };
});

// Computed: Icon background styles
const iconBackgroundStyles = computed(() => {
  if (!normalizedIcon.value?.showBackground) return {};

  const bgColor = normalizedIcon.value.backgroundColor || 'primary';
  const borderRadius = normalizedIcon.value.borderRadius ?? '12px';

  return {
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius
  };
});

// Computed: Icon background class
const iconBackgroundClass = computed(() => {
  if (!normalizedIcon.value?.showBackground) return '';

  const bgColor = normalizedIcon.value.backgroundColor || 'primary';
  return `bg-${bgColor}-lighten-4`;
});

// Computed: Format value with options
const formattedValue = computed(() => {
  if (props.value === undefined || props.value === null) return '';

  let value = props.value;

  if (props.valueFormat) {
    const { prefix, suffix, decimals, thousandSeparator, decimalSeparator, compact } = props.valueFormat;

    if (typeof value === 'number') {
      if (compact) {
        value = formatCompact(value);
      } else {
        if (decimals !== undefined) {
          value = value.toFixed(decimals);
        }
        if (thousandSeparator) {
          const parts = value.toString().split('.');
          if (parts[0]) {
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
          }
          value = parts.join(decimalSeparator || '.');
        }
      }
    }

    return `${prefix || ''}${value}${suffix || ''}`;
  }

  return String(value);
});

// Helper: Format compact number
const formatCompact = (num: number): string => {
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return String(num);
};

// Computed: Trend configuration
const trendConfig = computed(() => {
  if (!props.trend) return null;

  const { direction = TrendDirection.Neutral, showIcon = true, color, icon } = props.trend;

  const defaultColors: Record<TrendDirection, string> = {
    [TrendDirection.Up]: 'success',
    [TrendDirection.Down]: 'error',
    [TrendDirection.Neutral]: 'grey'
  };

  const defaultIcons: Record<TrendDirection, string> = {
    [TrendDirection.Up]: Icons.TrendingUp,
    [TrendDirection.Down]: Icons.TrendingDown,
    [TrendDirection.Neutral]: Icons.TrendingNeutral
  };

  return {
    ...props.trend,
    color: color || defaultColors[direction],
    icon: icon || defaultIcons[direction],
    showIcon
  };
});

// Computed: Card classes
const cardClasses = computed(() => ({
  'stats-card': true,
  'stats-card--clickable': props.clickable || props.to || props.href,
  'stats-card--disabled': props.disabled,
  'stats-card--dense': props.dense,
  'stats-card--horizontal': props.horizontal,
  'stats-card--reverse': props.reverse,
  'stats-card--loading': props.loading,
  'stats-card--actions-hover': props.actionsOnHover,
  [`stats-card--align-${props.align}`]: true
}));

// Computed: Card styles
const cardStyles = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  minWidth: typeof props.minWidth === 'number' ? `${props.minWidth}px` : props.minWidth,
  maxWidth: typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  minHeight: typeof props.minHeight === 'number' ? `${props.minHeight}px` : props.minHeight,
  maxHeight: typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight
}));

// Handler: Card click
const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return;
  emit('click', event);
};

// Handler: Action click
const handleActionClick = (action: string, event: MouseEvent) => {
  event.stopPropagation();
  emit('action', action, event);
};
</script>

<template>
  <VCard
    :class="cardClasses"
    :style="cardStyles"
    :variant="variant"
    :color="color"
    :rounded="rounded"
    :elevation="elevation"
    :disabled="disabled"
    :loading="loading"
    :to="to"
    :href="href"
    @click="handleClick"
  >
    <VCardText class="stats-card__content">
      <!-- Default slot for full override -->
      <slot>
        <div class="stats-card__layout">
          <!-- Prepend slot -->
          <slot name="prepend" />

          <!-- Icon section -->
          <div
            v-if="normalizedIcon || $slots.icon"
            class="stats-card__icon-wrapper"
          >
            <slot name="icon">
              <div
                v-if="normalizedIcon"
                class="stats-card__icon"
                :class="[
                  iconBackgroundClass,
                  { 'stats-card__icon--with-bg': normalizedIcon.showBackground }
                ]"
                :style="iconBackgroundStyles"
              >
                <VIcon
                  :icon="normalizedIcon.icon"
                  :color="normalizedIcon.color"
                  :size="normalizedIcon.size || 24"
                />
              </div>
            </slot>
          </div>

          <!-- Main content -->
          <div class="stats-card__main">
            <!-- Header (title + icon for horizontal) -->
            <div class="stats-card__header">
              <slot name="title">
                <div
                  v-if="title"
                  class="stats-card__title text-medium-emphasis"
                >
                  {{ title }}
                </div>
              </slot>
            </div>

            <!-- Value -->
            <slot name="value">
              <div
                v-if="value !== undefined"
                class="stats-card__value"
              >
                <VSkeletonLoader
                  v-if="loading"
                  type="heading"
                  width="80"
                />
                <span v-else>{{ formattedValue }}</span>
              </div>
            </slot>

            <!-- Subtitle -->
            <slot name="subtitle">
              <div
                v-if="subtitle"
                class="stats-card__subtitle text-medium-emphasis"
              >
                {{ subtitle }}
              </div>
            </slot>

            <!-- Trend -->
            <slot name="trend">
              <div
                v-if="trendConfig"
                class="stats-card__trend"
                :class="`text-${trendConfig.color}`"
              >
                <VIcon
                  v-if="trendConfig.showIcon"
                  :icon="trendConfig.icon"
                  size="16"
                  class="stats-card__trend-icon"
                />
                <span class="stats-card__trend-value">{{ trendConfig.value }}</span>
                <span
                  v-if="trendConfig.label"
                  class="stats-card__trend-label text-medium-emphasis"
                >
                  {{ trendConfig.label }}
                </span>
              </div>
            </slot>
          </div>

          <!-- Append slot -->
          <slot name="append" />
        </div>

        <!-- Actions -->
        <div
          v-if="actions?.length || $slots.actions"
          class="stats-card__actions"
        >
          <slot name="actions">
            <VBtn
              v-for="(action, index) in actions"
              :key="index"
              :variant="action.variant || 'text'"
              :color="action.color || 'primary'"
              :size="action.size || 'small'"
              :disabled="action.disabled"
              :loading="action.loading"
              :icon="!action.label"
              @click="handleActionClick(action.action || `action-${index}`, $event)"
            >
              <VIcon
                v-if="action.icon"
                :icon="action.icon"
                :start="!!action.label"
              />
              {{ action.label }}
            </VBtn>
          </slot>
        </div>
      </slot>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.stats-card {
  transition: all 0.2s ease-in-out;

  &--clickable {
    cursor: pointer;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
  }

  &--disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  &--loading {
    pointer-events: none;
  }

  &--dense &__content {
    padding: 12px 16px;
  }

  &--horizontal &__layout {
    flex-direction: row;
    align-items: center;
    gap: 16px;
  }

  &--horizontal &__icon-wrapper {
    order: 0;
  }

  &--horizontal &__main {
    flex: 1;
  }

  &--reverse &__layout {
    flex-direction: row-reverse;
  }

  &--reverse#{&}--horizontal &__layout {
    flex-direction: row-reverse;
  }

  &--align-center {
    text-align: center;

    .stats-card__layout {
      align-items: center;
    }
  }

  &--align-end {
    text-align: right;

    .stats-card__layout {
      align-items: flex-end;
    }
  }

  &--actions-hover &__actions {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  &--actions-hover:hover &__actions {
    opacity: 1;
  }

  &__content {
    padding: 20px 24px;
  }

  &__layout {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__icon-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;

    &--with-bg {
      width: 48px;
      height: 48px;
      border-radius: 12px;
    }
  }

  &__main {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  &__title {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.01em;
  }

  &__value {
    font-size: 32px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  &__subtitle {
    font-size: 13px;
    margin-top: 4px;
  }

  &__trend {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    font-weight: 500;
    margin-top: 8px;
  }

  &__trend-icon {
    flex-shrink: 0;
  }

  &__trend-value {
    font-weight: 600;
  }

  &__trend-label {
    font-weight: 400;
    margin-left: 4px;
  }

  &__actions {
    display: flex;
    gap: 8px;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  }
}
</style>
