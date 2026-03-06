<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
}

defineProps<Props>()
</script>

<template>
  <div class="d-flex flex-wrap justify-space-between align-center mb-6 ga-4">
    <div>
      <h1 class="text-h4 font-weight-bold">{{ title }}</h1>
      <p v-if="subtitle" class="text-medium-emphasis mb-0">{{ subtitle }}</p>
    </div>
    <slot />
  </div>
</template>
