<template>
  <div :class="['section-header', { 'text-center': centered }]" :style="containerStyle">
    <!-- Chip/Badge -->
    <slot name="chip">
      <VChip
        v-if="chip"
        :color="chipColor"
        :variant="chipVariant"
        :size="chipSize"
        class="mb-4"
      >
        <slot name="chip-prepend">
          <VIcon v-if="chipIcon" start :size="chipIconSize">{{ chipIcon }}</VIcon>
        </slot>
        {{ chip }}
        <slot name="chip-append" />
      </VChip>
    </slot>

    <!-- Title -->
    <slot name="title">
      <component
        :is="titleTag"
        :class="[titleClass, 'font-weight-bold', { 'mb-2': subtitle || $slots.subtitle, 'mb-4': !subtitle && !$slots.subtitle }]"
      >
        <slot name="title-prepend" />
        {{ title }}
        <span v-if="titleHighlight" :class="titleHighlightClass">{{ titleHighlight }}</span>
        <slot name="title-append" />
      </component>
    </slot>

    <!-- Subtitle/Description -->
    <slot name="subtitle">
      <p
        v-if="subtitle"
        :class="[subtitleClass, 'text-medium-emphasis', { 'mx-auto': centered }]"
        :style="subtitleStyle"
      >
        {{ subtitle }}
      </p>
    </slot>

    <!-- Additional content -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Colors, Variants, Sizes } from '@/shared/model'
import type { ColorType, VariantType, SizeType, IconType } from './types'

interface Props {
  title: string
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  titleClass?: string
  titleHighlight?: string
  titleHighlightClass?: string
  subtitle?: string
  subtitleClass?: string
  subtitleMaxWidth?: string | number
  chip?: string
  chipColor?: ColorType
  chipVariant?: VariantType
  chipSize?: SizeType
  chipIcon?: IconType
  chipIconSize?: SizeType | number
  centered?: boolean
  maxWidth?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  titleTag: 'h2',
  titleClass: 'text-h4',
  titleHighlightClass: 'text-primary',
  subtitleClass: 'text-body-1',
  subtitleMaxWidth: 600,
  chipColor: Colors.Primary,
  chipVariant: Variants.Tonal,
  chipSize: Sizes.Default,
  chipIconSize: Sizes.Small,
  centered: true,
})

const containerStyle = computed(() => {
  if (!props.maxWidth) return {}
  const width = typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth
  return { maxWidth: width }
})

const subtitleStyle = computed(() => {
  if (!props.subtitleMaxWidth) return {}
  const width = typeof props.subtitleMaxWidth === 'number' ? `${props.subtitleMaxWidth}px` : props.subtitleMaxWidth
  return { maxWidth: width }
})
</script>

<style scoped>
.section-header {
  margin-bottom: 2rem;
}
</style>
