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
    children: []
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
    return null
  }

  const createNode = (type: ComponentType, name: string): UiNode => {
    const baseProps: Record<string, any> = {
      variant: 'elevated',
      color: 'primary'
    }

    // Специфічні дефолтні значення
    if (type === 'VBtn') baseProps.innerText = 'Button'
    if (type === 'VTextField') baseProps.label = 'Input Label'
    if (type === 'VCard') {
      baseProps.variant = 'elevated'
      baseProps.color = 'white'
    }

    return {
      id: Math.random().toString(36).substring(2, 9),
      type,
      name,
      props: baseProps,
      classes: [],
      children: []
    }
  }

  const appendChild = (parentId: string, newNode: UiNode, node: UiNode = rootNode.value): boolean => {
    if (node.id === parentId) {
      node.children.push(newNode)
      return true
    }
    return node.children.some(child => appendChild(parentId, newNode, child))
  }

  const deleteNode = (id: string, parent: UiNode = rootNode.value): boolean => {
    const index = parent.children.findIndex(child => child.id === id)
    if (index !== -1) {
      parent.children.splice(index, 1)
      if (selectedNodeId.value === id) {
        selectedNodeId.value = null
      }
      return true
    }
    for (const child of parent.children) {
      if (deleteNode(id, child)) return true
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
    deleteNode
  }
})
