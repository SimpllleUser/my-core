<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUiTreeStore } from '../../../entities/ui-node/model/store'

const store = useUiTreeStore()
const { selectedNodeId } = storeToRefs(store)

const selectedNode = computed(() => {
  if (!selectedNodeId.value) return null
  return store.findNodeById(selectedNodeId.value)
})

const isRoot = computed(() => selectedNode.value?.id === 'root-canvas')

// Опції для селектів
const variants = ['elevated', 'flat', 'tonal', 'outlined', 'text']
const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'white', 'transparent']
const justifyOptions = ['start', 'center', 'end', 'space-around', 'space-between']
const alignOptions = ['start', 'center', 'end']
</script>

<template>
  <VNavigationDrawer location="right" permanent width="320" border="s">
    <div v-if="selectedNode" :key="selectedNode.id" class="pa-4 d-flex flex-column h-100">

      <div class="d-flex align-center justify-space-between mb-1">
        <div class="text-h6 font-weight-bold">{{ selectedNode.type }}</div>
        <VBtn
          v-if="!isRoot"
          icon="mdi-delete-outline"
          variant="text"
          color="error"
          size="small"
          @click="store.deleteNode(selectedNode.id)"
        />
      </div>
      <div class="text-caption text-medium-emphasis mb-4">ID: {{ selectedNode.id }}</div>

      <VDivider class="mb-4" />

      <div class="flex-grow-1 overflow-y-auto pr-1">

        <template v-if="['VBtn', 'VCardTitle', 'VCardText', 'VListItem'].includes(selectedNode.type)">
          <div class="text-overline mb-2 text-primary">Content</div>
          <VTextField
            v-model="selectedNode.props.innerText"
            label="Text Content"
            variant="outlined"
            density="compact"
            hide-details
            class="mb-4"
          />
        </template>

        <template v-if="selectedNode.type === 'VTextField'">
          <div class="text-overline mb-2 text-primary">Input Settings</div>
          <VTextField
            v-model="selectedNode.props.label"
            label="Label"
            variant="outlined"
            density="compact"
            hide-details
            class="mb-4"
          />
          <VTextField
            v-model="selectedNode.props.placeholder"
            label="Placeholder"
            variant="outlined"
            density="compact"
            hide-details
            class="mb-4"
          />
        </template>

        <template v-if="selectedNode.type === 'VRow'">
          <div class="text-overline mb-2 text-primary">Row Settings</div>
          <VSelect
            v-model="selectedNode.props.justify"
            :items="justifyOptions"
            label="Justify"
            variant="outlined"
            density="compact"
            class="mb-3"
            hide-details
          />
          <VSelect
            v-model="selectedNode.props.align"
            :items="alignOptions"
            label="Align Items"
            variant="outlined"
            density="compact"
            class="mb-3"
            hide-details
          />
          <VCheckbox
            v-model="selectedNode.props.noGutters"
            label="No Gutters"
            density="compact"
            hide-details
          />
        </template>

        <template v-if="selectedNode.type === 'VCol'">
          <div class="text-overline mb-2 text-primary">Column Settings</div>
          <div class="text-caption mb-1">Width ({{ selectedNode.props.cols || 12 }}/12)</div>
          <VSlider
            v-model="selectedNode.props.cols"
            :min="1"
            :max="12"
            :step="1"
            thumb-label
            color="primary"
            density="compact"
            class="px-2"
          />
          <VTextField
            v-model="selectedNode.props.offset"
            type="number"
            label="Offset"
            variant="outlined"
            density="compact"
            hide-details
          />
        </template>

        <VDivider class="my-4" />

        <template v-if="!['VRow', 'VCol'].includes(selectedNode.type)">
          <div class="text-overline mb-2 text-primary">Appearance</div>
          <VSelect
            v-model="selectedNode.props.variant"
            :items="variants"
            label="Variant"
            variant="outlined"
            density="compact"
            class="mb-4"
            hide-details
          />
          <VSelect
            v-model="selectedNode.props.color"
            :items="colors"
            label="Color"
            variant="outlined"
            density="compact"
            class="mb-4"
            hide-details
          />
        </template>

        <div class="text-overline mb-2 text-primary">Custom Styles</div>
        <VCombobox
          v-model="selectedNode.classes"
          multiple
          chips
          label="CSS Classes"
          variant="outlined"
          density="compact"
          placeholder="e.g. mt-4, elevation-2"
          hide-details
        />
      </div>

      <VSpacer />
      <div class="text-center pt-4 opacity-50 text-caption">
        FSD UI Builder v0.1
      </div>
    </div>

    <div v-else class="pa-10 text-center text-medium-emphasis mt-10">
      <VIcon icon="mdi-cursor-default-click-outline" size="x-large" class="mb-4 opacity-20" />
      <div class="text-body-2">Виберіть елемент для налаштування</div>
    </div>
  </VNavigationDrawer>
</template>
