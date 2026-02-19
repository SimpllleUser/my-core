import { BaseField } from './BaseField'
import type { TextareaFieldConfig } from '../types/field.types'

export class TextareaField extends BaseField<string, TextareaFieldConfig> {
  readonly type = 'textarea' as const

  constructor(config: TextareaFieldConfig) {
    super(config, '')
  }
}
