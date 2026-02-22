// src/modules/ui-builder/entities/ui-node/model/store.ts

import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UiNode, ComponentType } from './types'

export const useUiTreeStore = defineStore('ui-tree', () => {
  const rootNode = ref<UiNode>({
    id: 'root-canvas',
    type: 'VCard',
    name: 'Main Canvas',
    props: { variant: 'flat', color: 'transparent' },
    classes: ['w-100', 'h-100', 'pa-4'],
    children: [],
    slots: {}
  })

  const selectedNodeId = ref<string | null>(null)

  const selectNode = (id: string | null) => {
    selectedNodeId.value = id
  }

  const findNodeById = (id: string, node: UiNode = rootNode.value): UiNode | null => {
    if (node.id === id) return node

    for (const child of node.children) {
      const found = findNodeById(id, child)
      if (found) return found
    }

    for (const slotChildren of Object.values(node.slots ?? {})) {
      for (const child of slotChildren) {
        const found = findNodeById(id, child)
        if (found) return found
      }
    }

    return null
  }

  const createNode = (type: ComponentType, name: string): UiNode => {
    const baseProps: Record<string, any> = {}

    if (type === 'VRow') {
      baseProps.noGutters = false
      baseProps.align = 'center'
    }

    if (type === 'VCol') {
      baseProps.cols = 12
    }

    if (['VBtn', 'VCardTitle', 'VCardText', 'VListItem'].includes(type)) {
      baseProps.innerText = name
    }

    return {
      id: Math.random().toString(36).substring(2, 9),
      type,
      name,
      props: baseProps,
      classes: [],
      children: [],
      slots: {}
    }
  }

  const appendChild = (parentId: string, newNode: UiNode, node: UiNode = rootNode.value): boolean => {
    if (node.id === parentId) {
      node.children.push(newNode)
      return true
    }

    for (const child of node.children) {
      if (appendChild(parentId, newNode, child)) return true
    }

    for (const slotChildren of Object.values(node.slots ?? {})) {
      for (const child of slotChildren) {
        if (appendChild(parentId, newNode, child)) return true
      }
    }

    return false
  }

  const appendToSlot = (parentId: string, slotName: string, newNode: UiNode, node: UiNode = rootNode.value): boolean => {
    if (node.id === parentId) {
      if (!node.slots[slotName]) node.slots[slotName] = []
      node.slots[slotName].push(newNode)
      return true
    }

    for (const child of node.children) {
      if (appendToSlot(parentId, slotName, newNode, child)) return true
    }

    for (const slotChildren of Object.values(node.slots ?? {})) {
      for (const child of slotChildren) {
        if (appendToSlot(parentId, slotName, newNode, child)) return true
      }
    }

    return false
  }

  const deleteNode = (id: string, parent: UiNode = rootNode.value): boolean => {
    const index = parent.children.findIndex(child => child.id === id)
    if (index !== -1) {
      parent.children.splice(index, 1)
      if (selectedNodeId.value === id) selectedNodeId.value = null
      return true
    }

    for (const slotChildren of Object.values(parent.slots ?? {})) {
      const slotIndex = slotChildren.findIndex(child => child.id === id)
      if (slotIndex !== -1) {
        slotChildren.splice(slotIndex, 1)
        if (selectedNodeId.value === id) selectedNodeId.value = null
        return true
      }
    }

    for (const child of parent.children) {
      if (deleteNode(id, child)) return true
    }

    for (const slotChildren of Object.values(parent.slots ?? {})) {
      for (const child of slotChildren) {
        if (deleteNode(id, child)) return true
      }
    }

    return false
  }

  return {
    rootNode,
    selectedNodeId,
    selectNode,
    findNodeById,
    createNode,
    appendChild,
    appendToSlot,
    deleteNode
  }
})
