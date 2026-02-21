<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUiTreeStore } from '../../../entities/ui-node/model/store'

const store = useUiTreeStore()
const { selectedNodeId } = storeToRefs(store)

// Отримуємо посилання на вузол.
// ВАЖЛИВО: ми не використовуємо деструктуризацію, щоб зберегти реактивність пропсів.
const selectedNode = computed(() => {
  if (!selectedNodeId.value) return null
  return store.findNodeById(selectedNodeId.value)
})

const isRoot = computed(() => selectedNode.value?.id === 'root-canvas')

// Функція оновлення, яка гарантує, що ми не перерендеримо всю панель
const updateProp = (key: string, value: any) => {
  if (selectedNode.value) {
    selectedNode.value.props[key] = value
  }
}

const variants = ['elevated', 'flat', 'tonal', 'outlined', 'text']
const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'white', 'transparent']
</script>

<template>
  <VNavigationDrawer
    location="right"
    permanent
    width="320"
    border="s"
    :model-value="true"
  >
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
        <div class="text-overline mb-2 text-primary">Content</div>

        <VTextField
          :model-value="selectedNode.props.innerText"
          @update:model-value="val => updateProp('innerText', val)"
          label="Inner Text"
          variant="outlined"
          density="compact"
          hide-details
          class="mb-4"
        />

        <template v-if="selectedNode.type === 'VCol'">
          <div class="text-overline mb-2 text-primary">Grid Settings</div>
          <VSlider
            v-model="selectedNode.props.cols"
            :min="1"
            :max="12"
            :step="1"
            label="Width (1-12)"
            thumb-label
            density="compact"
            hide-details
            class="mb-4"
          />
        </template>

        <template v-if="selectedNode.type === 'VRow'">
          <VCheckbox
            v-model="selectedNode.props.noGutters"
            label="No Gutters"
            density="compact"
            hide-details
          />
        </template>

        <VTextField
          v-if="selectedNode.props.hasOwnProperty('label')"
          :model-value="selectedNode.props.label"
          @update:model-value="val => updateProp('label', val)"
          label="Field Label"
          variant="outlined"
          density="compact"
          hide-details
          class="mb-4"
        />

        <VDivider class="my-4" />

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

        <div class="text-overline mb-2 text-primary">Classes</div>
        <VCombobox
          v-model="selectedNode.classes"
          multiple
          chips
          label="Add CSS classes"
          variant="outlined"
          density="compact"
          hide-details
        />
      </div>
    </div>

    <div v-else class="pa-10 text-center text-medium-emphasis mt-10">
      <VIcon icon="mdi-cursor-default-click-outline" size="x-large" class="mb-4 opacity-20" />
      <div class="text-body-2">Select an element</div>
    </div>
  </VNavigationDrawer>
</template>
