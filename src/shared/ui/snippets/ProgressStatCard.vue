<script setup lang="ts">
import type { ColorType } from './types'

interface Props {
  title: string
  value: string
  progress: number
  color: ColorType | string
  circularSize?: number
  circularWidth?: number
  linearHeight?: number
}

withDefaults(defineProps<Props>(), {
  circularSize: 60,
  circularWidth: 6,
  linearHeight: 8,
})
</script>

<template>
  <VCard>
    <VCardText>
      <div class="d-flex justify-space-between align-center mb-4">
        <div>
          <p class="text-medium-emphasis text-body-2 mb-1">{{ title }}</p>
          <h3 class="text-h4 font-weight-bold">{{ value }}</h3>
        </div>
        <VProgressCircular
          :model-value="progress"
          :color="color"
          :size="circularSize"
          :width="circularWidth"
        >
          <span class="text-caption font-weight-medium">{{ progress }}%</span>
        </VProgressCircular>
      </div>
      <VProgressLinear
        :model-value="progress"
        :color="color"
        rounded
        :height="linearHeight"
      />
    </VCardText>
  </VCard>
</template>
