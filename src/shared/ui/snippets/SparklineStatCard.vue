<script setup lang="ts">
import { computed } from 'vue'
import type { ColorType } from './types'

interface Props {
  title: string
  value: string
  trend: number
  sparkline: number[]
  color: ColorType | string
  lineWidth?: number
  padding?: number
}

withDefaults(defineProps<Props>(), {
  lineWidth: 2,
  padding: 8,
})

const props = defineProps<Props>()
const trendPositive = computed(() => props.trend >= 0)
const trendColor = computed(() => trendPositive.value ? 'success' : 'error')
</script>

<template>
  <VCard>
    <VCardText>
      <div class="d-flex justify-space-between align-center mb-2">
        <span class="text-medium-emphasis">{{ title }}</span>
        <VChip :color="trendColor" size="x-small" variant="tonal">
          {{ trend > 0 ? '+' : '' }}{{ trend }}%
        </VChip>
      </div>
      <h3 class="text-h4 font-weight-bold">{{ value }}</h3>
      <VSparkline
        :model-value="sparkline"
        :color="color"
        :line-width="lineWidth"
        :padding="padding"
        smooth
        auto-draw
      />
    </VCardText>
  </VCard>
</template>
