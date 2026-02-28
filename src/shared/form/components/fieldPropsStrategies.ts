import type { BaseField } from '../fields/BaseField'
import type { SelectField } from '../fields/SelectField'
import type { TextareaField } from '../fields/TextareaField'
import type { FieldType } from '../types/field.types'
import type { FieldDefaults } from './fieldDefaults'

type FieldPropsStrategy = (field: BaseField) => Record<string, unknown>

const baseStrategy: FieldPropsStrategy = () => ({})
const emailStrategy: FieldPropsStrategy = () => ({ type: 'email' })
const passwordStrategy: FieldPropsStrategy = () => ({ type: 'password' })
const numberStrategy: FieldPropsStrategy = () => ({ type: 'number' })

const textareaStrategy: FieldPropsStrategy = field => {
  const f = field as TextareaField
  return {
    rows: f.config.rows ?? 4,
    'auto-grow': f.config.autoGrow ?? false,
  }
}

const selectStrategy: FieldPropsStrategy = field => {
  const f = field as SelectField
  return {
    items: f.options,
    multiple: f.multiple,
  }
}

export const fieldPropsStrategies: Record<FieldType, FieldPropsStrategy> = {
  text: baseStrategy,
  email: emailStrategy,
  password: passwordStrategy,
  number: numberStrategy,
  textarea: textareaStrategy,
  select: selectStrategy,
  autocomplete: selectStrategy,
  checkbox: baseStrategy,
}

export const resolveFieldTypeProps = (field: BaseField): Record<string, unknown> => {
  const strategy = fieldPropsStrategies[field.type] ?? baseStrategy
  return strategy(field)
}

export const resolveBaseProps = (
  field: BaseField,
  modelValue: unknown,
  errors: string[],
  defaults: FieldDefaults
): Record<string, unknown> => ({
  modelValue,
  disabled: field.isDisabled,
  readonly: field.isReadonly,
  placeholder: field.config.placeholder,
  'hide-details': defaults.hideDetails ?? 'auto',
  variant: defaults.variant ?? 'outlined',
  density: defaults.density ?? 'comfortable',
  'error-messages': errors,
  ...defaults.baseProps,
  ...field.vuetifyProps,
  ...resolveFieldTypeProps(field),
})
