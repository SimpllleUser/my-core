<script setup lang="ts">
import { ref, computed } from 'vue'
import { useClipboard } from '@vueuse/core'
import { generateThemeCode } from '../utils/themeExportGenerator.ts'

import ThemeModeSelector from './ui/ThemeModeSelector.vue'
import ThemeDefaultsSelector from './ui/ThemeDefaultsSelector.vue'
import ThemeColorsSelector from './ui/ThemeColorsSelector.vue'

const showExportDialog = ref(false)
const { copy, copied } = useClipboard()

const codeSnippet = computed(() => generateThemeCode())

const copyConfig = () => {
  copy(codeSnippet.value)
}
</script>

<template>
  <VCard elevation="0" class="border">
    <VCardTitle class="d-flex align-center pb-2">
      <div>
        <div class="text-h6 font-weight-bold">Налаштування теми</div>
        <div class="text-caption text-medium-emphasis">Кастомізуйте вигляд додатку</div>
      </div>
      <VSpacer />
      <VBtn variant="tonal" color="primary" prepend-icon="mdi-code-json" class="text-none" @click="showExportDialog = true">
        Експорт
      </VBtn>
    </VCardTitle>

    <VCardText class="pt-4">
      <ThemeModeSelector />
      <ThemeDefaultsSelector />
      <ThemeColorsSelector />
    </VCardText>
  </VCard>

  <VDialog v-model="showExportDialog" max-width="800" persistent>
    <VCard class="border">
      <VCardTitle class="d-flex align-center justify-space-between pt-4 px-6">
        <span class="text-h6 font-weight-bold">Конфігурація Vuetify</span>
        <VBtn icon="mdi-close" variant="text" density="comfortable" @click="showExportDialog = false" />
      </VCardTitle>

      <VCardText class="px-6 pb-6">
        <div class="text-body-2 text-medium-emphasis mb-4">
          Скопіюйте цей код та замініть ним вміст файлу конфігурації.
        </div>
        <VSheet color="black" class="rounded-lg pa-4 position-relative" max-height="500" style="overflow-y: auto;">
          <VBtn
            size="small" color="white" variant="tonal" class="position-absolute text-none" style="top: 12px; right: 12px; z-index: 10;"
            :prepend-icon="copied ? 'mdi-check' : 'mdi-content-copy'"
            @click="copyConfig"
          >
            {{ copied ? 'Скопійовано!' : 'Копіювати' }}
          </VBtn>
          <pre><code class="text-body-2 text-white" style="font-family: monospace;">{{ codeSnippet }}</code></pre>
        </VSheet>
      </VCardText>
    </VCard>
  </VDialog>
</template>
