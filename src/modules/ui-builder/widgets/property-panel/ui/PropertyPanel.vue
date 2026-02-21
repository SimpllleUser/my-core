// src/modules/ui-builder/widgets/property-panel/ui/PropertyPanel.vue

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

const removeCurrentNode = () => {
  if (selectedNodeId.value) {
    store.deleteNode(selectedNodeId.value)
  }
}

const variants = ['elevated', 'flat', 'tonal', 'outlined', 'text']
const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'transparent']
</script>

<template>
  <VNavigationDrawer location="right" permanent width="300" border="s">
    <div v-if="selectedNode" class="pa-4 d-flex flex-column h-100">
      <div class="d-flex align-center justify-space-between mb-1">
        <div class="text-h6">{{ selectedNode.type }}</div>
        <VBtn
          v-if="!isRoot"
          icon="mdi-delete-outline"
          variant="text"
          color="error"
          size="small"
          @click="removeCurrentNode"
        />
      </div>
      <div class="text-caption text-medium-emphasis mb-4">ID: {{ selectedNode.id }}</div>

      <VDivider class="mb-4" />

      <div class="text-subtitle-2 mb-2">General</div>

      <VTextField
        v-if="['VBtn', 'VCardTitle', 'VCardText', 'VListItem'].includes(selectedNode.type as string)"
        v-model="selectedNode.props.innerText"
        label="Content Text"
        variant="outlined"
        density="compact"
        hide-details
        class="mb-3"
      />

      <VTextField
        v-if="selectedNode.type === 'VTextField'"
        v-model="selectedNode.props.label"
        label="Label"
        variant="outlined"
        density="compact"
        hide-details
        class="mb-3"
      />

      <div class="text-subtitle-2 mt-2 mb-2">Appearance</div>
      <VSelect
        v-model="selectedNode.props.variant"
        :items="variants"
        label="Variant"
        variant="outlined"
        density="compact"
      />

      <VSelect
        v-model="selectedNode.props.color"
        :items="colors"
        label="Color"
        variant="outlined"
        density="compact"
        class="mt-2"
      />

      <div class="text-subtitle-2 mt-4 mb-2">CSS Classes</div>
      <VCombobox
        v-model="selectedNode.classes"
        label="Classes (Enter to add)"
        multiple
        chips
        variant="outlined"
        density="compact"
      />

      <VSpacer />

      <div class="text-caption text-center text-disabled">
        FSD UI Builder v0.1
      </div>
    </div>

    <div v-else class="pa-4 text-center text-medium-emphasis mt-10">
      <VIcon icon="mdi-cursor-default-click-outline" size="large" class="mb-2" />
      <div>Select an element to edit</div>
    </div>
  </VNavigationDrawer>
</template>
