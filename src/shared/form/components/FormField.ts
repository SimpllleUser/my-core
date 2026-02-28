import { defineComponent, h, inject } from 'vue'
import { resolveFieldComponent } from './fieldComponentMap'
import { resolveBaseProps } from './fieldPropsStrategies'
import { FIELD_DEFAULTS_KEY, defaultFieldDefaults } from './fieldDefaults'
import FieldWrapper from './FieldWrapper.vue'
import type { BaseField } from '../fields/BaseField'

export interface FieldState<TValue = unknown> {
  field: BaseField<TValue>
  value: TValue
  errors: string[]
}

export const FormField = defineComponent({
  name: 'FormField',

  props: {
    modelValue: {
      type: Object as () => FieldState,
      required: true,
    },
  },

  emits: {
    'update:modelValue': (_state: FieldState) => true,
  },

  setup(props, { slots, emit }) {
    const fieldDefaults = inject(FIELD_DEFAULTS_KEY, defaultFieldDefaults)

    const handleUpdate = (value: unknown) => {
      const { field, errors } = props.modelValue
      field.value = value as never
      emit('update:modelValue', { field, value, errors })
    }

    const handleBlur = () => {
      const { field, value } = props.modelValue
      field.value = value as never
      const errors = field.validate()
      emit('update:modelValue', { ...props.modelValue, errors })
    }

    return () => {
      const { field, value, errors } = props.modelValue

      const inputNode = slots.default
        ? slots.default({ field, errors, value, onUpdate: handleUpdate, onBlur: handleBlur })
        : h(resolveFieldComponent(field.type), {
            ...resolveBaseProps(field, value, errors, fieldDefaults),
            'onUpdate:modelValue': handleUpdate,
            onBlur: handleBlur,
          })

      return h(
        FieldWrapper,
        { field, errors },
        {
          default: () => inputNode,
          ...(slots.label && { label: slots.label }),
          ...(slots.description && { description: slots.description }),
          ...(slots.errors && { errors: slots.errors }),
          ...(slots.hint && { hint: slots.hint }),
        }
      )
    }
  },
})
