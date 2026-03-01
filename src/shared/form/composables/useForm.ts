import { reactive, computed, watch } from 'vue'
import { useForm as useVeeForm } from 'vee-validate'
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
  const initialValues = Object.fromEntries(
    Object.entries(fields).map(([key, field]) => [key, field.value])
  )

  // Build vee-validate schema from BaseField rules
  const validationSchema = Object.fromEntries(
    Object.entries(fields).map(([key, field]) => [
      key,
      (value: unknown): string | true => {
        for (const rule of field.rules) {
          const result = rule(value)
          if (result !== true) return result
        }
        return true
      },
    ])
  )

  const vee = useVeeForm({ initialValues, validationSchema })

  const form = reactive(
    Object.fromEntries(
      Object.entries(fields).map(([key, field]) => [
        key,
        { field, value: field.value, errors: [] as string[] },
      ])
    )
  ) as FormModel<TFields>

  // Sync vee-validate errors → form[key].errors
  // Only show errors after submit attempt or when a field was explicitly touched
  watch(
    [vee.errors, vee.submitCount],
    ([errs]) => {
      for (const key of Object.keys(fields)) {
        const state = (form as Record<string, FieldState>)[key]
        if (!state) continue
        const msg = errs[key]
        state.errors = (vee.submitCount.value > 0 || touched[key]) && msg ? [msg] : []
      }
    },
    { deep: true }
  )

  // Sync form[key].value changes → vee-validate values (without re-triggering validation)
  for (const key of Object.keys(fields)) {
    watch(
      () => (form as Record<string, FieldState>)[key]?.value,
      (value) => vee.setFieldValue(key, value)
    )
  }

  const touched = reactive<Record<string, boolean>>(
    Object.fromEntries(Object.keys(fields).map(key => [key, false]))
  )

  const isValid = computed(() => vee.meta.value.valid)
  const isDirty = computed(() => vee.meta.value.dirty)
  const isTouched = computed(() => Object.values(touched).some(Boolean))

  const validateField = async (key: string): Promise<boolean> => {
    const result = await vee.validateField(key)
    return result.valid
  }

  const validateAll = async (): Promise<boolean> => {
    const result = await vee.validate()
    return result.valid
  }

  const handleBlur = (key: string): void => {
    touched[key] = true
    vee.setFieldTouched(key, true)
    validateField(key).then(() => {
      // Sync error for this field immediately after blur validation,
      // even if vee.errors didn't change (error was pre-existing)
      const state = (form as Record<string, FieldState>)[key]
      if (!state) return
      const msg = vee.errors.value[key]
      state.errors = msg ? [msg] : []
    })
  }

  const getValues = (): Record<string, unknown> => {
    const transformed = Object.fromEntries(
      Object.keys(fields).map(key => {
        const field = fields[key]!
        const raw = vee.values[key]
        const value = field.transform ? field.transform(raw as never) : raw
        return [key, value]
      })
    )
    if (options.transform) {
      return { ...transformed, ...options.transform(transformed as FormValues) }
    }
    return transformed
  }

  const setValues = (newValues: Partial<Record<string, unknown>>) => {
    vee.setValues(newValues)
    for (const [key, value] of Object.entries(newValues)) {
      const state = (form as Record<string, FieldState>)[key]
      if (state) state.value = value as never
    }
  }

  const setErrors = (newErrors: Partial<Record<string, string[]>>) => {
    for (const [key, msgs] of Object.entries(newErrors)) {
      vee.setFieldError(key, msgs?.[0])
    }
  }

  const clearErrors = (key?: string) => {
    if (key) {
      vee.setFieldError(key, undefined)
    } else {
      for (const k of Object.keys(fields)) vee.setFieldError(k, undefined)
    }
  }

  const submit = async <T extends Record<string, unknown>>(
    handler: (values: T) => void | Promise<void>
  ): Promise<void> => {
    const processedValues = getValues() as T

    if (options.onBeforeSubmit) {
      const shouldContinue = await options.onBeforeSubmit(processedValues as FormValues)
      if (shouldContinue === false) return
    }

    await new Promise<void>((resolve, reject) => {
      const submitFn = vee.handleSubmit(
        async () => {
          try {
            await handler(processedValues)
            await options.onAfterSubmit?.(processedValues as FormValues)
            resolve()
          } catch (error) {
            if (options.onSubmitError) {
              await options.onSubmitError(error)
              resolve()
            } else {
              reject(error)
            }
          }
        },
        () => resolve()
      )
      submitFn()
    })
  }

  const reset = () => {
    vee.resetForm({ values: initialValues })
    for (const [key, field] of Object.entries(fields)) {
      field.reset()
      const state = (form as Record<string, FieldState>)[key]
      if (!state) continue
      state.value = field.value as never
      state.errors = []
      touched[key] = false
    }
  }

  return {
    form,
    touched,
    isSubmitting: vee.isSubmitting,
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
