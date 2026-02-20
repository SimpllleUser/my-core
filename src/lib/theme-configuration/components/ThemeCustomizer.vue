<script setup lang="ts">
import { ref, computed } from 'vue'
import { useThemeBuilder } from '../composables/useThemeBuilder.ts'
import { MATERIAL_SWATCHES } from '@/lib/theme-configuration/constants.ts';

const {
  activePresetName,
  activeRadius,
  activeMode,
  activeSurface,
  activeCardStyle,
  activeSemantic,
  customPrimaryColor,
  customSecondaryColor,
  themePresets,
  radiusOptions,
  semanticPalettes,
} = useThemeBuilder()

const activeColorTarget = ref<'primary' | 'secondary'>('primary')

const currentCustomColor = computed({
  get: () => activeColorTarget.value === 'primary'
    ? customPrimaryColor.value
    : customSecondaryColor.value,
  set: (val: string) => {
    if (activeColorTarget.value === 'primary') customPrimaryColor.value = val
    else customSecondaryColor.value = val
  },
})

const presetButtonColor = (presetName: string) => {
  if (presetName !== 'Custom') return themePresets.find(p => p.name === presetName)?.colors.primary ?? ''
  return activeColorTarget.value === 'primary' ? customPrimaryColor.value : customSecondaryColor.value
}
</script>

