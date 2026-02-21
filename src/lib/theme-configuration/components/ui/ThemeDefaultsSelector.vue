<script setup lang="ts">
import { useThemeDefaults } from '../../composables/useThemeDefaults.ts'
import { RADIUS_OPTION } from '../../constants.ts'
import { ShadowProfile } from '../../model.ts'
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
      <VBtn value="default" class="flex-grow-1 text-none px-1">
        <VIcon start>mdi-format-line-spacing-normal</VIcon>
        Просторий
      </VBtn>
      <VBtn value="comfortable" class="flex-grow-1 text-none px-1">
        <VIcon start>mdi-format-list-text</VIcon>
        Зручний
      </VBtn>
      <VBtn value="compact" class="flex-grow-1 text-none px-1">
        <VIcon start>mdi-view-headline</VIcon>
        Компактний
      </VBtn>
    </VBtnToggle>
  </SectionWrapper>

  <SectionWrapper title="Профіль тіней (Elevation)" divider>
    <VRow dense>
      <VCol cols="6">
        <VBtn
          block variant="outlined" class="text-none"
          :color="activeShadowProfile === ShadowProfile.MATERIAL ? 'primary' : undefined"
          @click="activeShadowProfile = ShadowProfile.MATERIAL"
        >
          Material (Vuetify)
        </VBtn>
      </VCol>
      <VCol cols="6">
        <VBtn
          block variant="outlined" class="text-none"
          :color="activeShadowProfile === ShadowProfile.SOFT ? 'primary' : undefined"
          @click="activeShadowProfile = ShadowProfile.SOFT"
        >
          Soft (Apple)
        </VBtn>
      </VCol>
      <VCol cols="6">
        <VBtn
          block variant="outlined" class="text-none"
          :color="activeShadowProfile === ShadowProfile.CRISP ? 'primary' : undefined"
          @click="activeShadowProfile = ShadowProfile.CRISP"
        >
          Crisp (Shadcn)
        </VBtn>
      </VCol>
      <VCol cols="6">
        <VBtn
          block variant="outlined" class="text-none"
          :color="activeShadowProfile === ShadowProfile.NEO_BRUTAL ? 'primary' : undefined"
          @click="activeShadowProfile = ShadowProfile.NEO_BRUTAL"
        >
          Neo-brutalism
        </VBtn>
      </VCol>
      <VCol cols="6">
        <VBtn
          block variant="outlined" class="text-none"
          :color="activeShadowProfile === ShadowProfile.GLOW ? 'primary' : undefined"
          @click="activeShadowProfile = ShadowProfile.GLOW"
        >
          Glow
        </VBtn>
      </VCol>
      <VCol>
        <VBtn
          block variant="outlined" class="text-none"
          :color="activeShadowProfile === ShadowProfile.NEUMORPHIC ? 'primary' : undefined"
          @click="activeShadowProfile = ShadowProfile.NEUMORPHIC"
        >
          NEUMORPHIC
        </VBtn>
      </VCol>
      <VCol cols="6">

        <VBtn
          block variant="outlined" class="text-none"
          :color="activeShadowProfile === ShadowProfile.GLASS ? 'primary' : undefined"
          @click="activeShadowProfile = ShadowProfile.GLASS"
        >
          GLASS
        </VBtn>
      </VCol>
    </VRow>
  </SectionWrapper>

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
    <VSelect
      v-model="activeRadius"
      :items="RADIUS_OPTION"
      item-title="label"
      item-value="value"
      variant="outlined"
      density="compact"
      hide-details
    >
      <template #selection="{ item }">{{ item.raw.label }} ({{ item.raw.value }}px)</template>
    </VSelect>
  </SectionWrapper>
</template>

<style scoped>
.w-100 { width: 100%; }
</style>
