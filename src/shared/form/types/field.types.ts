export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'autocomplete'

export type ValidationRule = (value: unknown) => string | true

export type TransformFn<T = unknown> = (value: T) => unknown

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
  /** Трансформація значення поля перед відправкою форми */
  transform?: TransformFn
}

export type FormValues = Record<string, unknown>

export type FormErrors = Record<string, string[]>

export type FormSubmitHandler<T extends FormValues = FormValues> = (values: T) => void | Promise<void>

export interface UseFormStateOptions<T extends FormValues = FormValues> {
  transform?: (values: T) => Partial<T> | Record<string, unknown>
  onBeforeSubmit?: (values: T) => boolean | void | Promise<boolean | void>
  onAfterSubmit?: (values: T) => void | Promise<void>
  onSubmitError?: (error: unknown) => void | Promise<void>
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