<template>
  <VCard elevation="0" class="border">
    <VCardTitle class="text-h6 font-weight-bold pb-2">
      Налаштування теми
    </VCardTitle>
    <VCardSubtitle>
      Кастомізуйте вигляд вашого додатку
    </VCardSubtitle>

    <VCardText class="pt-4">
      <div class="text-subtitle-2 font-weight-bold mb-3">Режим</div>
      <VBtnToggle v-model="activeMode" color="primary" variant="outlined" divided mandatory class="w-100 mb-6 d-flex">
        <VBtn value="light" class="flex-grow-1 text-none">Світла</VBtn>
        <VBtn value="dark" class="flex-grow-1 text-none">Темна</VBtn>
        <VBtn value="system" class="flex-grow-1 text-none">Система</VBtn>
      </VBtnToggle>
      <VDivider class="my-4" />

      <div class="text-subtitle-2 font-weight-bold mb-3">Відтінок фону</div>
      <VBtnToggle v-model="activeSurface" color="primary" variant="outlined" divided mandatory class="w-100 mb-6 d-flex">
        <VBtn value="Default" class="flex-grow-1 text-none">Default</VBtn>
        <VBtn value="Zinc" class="flex-grow-1 text-none">Zinc</VBtn>
        <VBtn value="Slate" class="flex-grow-1 text-none">Slate</VBtn>
      </VBtnToggle>
      <VDivider class="my-4" />

      <div class="text-subtitle-2 font-weight-bold mb-3">Стиль карток</div>
      <VBtnToggle v-model="activeCardStyle" color="primary" variant="outlined" divided mandatory class="w-100 mb-6 d-flex">
        <VBtn value="elevated" class="flex-grow-1 text-none">
          <VIcon start>mdi-layers</VIcon> З тінями
        </VBtn>
        <VBtn value="outlined" class="flex-grow-1 text-none">
          <VIcon start>mdi-border-all</VIcon> Плоскі
        </VBtn>
      </VBtnToggle>
      <VDivider class="my-4" />

      <div class="text-subtitle-2 font-weight-bold mb-3">Статусні кольори</div>
      <VRow dense class="mb-6">
        <VCol v-for="(colors, presetName) in semanticPalettes" :key="presetName" cols="6">
          <VBtn
            block
            height="auto"
            class="border rounded-lg py-2 d-flex flex-column align-center text-none"
            :variant="activeSemantic === presetName ? 'flat' : 'outlined'"
            :color="activeSemantic === presetName ? 'primary' : undefined"
            @click="activeSemantic = presetName as any"
          >
            <div class="text-caption mb-2 font-weight-medium">{{ presetName }}</div>
            <div class="d-flex ga-1">
              <div class="color-dot-sm" :style="{ background: colors.success }" title="Success" />
              <div class="color-dot-sm" :style="{ background: colors.info }" title="Info" />
              <div class="color-dot-sm" :style="{ background: colors.warning }" title="Warning" />
              <div class="color-dot-sm" :style="{ background: colors.error }" title="Error" />
            </div>
          </VBtn>
        </VCol>
      </VRow>
      <VDivider class="my-4" />

      <div class="text-subtitle-2 font-weight-bold mb-3">Колір (Пресет)</div>
      <VRow dense class="mb-2">
        <VCol v-for="preset in themePresets" :key="preset.name" cols="4">
          <VBtn
            block
            height="40"
            class="border rounded-lg d-flex align-center justify-center text-none px-1"
            :color="presetButtonColor(preset.name)"
            :variant="activePresetName === preset.name ? 'flat' : 'outlined'"
            @click="activePresetName = preset.name"
          >
            <template v-if="preset.name !== 'Custom'">
              <div class="d-flex align-center ga-1 overflow-hidden">
                <div class="color-dot" :style="{ background: preset.colors.primary }" />
                <div class="color-dot" :style="{ background: preset.colors.secondary }" />
                <span
                  class="text-caption font-weight-medium text-truncate"
                  :style="{ color: activePresetName === preset.name ? 'white' : 'inherit', fontSize: '11px' }"
                >
                  {{ preset.name }}
                </span>
              </div>
            </template>
            <template v-else>
              <div class="d-flex align-center ga-1">
                <div class="color-dot" :style="{ background: customPrimaryColor }" />
                <div class="color-dot" :style="{ background: customSecondaryColor }" />
                <VIcon size="14" :color="activePresetName === 'Custom' ? 'white' : ''">
                  mdi-palette
                </VIcon>
              </div>
            </template>
          </VBtn>
        </VCol>
      </VRow>

      <VExpandTransition>
        <div v-if="activePresetName === 'Custom'" class="mb-2">
          <VDivider class="mb-3" />

          <div class="d-flex align-center mb-3 ga-2">
            <VBtnToggle
              v-model="activeColorTarget"
              color="primary"
              variant="outlined"
              divided
              mandatory
              class="flex-grow-1"
            >
              <VBtn value="primary" class="flex-grow-1 text-none">
                <div class="d-flex align-center ga-1">
                  <div class="color-dot-lg" :style="{ background: customPrimaryColor }" />
                  <span>Primary</span>
                </div>
              </VBtn>
              <VBtn value="secondary" class="flex-grow-1 text-none">
                <div class="d-flex align-center ga-1">
                  <div class="color-dot-lg" :style="{ background: customSecondaryColor }" />
                  <span>Secondary</span>
                </div>
              </VBtn>
            </VBtnToggle>
          </div>

          <div class="text-caption text-medium-emphasis mb-2">
            Оберіть колір ({{ activeColorTarget === 'primary' ? 'Primary' : 'Secondary' }}):
          </div>
          <VColorPicker
            v-model="currentCustomColor"
            :swatches="MATERIAL_SWATCHES"
            show-swatches
            hide-canvas
            hide-inputs
            hide-sliders
            elevation="0"
            class="border w-100 rounded-lg"
          />
        </div>
      </VExpandTransition>

      <VDivider class="my-4" />

      <div class="text-subtitle-2 font-weight-bold mb-3">Радіус скруглення</div>
      <VSelect
        v-model="activeRadius"
        :items="radiusOptions"
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
    </VCardText>
  </VCard>
</template>

<style scoped>
.w-100 {
  width: 100%;
}

.color-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 1px solid rgba(0, 0, 0, 0.15);
}

.color-dot-sm {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 1px solid rgba(0, 0, 0, 0.15);
}

.color-dot-lg {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 1px solid rgba(0, 0, 0, 0.15);
}
</style>
