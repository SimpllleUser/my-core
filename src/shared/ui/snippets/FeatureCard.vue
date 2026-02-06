<template>
  <VCard
    :variant="cardVariant"
    :color="cardColor"
    :elevation="elevation"
    :hover="hover"
    :height="height"
    :class="['feature-card', { 'text-center': centered }, cardClass]"
  >
    <VCardText :class="contentClass">
      <!-- Icon -->
      <slot name="icon">
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

      <!-- Badge -->
      <slot name="badge">
        <VChip
          v-if="badge"
          :color="badgeColor"
          :variant="badgeVariant"
          :size="badgeSize"
          class="mb-4"
        >
          {{ badge }}
        </VChip>
      </slot>

      <!-- Title -->
      <slot name="title">
        <component
          :is="titleTag"
          :class="[titleClass, 'font-weight-bold', titleMargin]"
        >
          {{ title }}
        </component>
      </slot>

      <!-- Description -->
      <slot name="description">
        <p v-if="description" :class="[descriptionClass, 'mb-0']">
          {{ description }}
        </p>
      </slot>

      <!-- Points List -->
      <slot name="points">
        <VList v-if="points && points.length" density="compact" class="bg-transparent mt-4">
          <VListItem
            v-for="(point, index) in points"
            :key="index"
            class="px-0"
          >
            <template #prepend>
              <VIcon :color="pointIconColor" size="small" class="mr-2">
                {{ pointIcon }}
              </VIcon>
            </template>
            <VListItemTitle class="text-body-2">{{ point }}</VListItemTitle>
          </VListItem>
        </VList>
      </slot>

      <!-- Actions -->
      <slot name="actions" />

      <!-- Additional content -->
      <slot />
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Colors, Variants, Sizes, Icons } from '@/shared/model'
import type { ColorType, VariantType, SizeType, IconType } from './types'

interface Props {
  // Card props
  cardVariant?: VariantType
  cardColor?: ColorType | string
  elevation?: number | string
  hover?: boolean
  height?: string | number
  cardClass?: string
  contentClass?: string
  centered?: boolean

  // Icon props
  icon?: IconType
  iconColor?: ColorType | string
  iconBgColor?: ColorType | string
  iconSize?: SizeType | number
  iconContainerSize?: SizeType | number
  iconRounded?: string
  iconContainerClass?: string

  // Badge props
  badge?: string
  badgeColor?: ColorType
  badgeVariant?: VariantType
  badgeSize?: SizeType

  // Title props
  title: string
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  titleClass?: string

  // Description props
  description?: string
  descriptionClass?: string

  // Points list
  points?: string[]
  pointIcon?: IconType
  pointIconColor?: ColorType
}

const props = withDefaults(defineProps<Props>(), {
  cardVariant: Variants.Outlined,
  elevation: 0,
  hover: true,
  contentClass: 'pa-6',
  centered: false,
  iconColor: 'white',
  iconSize: 28,
  iconContainerSize: 56,
  iconRounded: 'lg',
  iconContainerClass: 'mb-4',
  badgeVariant: Variants.Tonal,
  badgeSize: Sizes.Default,
  titleTag: 'h3',
  titleClass: 'text-h6',
  descriptionClass: 'text-body-2 text-medium-emphasis',
  pointIcon: Icons.CheckCircle,
  pointIconColor: Colors.Success,
})

const titleMargin = computed(() => {
  return props.description || props.points?.length ? 'mb-2' : 'mb-0'
})
</script>

<style scoped>
.feature-card {
  height: 100%;
}
</style>
