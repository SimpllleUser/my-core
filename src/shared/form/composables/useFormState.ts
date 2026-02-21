import { reactive, computed, ref } from 'vue'
import type { BaseField } from '../fields/BaseField'
import type {
  FormValues,
  FormErrors,
  FormSubmitHandler,
  UseFormStateOptions,
} from '../types/field.types'

export interface FieldBinding {
  field: BaseField
  modelValue: unknown
  errors: string[]
  'onUpdate:modelValue': (value: unknown) => void
  onBlur: () => void
}

type FieldBindings<T extends Record<string, BaseField>> = {
  readonly [K in keyof T]: FieldBinding
}

export const useFormState = <TFields extends Record<string, BaseField>>(
  fields: TFields,
  options: UseFormStateOptions = {}
) => {
  const values = reactive<FormValues>(
    Object.fromEntries(Object.entries(fields).map(([key, field]) => [key, field.value]))
  )

  const errors = reactive<FormErrors>(
    Object.fromEntries(Object.keys(fields).map(key => [key, []]))
  )

  const touched = reactive<Record<string, boolean>>(
    Object.fromEntries(Object.keys(fields).map(key => [key, false]))
  )

  const isSubmitting = ref(false)

  // ─── Validation ──────────────────────────────────────────────────────────────

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


  const handleBlur = (key: string): void => {
    touched[key] = true
    validateField(key)
  }

  const getValues = (): Record<string, unknown> => {
    const transformed = Object.fromEntries(
      Object.entries(fields).map(([key, field]) => {
        const raw = values[key]
        const value = field.transform ? field.transform(raw) : raw
        return [key, value]
      })
    )

    if (options.transform) {
      return { ...transformed, ...options.transform(transformed as FormValues) }
    }

    return transformed
  }

  const clearErrors = (key?: string) => {
    if (key) {
      errors[key] = []
    } else {
      Object.keys(errors).forEach(k => { errors[k] = [] })
    }
  }

  const setErrors = (newErrors: Partial<FormErrors>) => {
    Object.entries(newErrors).forEach(([key, msgs]) => {
      if (key in errors) {
        errors[key] = msgs ?? []
      }
    })
  }

  const setValues = (newValues: Partial<FormValues>) => {
    Object.entries(newValues).forEach(([key, value]) => {
      if (key in values) {
        values[key] = value
        if (fields[key]) fields[key].value = value
      }
    })
  }

  const reset = () => {
    Object.entries(fields).forEach(([key, field]) => {
      field.reset()
      values[key] = field.value
      errors[key] = []
      touched[key] = false
    })
  }

  const submit = async <T extends FormValues>(handler: FormSubmitHandler<T>): Promise<void> => {
    const isFormValid = validateAll()
    if (!isFormValid) return

    const submitValues = getValues() as T

    if (options.onBeforeSubmit) {
      const result = await options.onBeforeSubmit(submitValues)
      if (result === false) return
    }

    isSubmitting.value = true

    try {
      await handler(submitValues)
      await options.onAfterSubmit?.(submitValues)
    } catch (error) {
      if (options.onSubmitError) {
        await options.onSubmitError(error)
      } else {
        throw error
      }
    } finally {
      isSubmitting.value = false
    }
  }

  const bind = new Proxy({} as FieldBindings<TFields>, {
    get(_, key: string) {
      return {
        field: fields[key],
        modelValue: values[key],
        errors: errors[key],
        'onUpdate:modelValue': (value: unknown) => {
          values[key] = value
          fields[key].value = value
          if (touched[key]) validateField(key)
        },
        onBlur: () => handleBlur(key),
      } satisfies FieldBinding
    }
  })

  const isValid = computed(() => Object.values(errors).every(e => e.length === 0))

  const isDirty = computed(() =>
    Object.entries(fields).some(([key, field]) => values[key] !== field.config.defaultValue)
  )

  const isTouched = computed(() => Object.values(touched).some(Boolean))

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    isDirty,
    isTouched,
    validateField,
    validateAll,
    handleBlur,
    getValues,
    setValues,
    setErrors,
    clearErrors,
    reset,
    submit,
    bind,
  }
}
