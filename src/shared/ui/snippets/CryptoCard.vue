<!--
  Component: CryptoCard
  Description: Displays cryptocurrency asset with price, change, and balance
  Props: name, symbol, icon, price, change24h, balance, value, color
-->
<template>
  <VCard :variant="cardVariant" :color="cardColor" :elevation="elevation" :class="cardClass">
    <VCardText :class="contentClass">
      <div class="d-flex align-center justify-space-between mb-4">
        <div class="d-flex align-center">
          <VAvatar :color="avatarColor" :size="avatarSize" :rounded="avatarRounded" class="mr-3">
            <VImg v-if="icon" :src="icon" :alt="name" />
            <span v-else class="font-weight-bold">{{ symbol.slice(0, 2) }}</span>
          </VAvatar>
          <div>
            <div :class="nameClass">{{ name }}</div>
            <div :class="symbolClass">{{ symbol }}</div>
          </div>
        </div>
        <VChip :color="changeColor" size="small" variant="tonal">
          <VIcon start size="14">{{ changeIcon }}</VIcon>
          {{ Math.abs(change24h).toFixed(2) }}%
        </VChip>
      </div>

      <div class="d-flex justify-space-between align-end">
        <div>
          <div :class="balanceLabelClass">Balance</div>
          <div :class="balanceValueClass">{{ formattedBalance }} {{ symbol }}</div>
        </div>
        <div class="text-right">
          <div :class="priceLabelClass">Price</div>
          <div :class="priceValueClass">{{ formattedPrice }}</div>
        </div>
      </div>

      <VDivider v-if="showValue" class="my-3" />

      <div v-if="showValue" class="d-flex justify-space-between">
        <span :class="valueLabelClass">Total Value</span>
        <span :class="valueClass">{{ formattedValue }}</span>
      </div>
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Colors, Variants, Icons } from '@/shared/model'
import type { ColorType, VariantType } from './types'

interface Props {
  // Data
  name: string
  symbol: string
  icon?: string
  price: number
  change24h: number
  balance: number
  value?: number
  currency?: string

  // Card
  cardVariant?: VariantType
  cardColor?: ColorType | string
  elevation?: number | string
  cardClass?: string
  contentClass?: string

  // Avatar
  avatarColor?: ColorType
  avatarSize?: number
  avatarRounded?: string

  // Styling
  nameClass?: string
  symbolClass?: string
  balanceLabelClass?: string
  balanceValueClass?: string
  priceLabelClass?: string
  priceValueClass?: string
  valueLabelClass?: string
  valueClass?: string

  // Options
  showValue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  currency: 'USD',
  cardVariant: Variants.Outlined,
  elevation: 0,
  contentClass: 'pa-4',
  avatarColor: Colors.Primary,
  avatarSize: 44,
  avatarRounded: 'lg',
  nameClass: 'text-subtitle-1 font-weight-bold',
  symbolClass: 'text-caption text-medium-emphasis',
  balanceLabelClass: 'text-caption text-medium-emphasis',
  balanceValueClass: 'text-h6 font-weight-bold',
  priceLabelClass: 'text-caption text-medium-emphasis',
  priceValueClass: 'text-subtitle-1 font-weight-medium',
  valueLabelClass: 'text-body-2 text-medium-emphasis',
  valueClass: 'text-subtitle-1 font-weight-bold text-primary',
  showValue: true,
})

const changeColor = computed(() => (props.change24h >= 0 ? Colors.Success : Colors.Error))
const changeIcon = computed(() => (props.change24h >= 0 ? Icons.TrendingUp : Icons.TrendingDown))

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: props.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(props.price)
})

const formattedBalance = computed(() => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  }).format(props.balance)
})

const formattedValue = computed(() => {
  const val = props.value ?? props.balance * props.price
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: props.currency,
  }).format(val)
})
</script>
