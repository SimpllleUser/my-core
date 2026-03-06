<script setup lang="ts">
import { computed } from 'vue'
import { Icons } from '../../model'
import type { ColorType, IconType } from './types'

interface Props {
  title: string
  value: string
  trend: number
  icon: IconType
  color: ColorType | string
  trendLabel?: string
}

withDefaults(defineProps<Props>(), {
  trendLabel: 'vs last month',
})

const props = defineProps<Props>()
const trendPositive = computed(() => props.trend >= 0)
const trendColor = computed(() => trendPositive.value ? 'success' : 'error')
const trendIcon = computed(() => trendPositive.value ? Icons.ArrowUp : Icons.ArrowDown)
</script>

<template>
  <VCard>
    <VCardText>
      <div class="d-flex align-center mb-2">
        <VIcon :color="color" class="mr-2">{{ icon }}</VIcon>
        <span class="text-medium-emphasis">{{ title }}</span>
      </div>
      <h3 class="text-h4 font-weight-bold mb-2">{{ value }}</h3>
      <div class="d-flex align-center">
        <VChip :color="trendColor" size="small" variant="tonal" class="mr-2">
          <VIcon start size="small">{{ trendIcon }}</VIcon>
          {{ Math.abs(trend) }}%
        </VChip>
        <span class="text-caption text-medium-emphasis">{{ trendLabel }}</span>
      </div>
    </VCardText>
  </VCard>
</template>
