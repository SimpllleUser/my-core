/**
 * @deprecated Use `FormField` with `v-model` instead.
 * Kept for backward compatibility with the old `v-bind="bind.field"` pattern.
 */
import { defineComponent, h } from 'vue'
import { FormField } from './FormField'
import type { BaseField } from '../fields/BaseField'

export const DynamicField = defineComponent({
  name: 'DynamicField',

  props: {
    field: {
      type: Object as () => BaseField,
      required: true,
    },
    modelValue: {
      type: null as unknown as () => unknown,
      required: true,
    },
    errors: {
      type: Array as () => string[],
      default: () => [],
    },
  },

  emits: {
    'update:modelValue': (_value: unknown) => true,
  },

  setup(props, { slots, emit }) {
    return () =>
      h(
        FormField,
        {
          modelValue: { field: props.field, value: props.modelValue, errors: props.errors },
          'onUpdate:modelValue': (state: { value: unknown }) => emit('update:modelValue', state.value),
        },
        slots
      )
  },
})
