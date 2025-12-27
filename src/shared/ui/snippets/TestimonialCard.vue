<template>
  <VCard
    :variant="cardVariant"
    :color="cardColor"
    :elevation="elevation"
    :height="height"
    :class="['testimonial-card', { 'text-center': centered }, cardClass]"
  >
    <VCardText :class="contentClass">
      <!-- Quote Icon (for featured variant) -->
      <slot v-if="showQuoteIcon" name="quote-icon">
        <VIcon :size="quoteIconSize" :color="quoteIconColor" class="mb-6">
          {{ quoteIcon }}
        </VIcon>
      </slot>

      <!-- Rating -->
      <slot name="rating">
        <VRating
          v-if="showRating && rating !== undefined"
          :model-value="rating"
          :color="ratingColor"
          :density="ratingDensity"
          :size="ratingSize"
          readonly
          :half-increments="halfIncrements"
          :class="ratingClass"
        />
      </slot>

      <!-- Quote Text -->
      <slot name="text">
        <p :class="[textClass, 'mb-6']">
          <template v-if="showQuotes">"</template>{{ text }}<template v-if="showQuotes">"</template>
        </p>
      </slot>

      <!-- Author Info -->
      <div :class="['d-flex', { 'justify-center': centered }, 'align-center']">
        <slot name="avatar">
          <VAvatar :size="avatarSize" :class="avatarClass">
            <VImg :src="avatar" :alt="name" />
          </VAvatar>
        </slot>

        <slot name="author">
          <div :class="{ 'text-center': centered && !avatar }">
            <p :class="[nameClass, 'mb-0']">{{ name }}</p>
            <p :class="[roleClass, 'mb-0']">
              {{ role }}
              <template v-if="company"> at {{ company }}</template>
            </p>
          </div>
        </slot>

        <slot name="append" />
      </div>

      <!-- Bottom Rating (for centered variant) -->
      <slot v-if="showRating && ratingPosition === 'bottom'" name="bottom-rating">
        <VRating
          v-if="rating !== undefined"
          :model-value="rating"
          :color="ratingColor"
          :density="ratingDensity"
          :size="ratingSize"
          readonly
          :half-increments="halfIncrements"
          class="mt-4"
        />
      </slot>

      <slot />
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import { Colors, Variants, Sizes, Icons } from '@/shared/model'
import type { ColorType, VariantType, SizeType, IconType } from './types'

interface Props {
  // Author data
  name: string
  role: string
  company?: string
  avatar: string
  text: string
  rating?: number

  // Layout
  centered?: boolean

  // Card props
  cardVariant?: VariantType
  cardColor?: ColorType | string
  elevation?: number | string
  height?: string | number
  cardClass?: string
  contentClass?: string

  // Avatar
  avatarSize?: SizeType | number
  avatarClass?: string

  // Rating
  showRating?: boolean
  ratingPosition?: 'top' | 'bottom'
  ratingColor?: ColorType
  ratingDensity?: 'default' | 'comfortable' | 'compact'
  ratingSize?: SizeType
  halfIncrements?: boolean
  ratingClass?: string

  // Quote
  showQuotes?: boolean
  showQuoteIcon?: boolean
  quoteIcon?: IconType
  quoteIconSize?: SizeType | number
  quoteIconColor?: ColorType

  // Text classes
  textClass?: string
  nameClass?: string
  roleClass?: string
}

withDefaults(defineProps<Props>(), {
  centered: false,
  cardVariant: Variants.Flat,
  elevation: 0,
  contentClass: 'pa-6',
  avatarSize: 48,
  avatarClass: 'mr-3',
  showRating: true,
  ratingPosition: 'top',
  ratingColor: 'warning',
  ratingDensity: 'compact',
  ratingSize: Sizes.Default,
  halfIncrements: false,
  ratingClass: 'mb-4',
  showQuotes: true,
  showQuoteIcon: false,
  quoteIcon: Icons.QuoteOpen,
  quoteIconSize: 64,
  quoteIconColor: Colors.Primary,
  textClass: 'text-body-1',
  nameClass: 'font-weight-medium',
  roleClass: 'text-caption text-medium-emphasis',
})
</script>

<style scoped>
.testimonial-card {
  height: 100%;
}
</style>
