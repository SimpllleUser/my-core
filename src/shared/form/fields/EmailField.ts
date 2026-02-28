import { BaseField } from './BaseField'
import type { FieldConfig } from '../types/field.types'
import { email } from '../rules/validators'

export class EmailField extends BaseField<string, FieldConfig> {
  readonly type = 'email' as const

  constructor(config: FieldConfig) {
    const userRules = config.validations?.rules ?? config.rules ?? []
    super(
      {
        ...config,
        rules: undefined,
        validations: {
          ...config.validations,
          rules: [email(), ...userRules],
        },
      },
      ''
    )
  }
}
