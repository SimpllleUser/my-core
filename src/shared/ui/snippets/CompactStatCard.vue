<script setup lang="ts">
import type { ColorType, IconType } from './types'

interface Props {
  title: string
  value: string
  icon: IconType
  color: ColorType | string
  iconSize?: number
}

withDefaults(defineProps<Props>(), {
  iconSize: 32,
})
</script>

<template>
  <VCard variant="tonal" :color="color">
    <VCardText class="text-center pa-4">
      <VIcon :color="color" :size="iconSize" class="mb-2">{{ icon }}</VIcon>
      <h4 class="text-h5 font-weight-bold">{{ value }}</h4>
      <p class="text-caption text-medium-emphasis mb-0">{{ title }}</p>
    </VCardText>
  </VCard>
</template>
