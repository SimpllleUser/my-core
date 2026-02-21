// src/modules/ui-builder/widgets/sidebar-tree/ui/SidebarTreeNode.vue

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

const getIcon = (type: string) => {
  const icons: Record<string, string> = {
    'VCard': 'mdi-card-outline',
    'VBtn': 'mdi-rectangle-outline',
    'VTextField': 'mdi-form-textbox',
    'VList': 'mdi-format-list-bulleted',
    'VListItem': 'mdi-order-bool-ascending-variant',
    'root-canvas': 'mdi-view-dashboard-outline'
  }
  return icons[type] || 'mdi-cube-outline'
}

const onAdd = (type: ComponentType, label: string) => {
  const newNode = createNode(type, label)
  appendChild(props.node.id, newNode)
  selectNode(newNode.id)
}
</script>

<template>
  <VListItem
    :active="selectedNodeId === node.id"
    :style="{ paddingLeft: `${(depth || 0) * 16 + 12}px` }"
    density="compact"
    :prepend-icon="getIcon(node.type)"
    color="primary"
    @click.stop="selectNode(node.id)"
  >
    <VListItemTitle class="text-caption font-weight-bold">
      {{ node.name }}
    </VListItemTitle>

    <template #append>
      <VMenu location="bottom end">
        <template #activator="{ props: menuProps }">
          <VBtn
            v-bind="menuProps"
            icon="mdi-plus"
            variant="text"
            size="x-small"
            density="comfortable"
            class="ml-2"
            @click.stop
          />
        </template>

        <VList density="compact">
          <VListItem
            v-for="comp in availableComponents"
            :key="comp.type"
            :title="comp.label"
            class="text-caption"
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
