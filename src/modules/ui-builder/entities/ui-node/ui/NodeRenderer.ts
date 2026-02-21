import { defineComponent, h, resolveComponent, type PropType, type VNode } from 'vue'
import type { UiNode } from '../model/types'
import { useUiTreeStore } from '../model/store'

export default defineComponent({
  name: 'NodeRenderer',
  props: {
    node: {
      type: Object as PropType<UiNode>,
      required: true
    }
  },
  setup(props) {
    const { selectedNodeId, selectNode } = useUiTreeStore()

    const handleClick = (event: Event) => {
      event.stopPropagation()
      selectNode(props.node.id)
    }

    const renderChildren = (): VNode[] | string => {
      if (props.node.children && props.node.children.length > 0) {
        return props.node.children.map(child =>
          h(resolveComponent('NodeRenderer'), {
            key: child.id,
            node: child
          })
        )
      }

      if (props.node.props.innerText) {
        return props.node.props.innerText
      }

      return []
    }

    return () => {
      const isSelected = selectedNodeId.value === props.node.id

      const componentTag = props.node.type.startsWith('V')
        ? resolveComponent(props.node.type)
        : props.node.type

      const classes = [...props.node.classes]

      if (isSelected) {
        classes.push('border-md', 'border-primary', 'border-dashed')
      }

      const componentProps = {
        ...props.node.props,
        class: classes,
        onClick: handleClick
      }

      return h(componentTag as any, componentProps, () => renderChildren())
    }
  }
})
