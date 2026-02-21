<script setup lang="ts">
import { computed } from 'vue'

import { useCardBuilder } from '../composables/useCardBuilder'
import { generateCardSnippet } from '../utils/codeGenerator'
import {
  CardType,
  CardVariant,
  HoverEffect,
  ThemeColor,
  ActionAlignment
} from '../model'

import CardLivePreview from './CardLivePreview.vue'

const { config } = useCardBuilder()

const generatedSnippet = computed(() => generateCardSnippet(config.value))

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(generatedSnippet.value)
  } catch (err) {
    console.error('Не вдалося скопіювати код', err)
  }
}
</script>

<template>
  <VRow class="card-builder-container">

    <VCol cols="12" md="4" class="border-e pr-md-6">
      <h3 class="text-h5 font-weight-bold mb-6">Card Configuration</h3>

      <div class="text-subtitle-2 font-weight-bold text-medium-emphasis mb-3">Base Style</div>
      <VSelect v-model="config.type" :items="Object.values(CardType)" label="Preset Type" variant="outlined" density="compact" />
      <VSelect v-model="config.variant" :items="Object.values(CardVariant)" label="Card Variant" variant="outlined" density="compact" />

      <VDivider class="my-5" />

      <div class="text-subtitle-2 font-weight-bold text-medium-emphasis mb-3">Header & Badge</div>
      <VSwitch v-model="config.showHeader" label="Show Header" color="primary" density="compact" hide-details />

      <div v-if="config.showHeader" class="pl-4 mt-2">
        <VSwitch v-model="config.showAvatar" label="Include Avatar" color="primary" density="compact" hide-details />
        <VSwitch v-model="config.showBadge" label="Show Status Badge" color="primary" density="compact" hide-details class="mb-2" />

        <VRow v-if="config.showBadge" dense align="center">
          <VCol cols="7">
            <VTextField v-model="config.badgeText" label="Badge Text" variant="outlined" density="compact" hide-details />
          </VCol>
          <VCol cols="5">
            <VSelect v-model="config.badgeColor" :items="Object.values(ThemeColor)" label="Color" variant="outlined" density="compact" hide-details />
          </VCol>
        </VRow>
      </div>

      <VDivider class="my-5" />

      <div class="text-subtitle-2 font-weight-bold text-medium-emphasis mb-3">State & Interaction</div>
      <VSwitch v-model="config.isLoading" label="Loading State (Skeleton)" color="primary" density="compact" hide-details />
      <VSelect v-model="config.hoverEffect" :items="Object.values(HoverEffect)" label="Hover Effect" variant="outlined" density="compact" class="mt-4" hide-details />

      <VDivider class="my-5" />

      <div class="text-subtitle-2 font-weight-bold text-medium-emphasis mb-3">Media & Content</div>
      <VSwitch v-model="config.showImage" label="Show Cover Image" color="primary" density="compact" hide-details />
      <VSlider v-if="config.showImage" v-model="config.imageHeight" :min="100" :max="400" :step="10" label="Image Height" class="mt-3" hide-details thumb-label />

      <VTextarea v-model="config.content" label="Card Content" variant="outlined" density="compact" rows="3" class="mt-4" hide-details />
      <VSwitch v-model="config.showDivider" label="Show Divider" color="primary" density="compact" hide-details class="mt-2" />

      <VDivider class="my-5" />

      <div class="text-subtitle-2 font-weight-bold text-medium-emphasis mb-3">Actions</div>
      <VSwitch v-model="config.showActions" label="Show Actions" color="primary" density="compact" hide-details />

      <div v-if="config.showActions" class="pl-4 mt-3">
        <VSelect v-model="config.actionAlignment" :items="Object.values(ActionAlignment)" label="Alignment" variant="outlined" density="compact" hide-details />
        <VTextField v-model="config.primaryActionText" label="Primary Button" variant="outlined" density="compact" hide-details class="mt-4" />
        <VTextField v-model="config.secondaryActionText" label="Secondary Button (Optional)" variant="outlined" density="compact" hide-details class="mt-4" />
      </div>
    </VCol>


    <VCol cols="12" md="8" class="d-flex flex-column gap-6">

      <VCard class="bg-grey-lighten-4 d-flex align-center justify-center pa-8 rounded-lg min-h-[450px]" elevation="0" border>
        <CardLivePreview :config="config" />
      </VCard>

      <VCard variant="flat" class="bg-grey-darken-4 text-white rounded-lg mt-6">
        <VCardItem>
          <template #append>
            <VBtn
              prepend-icon="mdi-content-copy"
              variant="tonal"
              size="small"
              color="white"
              @click="copyCode"
            >
              Copy Code
            </VBtn>
          </template>
          <VCardTitle class="text-subtitle-1 font-weight-bold">
            <VIcon start>mdi-code-tags</VIcon> Generated Vue Template
          </VCardTitle>
        </VCardItem>
        <VDivider color="grey-darken-2" />

        <pre class="pa-4 text-body-2 overflow-x-auto" style="font-family: 'JetBrains Mono', monospace; line-height: 1.5; color: #a9b7c6;"><code>{{ generatedSnippet }}</code></pre>
      </VCard>

    </VCol>
  </VRow>
</template>

<style scoped>
.gap-6 {
  gap: 24px;
}
.min-h-\[450px\] {
  min-height: 450px;
}
</style>
