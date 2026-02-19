<!--
  Component: CryptoCard
  Description: Displays cryptocurrency asset with price, change, and balance
  Props: name, symbol, icon, price, change24h, balance, value, color
-->
<template>
  <VCard :variant="cardVariant" :color="cardColor" :elevation="elevation" :class="['crypto-card', cardClass]" :hover="hover">
    <VCardText :class="contentClass">
      <!-- Header row: avatar+info and change badge -->
      <slot name="header" :name="name" :symbol="symbol" :change24h="change24h">
        <div :class="['d-flex align-center justify-space-between', headerClass]">
          <div class="d-flex align-center">
            <!-- Avatar -->
            <slot name="avatar" :icon="icon" :name="name" :symbol="symbol">
              <VAvatar :color="avatarColor" :size="avatarSize" :rounded="avatarRounded" :class="avatarClass">
                <VImg v-if="icon" :src="icon" :alt="name" />
                <span v-else :class="avatarFallbackClass">{{ symbol.slice(0, 2) }}</span>
              </VAvatar>
            </slot>

            <!-- Name & Symbol -->
            <slot name="info" :name="name" :symbol="symbol">
              <div>
                <div :class="nameClass">{{ name }}</div>
                <div :class="symbolClass">{{ symbol }}</div>
              </div>
            </slot>
          </div>

          <!-- Change Badge -->
          <slot name="change" :change24h="change24h" :changeColor="changeColor" :changeIcon="changeIcon">
            <VChip
              v-if="showChange"
              :color="changeColor"
              :size="changeChipSize"
              :variant="changeChipVariant"
            >
              <VIcon start :size="changeIconSize">{{ changeIcon }}</VIcon>
              {{ Math.abs(change24h).toFixed(changeDecimalPlaces) }}%
            </VChip>
          </slot>
        </div>
      </slot>

      <!-- Balance & Price row -->
      <slot name="details" :balance="balance" :price="price" :formattedBalance="formattedBalance" :formattedPrice="formattedPrice">
        <div :class="['d-flex justify-space-between align-end', detailsClass]">
          <!-- Balance -->
          <slot name="balance" :balance="balance" :formattedBalance="formattedBalance" :symbol="symbol">
            <div v-if="showBalance">
              <div :class="balanceLabelClass">{{ balanceLabel }}</div>
              <div :class="balanceValueClass">{{ formattedBalance }} {{ symbol }}</div>
            </div>
          </slot>

          <!-- Price -->
          <slot name="price" :price="price" :formattedPrice="formattedPrice">
            <div v-if="showPrice" class="text-right">
              <div :class="priceLabelClass">{{ priceLabel }}</div>
              <div :class="priceValueClass">{{ formattedPrice }}</div>
            </div>
          </slot>
        </div>
      </slot>

      <!-- Divider -->
      <slot v-if="showValue" name="divider">
        <VDivider :class="dividerClass" />
      </slot>

      <!-- Total Value -->
      <slot name="value" :value="computedValue" :formattedValue="formattedValue">
        <div v-if="showValue" :class="['d-flex justify-space-between', valueContainerClass]">
          <span :class="valueLabelClass">{{ valueLabel }}</span>
          <span :class="valueClass">{{ formattedValue }}</span>
        </div>
      </slot>

      <!-- Additional content -->
      <slot />
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Colors, Variants, Sizes, Icons } from '../../model'
import type { ColorType, VariantType, SizeType, IconType } from './types'

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
  hover?: boolean

  // Header
  headerClass?: string

  // Avatar
  avatarColor?: ColorType
  avatarSize?: number
  avatarRounded?: string
  avatarClass?: string
  avatarFallbackClass?: string

  // Change badge
  showChange?: boolean
  changeChipSize?: SizeType
  changeChipVariant?: VariantType
  changeIconSize?: number
  changeDecimalPlaces?: number

  // Styling
  nameClass?: string
  symbolClass?: string

  // Details
  detailsClass?: string

  // Balance
  showBalance?: boolean
  balanceLabel?: string
  balanceLabelClass?: string
  balanceValueClass?: string

  // Price
  showPrice?: boolean
  priceLabel?: string
  priceLabelClass?: string
  priceValueClass?: string

  // Divider
  dividerClass?: string

  // Value
  showValue?: boolean
  valueLabel?: string
  valueLabelClass?: string
  valueClass?: string
  valueContainerClass?: string

  // Icons
  trendUpIcon?: IconType
  trendDownIcon?: IconType
}

const props = withDefaults(defineProps<Props>(), {
  currency: 'USD',
  cardVariant: Variants.Outlined,
  elevation: 0,
  contentClass: 'pa-4',
  hover: false,
  headerClass: 'mb-4',
  avatarColor: Colors.Primary,
  avatarSize: 44,
  avatarRounded: 'lg',
  avatarClass: 'mr-3',
  avatarFallbackClass: 'font-weight-bold',
  showChange: true,
  changeChipSize: Sizes.Small,
  changeChipVariant: Variants.Tonal,
  changeIconSize: 14,
  changeDecimalPlaces: 2,
  nameClass: 'text-subtitle-1 font-weight-bold',
  symbolClass: 'text-caption text-medium-emphasis',
  showBalance: true,
  balanceLabel: 'Balance',
  balanceLabelClass: 'text-caption text-medium-emphasis',
  balanceValueClass: 'text-h6 font-weight-bold',
  showPrice: true,
  priceLabel: 'Price',
  priceLabelClass: 'text-caption text-medium-emphasis',
  priceValueClass: 'text-subtitle-1 font-weight-medium',
  dividerClass: 'my-3',
  showValue: true,
  valueLabel: 'Total Value',
  valueLabelClass: 'text-body-2 text-medium-emphasis',
  valueClass: 'text-subtitle-1 font-weight-bold text-primary',
  trendUpIcon: Icons.TrendingUp,
  trendDownIcon: Icons.TrendingDown,
})

const changeColor = computed(() => (props.change24h >= 0 ? Colors.Success : Colors.Error))
const changeIcon = computed(() => (props.change24h >= 0 ? props.trendUpIcon : props.trendDownIcon))

const computedValue = computed(() => props.value ?? props.balance * props.price)

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
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: props.currency,
  }).format(computedValue.value)
})
</script>

<style scoped>
.crypto-card {
  height: 100%;
}
</style>
