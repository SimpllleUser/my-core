import type { FieldConfig, FieldType, ValidationRule } from '../types/field.types'
import { resolveValidations } from '../rules/resolveValidations'

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
    return Boolean(this.config.validations?.required ?? this.config.required)
  }

  get rules(): ValidationRule[] {
    const resolved = resolveValidations(this.config.validations ?? {})
    // backward compat: deprecated top-level config.rules
    const legacy = this.config.rules ?? []
    return [...resolved, ...legacy]
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
}
