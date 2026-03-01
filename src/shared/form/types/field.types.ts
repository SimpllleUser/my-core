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

/** Shorthand: number or [number, customMessage] */
type WithMessage<T> = T | [T, string]

export interface FieldValidations {
  /** Field cannot be empty */
  required?: boolean | string
  /** Must be a valid email address */
  email?: boolean | string
  /** Must be a valid URL */
  url?: boolean | string
  /** Must contain only numeric characters */
  numeric?: boolean | string
  /** Must be a whole integer number */
  integer?: boolean | string
  /** Minimum string length: 2 or [2, 'At least 2 chars'] */
  minLength?: WithMessage<number>
  /** Maximum string length: 100 or [100, 'Max 100 chars'] */
  maxLength?: WithMessage<number>
  /** Minimum numeric value: 0 or [0, 'Must be >= 0'] */
  min?: WithMessage<number>
  /** Maximum numeric value: 100 or [100, 'Must be <= 100'] */
  max?: WithMessage<number>
  /** Must match regex: /pattern/ or [/pattern/, 'Invalid format'] */
  pattern?: WithMessage<RegExp>
  /** Must match another field's value: () => val or [() => val, 'Must match'] */
  sameAs?: WithMessage<() => unknown>
  /** Custom rules for full flexibility */
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
