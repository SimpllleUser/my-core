export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'autocomplete'
  | 'number'

export type ValidationRule = (value: unknown) => string | true

export type TransformFn<T = unknown> = (value: T) => unknown

export interface FieldValidations {
  required?: boolean
  rules?: ValidationRule[]
}

export interface FieldConfig {
  /** Initial (and reset) value */
  value?: unknown
  label?: string
  description?: string
  placeholder?: string
  hint?: string
  /** Tooltip text shown as info icon next to label */
  info?: string
  validations?: FieldValidations
  disabled?: boolean
  readonly?: boolean
  vuetifyProps?: Record<string, unknown>
  /** Transform value before form submission */
  transform?: TransformFn

  /** @deprecated Use `value` instead */
  defaultValue?: unknown
  /** @deprecated Use `validations.required` instead */
  required?: boolean
  /** @deprecated Use `validations.rules` instead */
  rules?: ValidationRule[]
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
