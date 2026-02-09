<!--
  Component: TransactionItem
  Description: Displays a single transaction with icon, title, amount, and status
  Props: type, status, title, description, amount, currency, date, icon, category
-->
<template>
  <VListItem :class="itemClass" v-bind="$attrs">
    <template #prepend>
      <slot name="prepend" :type="type" :displayIcon="displayIcon" :iconBgColor="computedIconBgColor">
        <VAvatar :color="computedIconBgColor" :size="iconContainerSize" :rounded="iconRounded" :class="iconContainerClass">
          <slot name="icon" :icon="displayIcon" :type="type">
            <VIcon :color="iconColor" :size="iconSize">{{ displayIcon }}</VIcon>
          </slot>
        </VAvatar>
      </slot>
    </template>

    <slot name="title-content" :title="title">
      <VListItemTitle :class="titleClass">
        <slot name="title">{{ title }}</slot>
      </VListItemTitle>
    </slot>

    <VListItemSubtitle :class="subtitleClass">
      <slot name="subtitle">
        {{ description || formattedDate }}
      </slot>
    </VListItemSubtitle>

    <template #append>
      <slot name="append" :amount="amount" :formattedAmount="formattedAmount" :status="status">
        <div :class="appendClass">
          <!-- Amount -->
          <slot name="amount" :amount="amount" :formattedAmount="formattedAmount" :amountPrefix="amountPrefix">
            <div :class="['font-weight-bold', amountClass, amountColorClass]">
              {{ amountPrefix }}{{ formattedAmount }}
            </div>
          </slot>

          <!-- Status -->
          <slot name="status" :status="status" :statusColor="computedStatusColor">
            <VChip
              v-if="showStatus && status"
              :color="computedStatusColor"
              :size="statusChipSize"
              :variant="statusChipVariant"
              :class="statusClass"
            >
              {{ status }}
            </VChip>
          </slot>
        </div>
      </slot>
    </template>
  </VListItem>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Colors, Variants, Sizes, Icons } from '@/shared/model'
import type { ColorType, VariantType, SizeType, IconType, TransactionType, TransactionStatus } from './types'

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
  appendClass?: string
  statusClass?: string

  // Icon
  iconColor?: ColorType | string
  iconBgColor?: ColorType
  iconSize?: number
  iconContainerSize?: number
  iconRounded?: string
  iconContainerClass?: string

  // Status chip
  statusChipSize?: SizeType
  statusChipVariant?: VariantType

  // Options
  showStatus?: boolean
  showSign?: boolean

  // Custom type icons
  incomeIcon?: IconType
  expenseIcon?: IconType
  transferIcon?: IconType

  // Custom type colors
  incomeColor?: ColorType
  expenseColor?: ColorType
  transferColor?: ColorType
}

const props = withDefaults(defineProps<Props>(), {
  status: 'completed',
  currency: 'USD',
  titleClass: 'text-body-1 font-weight-medium',
  subtitleClass: 'text-caption text-medium-emphasis',
  appendClass: 'text-right',
  statusClass: 'mt-1',
  iconColor: 'white',
  iconSize: 20,
  iconContainerSize: 44,
  iconRounded: 'lg',
  statusChipSize: Sizes.XSmall,
  statusChipVariant: Variants.Tonal,
  showStatus: false,
  showSign: true,
  incomeIcon: Icons.ArrowDown,
  expenseIcon: Icons.ArrowUp,
  transferIcon: Icons.SwapHorizontal,
  incomeColor: Colors.Success,
  expenseColor: Colors.Error,
  transferColor: Colors.Info,
})

const typeConfig = computed(() => ({
  income: { icon: props.incomeIcon, color: props.incomeColor, prefix: '+' },
  expense: { icon: props.expenseIcon, color: props.expenseColor, prefix: '-' },
  transfer: { icon: props.transferIcon, color: props.transferColor, prefix: '' },
}))

const statusConfig: Record<string, ColorType> = {
  completed: Colors.Success,
  pending: Colors.Warning,
  failed: Colors.Error,
}

const displayIcon = computed(() => props.icon || typeConfig.value[props.type].icon)
const computedIconBgColor = computed(() => props.iconBgColor || typeConfig.value[props.type].color)
const computedStatusColor = computed(() => statusConfig[props.status] || Colors.Info)

const amountPrefix = computed(() => {
  if (!props.showSign) return ''
  return typeConfig.value[props.type].prefix
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
