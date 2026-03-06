<script setup lang="ts">
import type { IconType } from './types'

interface Props {
  icon?: IconType
  label?: string
  description?: string
  height?: string | number
  gradient?: string
}

withDefaults(defineProps<Props>(), {
  height: 300,
  gradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
})
</script>

<template>
  <div
    class="d-flex align-center justify-center rounded-lg"
    :style="`height: ${typeof height === 'number' ? height + 'px' : height}; background: ${gradient};`"
  >
    <div class="text-center">
      <slot>
        <VIcon v-if="icon" size="64" color="primary" class="mb-2">{{ icon }}</VIcon>
        <p v-if="label" class="text-medium-emphasis mb-1">{{ label }}</p>
        <p v-if="description" class="text-caption text-medium-emphasis mb-0">{{ description }}</p>
      </slot>
    </div>
  </div>
</template>
