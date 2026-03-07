import { defineComponent, h, Fragment, type PropType, type VNode, type Slots } from 'vue'
import { VRow, VCol } from 'vuetify/components'
import FormFieldComponent from './FormField.vue'
import type { TemplateNode, TemplateChild } from '../template/types'
import type { FieldState } from './FormField.vue'

function renderChild(
  child: TemplateChild,
  form: Record<string, FieldState>,
  handleBlur: ((key: string) => void) | undefined,
  slots: Slots,
): VNode | null {
  if (typeof child === 'string') {
    const state = form[child]
    if (!state) return null

    return h(FormFieldComponent, {
      modelValue: state,
      'onUpdate:modelValue': (newState: FieldState) => {
        ;(form as Record<string, FieldState>)[child] = newState
      },
      onBlur: () => handleBlur?.(child),
    })
  }

  return renderNode(child, form, handleBlur, slots)
}

function renderNode(
  node: TemplateNode,
  form: Record<string, FieldState>,
  handleBlur: ((key: string) => void) | undefined,
  slots: Slots,
): VNode | null {
  // respect visible flag — false hides the node entirely
  if ('visible' in node && node.visible === false) return null

  const children = () =>
    ('children' in node ? node.children : [])
      .map(c => renderChild(c, form, handleBlur, slots))
      .filter(Boolean) as VNode[]

  switch (node._type) {
    case 'row':
      return h(VRow, { class: node.class, ...node.props }, { default: children })

    case 'col':
      return h(VCol, { class: node.class, ...node.props }, { default: children })

    case 'block':
      return h('div', { class: node.class, ...node.props }, children())

    case 'slot': {
      const slotContent = slots[node.name]?.()
      if (!slotContent?.length) return null
      return h(Fragment, null, slotContent)
    }

    default:
      return null
  }
}

/**
 * Renders a form layout defined via `row()`, `col()`, `block()`, and `slot()` builders.
 *
 * Named slots (created with `slot('name')` in the template definition) are filled
 * by providing `<template #name>` in the parent component – useful for placing
 * buttons or other UI elements alongside form fields.
 *
 * @example
 * <FormTemplate :template="template" :form="form" :handle-blur="handleBlur">
 *   <template #actions>
 *     <VBtn type="submit" color="primary" block>Зберегти</VBtn>
 *   </template>
 * </FormTemplate>
 */
export const FormTemplate = defineComponent({
  name: 'FormTemplate',

  props: {
    template: {
      type: Array as PropType<TemplateNode[]>,
      required: true as const,
    },
    form: {
      type: Object as PropType<Record<string, FieldState>>,
      required: true as const,
    },
    handleBlur: {
      type: Function as PropType<(key: string) => void>,
      default: undefined,
    },
  },

  setup(props, { slots }) {
    return () =>
      h(
        Fragment,
        null,
        props.template
          .map(node => renderNode(node, props.form, props.handleBlur, slots))
          .filter(Boolean) as VNode[],
      )
  },
})
