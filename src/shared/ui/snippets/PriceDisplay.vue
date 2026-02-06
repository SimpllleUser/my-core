<template>
  <div :class="['price-display', { 'd-flex align-center': inline }]">
    <slot>
      <span :class="[priceClass, 'font-weight-bold']">
        <slot name="currency">{{ currencySymbol }}</slot>{{ formattedPrice }}
      </span>
      <span
        v-if="originalPrice && originalPrice > price"
        :class="originalPriceClass"
      >
        {{ currencySymbol }}{{ formattedOriginalPrice }}
      </span>
    </slot>

    <slot name="discount">
      <VChip
        v-if="showDiscount && discountPercentage > 0"
        :color="discountColor"
        :size="discountSize"
        :class="discountClass"
      >
        {{ discountPrefix }}{{ discountPercentage }}%
      </VChip>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Colors, Sizes } from '@/shared/model'
import type { ColorType, SizeType } from './types'

interface Props {
  price: number
  originalPrice?: number | null
  currencySymbol?: string
  decimalPlaces?: number
  priceClass?: string
  originalPriceClass?: string
  inline?: boolean
  showDiscount?: boolean
  discountColor?: ColorType
  discountSize?: SizeType
  discountClass?: string
  discountPrefix?: string
}

const props = withDefaults(defineProps<Props>(), {
  currencySymbol: '$',
  decimalPlaces: 2,
  priceClass: 'text-h6 text-primary',
  originalPriceClass: 'text-body-2 text-medium-emphasis text-decoration-line-through ml-2',
  inline: false,
  showDiscount: false,
  discountColor: Colors.Success,
  discountSize: Sizes.Small,
  discountClass: 'ml-2',
  discountPrefix: '-',
})

const formattedPrice = computed(() => {
  return props.price.toFixed(props.decimalPlaces)
})

const formattedOriginalPrice = computed(() => {
  return props.originalPrice?.toFixed(props.decimalPlaces) ?? ''
})

const discountPercentage = computed(() => {
  if (!props.originalPrice || props.originalPrice <= props.price) return 0
  return Math.round(((props.originalPrice - props.price) / props.originalPrice) * 100)
})
</script>
