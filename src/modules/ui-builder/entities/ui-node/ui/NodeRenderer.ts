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

      // DEFAULT SLOT: Тільки діти (без змішування з текстом)
      slots.default = () => {
        return (node.children || []).map((child: any) =>
          h(resolveDynamicComponent('NodeRenderer') as any, {
            key: child.id,
            node: child
          })
        )
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

      return h(
        VComponent,
        {
          ...node.props,
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
