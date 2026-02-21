<template>
  <SectionWrapper title="Статусні кольори" divider>
    <VRow dense class="mb-2">
      <VCol v-for="(colors, presetName) in SEMANTIC_PALETTES" :key="presetName" cols="6">
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
  </SectionWrapper>

  <SectionWrapper title="Колір (Пресет)">
    <VRow dense class="mb-2">
      <VCol v-for="preset in THEME_PRESETS" :key="preset.name" cols="4">
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
      <div v-if="activePresetName === 'Custom'" class="mb-2 mt-4">
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
  </SectionWrapper>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SectionWrapper from './SectionWrapper.vue'
import { useThemeColors } from '../../composables/useThemeColors.ts'
import { THEME_PRESETS, SEMANTIC_PALETTES, MATERIAL_SWATCHES } from '../../constants.ts'

// Дістаємо лише потрібний стан з нашого модульного composable
const {
  activePresetName,
  customPrimaryColor,
  customSecondaryColor,
  activeSemantic
} = useThemeColors()

// Локальний стан: який саме слот (primary/secondary) ми зараз редагуємо
const activeColorTarget = ref<'primary' | 'secondary'>('primary')

// Проксі для VColorPicker, щоб він автоматично оновлював потрібну змінну
const currentCustomColor = computed({
  get: () => activeColorTarget.value === 'primary'
    ? customPrimaryColor.value
    : customSecondaryColor.value,
  set: (val: string) => {
    if (activeColorTarget.value === 'primary') customPrimaryColor.value = val
    else customSecondaryColor.value = val
  },
})

// Динамічний колір кнопки пресету
const presetButtonColor = (presetName: string) => {
  if (presetName !== 'Custom') return THEME_PRESETS.find(p => p.name === presetName)?.colors.primary ?? ''
  return activeColorTarget.value === 'primary' ? customPrimaryColor.value : customSecondaryColor.value
}
</script>

<style scoped>
.w-100 { width: 100%; }
.color-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; border: 1px solid rgba(0, 0, 0, 0.15); }
.color-dot-sm { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; border: 1px solid rgba(0, 0, 0, 0.15); }
.color-dot-lg { width: 14px; height: 14px; border-radius: 50%; flex-shrink: 0; border: 1px solid rgba(0, 0, 0, 0.15); }
</style>
