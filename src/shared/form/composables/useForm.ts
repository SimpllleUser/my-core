import { reactive, ref } from 'vue'
import type { BaseField } from '../fields/BaseField'
import type { FieldState } from '../components/FormField'

type InferValue<TField> = TField extends BaseField<infer V> ? V : unknown

type FormModel<TFields extends Record<string, BaseField>> = {
  [K in keyof TFields]: FieldState<InferValue<TFields[K]>>
}

type FormValues<TFields extends Record<string, BaseField>> = {
  [K in keyof TFields]: InferValue<TFields[K]>
}

export const useForm = <TFields extends Record<string, BaseField>>(fields: TFields) => {
  const form = reactive(
    Object.fromEntries(
      Object.entries(fields).map(([key, field]) => [
        key,
        { field, value: field.value, errors: [] as string[] },
      ])
    )
  ) as FormModel<TFields>

  const isValid = ref<boolean | null>(null)

  const validateAll = (): boolean => {
    let allValid = true
    for (const key of Object.keys(fields)) {
      const state = (form as Record<string, FieldState>)[key]
      state.field.value = state.value as never
      state.errors = state.field.validate()
      if (state.errors.length > 0) allValid = false
    }
    return allValid
  }

  const submit = async <T extends Record<string, unknown>>(
    handler: (values: T) => void | Promise<void>
  ): Promise<void> => {
    const valid = validateAll()
    isValid.value = valid
    if (!valid) return

    const values = Object.fromEntries(
      Object.entries(fields).map(([key, field]) => {
        const raw = (form as Record<string, FieldState>)[key].value
        const value = field.transform ? field.transform(raw) : raw
        return [key, value]
      })
    ) as T

    await handler(values)
  }

  const reset = () => {
    for (const [key, field] of Object.entries(fields)) {
      field.reset()
      const state = (form as Record<string, FieldState>)[key]
      state.value = field.value as never
      state.errors = []
    }
    isValid.value = null
  }

  return { form, submit, isValid, reset }
}
