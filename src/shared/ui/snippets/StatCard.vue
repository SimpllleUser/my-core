<template>
  <VCard
    :variant="cardVariant"
    :color="cardColor"
    :elevation="elevation"
    :class="['stat-card', { 'text-center': centered }, cardClass]"
    :height="height"
  >
    <VCardText :class="contentClass">
      <!-- Icon -->
      <slot name="icon" :icon="icon" :iconColor="iconColor" :iconBgColor="iconBgColor">
        <VAvatar
          v-if="icon"
          :color="iconBgColor"
          :size="iconContainerSize"
          :rounded="iconRounded"
          :class="iconContainerClass"
        >
          <VIcon :color="iconColor" :size="iconSize">{{ icon }}</VIcon>
        </VAvatar>
      </slot>

      <!-- Value -->
      <slot name="value" :value="value" :prefix="prefix" :suffix="suffix">
        <component
          :is="valueTag"
          :class="[valueClass, 'font-weight-bold', valueMargin]"
        >
          <slot name="prefix">
            <span v-if="prefix">{{ prefix }}</span>
          </slot>
          {{ value }}
          <slot name="suffix">
            <span v-if="suffix">{{ suffix }}</span>
          </slot>
        </component>
      </slot>

      <!-- Label -->
      <slot name="label" :label="label">
        <p v-if="label" :class="[labelClass, 'mb-0']">{{ label }}</p>
      </slot>

      <!-- Trend indicator -->
      <slot name="trend" :trend="trend" :trendColor="trendColor" :trendIcon="trendIcon">
        <div v-if="trend !== undefined" :class="['d-flex align-center', { 'justify-center': centered }, trendContainerClass]">
          <VIcon
            :color="trendColor"
            :size="trendIconSize"
          >
            {{ trendIcon }}
          </VIcon>
          <span :class="[trendClass, `text-${trendColor}`]">
            {{ trendPrefix }}{{ Math.abs(trend) }}{{ trendSuffix }}
          </span>
          <span v-if="trendLabel" :class="trendLabelClass">{{ trendLabel }}</span>
        </div>
      </slot>

      <slot />
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Colors, Variants, Sizes, Icons } from '@/shared/model'
import type { ColorType, VariantType, SizeType, IconType } from './types'

interface Props {
  // Data
  value: string | number
  label?: string
  prefix?: string
  suffix?: string

  // Trend
  trend?: number
  trendLabel?: string
  trendPrefix?: string
  trendSuffix?: string

  // Layout
  centered?: boolean

  // Card
  cardVariant?: VariantType
  cardColor?: ColorType | string
  elevation?: number | string
  cardClass?: string
  contentClass?: string
  height?: string | number

  // Icon
  icon?: IconType
  iconColor?: ColorType | string
  iconBgColor?: ColorType
  iconSize?: SizeType | number
  iconContainerSize?: SizeType | number
  iconRounded?: string
  iconContainerClass?: string

  // Value
  valueTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  valueClass?: string

  // Label
  labelClass?: string

  // Trend
  trendIconUp?: IconType
  trendIconDown?: IconType
  trendIconSize?: SizeType | number
  trendClass?: string
  trendLabelClass?: string
  trendUpColor?: ColorType
  trendDownColor?: ColorType
  trendContainerClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  trendPrefix: '',
  trendSuffix: '%',
  centered: true,
  cardVariant: Variants.Flat,
  elevation: 0,
  contentClass: 'pa-6',
  iconColor: 'white',
  iconSize: 28,
  iconContainerSize: 56,
  iconRounded: 'lg',
  iconContainerClass: 'mb-4',
  valueTag: 'h2',
  valueClass: 'text-h3 text-primary',
  labelClass: 'text-body-1 text-medium-emphasis',
  trendIconUp: Icons.TrendingUp,
  trendIconDown: Icons.TrendingDown,
  trendIconSize: Sizes.Small,
  trendClass: 'text-body-2 font-weight-medium ml-1',
  trendLabelClass: 'text-caption text-medium-emphasis ml-1',
  trendUpColor: Colors.Success,
  trendDownColor: Colors.Error,
  trendContainerClass: 'mt-2',
})

const trendColor = computed(() => {
  if (props.trend === undefined) return ''
  return props.trend >= 0 ? props.trendUpColor : props.trendDownColor
})

const trendIcon = computed(() => {
  if (props.trend === undefined) return ''
  return props.trend >= 0 ? props.trendIconUp : props.trendIconDown
})

const valueMargin = computed(() => {
  return props.label ? 'mb-2' : 'mb-0'
})
</script>

<style scoped>
.stat-card {
  height: 100%;
}
</style>
