<script setup lang="ts">
defineProps<{
  title: string
  divider?: boolean
}>()
</script>

<template>
  <div class="mb-6">
    <div class="text-subtitle-2 font-weight-bold mb-3">{{ title }}</div>
    <slot />
  </div>
  <VDivider class="my-4" v-if="divider" />
</template>
