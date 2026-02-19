import { defineComponent, h, inject } from 'vue'
import { resolveFieldComponent } from './fieldComponentMap'
import { resolveBaseProps } from './fieldPropsStrategies'
import { FIELD_DEFAULTS_KEY, defaultFieldDefaults } from './fieldDefaults'
import FieldWrapper from './FieldWrapper.vue'
import type { BaseField } from '../fields/BaseField'

export const DynamicField = defineComponent({
  name: 'DynamicField',

  props: {
    field: {
      type: Object as () => BaseField,
      required: true
    },
    modelValue: {
      type: null as unknown as () => unknown,
      required: true
    },
    errors: {
      type: Array as () => string[],
      default: () => []
    }
  },

  emits: {
    'update:modelValue': (_value: unknown) => true
  },

  setup(props, { slots, emit }) {
    const fieldDefaults = inject(FIELD_DEFAULTS_KEY, defaultFieldDefaults)

    return () => {
      const { field, modelValue, errors } = props

      const inputNode = slots.default
        ? slots.default({ field, errors, modelValue, onUpdate: (v: unknown) => emit('update:modelValue', v) })
        : h(resolveFieldComponent(field.type), {
            ...resolveBaseProps(field, modelValue, errors, fieldDefaults),
            'onUpdate:modelValue': (v: unknown) => emit('update:modelValue', v)
          })

      return h(
        FieldWrapper,
        { field, errors },
        {
          default: () => inputNode,
          ...(slots.label && { label: slots.label }),
          ...(slots.description && { description: slots.description }),
          ...(slots.errors && { errors: slots.errors }),
          ...(slots.hint && { hint: slots.hint })
        }
      )
    }
  }
})
