// src/modules/ui-builder/entities/ui-node/ui/NodeRenderer.ts
import { defineComponent, h, resolveComponent, type PropType } from 'vue'
import * as Components from 'vuetify/components'
import { storeToRefs } from 'pinia'
import { useUiTreeStore } from '../model/store'

export default defineComponent({
  name: 'NodeRenderer',
  props: {
    node: { type: Object as PropType<any>, required: true }
  },
  setup(props) {
    const store = useUiTreeStore()
    const { selectedNodeId } = storeToRefs(store)

    return () => {
      if (!props.node) return null

      const { node } = props
      const isSelected = selectedNodeId.value === node.id
      const VComponent = (Components as any)[node.type] || node.type

      return h(
        VComponent,
        {
          ...node.props,
          class: [...(node.classes || []), 'ui-builder-element', { 'is-selected': isSelected }],
          onClick: (e: Event) => {
            e.stopPropagation()
            store.selectNode(node.id)
          }
        },
        {
          default: () => {
            if (node.children?.length > 0) {
              return node.children.map((child: any) =>
                h(resolveComponent('NodeRenderer'), { key: child.id, node: child })
              )
            }
            return node.props.innerText || []
          }
        }
      )
    }
  }
})
