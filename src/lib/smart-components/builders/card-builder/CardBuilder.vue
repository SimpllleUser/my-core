<script setup lang="ts">
import { computed } from 'vue'
import { useCardBuilder } from './ui/composables/useCardBuilder.ts'
import { generateCardSnippet } from './ui/utils/codeGenerator.ts'
import { CardType, CardVariant } from './model.ts'
import CardLivePreview from './CardLivePreview.vue'

const { config } = useCardBuilder()

const generatedSnippet = computed(() => generateCardSnippet(config.value))

const copyCode = () => {
  navigator.clipboard.writeText(generatedSnippet.value)
}
</script>

<template>
  <VRow>
    <VCol cols="12" md="4" class="border-e">
      <h3 class="text-h6 mb-4">Card Configuration</h3>

      <VSelect
        v-model="config.type"
        :items="Object.values(CardType)"
        label="Preset Type"
        variant="outlined"
        density="compact"
      />

      <VSelect
        v-model="config.variant"
        :items="Object.values(CardVariant)"
        label="Card Variant"
        variant="outlined"
        density="compact"
      />

      <VDivider class="my-4" />
      <div class="text-subtitle-2 mb-2">Sections</div>

      <VSwitch v-model="config.showHeader" label="Show Header" color="primary" density="compact" hide-details />
      <VSwitch v-if="config.showHeader" v-model="config.showAvatar" label="Include Avatar" color="primary" density="compact" hide-details class="ml-4" />

      <VSwitch v-model="config.showImage" label="Show Cover Image" color="primary" density="compact" hide-details />
      <VSwitch v-model="config.showActions" label="Show Action Buttons" color="primary" density="compact" hide-details />

    </VCol>

    <VCol cols="12" md="8" class="bg-grey-lighten-4 pa-6">

      <div class="d-flex justify-center mb-8">
        <CardLivePreview :config="config" />
      </div>

      <VCard variant="outlined" class="bg-grey-darken-4 text-white">
        <VCardItem>
          <template #append>
            <VBtn icon="mdi-content-copy" variant="text" size="small" @click="copyCode" />
          </template>
          <VCardTitle class="text-subtitle-1">Generated Template</VCardTitle>
        </VCardItem>
        <VDivider />
        <pre class="pa-4 text-caption" style="overflow-x: auto;"><code>{{ generatedSnippet }}</code></pre>
      </VCard>

    </VCol>
  </VRow>
</template>
