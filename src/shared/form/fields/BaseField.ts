import type { FieldConfig, FieldType, ValidationRule } from '../types/field.types'

export abstract class BaseField<TValue = unknown, TConfig extends FieldConfig = FieldConfig> {
  abstract readonly type: FieldType

  value: TValue
  readonly config: TConfig

  constructor(config: TConfig, defaultValue: TValue) {
    this.config = config
    this.value = (config.defaultValue as TValue) ?? defaultValue
  }

  get rules(): ValidationRule[] {
    const fieldRules = this.config.rules ?? []
    return this.config.required
      ? [v => (v !== null && v !== undefined && v !== '') || 'Field is required', ...fieldRules]
      : fieldRules
  }

  get label(): string | undefined {
    return this.config.label
  }

  get description(): string | undefined {
    return this.config.description
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
    this.value = (this.config.defaultValue as TValue) ?? ('' as unknown as TValue)
  }

  validate(): string[] {
    return this.rules
      .map(rule => rule(this.value))
      .filter((result): result is string => result !== true)
  }
}
