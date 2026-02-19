export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'autocomplete'

export type ValidationRule = (value: unknown) => string | true

export interface FieldConfig {
  label?: string
  description?: string
  placeholder?: string
  hint?: string
  rules?: ValidationRule[]
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  defaultValue?: unknown
  vuetifyProps?: Record<string, unknown>
}

export interface SelectOption {
  title: string
  value: unknown
  disabled?: boolean
}

export interface SelectFieldConfig extends FieldConfig {
  options: SelectOption[]
  multiple?: boolean
}

export interface TextareaFieldConfig extends FieldConfig {
  rows?: number
  autoGrow?: boolean
}
