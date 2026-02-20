<script setup lang="ts">
import { onMounted } from 'vue'
import { useThemeBuilder } from './lib/theme-configuration/composables/useThemeBuilder.ts'

const { initTheme } = useThemeBuilder()

onMounted(() => {
  initTheme()
})
</script>

<template>
  <v-app>
    <router-view />
  </v-app>
</template>
