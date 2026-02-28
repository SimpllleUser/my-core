import type { FieldConfig, FieldType, ValidationRule } from '../types/field.types'

export abstract class BaseField<TValue = unknown, TConfig extends FieldConfig = FieldConfig> {
  abstract readonly type: FieldType

  value: TValue
  readonly config: TConfig

  constructor(config: TConfig, fallbackValue: TValue) {
    this.config = config
    // new API: value / old API: defaultValue
    this.value = (config.value as TValue) ?? (config.defaultValue as TValue) ?? fallbackValue
  }

  get isRequired(): boolean {
    // new API: validations.required / old API: required
    return this.config.validations?.required ?? this.config.required ?? false
  }

  get rules(): ValidationRule[] {
    // new API: validations.rules / old API: rules
    const fieldRules = this.config.validations?.rules ?? this.config.rules ?? []
    return this.isRequired
      ? [v => (v !== null && v !== undefined && v !== '') || 'Field is required', ...fieldRules]
      : fieldRules
  }

  get label(): string | undefined {
    return this.config.label
  }

  get description(): string | undefined {
    return this.config.description
  }

  get info(): string | undefined {
    return this.config.info
  }

  get isDisabled(): boolean {
    return this.config.disabled ?? false
  }

  get isReadonly(): boolean {
    return this.config.readonly ?? false
  }

  get vuetifyProps(): Record<string, unknown> {
    return this.config.vuetifyProps ?? {}
  }

  get transform(): ((value: TValue) => unknown) | undefined {
    return this.config.transform as ((value: TValue) => unknown) | undefined
  }

  reset(): void {
    // new API: value / old API: defaultValue
    const initial = this.config.value ?? this.config.defaultValue
    this.value = (initial as TValue) ?? ('' as unknown as TValue)
  }

  validate(): string[] {
    return this.rules
      .map(rule => rule(this.value))
      .filter((result): result is string => result !== true)
  }
}
