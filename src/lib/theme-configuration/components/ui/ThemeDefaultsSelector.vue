<script setup lang="ts">
import { useThemeDefaults } from '../../composables/useThemeDefaults.ts'
import {
  CARD_STYLE_OPTIONS,
  DENSITY_OPTIONS,
  INTERACTIVE_OPTIONS,
  RADIUS_OPTION,
  SHADOW_OPTIONS
} from '../../constants.ts';
import SectionWrapper from './SectionWrapper.vue'

const {
  activeCardStyle,
  activeInteractiveStyle,
  activeRadius,
  activeDensity,
  activeShadowProfile
} = useThemeDefaults()


</script>

<template>
  <SectionWrapper title="Щільність інтерфейсу" divider>
    <VBtnToggle
      v-model="activeDensity"
      color="primary"
      variant="outlined"
      divided
      mandatory
      class="w-100 d-flex"
    >
      <VBtn
        v-for="option in DENSITY_OPTIONS"
        :key="option.value"
        :value="option.value"
        class="flex-grow-1 text-none px-1"
      >
        <VIcon start>{{ option.icon }}</VIcon>
        {{ option.label }}
      </VBtn>
    </VBtnToggle>
  </SectionWrapper>

  <SectionWrapper title="Профіль тіней (Elevation)" divider>
    <VRow dense>
      <VCol
        v-for="option in SHADOW_OPTIONS"
        :key="option.value"
        cols="2"
      >
        <VBtn
          block
          variant="outlined"
          class="text-none"
          :color="activeShadowProfile === option.value ? 'primary' : undefined"
          @click="activeShadowProfile = option.value"
        >
          {{ option.label }}
        </VBtn>
      </VCol>
    </VRow>
  </SectionWrapper>

  <SectionWrapper title="Стиль карток" divider>
    <VBtnToggle
      v-model="activeCardStyle"
      color="primary"
      variant="outlined"
      divided
      mandatory
      class="w-100 d-flex"
    >
      <VBtn
        v-for="option in CARD_STYLE_OPTIONS"
        :key="option.value"
        :value="option.value"
        class="flex-grow-1 text-none"
      >
        <VIcon start>{{ option.icon }}</VIcon>
        {{ option.label }}
      </VBtn>
    </VBtnToggle>
  </SectionWrapper>

  <SectionWrapper title="Інтерактивність (Ripple & Кнопки)" divider>
    <VBtnToggle
      v-model="activeInteractiveStyle"
      color="primary"
      variant="outlined"
      divided
      mandatory
      class="w-100 d-flex"
    >
      <VBtn
        v-for="option in INTERACTIVE_OPTIONS"
        :key="option.value"
        :value="option.value"
        class="flex-grow-1 text-none"
      >
        <VIcon start>{{ option.icon }}</VIcon>
        {{ option.label }}
      </VBtn>
    </VBtnToggle>
  </SectionWrapper>

  <SectionWrapper title="Радіус скруглення">
    <VSelect
      v-model="activeRadius"
      :items="RADIUS_OPTION"
      item-title="label"
      item-value="value"
      variant="outlined"
      density="compact"
      hide-details
    >
      <template #selection="{ item }">
        {{ item.raw.label }} ({{ item.raw.value }}px)
      </template>
    </VSelect>
  </SectionWrapper>
</template>

<style scoped>
.w-100 { width: 100%; }
</style>
