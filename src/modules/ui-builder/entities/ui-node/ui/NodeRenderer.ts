// src/modules/ui-builder/entities/ui-node/ui/NodeRenderer.ts
import { defineComponent, h, type PropType, resolveDynamicComponent } from 'vue'
import * as Components from 'vuetify/components'
import { storeToRefs } from 'pinia'
import { useUiTreeStore } from '../model/store'

const NodeRenderer = defineComponent({
  name: 'NodeRenderer',
  props: {
    node: { type: Object as PropType<any>, required: true }
  },
  setup(props) {
    const store = useUiTreeStore()
    const { selectedNodeId } = storeToRefs(store)

    return () => {
      const { node } = props
      if (!node || !node.id) return null

      // Якщо це спеціальний текстовий вузол
      if (node.type === 'TEXT') {
        return h('span', {
          style: 'pointer-events: none; display: inline-block;',
          class: { 'is-selected': selectedNodeId.value === node.id }
        }, node.name) // Використовуємо node.name як контент
      }

      const VComponent = (Components as any)[node.type] || node.type
      const isSelected = selectedNodeId.value === node.id

      const slots: Record<string, () => any> = {}

      // Leaf nodes that rely on props rather than slots for their content
      const isLeaf = node.type === 'VIcon' || node.type === 'VImg'

      // DEFAULT SLOT: Тільки діти (без змішування з текстом)
      if (!isLeaf) {
        slots.default = () => {
          return (node.children || []).map((child: any) =>
            h(resolveDynamicComponent('NodeRenderer') as any, {
              key: child.id,
              node: child
            })
          )
        }
      }

      // NAMED SLOTS
      if (node.slots) {
        Object.entries(node.slots).forEach(([slotName, slotChildren]) => {
          const sChildren = slotChildren as any[]
          if (sChildren.length > 0) {
            slots[slotName] = () => sChildren.map((child: any) =>
              h(resolveDynamicComponent('NodeRenderer') as any, {
                key: child.id,
                node: child
              })
            )
          }
        })
      }

      const extraProps: Record<string, any> = {}
      if (node.type === 'VImg' && !node.props.src) {
        extraProps.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><rect width="100%" height="100%" fill="%23e0e0e0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23999">No image</text></svg>'
      }

      return h(
        VComponent,
        {
          ...node.props,
          ...extraProps,
          class: [
            ...(node.classes || []),
            'ui-builder-element',
            { 'is-selected': isSelected }
          ],
          onClick: (e: Event) => {
            e.stopPropagation()
            store.selectNode(node.id)
          }
        },
        slots
      )
    }
  }
})

export default NodeRenderer
