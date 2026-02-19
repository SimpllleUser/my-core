<script setup lang="ts">
import { computed } from 'vue'
import { Colors, Variants, Sizes } from '../../model'
import type { ColorType, VariantType, SizeType } from './types'

interface Props {
  price: number
  originalPrice?: number | null
  currencySymbol?: string
  decimalPlaces?: number
  priceClass?: string
  originalPriceClass?: string
  containerClass?: string
  inline?: boolean
  showDiscount?: boolean
  discountColor?: ColorType
  discountVariant?: VariantType
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
  discountVariant: Variants.Flat,
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
<template>
  <div :class="['price-display', { 'd-flex align-center': inline }, containerClass]">
    <slot :price="price" :formattedPrice="formattedPrice" :originalPrice="originalPrice" :formattedOriginalPrice="formattedOriginalPrice">
      <!-- Current Price -->
      <slot name="price" :price="price" :formattedPrice="formattedPrice">
        <span :class="[priceClass, 'font-weight-bold']">
          <slot name="currency">{{ currencySymbol }}</slot>{{ formattedPrice }}
        </span>
      </slot>

      <!-- Original Price -->
      <slot name="original-price" :originalPrice="originalPrice" :formattedOriginalPrice="formattedOriginalPrice">
        <span
          v-if="originalPrice && originalPrice > price"
          :class="originalPriceClass"
        >
          {{ currencySymbol }}{{ formattedOriginalPrice }}
        </span>
      </slot>
    </slot>

    <!-- Discount Badge -->
    <slot name="discount" :discountPercentage="discountPercentage">
      <VChip
        v-if="showDiscount && discountPercentage > 0"
        :color="discountColor"
        :variant="discountVariant"
        :size="discountSize"
        :class="discountClass"
      >
        {{ discountPrefix }}{{ discountPercentage }}%
      </VChip>
    </slot>

    <!-- Additional content -->
    <slot name="append" />
  </div>
</template>
