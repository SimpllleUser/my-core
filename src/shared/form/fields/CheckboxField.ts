import { BaseField } from './BaseField'
import type { FieldConfig } from '../types/field.types'

export class CheckboxField extends BaseField<boolean, FieldConfig> {
  readonly type = 'checkbox' as const

  constructor(config: FieldConfig) {
    super(config, false)
  }
}
