<script setup lang="ts">
import { ref, computed } from 'vue'
import { useThemeBuilder } from '../composables/useThemeBuilder.ts'

const {
  activePresetName,
  activeRadius,
  activeMode,
  activeSurface,
  activeCardStyle,
  customPrimaryColor,
  customSecondaryColor,
  themePresets,
  radiusOptions,
} = useThemeBuilder()

// Який слот редагуємо у режимі Custom
const activeColorTarget = ref<'primary' | 'secondary'>('primary')

// Прокси для кольору, що редагується зараз
const currentCustomColor = computed({
  get: () => activeColorTarget.value === 'primary'
    ? customPrimaryColor.value
    : customSecondaryColor.value,
  set: (val: string) => {
    if (activeColorTarget.value === 'primary') customPrimaryColor.value = val
    else customSecondaryColor.value = val
  },
})

// Колір кнопки пресету: Custom показує активний кастомний колір
const presetButtonColor = (presetName: string) => {
  if (presetName !== 'Custom') return themePresets.find(p => p.name === presetName)?.colors.primary ?? ''
  return activeColorTarget.value === 'primary' ? customPrimaryColor.value : customSecondaryColor.value
}

const materialSwatches = [
  ['#FFCDD2', '#E57373', '#F44336', '#D32F2F', '#B71C1C'],
  ['#F8BBD0', '#F06292', '#E91E63', '#C2185B', '#880E4F'],
  ['#E1BEE7', '#BA68C8', '#9C27B0', '#7B1FA2', '#4A148C'],
  ['#D1C4E9', '#9575CD', '#673AB7', '#512DA8', '#311B92'],
  ['#C5CAE9', '#7986CB', '#3F51B5', '#303F9F', '#1A237E'],
  ['#BBDEFB', '#64B5F6', '#2196F3', '#1976D2', '#0D47A1'],
  ['#B3E5FC', '#4FC3F7', '#03A9F4', '#0288D1', '#01579B'],
  ['#B2EBF2', '#4DD0E1', '#00BCD4', '#0097A7', '#006064'],
  ['#B2DFDB', '#4DB6AC', '#009688', '#00796B', '#004D40'],
  ['#C8E6C9', '#81C784', '#4CAF50', '#388E3C', '#1B5E20'],
  ['#FFF9C4', '#FFF176', '#FFEB3B', '#FBC02D', '#F57F17'],
  ['#FFECB3', '#FFD54F', '#FFC107', '#FFA000', '#FF6F00'],
  ['#FFE0B2', '#FFB74D', '#FF9800', '#F57C00', '#E65100'],
  ['#FFCCBC', '#FF8A65', '#FF5722', '#E64A19', '#BF360C'],
  ['#D7CCC8', '#A1887F', '#795548', '#5D4037', '#3E2723'],
  ['#F5F5F5', '#E0E0E0', '#9E9E9E', '#616161', '#212121'],
  ['#CFD8DC', '#90A4AE', '#607D8B', '#455A64', '#263238'],
]
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
      <VBtnToggle
        v-model="activeMode"
        color="primary"
        variant="outlined"
        divided
        mandatory
        class="w-100 mb-6 d-flex"
      >
        <VBtn value="light" class="flex-grow-1 text-none">Світла</VBtn>
        <VBtn value="dark" class="flex-grow-1 text-none">Темна</VBtn>
        <VBtn value="system" class="flex-grow-1 text-none">Система</VBtn>
      </VBtnToggle>

      <VDivider class="my-4" />

      <div class="text-subtitle-2 font-weight-bold mb-3">Відтінок фону</div>
      <VBtnToggle
        v-model="activeSurface"
        color="primary"
        variant="outlined"
        divided
        mandatory
        class="w-100 mb-6 d-flex"
      >
        <VBtn value="Default" class="flex-grow-1 text-none">Default</VBtn>
        <VBtn value="Zinc" class="flex-grow-1 text-none">Zinc</VBtn>
        <VBtn value="Slate" class="flex-grow-1 text-none">Slate</VBtn>
      </VBtnToggle>

      <VDivider class="my-4" />

      <div class="text-subtitle-2 font-weight-bold mb-3">Стиль карток</div>
      <VBtnToggle
        v-model="activeCardStyle"
        color="primary"
        variant="outlined"
        divided
        mandatory
        class="w-100 mb-6 d-flex"
      >
        <VBtn value="elevated" class="flex-grow-1 text-none">
          <VIcon start>mdi-layers</VIcon> З тінями
        </VBtn>
        <VBtn value="outlined" class="flex-grow-1 text-none">
          <VIcon start>mdi-border-all</VIcon> Плоскі
        </VBtn>
      </VBtnToggle>

      <VDivider class="my-4" />

      <div class="text-subtitle-2 font-weight-bold mb-3">Колір (Пресет)</div>
      <VRow dense class="mb-2">
        <VCol v-for="preset in themePresets" :key="preset.name" cols="3">
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
                <div
                  class="color-dot"
                  :style="{ background: preset.colors.primary }"
                />
                <div
                  class="color-dot"
                  :style="{ background: preset.colors.secondary }"
                />
                <span
                  class="text-caption font-weight-medium text-truncate"
                  :style="{ color: activePresetName === preset.name ? 'white' : 'inherit', fontSize: '10px' }"
                >
                  {{ preset.name }}
                </span>
              </div>
            </template>
            <template v-else>
              <div class="d-flex align-center ga-1">
                <div
                  class="color-dot"
                  :style="{ background: customPrimaryColor }"
                />
                <div
                  class="color-dot"
                  :style="{ background: customSecondaryColor }"
                />
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
            :swatches="materialSwatches"
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

.color-dot-lg {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 1px solid rgba(0, 0, 0, 0.15);
}
</style>
