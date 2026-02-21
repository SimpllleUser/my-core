<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUiTreeStore } from '../../../entities/ui-node/model/store'
import { type ComponentType } from '../../../entities/ui-node/model/types'
import NodeRenderer from '../../../entities/ui-node/ui/NodeRenderer'

const store = useUiTreeStore()
const { rootNode } = storeToRefs(store)
const { selectNode, createNode, appendChild } = store

const availableComponents: { type: ComponentType; label: string }[] = [
  { type: 'VBtn', label: 'Button' },
  { type: 'VTextField', label: 'Input Field' },
  { type: 'VCard', label: 'Card' },
  { type: 'VList', label: 'List' },
]

const clearSelection = () => {
  selectNode(null)
}

const onAddFirst = (type: ComponentType, label: string) => {
  const newNode = createNode(type, label)
  if (type === 'VBtn') newNode.props.innerText = 'First Button'
  appendChild(rootNode.value.id, newNode)
  selectNode(newNode.id)
}
</script>

<template>
  <div
    class="main-canvas-wrapper w-100 h-100 bg-grey-lighten-3 pa-6 d-flex flex-column"
    @click="clearSelection"
  >
    <div v-if="rootNode.children.length === 0" class="ma-auto text-center">
      <VMenu>
        <template #activator="{ props }">
          <VBtn
            v-bind="props"
            icon="mdi-plus"
            color="primary"
            size="large"
            elevation="2"
          />
        </template>
        <VList density="compact">
          <VListItem
            v-for="comp in availableComponents"
            :key="comp.type"
            :title="comp.label"
            @click="onAddFirst(comp.type, comp.label)"
          />
        </VList>
      </VMenu>
      <div class="text-caption text-medium-emphasis mt-2">Add your first component</div>
    </div>

    <NodeRenderer v-else :node="rootNode" />
  </div>
</template>

<style scoped>
.main-canvas-wrapper {
  overflow-y: auto;
  min-height: calc(100vh - 64px);
  position: relative;
}
</style>
