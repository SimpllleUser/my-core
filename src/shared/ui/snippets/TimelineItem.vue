<script setup lang="ts">
import { Colors, Variants, Icons } from '../../model'
import type { ColorType, VariantType, IconType } from './types'

interface Props {
  title: string
  subtitle?: string
  description?: string
  date?: string
  icon?: IconType
  dotColor?: ColorType | string
  iconColor?: ColorType | string
  iconSize?: number | string

  // Layout
  side?: 'start' | 'end'
  hideOppositeContent?: boolean

  // Card (for description)
  cardVariant?: VariantType
  cardColor?: ColorType | string
  elevation?: number | string
  cardClass?: string
  contentClass?: string

  // Text
  titleClass?: string
  subtitleClass?: string
  descriptionClass?: string
  dateClass?: string

  // Line
  lineInset?: number | string
  fillDot?: boolean
}

withDefaults(defineProps<Props>(), {
  dotColor: Colors.Primary,
  iconColor: 'white',
  iconSize: 16,
  side: 'end',
  hideOppositeContent: false,
  cardVariant: Variants.Outlined,
  elevation: 0,
  contentClass: 'pa-4',
  titleClass: 'text-body-1 font-weight-medium',
  subtitleClass: 'text-caption text-medium-emphasis',
  descriptionClass: 'text-body-2 text-medium-emphasis',
  dateClass: 'text-caption text-medium-emphasis',
  fillDot: true,
})
</script>
<template>
  <VTimelineItem
    :dot-color="dotColor"
    :icon="icon"
    :icon-color="iconColor"
    :size="iconSize"
    :side="side"
    :hide-opposite="hideOppositeContent"
    :fill-dot="fillDot"
    :line-inset="lineInset"
  >
    <!-- Opposite (date) -->
    <template v-if="!hideOppositeContent && date" #opposite>
      <slot name="date" :date="date">
        <span :class="dateClass">{{ date }}</span>
      </slot>
    </template>

    <!-- Content -->
    <slot>
      <VCard
        :variant="cardVariant"
        :color="cardColor"
        :elevation="elevation"
        :class="cardClass"
      >
        <VCardText :class="contentClass">
          <slot name="header">
            <div class="d-flex align-center justify-space-between mb-1">
              <slot name="title" :title="title">
                <span :class="titleClass">{{ title }}</span>
              </slot>
              <slot v-if="hideOppositeContent && date" name="date-inline" :date="date">
                <span :class="dateClass">{{ date }}</span>
              </slot>
            </div>

            <slot name="subtitle" :subtitle="subtitle">
              <p v-if="subtitle" :class="[subtitleClass, 'mb-2']">{{ subtitle }}</p>
            </slot>
          </slot>

          <slot name="description" :description="description">
            <p v-if="description" :class="[descriptionClass, 'mb-0']">{{ description }}</p>
          </slot>

          <slot name="append" />
        </VCardText>
      </VCard>
    </slot>
  </VTimelineItem>
</template>
