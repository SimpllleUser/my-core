// src/modules/ui-builder/entities/ui-node/model/store.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getComponentDef } from './componentDefinitions'

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

  const selectedNodeIds = ref<string[]>([])
  const selectedNodeId = computed(() => selectedNodeIds.value[0] ?? null)

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

  const findParentAndIndex = (
    id: string,
    parent: any = rootNode.value
  ): { parent: any; index: number; slotName: string | null } | null => {
    const idx = (parent.children ?? []).findIndex((c: any) => c.id === id)
    if (idx !== -1) return { parent, index: idx, slotName: null }
    for (const [slotName, children] of Object.entries(parent.slots ?? {})) {
      const sIdx = (children as any[]).findIndex((c: any) => c.id === id)
      if (sIdx !== -1) return { parent, index: sIdx, slotName }
    }
    for (const child of parent.children ?? []) {
      const found = findParentAndIndex(id, child)
      if (found) return found
    }
    for (const slotChildren of Object.values(parent.slots ?? {})) {
      for (const child of slotChildren as any[]) {
        const found = findParentAndIndex(id, child)
        if (found) return found
      }
    }
    return null
  }

  const createNode = (type: string, name?: string): any => {
    const id = `ui_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
    const def = getComponentDef(type)

    const newNode: any = {
      id,
      type,
      name: def?.label ?? name ?? type,
      props: { ...(def?.defaultProps ?? {}) },
      classes: [...(def?.defaultClasses ?? [])],
      children: [],
      slots: {}
    }

    if (def?.defaultTextChild) {
      newNode.children.push({
        id: `${id}_text`,
        type: 'TEXT',
        name: def.label,
        props: {},
        classes: [],
        children: [],
        slots: {}
      })
    }

    return newNode
  }

  return {
    rootNode,
    selectedNodeIds,
    selectedNodeId,
    findNodeById,
    createNode,

    selectNode: (id: string | null) => { selectedNodeIds.value = id ? [id] : [] },

    toggleMultiSelect: (id: string) => {
      const idx = selectedNodeIds.value.indexOf(id)
      if (idx === -1) selectedNodeIds.value = [...selectedNodeIds.value, id]
      else selectedNodeIds.value = selectedNodeIds.value.filter(i => i !== id)
    },

    areNodesSiblings: (ids: string[]): boolean => {
      if (ids.length < 2) return true
      const locs = ids.map(id => findParentAndIndex(id))
      if (locs.some(l => !l)) return false
      const first = locs[0]!
      return locs.every(l => l!.parent.id === first.parent.id && l!.slotName === first.slotName)
    },

    wrapNodes: (nodeIds: string[], wrapperType: string) => {
      if (nodeIds.length < 1) return
      const locs = nodeIds.map(id => findParentAndIndex(id)).filter(Boolean) as Array<{ parent: any; index: number; slotName: string | null }>
      if (locs.length !== nodeIds.length) return
      const first = locs[0]
      if (!locs.every(l => l.parent.id === first.parent.id && l.slotName === first.slotName)) return

      const targetArray: any[] = first.slotName
        ? first.parent.slots[first.slotName]
        : first.parent.children

      locs.sort((a, b) => a.index - b.index)
      const insertIndex = locs[0].index

      // Capture node objects before mutation
      const nodesToWrap = locs.map(l => targetArray[l.index])

      const wrapper = createNode(wrapperType)
      wrapper.children = nodesToWrap

      // Remove in reverse order to preserve indices
      for (const loc of [...locs].reverse()) {
        targetArray.splice(loc.index, 1)
      }
      targetArray.splice(insertIndex, 0, wrapper)
      selectedNodeIds.value = [wrapper.id]
    },

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

    unwrapNode: (id: string) => {
      const loc = findParentAndIndex(id)
      if (!loc) return
      const { parent, index, slotName } = loc
      const targetArray: any[] = slotName ? parent.slots[slotName] : parent.children
      const node = targetArray[index]
      const children: any[] = node.children ?? []
      targetArray.splice(index, 1, ...children)
      selectedNodeIds.value = children.length ? [children[0].id] : []
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
