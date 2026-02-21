// src/modules/ui-builder/entities/ui-node/model/store.ts

import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UiNode, ComponentType } from './types'

const generateId = () => Math.random().toString(36).substring(2, 9)

export const useUiTreeStore = defineStore('ui-tree', () => {
  const rootNode = ref<UiNode>({
    id: 'root-canvas',
    type: 'VCard',
    name: 'Main Canvas',
    props: { variant: 'flat', color: 'transparent' },
    classes: ['w-100', 'h-100', 'pa-4'],
    children: []
  })

  const selectedNodeId = ref<string | null>(null)

  const selectNode = (id: string | null) => {
    selectedNodeId.value = id
  }

  const findNodeById = (id: string, currentNode: UiNode = rootNode.value): UiNode | null => {
    if (currentNode.id === id) return currentNode
    for (const child of currentNode.children) {
      const found = findNodeById(id, child)
      if (found) return found
    }
    return null
  }

  const deleteNode = (id: string, parent: UiNode = rootNode.value): boolean => {
    const index = parent.children.findIndex(child => child.id === id)
    if (index !== -1) {
      parent.children.splice(index, 1)
      selectedNodeId.value = null
      return true
    }
    for (const child of parent.children) {
      if (deleteNode(id, child)) return true
    }
    return false
  }

  const createNode = (type: ComponentType, name: string): UiNode => ({
    id: generateId(),
    type,
    name,
    props: {
      variant: 'elevated',
      color: 'primary'
    },
    classes: [],
    children: []
  })

  const appendChild = (parentId: string, newNode: UiNode, currentNode: UiNode = rootNode.value): boolean => {
    if (currentNode.id === parentId) {
      currentNode.children.push(newNode)
      return true
    }
    for (const child of currentNode.children) {
      if (appendChild(parentId, newNode, child)) return true
    }
    return false
  }

  return {
    rootNode,
    selectedNodeId,
    selectNode,
    findNodeById,
    deleteNode,
    createNode,
    appendChild
  }
})
