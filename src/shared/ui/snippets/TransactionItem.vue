<!--
  Component: TransactionItem
  Description: Displays a single transaction with icon, title, amount, and status
  Props: type, status, title, description, amount, currency, date, icon, category
-->
<template>
  <VListItem :class="itemClass">
    <template #prepend>
      <VAvatar :color="iconBgColor" :size="iconContainerSize" :rounded="iconRounded">
        <VIcon :color="iconColor" :size="iconSize">{{ displayIcon }}</VIcon>
      </VAvatar>
    </template>

    <VListItemTitle :class="titleClass">{{ title }}</VListItemTitle>
    <VListItemSubtitle :class="subtitleClass">
      <slot name="subtitle">
        {{ description || formattedDate }}
      </slot>
    </VListItemSubtitle>

    <template #append>
      <div class="text-right">
        <div :class="['font-weight-bold', amountClass]">
          {{ amountPrefix }}{{ formattedAmount }}
        </div>
        <VChip
          v-if="showStatus"
          :color="statusColor"
          size="x-small"
          variant="tonal"
          class="mt-1"
        >
          {{ status }}
        </VChip>
      </div>
    </template>
  </VListItem>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Colors, Icons } from '@/shared/model'
import type { ColorType, IconType, TransactionType, TransactionStatus } from './types'

interface Props {
  // Transaction data
  type: TransactionType
  status?: TransactionStatus
  title: string
  description?: string
  amount: number
  currency?: string
  date?: string
  icon?: IconType
  category?: string

  // Styling
  itemClass?: string
  titleClass?: string
  subtitleClass?: string
  amountClass?: string

  // Icon
  iconColor?: ColorType | string
  iconBgColor?: ColorType
  iconSize?: number
  iconContainerSize?: number
  iconRounded?: string

  // Options
  showStatus?: boolean
  showSign?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  status: 'completed',
  currency: 'USD',
  titleClass: 'text-body-1 font-weight-medium',
  subtitleClass: 'text-caption text-medium-emphasis',
  iconColor: 'white',
  iconSize: 20,
  iconContainerSize: 44,
  iconRounded: 'lg',
  showStatus: false,
  showSign: true,
})

const typeConfig = {
  income: { icon: Icons.ArrowDown, color: Colors.Success, prefix: '+' },
  expense: { icon: Icons.ArrowUp, color: Colors.Error, prefix: '-' },
  transfer: { icon: Icons.SwapHorizontal, color: Colors.Info, prefix: '' },
}

const statusConfig = {
  completed: Colors.Success,
  pending: Colors.Warning,
  failed: Colors.Error,
}

const displayIcon = computed(() => props.icon || typeConfig[props.type].icon)
const iconBgColor = computed(() => typeConfig[props.type].color)
const statusColor = computed(() => statusConfig[props.status])

const amountPrefix = computed(() => {
  if (!props.showSign) return ''
  return typeConfig[props.type].prefix
})

const amountColorClass = computed(() => {
  if (props.type === 'income') return 'text-success'
  if (props.type === 'expense') return 'text-error'
  return ''
})

const formattedAmount = computed(() => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: props.currency,
  }).format(Math.abs(props.amount))
})

const formattedDate = computed(() => {
  if (!props.date) return ''
  return new Date(props.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
})
</script>
