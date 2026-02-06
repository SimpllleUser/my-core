import type { Component, Raw } from 'vue';

// ============================================================================
// Validation Types
// ============================================================================

export type FormValues = Record<string, unknown>;

export type ValidationResult = true | string;

export type ValidationRule<T = unknown> = (
  value: T,
  values: FormValues
) => ValidationResult | Promise<ValidationResult>;

export interface ValidationRuleWithMeta<T = unknown> {
  validate: ValidationRule<T>;
  message?: string;
  async?: boolean;
}

// ============================================================================
// Field Types
// ============================================================================

export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'money'
  | 'phone'
  | 'select'
  | 'autocomplete'
  | 'textarea'
  | 'switch'
  | 'checkbox'
  | 'date'
  | 'date-range'
  | 'file'
  | 'image'
  | 'radio'
  | 'rating'
  | 'slider'
  | 'color'
  | 'array'
  | 'object'
  | 'custom';

export type VisibilityCallback = (values: FormValues) => boolean;
export type DisabledCallback = (values: FormValues) => boolean;

// ============================================================================
// Base Field Configuration
// ============================================================================

export interface BaseFieldConfig<T = unknown> {
  label?: string;
  placeholder?: string;
  hint?: string;
  validation?: ValidationRule<T>[];
  default?: T;
  visible?: boolean | VisibilityCallback;
  disabled?: boolean | DisabledCallback;
  group?: string;
  cols?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  prependIcon?: string;
  appendIcon?: string;
  prependInnerIcon?: string;
  appendInnerIcon?: string;
  clearable?: boolean;
  readonly?: boolean;
  density?: 'default' | 'comfortable' | 'compact';
  variant?: 'outlined' | 'filled' | 'underlined' | 'plain' | 'solo' | 'solo-inverted' | 'solo-filled';
  color?: string;
  bgColor?: string;
  class?: string | string[] | Record<string, boolean>;
  style?: string | Record<string, string>;
}

// ============================================================================
// Field-Specific Configurations
// ============================================================================

export interface TextFieldConfig extends BaseFieldConfig<string> {
  type?: 'text' | 'email' | 'tel' | 'url';
  maxlength?: number;
  counter?: boolean | number;
  prefix?: string;
  suffix?: string;
}

export interface EmailFieldConfig extends BaseFieldConfig<string> {
  maxlength?: number;
  counter?: boolean | number;
}

export interface PasswordFieldConfig extends BaseFieldConfig<string> {
  maxlength?: number;
  counter?: boolean | number;
  toggleVisibility?: boolean;
}

export interface NumberFieldConfig extends BaseFieldConfig<number | null> {
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
}

export interface MoneyFieldConfig extends BaseFieldConfig<number | null> {
  currency?: string;
  currencyDisplay?: 'symbol' | 'code' | 'name';
  locale?: string;
  min?: number;
  max?: number;
  precision?: number;
}

export interface PhoneFieldConfig extends BaseFieldConfig<string> {
  mask?: string;
  countryCode?: string;
}

export interface SelectOption<V = unknown> {
  title: string;
  value: V;
  disabled?: boolean;
  [key: string]: unknown;
}

export interface SelectFieldConfig<T = unknown> extends BaseFieldConfig<T> {
  items: SelectOption<T>[] | T[] | string[];
  itemTitle?: string;
  itemValue?: string;
  multiple?: boolean;
  chips?: boolean;
  closableChips?: boolean;
  returnObject?: boolean;
}

export interface AutocompleteFieldConfig<T = unknown> extends BaseFieldConfig<T> {
  items?: SelectOption<T>[] | T[] | string[];
  itemTitle?: string;
  itemValue?: string;
  multiple?: boolean;
  chips?: boolean;
  closableChips?: boolean;
  returnObject?: boolean;
  searchFn?: (query: string) => Promise<SelectOption<T>[] | T[]>;
  minSearchLength?: number;
  debounce?: number;
  noFilter?: boolean;
}

export interface TextareaFieldConfig extends BaseFieldConfig<string> {
  rows?: number;
  autoGrow?: boolean;
  maxRows?: number;
  counter?: boolean | number;
  maxlength?: number;
  noResize?: boolean;
}

export interface SwitchFieldConfig extends BaseFieldConfig<boolean> {
  inset?: boolean;
  trueValue?: unknown;
  falseValue?: unknown;
}

export interface CheckboxFieldConfig extends BaseFieldConfig<boolean> {
  trueValue?: unknown;
  falseValue?: unknown;
  indeterminate?: boolean;
}

export interface DateFieldConfig extends BaseFieldConfig<string | Date | null> {
  min?: string | Date;
  max?: string | Date;
  format?: string;
  displayFormat?: string;
  firstDayOfWeek?: number;
  allowedDates?: (date: string) => boolean;
}

export interface DateRangeFieldConfig extends BaseFieldConfig<[string | Date | null, string | Date | null]> {
  min?: string | Date;
  max?: string | Date;
  format?: string;
  displayFormat?: string;
  firstDayOfWeek?: number;
  allowedDates?: (date: string) => boolean;
  startLabel?: string;
  endLabel?: string;
}

