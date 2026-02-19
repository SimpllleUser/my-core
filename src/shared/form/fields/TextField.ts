import { BaseField } from './BaseField'
import type { FieldConfig } from '../types/field.types'

export class TextField extends BaseField<string, FieldConfig> {
  readonly type = 'text' as const

  constructor(config: FieldConfig) {
    super(config, '')
  }
}
