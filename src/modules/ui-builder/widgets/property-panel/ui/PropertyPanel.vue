<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUiTreeStore } from '../../../entities/ui-node/model/store'

const store = useUiTreeStore()
const { selectedNodeId, rootNode } = storeToRefs(store)

const selectedNode = computed(() => {
  if (!selectedNodeId.value) return null
  return store.findNodeById(selectedNodeId.value)
})

const variants = ['elevated', 'flat', 'tonal', 'outlined', 'text']
const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error']
</script>

<template>
  <VNavigationDrawer location="right" permanent width="300" border="s">
    <div v-if="selectedNode" class="pa-4">
      <div class="text-h6 mb-1">{{ selectedNode.type }}</div>
      <div class="text-caption text-medium-emphasis mb-4">ID: {{ selectedNode.id }}</div>

      <VDivider class="mb-4" />

      <div class="text-subtitle-2 mb-2">Content</div>
      <VTextField
        v-if="'innerText' in selectedNode.props"
        v-model="selectedNode.props.innerText"
        label="Inner Text"
        variant="outlined"
        density="compact"
      />

      <div class="text-subtitle-2 mt-4 mb-2">Styles</div>
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

      <div class="text-subtitle-2 mt-4 mb-2">Custom Classes</div>
      <VCombobox
        v-model="selectedNode.classes"
        label="Add classes"
        multiple
        chips
        variant="outlined"
        density="compact"
        hide-details
      />
    </div>

    <div v-else class="pa-4 text-center text-medium-emphasis mt-10">
      <VIcon icon="mdi-cursor-default-click-outline" size="large" class="mb-2" />
      <div>Select an element to edit properties</div>
    </div>
  </VNavigationDrawer>
</template>
