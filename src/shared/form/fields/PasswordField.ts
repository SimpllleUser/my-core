import { BaseField } from './BaseField'
import type { FieldConfig } from '../types/field.types'

export class PasswordField extends BaseField<string, FieldConfig> {
  readonly type = 'password' as const

  constructor(config: FieldConfig) {
    super(config, '')
  }
}
