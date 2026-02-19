import { BaseField } from './BaseField'
import type { SelectFieldConfig } from '../types/field.types'

export class SelectField<TValue = unknown> extends BaseField<TValue | null, SelectFieldConfig> {
  readonly type = 'select' as const

  constructor(config: SelectFieldConfig) {
    super(config, null)
  }

  get options() {
    return this.config.options
  }

  get multiple() {
    return this.config.multiple ?? false
  }
}