export interface FileFieldConfig extends BaseFieldConfig<File | File[] | null> {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  showSize?: boolean;
  chips?: boolean;
  counter?: boolean;
  prependIcon?: string;
}

export interface ImageFieldConfig extends FileFieldConfig {
  showPreview?: boolean;
  previewWidth?: number;
  previewHeight?: number;
  aspectRatio?: number;
  cover?: boolean;
}

export interface RadioOption<V = unknown> {
  label: string;
  value: V;
  disabled?: boolean;
  [key: string]: unknown;
}

export interface RadioFieldConfig<T = unknown> extends BaseFieldConfig<T> {
  options: RadioOption<T>[] | T[] | string[];
  inline?: boolean;
}

export interface RatingFieldConfig extends BaseFieldConfig<number> {
  length?: number;
  size?: string | number;
  emptyIcon?: string;
  fullIcon?: string;
  halfIncrements?: boolean;
  hover?: boolean;
  itemAriaLabel?: string;
}

export interface SliderFieldConfig extends BaseFieldConfig<number | [number, number]> {
  min?: number;
  max?: number;
  step?: number;
  thumbLabel?: boolean | 'always';
  tickLabels?: string[];
  ticks?: boolean | 'always';
  showTicks?: boolean | 'always';
  range?: boolean;
}

export interface ColorFieldConfig extends BaseFieldConfig<string> {
  mode?: 'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla';
  swatches?: string[][];
  showSwatches?: boolean;
  hideCanvas?: boolean;
  hideSliders?: boolean;
  hideInputs?: boolean;
}

export interface ArrayFieldConfig<T = unknown> extends BaseFieldConfig<T[]> {
  itemField: FieldDefinition;
  minItems?: number;
  maxItems?: number;
  addLabel?: string;
  removeLabel?: string;
  sortable?: boolean;
}

export interface ObjectFieldConfig extends BaseFieldConfig<Record<string, unknown>> {
  fields: FieldDefinition[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export interface CustomFieldConfig<T = unknown> extends BaseFieldConfig<T> {
  component: Raw<Component>;
  props?: Record<string, unknown>;
}

// ============================================================================
// Field Definition (Runtime)
// ============================================================================

export interface FieldDefinition<T = unknown> {
  name: string;
  type: FieldType;
  label?: string;
  placeholder?: string;
  hint?: string;
  validation: ValidationRule<T>[];
  default: T | undefined;
  visible: boolean | VisibilityCallback;
  disabled: boolean | DisabledCallback;
  group?: string;
  cols?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  config: Record<string, unknown>;
}

// ============================================================================
// Form State
// ============================================================================

export interface FormState<T extends FormValues = FormValues> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  dirty: boolean;
  submitting: boolean;
  submitted: boolean;
  valid: boolean;
}

export interface UseFormOptions<T extends FormValues = FormValues> {
  initialValues?: Partial<T>;
  validateOn?: 'blur' | 'change' | 'submit';
  revalidateOn?: 'blur' | 'change';
  asyncDebounce?: number;
}

export interface UseFormReturn<T extends FormValues = FormValues> {
  // State
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isDirty: boolean;
  isSubmitting: boolean;
  isValid: boolean;
  fields: FieldDefinition[];

  // Methods
  getField: (name: string) => FieldDefinition | undefined;
  getGroup: (group: string) => FieldDefinition[];
  validate: () => Promise<boolean>;
  validateField: (name: string) => Promise<boolean>;
  reset: () => void;
  setValues: (values: Partial<T>) => void;
  setFieldValue: (name: string, value: unknown) => void;
  setErrors: (errors: Partial<Record<keyof T, string>>) => void;
  setFieldError: (name: string, error: string | undefined) => void;
  setTouched: (name: string, touched?: boolean) => void;
  submit: <R = void>(handler: (values: T) => Promise<R>) => Promise<R | undefined>;
  handleBlur: (name: string) => void;
  handleChange: (name: string) => void;
}

// ============================================================================
// Type Inference Utilities
// ============================================================================

// Helper to extract value type from field
type ExtractFieldValue<F> = F extends { default: infer D }
  ? D extends undefined
    ? F extends { validation: ValidationRule<infer V>[] }
      ? V
      : unknown
    : D
  : unknown;

// Infer form values from FormConfig class
export type InferFormValues<T extends object> = {
  [K in keyof T as T[K] extends { type: FieldType } ? K : never]: ExtractFieldValue<T[K]>;
};

// ============================================================================
// Component Props
// ============================================================================

export interface FormFieldProps {
  field: FieldDefinition;
  modelValue: unknown;
  error?: string;
  touched?: boolean;
}

export interface FormActionsProps {
  loading?: boolean;
  disabled?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  resetLabel?: string;
  showCancel?: boolean;
  showReset?: boolean;
  submitColor?: string;
  cancelColor?: string;
  resetColor?: string;
}

export interface FormSectionProps {
  title?: string;
  subtitle?: string;
  fields: FieldDefinition[];
  values: FormValues;
  errors: Partial<Record<string, string>>;
  touched?: Partial<Record<string, boolean>>;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  cols?: number;
}
