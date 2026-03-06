<script setup lang="ts">
import type { ColorType, IconType } from './types'

interface Props {
  title: string
  value: string
  icon: IconType
  color: ColorType | string
  subtitle?: string
}

defineProps<Props>()
</script>

<template>
  <VCard :color="color">
    <VCardText class="text-white">
      <div class="d-flex justify-space-between align-start">
        <div>
          <p class="text-white-darken-1 text-body-2 mb-1">{{ title }}</p>
          <h3 class="text-h4 font-weight-bold">{{ value }}</h3>
          <p v-if="subtitle" class="text-white-darken-1 text-body-2 mt-2 mb-0">{{ subtitle }}</p>
        </div>
        <VIcon size="48" class="text-white-darken-1">{{ icon }}</VIcon>
      </div>
    </VCardText>
  </VCard>
</template>
