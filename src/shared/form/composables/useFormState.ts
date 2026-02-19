import { reactive, computed } from 'vue'
import type { BaseField } from '../fields/BaseField'

type FormValues = Record<string, unknown>
type FormErrors = Record<string, string[]>

export interface FieldBinding {
  field: BaseField
  modelValue: unknown
  errors: string[]
  'onUpdate:modelValue': (value: unknown) => void
}

type FieldBindings<T extends Record<string, BaseField>> = {
  readonly [K in keyof T]: FieldBinding
}

export const useFormState = <TFields extends Record<string, BaseField>>(fields: TFields) => {
  const values = reactive<FormValues>(
    Object.fromEntries(Object.entries(fields).map(([key, field]) => [key, field.value]))
  )

  const errors = reactive<FormErrors>(
    Object.fromEntries(Object.keys(fields).map(key => [key, []]))
  )

  const validateField = (key: string): boolean => {
    const field = fields[key]
    if (!field) return true
    errors[key] = field.validate()
    return errors[key].length === 0
  }

  const validateAll = (): boolean => {
    return Object.keys(fields)
      .map(validateField)
      .every(Boolean)
  }

  const reset = () => {
    Object.entries(fields).forEach(([key, field]) => {
      field.reset()
      values[key] = field.value
      errors[key] = []
    })
  }

  const clearErrors = (key?: string) => {
    if (key) {
      errors[key] = []
    } else {
      Object.keys(errors).forEach(k => { errors[k] = [] })
    }
  }

  const setValues = (newValues: Partial<FormValues>) => {
    Object.entries(newValues).forEach(([key, value]) => {
      if (key in values) {
        values[key] = value
        if (fields[key]) fields[key].value = value
      }
    })
  }

  const bind = new Proxy({} as FieldBindings<TFields>, {
    get(_, key: string) {
      return {
        field: fields[key],
        modelValue: values[key],
        errors: errors[key],
        'onUpdate:modelValue': (value: unknown) => {
          values[key] = value
          validateField(key)
        }
      } satisfies FieldBinding
    }
  })

  const isValid = computed(() => Object.values(errors).every(e => e.length === 0))

  const isDirty = computed(() =>
    Object.entries(fields).some(([key, field]) => values[key] !== field.config.defaultValue)
  )

  return {
    values,
    errors,
    isValid,
    isDirty,
    validateField,
    validateAll,
    reset,
    clearErrors,
    setValues,
    bind
  }
}
