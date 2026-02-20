<script setup lang="ts">
import { useThemeDefaults } from '../../composables/useThemeDefaults.ts'
import { RADIUS_OPTION } from '../../constants.ts'
import SectionWrapper from './SectionWrapper.vue'

const { activeCardStyle, activeInteractiveStyle, activeRadius } = useThemeDefaults()
</script>

<template>
  <SectionWrapper title="Стиль карток" divider>
    <VBtnToggle v-model="activeCardStyle" color="primary" variant="outlined" divided mandatory class="w-100 d-flex">
      <VBtn value="elevated" class="flex-grow-1 text-none"><VIcon start>mdi-layers</VIcon> З тінями</VBtn>
      <VBtn value="outlined" class="flex-grow-1 text-none"><VIcon start>mdi-border-all</VIcon> Плоскі</VBtn>
    </VBtnToggle>
  </SectionWrapper>

  <SectionWrapper title="Інтерактивність (Ripple & Кнопки)" divider>
    <VBtnToggle v-model="activeInteractiveStyle" color="primary" variant="outlined" divided mandatory class="w-100 d-flex">
      <VBtn value="material" class="flex-grow-1 text-none"><VIcon start>mdi-animation-play</VIcon> Material</VBtn>
      <VBtn value="modern" class="flex-grow-1 text-none"><VIcon start>mdi-cursor-default-click</VIcon> Modern</VBtn>
    </VBtnToggle>
  </SectionWrapper>

  <SectionWrapper title="Радіус скруглення">
    <VSelect v-model="activeRadius" :items="RADIUS_OPTION" item-title="label" item-value="value" variant="outlined" density="compact" hide-details>
      <template #selection="{ item }">{{ item.raw.label }} ({{ item.raw.value }}px)</template>
    </VSelect>
  </SectionWrapper>
</template>

<style scoped> .w-100 { width: 100%; } </style>
