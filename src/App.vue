<script setup lang="ts">
import { onMounted } from 'vue'
import { useThemeBuilder } from './lib/theme-configuration/composables/useThemeBuilder.ts'

const { initTheme, dynamicDefaults } = useThemeBuilder()

onMounted(() => {
  initTheme()
})
</script>

<template>
  <VApp>
    <VDefaultsProvider :defaults="dynamicDefaults">
      <RouterView />
    </VDefaultsProvider>
  </VApp>
</template>
