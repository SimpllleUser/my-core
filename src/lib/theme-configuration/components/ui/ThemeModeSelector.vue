<script setup lang="ts">
import { useThemeMode } from '../../composables/useThemeMode.ts'
import { useThemeColors } from '../../composables/useThemeColors.ts'
import SectionWrapper from './SectionWrapper.vue'

const { activeMode } = useThemeMode()
const { activeSurface } = useThemeColors()
</script>

<template>
  <SectionWrapper title="Режим" divider>
    <VBtnToggle v-model="activeMode" color="primary" variant="outlined" divided mandatory class="w-100 d-flex">
      <VBtn value="light" class="flex-grow-1 text-none">Світла</VBtn>
      <VBtn value="dark" class="flex-grow-1 text-none">Темна</VBtn>
      <VBtn value="system" class="flex-grow-1 text-none">Система</VBtn>
    </VBtnToggle>
  </SectionWrapper>

  <SectionWrapper title="Відтінок фону" divider>
    <VBtnToggle v-model="activeSurface" color="primary" variant="outlined" divided mandatory class="w-100 d-flex">
      <VBtn value="Default" class="flex-grow-1 text-none">Default</VBtn>
      <VBtn value="Zinc" class="flex-grow-1 text-none">Zinc</VBtn>
      <VBtn value="Slate" class="flex-grow-1 text-none">Slate</VBtn>
    </VBtnToggle>
  </SectionWrapper>
</template>

<style scoped> .w-100 { width: 100%; } </style>
