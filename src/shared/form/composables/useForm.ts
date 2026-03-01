import { reactive, ref, computed } from 'vue'
import type { BaseField } from '../fields/BaseField'
import type { FieldState } from '../components/FormField.vue'
import type { FormValues, UseFormStateOptions } from '../types/field.types'

type InferValue<TField> = TField extends BaseField<infer V> ? V : unknown

type FormModel<TFields extends Record<string, BaseField>> = {
  [K in keyof TFields]: FieldState<InferValue<TFields[K]>>
}

export const useForm = <TFields extends Record<string, BaseField>>(
  fields: TFields,
  options: UseFormStateOptions = {}
) => {
  const form = reactive(
    Object.fromEntries(
      Object.entries(fields).map(([key, field]) => [
        key,
        { field, value: field.value, errors: [] as string[] },
      ])
    )
  ) as FormModel<TFields>

  const touched = reactive<Record<string, boolean>>(
    Object.fromEntries(Object.keys(fields).map(key => [key, false]))
  )

  const isSubmitting = ref(false)

  const isValid = computed(() =>
    Object.keys(fields).every(key => (form as Record<string, FieldState>)[key].errors.length === 0)
  )

  const isDirty = computed(() =>
    Object.keys(fields).some(key => {
      const state = (form as Record<string, FieldState>)[key]
      return state.value !== (state.field.config.value ?? state.field.config.defaultValue)
    })
  )

  const isTouched = computed(() => Object.values(touched).some(Boolean))

  // ─── Validation ──────────────────────────────────────────────────────────────

  const validateField = (key: string): boolean => {
    const state = (form as Record<string, FieldState>)[key]
    if (!state) return true
    state.field.value = state.value as never
    state.errors = state.field.validate()
    return state.errors.length === 0
  }

  const validateAll = (): boolean => {
    return Object.keys(fields).map(validateField).every(Boolean)
  }

  const handleBlur = (key: string): void => {
    touched[key] = true
    validateField(key)
  }

  // ─── Values ──────────────────────────────────────────────────────────────────

  const getValues = (): Record<string, unknown> => {
    const transformed = Object.fromEntries(
      Object.keys(fields).map(key => {
        const state = (form as Record<string, FieldState>)[key]
        const raw = state.value
        const value = state.field.transform ? state.field.transform(raw) : raw
        return [key, value]
      })
    )

    if (options.transform) {
      return { ...transformed, ...options.transform(transformed as FormValues) }
    }

    return transformed
  }

  const setValues = (newValues: Partial<Record<string, unknown>>) => {
    Object.entries(newValues).forEach(([key, value]) => {
      const state = (form as Record<string, FieldState>)[key]
      if (state) {
        state.value = value as never
        state.field.value = value as never
      }
    })
  }

  const setErrors = (newErrors: Partial<Record<string, string[]>>) => {
    Object.entries(newErrors).forEach(([key, msgs]) => {
      const state = (form as Record<string, FieldState>)[key]
      if (state) state.errors = msgs ?? []
    })
  }

  const clearErrors = (key?: string) => {
    if (key) {
      const state = (form as Record<string, FieldState>)[key]
      if (state) state.errors = []
    } else {
      Object.keys(fields).forEach(k => {
        ;(form as Record<string, FieldState>)[k].errors = []
      })
    }
  }

  // ─── Lifecycle ────────────────────────────────────────────────────────────────

  const submit = async <T extends Record<string, unknown>>(
    handler: (values: T) => void | Promise<void>
  ): Promise<void> => {
    if (!validateAll()) return

    const values = getValues() as T

    if (options.onBeforeSubmit) {
      const result = await options.onBeforeSubmit(values as FormValues)
      if (result === false) return
    }

    isSubmitting.value = true

    try {
      await handler(values)
      await options.onAfterSubmit?.(values as FormValues)
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

  const reset = () => {
    for (const [key, field] of Object.entries(fields)) {
      field.reset()
      const state = (form as Record<string, FieldState>)[key]
      state.value = field.value as never
      state.errors = []
      touched[key] = false
    }
  }

  return {
    form,
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
    submit,
    reset,
  }
}
