export { BaseField } from './fields/BaseField'
export { TextField } from './fields/TextField'
export { EmailField } from './fields/EmailField'
export { PasswordField } from './fields/PasswordField'
export { NumberField } from './fields/NumberField'
export { SelectField } from './fields/SelectField'
export { TextareaField } from './fields/TextareaField'
export { CheckboxField } from './fields/CheckboxField'

export { FormConfig } from './FormConfig'

export { useForm } from './composables/useForm'
export { useFormState } from './composables/useFormState'

export { FormField } from './components/FormField'
export { DynamicField } from './components/DynamicField'
export { default as FieldWrapper } from './components/FieldWrapper.vue'

export { fieldComponentMap, resolveFieldComponent } from './components/fieldComponentMap'
export { fieldPropsStrategies, resolveFieldTypeProps, resolveBaseProps } from './components/fieldPropsStrategies'
export { FIELD_DEFAULTS_KEY, defaultFieldDefaults } from './components/fieldDefaults'
export { useFieldDefaults } from './components/useFieldDefaults'

export * from './rules/validators'
export type * from './types/field.types'
export type { FieldBinding } from './composables/useFormState'
export type { FieldDefaults } from './components/fieldDefaults'
export type { UseFormStateOptions, FormSubmitHandler, FormValues, FormErrors, TransformFn } from './types/field.types'
export type { FieldState } from './components/FormField'
