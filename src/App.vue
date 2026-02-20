<script setup lang="ts">
import { onMounted } from 'vue'
import { useThemeFacade } from './lib/theme-configuration/composables/useThemeFacade.ts'

const { initTheme, dynamicDefaults } = useThemeFacade()

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
