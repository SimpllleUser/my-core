// src/modules/ui-builder/entities/ui-node/model/store.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiTreeStore = defineStore('ui-tree', () => {
  const rootNode = ref<any>({
    id: 'root-canvas',
    type: 'VCard',
    name: 'Main Canvas',
    props: { variant: 'flat', color: 'transparent' },
    classes: ['w-100', 'h-100', 'pa-4'],
    children: [],
    slots: {}
  })

  const selectedNodeId = ref<string | null>(null)

  const findNodeById = (id: string, node: any = rootNode.value): any | null => {
    if (node.id === id) return node
    for (const child of (node.children || [])) {
      const found = findNodeById(id, child)
      if (found) return found
    }
    for (const slotChildren of Object.values(node.slots || {})) {
      for (const child of (slotChildren as any[])) {
        const found = findNodeById(id, child)
        if (found) return found
      }
    }
    return null
  }

  const createNode = (type: string, name: string): any => {
    const id = `ui_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
    const newNode: any = {
      id,
      type,
      name,
      props: {},
      classes: [],
      children: [],
      slots: {}
    }

    // Якщо це текстові компоненти, додаємо TEXT вузол як дитину
    if (['VBtn', 'VCardTitle', 'VCardText', 'VListItem'].includes(type)) {
      newNode.children.push({
        id: `${id}_text`,
        type: 'TEXT',
        name: name, // Текст зберігається тут
        props: {},
        classes: [],
        children: [],
        slots: {}
      })
    }

    if (type === 'VCol') newNode.props.cols = 12
    return newNode
  }

  return {
    rootNode,
    selectedNodeId,
    findNodeById,
    createNode,
    selectNode: (id: string | null) => { selectedNodeId.value = id },
    appendChild: (parentId: string, newNode: any) => {
      const p = findNodeById(parentId)
      if (p) {
        if (!p.children) p.children = []
        p.children.push(newNode)
      }
    },
    appendToSlot: (parentId: string, slotName: string, newNode: any) => {
      const p = findNodeById(parentId)
      if (p) {
        if (!p.slots) p.slots = {}
        if (!p.slots[slotName]) p.slots[slotName] = []
        p.slots[slotName].push(newNode)
      }
    },
    deleteNode: (id: string, parent: any = rootNode.value): boolean => {
      const idx = parent.children?.findIndex((c: any) => c.id === id)
      if (idx !== -1 && idx !== undefined) {
        parent.children.splice(idx, 1)
        return true
      }
      for (const slotName in parent.slots) {
        const sIdx = parent.slots[slotName].findIndex((c: any) => c.id === id)
        if (sIdx !== -1) {
          parent.slots[slotName].splice(sIdx, 1)
          return true
        }
      }
      return parent.children?.some((c: any) => useUiTreeStore().deleteNode(id, c)) || false
    }
  }
})
