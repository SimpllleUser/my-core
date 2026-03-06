<script setup lang="ts">
import { computed } from 'vue'
import { Icons } from '../../model'
import type { ColorType, IconType } from './types'

interface Props {
  title: string
  value: string
  trend?: number
  trendLabel?: string
  icon: IconType
  color: ColorType | string
  useColoredCard?: boolean
  avatarRounded?: string
}

const props = withDefaults(defineProps<Props>(), {
  useColoredCard: false,
  avatarRounded: 'lg',
})

const trendPositive = computed(() => (props.trend ?? 0) >= 0)
const trendColor = computed(() => trendPositive.value ? 'success' : 'error')
const trendIcon = computed(() => trendPositive.value ? Icons.ArrowUp : Icons.ArrowDown)
</script>

<template>
  <VCard
    :color="useColoredCard ? color : undefined"
    :variant="useColoredCard ? 'tonal' : undefined"
  >
    <VCardText>
      <div class="d-flex justify-space-between align-start">
        <div>
          <p class="text-body-2 mb-1 text-medium-emphasis">{{ title }}</p>
          <h3 class="text-h4 font-weight-bold">{{ value }}</h3>
          <div v-if="trend !== undefined" class="d-flex align-center mt-2">
            <VIcon :color="trendColor" size="small">{{ trendIcon }}</VIcon>
            <span :class="`text-${trendColor}`" class="text-body-2 ml-1">
              {{ trend > 0 ? '+' : '' }}{{ Math.abs(trend) }}%
            </span>
            <span v-if="trendLabel" class="text-caption text-medium-emphasis ml-1">{{ trendLabel }}</span>
          </div>
        </div>
        <slot name="icon">
          <VAvatar v-if="!useColoredCard" :color="color" size="48" :rounded="avatarRounded">
            <VIcon color="white">{{ icon }}</VIcon>
          </VAvatar>
          <VIcon v-else size="48" :color="color">{{ icon }}</VIcon>
        </slot>
      </div>
    </VCardText>
  </VCard>
</template>
