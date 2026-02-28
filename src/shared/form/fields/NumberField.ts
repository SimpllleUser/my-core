import { BaseField } from './BaseField'
import type { FieldConfig } from '../types/field.types'

export class NumberField extends BaseField<number | null, FieldConfig> {
  readonly type = 'number' as const

  constructor(config: FieldConfig) {
    super(config, null)
  }
}
