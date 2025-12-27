<template>
  <VCard
    :class="[
      'pricing-card d-flex flex-column',
      { 'border-primary border-2': featured },
      cardClass
    ]"
    :elevation="featured ? featuredElevation : elevation"
    height="100%"
  >
    <VCardText class="flex-grow-1">
      <!-- Featured Badge -->
      <slot name="badge">
        <VChip
          v-if="featured && badgeText"
          :color="badgeColor"
          :size="badgeSize"
          class="position-absolute"
          style="top: 12px; right: 12px;"
        >
          {{ badgeText }}
        </VChip>
      </slot>

      <!-- Plan Header -->
      <div :class="['text-center', headerPadding]">
        <slot name="header">
          <slot name="icon">
            <VIcon v-if="icon" :color="iconColor" :size="iconSize" class="mb-4">
              {{ icon }}
            </VIcon>
          </slot>

          <h3 :class="[nameClass, 'font-weight-bold mb-2']">{{ name }}</h3>
          <p v-if="description" :class="[descriptionClass, 'mb-4']">{{ description }}</p>
        </slot>

        <!-- Price Display -->
        <slot name="price">
          <div class="d-flex align-baseline justify-center">
            <span v-if="currencySymbol" class="text-h5 font-weight-bold">{{ currencySymbol }}</span>
            <span :class="[priceClass, 'font-weight-bold']">
              {{ displayPrice }}
            </span>
            <span v-if="priceSuffix" class="text-medium-emphasis ml-1">{{ priceSuffix }}</span>
          </div>
          <p v-if="billingNote" :class="[billingNoteClass, 'mt-1']">
            {{ billingNote }}
          </p>
        </slot>
      </div>

      <VDivider class="mb-4" />

      <!-- Features List -->
      <slot name="features">
        <VList v-if="features?.length" density="compact" class="bg-transparent">
          <FeatureItem
            v-for="(feature, index) in features"
            :key="index"
            :text="feature.text"
            :included="feature.included"
            :icon-included="featureIconIncluded"
            :icon-excluded="featureIconExcluded"
            :icon-color-included="featureIconColorIncluded"
            :icon-color-excluded="featureIconColorExcluded"
          />
        </VList>
      </slot>

      <slot />
    </VCardText>

    <!-- CTA Button -->
    <VCardActions class="pa-4 pt-0">
      <slot name="action">
        <VBtn
          :color="featured ? ctaColor : undefined"
          :variant="featured ? ctaVariant : ctaVariantDefault"
          block
          :size="ctaSize"
          @click="$emit('select')"
        >
          {{ cta }}
        </VBtn>
      </slot>
    </VCardActions>
  </VCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Colors, Variants, Sizes, Icons } from '@/shared/model'
import type { ColorType, VariantType, SizeType, IconType, IPricingFeature } from './types'
import FeatureItem from './FeatureItem.vue'

interface Props {
  // Plan data
  name: string
  description?: string
  monthlyPrice: number
  yearlyPrice?: number
  isYearly?: boolean
  features?: IPricingFeature[]
  cta: string
  featured?: boolean

  // Customization
  icon?: IconType
  iconColor?: ColorType
  iconSize?: SizeType | number

  // Card
  cardClass?: string
  elevation?: number | string
  featuredElevation?: number | string
  headerPadding?: string

  // Badge
  badgeText?: string
  badgeColor?: ColorType
  badgeSize?: SizeType

  // Price display
  currencySymbol?: string
  priceSuffix?: string
  billingNote?: string
  priceClass?: string
  billingNoteClass?: string

  // Feature icons
  featureIconIncluded?: IconType
  featureIconExcluded?: IconType
  featureIconColorIncluded?: ColorType
  featureIconColorExcluded?: ColorType | string

  // CTA
  ctaColor?: ColorType
  ctaVariant?: VariantType
  ctaVariantDefault?: VariantType
  ctaSize?: SizeType

  // Text classes
  nameClass?: string
  descriptionClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  isYearly: false,
  featured: false,
  elevation: 2,
  featuredElevation: 12,
  headerPadding: 'pt-4 pb-6',
  badgeText: 'Most Popular',
  badgeColor: Colors.Primary,
  badgeSize: Sizes.Small,
  currencySymbol: '$',
  priceSuffix: '/month',
  priceClass: 'text-h3',
  billingNoteClass: 'text-caption text-medium-emphasis',
  featureIconIncluded: Icons.CheckCircle,
  featureIconExcluded: Icons.CloseCircle,
  featureIconColorIncluded: Colors.Success,
  featureIconColorExcluded: 'grey-lighten-1',
  ctaColor: Colors.Primary,
  ctaVariant: Variants.Flat,
  ctaVariantDefault: Variants.Outlined,
  ctaSize: Sizes.Large,
  nameClass: 'text-h5',
  descriptionClass: 'text-body-2 text-medium-emphasis',
})

defineEmits<{
  select: []
}>()

const displayPrice = computed(() => {
  return props.isYearly && props.yearlyPrice !== undefined
    ? props.yearlyPrice
    : props.monthlyPrice
})
</script>

<style scoped>
.pricing-card {
  position: relative;
}
</style>
