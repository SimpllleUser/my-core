<script setup lang="ts">
import type { ColorType } from './types'

interface Props {
  label: string
  percentage: number
  color: ColorType | string
  valueText?: string
  caption?: string
  height?: number
}

withDefaults(defineProps<Props>(), {
  height: 6,
})
</script>

<template>
  <div>
    <div class="d-flex justify-space-between mb-1">
      <span class="text-body-2">{{ label }}</span>
      <span class="text-body-2 font-weight-medium">{{ valueText ?? `${percentage}%` }}</span>
    </div>
    <VProgressLinear :model-value="percentage" :color="color" rounded :height="height" />
    <div v-if="caption" class="text-caption text-medium-emphasis mt-1">{{ caption }}</div>
  </div>
</template>
