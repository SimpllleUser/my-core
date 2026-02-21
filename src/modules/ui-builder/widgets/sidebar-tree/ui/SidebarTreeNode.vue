<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { UiNode, ComponentType } from '../../../entities/ui-node/model/types'
import { useUiTreeStore } from '../../../entities/ui-node/model/store'

const props = defineProps<{
  node: UiNode
  depth?: number
}>()

const store = useUiTreeStore()
const { selectedNodeId } = storeToRefs(store)
const { selectNode, createNode, appendChild } = store

const availableComponents: { type: ComponentType; label: string }[] = [
  { type: 'VBtn', label: 'Button' },
  { type: 'VTextField', label: 'Input Field' },
  { type: 'VCard', label: 'Card' },
  { type: 'VCardTitle', label: 'Card Title' },
  { type: 'VCardText', label: 'Card Text' },
  { type: 'VList', label: 'List' },
  { type: 'VListItem', label: 'List Item' }
]

const onAdd = (type: ComponentType, label: string) => {
  const newNode = createNode(type, label)

  if (type === 'VBtn') newNode.props.innerText = 'New Button'
  if (['VCardTitle', 'VCardText', 'VListItem'].includes(type)) {
    newNode.props.innerText = `New ${label}`
  }

  appendChild(props.node.id, newNode)
}
</script>

<template>
  <VListItem
    :active="selectedNodeId === node.id"
    :style="{ paddingLeft: `${(depth || 0) * 16 + 16}px` }"
    density="compact"
    @click.stop="selectNode(node.id)"
  >
    <VListItemTitle class="text-body-2">{{ node.name }}</VListItemTitle>

    <template #append>
      <VMenu>
        <template #activator="{ props: menuProps }">
          <VBtn
            v-bind="menuProps"
            icon="mdi-plus"
            variant="text"
            size="x-small"
            density="comfortable"
            @click.stop
          />
        </template>
        <VList density="compact" width="150">
          <VListItem
            v-for="comp in availableComponents"
            :key="comp.type"
            :title="comp.label"
            @click="onAdd(comp.type, comp.label)"
          />
        </VList>
      </VMenu>
    </template>
  </VListItem>

  <template v-if="node.children && node.children.length > 0">
    <SidebarTreeNode
      v-for="child in node.children"
      :key="child.id"
      :node="child"
      :depth="(depth || 0) + 1"
    />
  </template>
</template>
